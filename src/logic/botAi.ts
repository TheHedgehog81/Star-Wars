import {
  GameState,
  PlayerState,
  BotDifficulty,
  PlayableFaction,
} from '../types/game';
import {
  playCard,
  buyGalaxyRowCard,
  buyOuterRimPilotCard,
  sabotageGalaxyCard,
  attackCapitalShip,
  attackEnemyBase,
  useActiveBaseAbility,
  selectReplacementBase,
  endTurn,
  getGuardingCapitalShips,
  getOpponentFaction,
  PlayersMap,
} from './gameEngine';

export interface BotActionLog {
  action: string;
  actionIt: string;
}

// Select best replacement base for bot
export function chooseBotReplacementBase(
  _state: GameState,
  botPlayer: PlayerState,
  _difficulty: BotDifficulty
): string | null {
  if (botPlayer.availableBases.length === 0) return null;

  const bases = botPlayer.availableBases;

  // Strategic base ranking per faction
  if (botPlayer.faction === 'empire') {
    const pref = ['base_death_star', 'base_kuat', 'base_coruscant', 'base_mustafar', 'base_rodia'];
    for (const id of pref) {
      const b = bases.find((x) => x.id === id);
      if (b) return b.id;
    }
  } else if (botPlayer.faction === 'rebel') {
    const pref = ['base_mon_cala', 'base_sullust', 'base_hoth', 'base_yavin4', 'base_dagobah'];
    for (const id of pref) {
      const b = bases.find((x) => x.id === id);
      if (b) return b.id;
    }
  } else if (botPlayer.faction === 'mandalorian') {
    const pref = ['base_mandalore', 'base_concordia', 'base_kalevala', 'base_arvala7', 'base_kaspar'];
    for (const id of pref) {
      const b = bases.find((x) => x.id === id);
      if (b) return b.id;
    }
  } else if (botPlayer.faction === 'republic') {
    const pref = ['base_coruscant_temple', 'base_christophsis', 'base_naboo', 'base_ryloth', 'base_geonosis_rep'];
    for (const id of pref) {
      const b = bases.find((x) => x.id === id);
      if (b) return b.id;
    }
  } else if (botPlayer.faction === 'separatist') {
    const pref = ['base_utapau', 'base_serenno', 'base_mustafar_sep', 'base_raxus', 'base_cato'];
    for (const id of pref) {
      const b = bases.find((x) => x.id === id);
      if (b) return b.id;
    }
  }

  // Fallback to first available
  return bases[0].id;
}

// Execute one step or complete turn of Bot AI
export async function executeBotTurn(
  currentState: GameState,
  currentPlayers: PlayersMap,
  onStep?: (state: GameState, players: PlayersMap) => void,
  stepDelayMs: number = 450
): Promise<{ state: GameState; players: PlayersMap }> {
  let state = currentState;
  let players = currentPlayers;
  const botFaction = state.currentTurn;
  const opponentFaction = getOpponentFaction(state, botFaction);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Check if bot needs to choose a base
  if (state.phase === 'base_selection' && state.pendingBaseSelectionPlayer === botFaction) {
    const bot = players[botFaction];
    if (bot) {
      const chosenBaseId = chooseBotReplacementBase(state, bot, state.settings.difficulty);
      if (chosenBaseId) {
        const res = selectReplacementBase(state, botFaction, chosenBaseId, players);
        state = res.state;
        players = res.players;
        if (onStep) onStep(state, players);
        await delay(stepDelayMs);
      }
    }
  }

  // STEP 1: Activate Base Ability if available & helpful
  let bot = players[botFaction];
  if (bot && !bot.activeBase.usedAbilityThisTurn && bot.activeBase.abilityType === 'action') {
    // If Death Star: only use if has 3+ resources
    if (bot.activeBase.id === 'base_death_star' && bot.resources < 3) {
      // wait until cards are played
    } else {
      const res = useActiveBaseAbility(state, botFaction, players);
      if (res) {
        state = res.state;
        players = res.players;
        if (onStep) onStep(state, players);
        await delay(stepDelayMs);
      }
    }
  }

  // STEP 2: Play cards strategically
  // Sort hand: play Force cards first to activate Force threshold on other cards, then Capital ships, then units
  bot = players[botFaction];
  while (bot && bot.hand.length > 0) {
    const forceCards = bot.hand.filter((c) => c.force > 0);
    const capitalShips = bot.hand.filter((c) => c.type === 'capital_ship');
    const resourceCards = bot.hand.filter((c) => c.resources > 0);

    const cardToPlay =
      forceCards[0] ||
      capitalShips[0] ||
      resourceCards[0] ||
      bot.hand[0];

    const res = playCard(state, botFaction, cardToPlay.instanceId, players);
    state = res.state;
    players = res.players;
    bot = players[botFaction];

    if (onStep) onStep(state, players);
    await delay(stepDelayMs);
  }

  // Re-check base ability after playing cards (e.g. Death Star now has 3+ resources)
  bot = players[botFaction];
  if (bot && !bot.activeBase.usedAbilityThisTurn && bot.activeBase.abilityType === 'action') {
    const res = useActiveBaseAbility(state, botFaction, players);
    if (res) {
      state = res.state;
      players = res.players;
      bot = players[botFaction];
      if (onStep) onStep(state, players);
      await delay(stepDelayMs);
    }
  }

  // STEP 3: Tactical Sabotage in Galaxy Row
  for (let slot = 0; slot < state.galaxyRow.length; slot++) {
    bot = players[botFaction];
    if (!bot) break;
    const card = state.galaxyRow[slot];
    if (!card) continue;

    const isEnemy = card.faction !== botFaction && card.faction !== 'neutral';
    if (isEnemy && card.targetValue && bot.attack >= card.targetValue) {
      const isHighValue = card.cost >= 4 || (card.targetReward && (card.targetReward.resources || 0) >= 3);
      const enemyBaseHp = players[opponentFaction]?.activeBase.currentHp || 0;
      const enemyGuards = getGuardingCapitalShips(players[opponentFaction] || { fleet: [] } as any);

      // If bot cannot kill enemy base this turn anyway, sabotage high value cards!
      const canKillBase = enemyGuards.length === 0 && bot.attack >= enemyBaseHp;
      if (!canKillBase || isHighValue) {
        const res = sabotageGalaxyCard(state, botFaction, slot, players);
        if (res) {
          state = res.state;
          players = res.players;
          bot = players[botFaction];
          if (onStep) onStep(state, players);
          await delay(stepDelayMs);
        }
      }
    }
  }

  // STEP 4: Tactical Purchases in Galaxy Row & Outer Rim Pilots
  let keepShopping = true;
  while (keepShopping) {
    bot = players[botFaction];
    if (!bot) break;
    let bestSlot = -1;
    let highestScore = -1;

    for (let slot = 0; slot < state.galaxyRow.length; slot++) {
      const card = state.galaxyRow[slot];
      if (!card) continue;

      // Cannot buy enemy cards
      if (card.faction !== botFaction && card.faction !== 'neutral') {
        continue;
      }

      let cost = card.cost;
      if (card.type === 'capital_ship' && (bot.activeBase.id === 'base_sullust' || bot.activeBase.id === 'base_kuat')) {
        cost = Math.max(0, cost - 2);
      }

      if (bot.resources >= cost) {
        let score = card.cost * 2 + card.attack * 1.5 + card.resources * 1.5;
        if (card.type === 'capital_ship') score += 8;
        if (card.force > 0) score += 4;
        if (card.uniqueName) score += 6;

        if (score > highestScore) {
          highestScore = score;
          bestSlot = slot;
        }
      }
    }

    if (bestSlot !== -1) {
      const res = buyGalaxyRowCard(state, botFaction, bestSlot, players);
      if (res) {
        state = res.state;
        players = res.players;
        if (onStep) onStep(state, players);
        await delay(stepDelayMs);
      } else {
        keepShopping = false;
      }
    } else {
      // If no galaxy row card affordable, try Outer Rim Pilot if bot has 2+ resources
      if (bot.resources >= 2 && state.outerRimPilotsCount > 0) {
        const res = buyOuterRimPilotCard(state, botFaction, players);
        if (res) {
          state = res.state;
          players = res.players;
          if (onStep) onStep(state, players);
          await delay(stepDelayMs);
        } else {
          keepShopping = false;
        }
      } else {
        keepShopping = false;
      }
    }
  }

  // STEP 5: Combat Attacks (Capital Ships first, then Enemy Base!)
  bot = players[botFaction];
  let opponent = players[opponentFaction];

  // Target guarding Capital Ships
  while (bot && opponent && bot.attack > 0 && opponent.fleet.length > 0) {
    const guards = getGuardingCapitalShips(opponent);
    if (guards.length === 0) break;

    // Pick target: prefer lowest HP remaining to eliminate quickly
    const targetShip = [...guards].sort((a, b) => {
      const remA = (a.hull || 0) - (a.currentDamage || 0);
      const remB = (b.hull || 0) - (b.currentDamage || 0);
      return remA - remB;
    })[0];

    const needed = (targetShip.hull || 0) - (targetShip.currentDamage || 0);
    const assign = Math.min(bot.attack, needed);

    const res = attackCapitalShip(state, botFaction, targetShip.instanceId, assign, players);
    if (res) {
      state = res.state;
      players = res.players;
      bot = players[botFaction];
      opponent = players[opponentFaction];
      if (onStep) onStep(state, players);
      await delay(stepDelayMs);
    } else {
      break;
    }
  }

  // Attack Enemy Base if capital ships are gone and bot has attack remaining
  bot = players[botFaction];
  opponent = players[opponentFaction];
  if (bot && opponent) {
    const remainingGuards = getGuardingCapitalShips(opponent);
    if (bot.attack > 0 && remainingGuards.length === 0 && opponent.activeBase.currentHp > 0) {
      const res = attackEnemyBase(state, botFaction, bot.attack, players);
      if (res) {
        state = res.state;
        players = res.players;
        if (onStep) onStep(state, players);
        await delay(stepDelayMs);
      }
    }
  }

  // If game ended, stop here
  if (state.phase === 'game_over') {
    return { state, players };
  }

  // If base was destroyed and human player needs to pick a base, stop before end turn
  if (state.phase === 'base_selection' && state.pendingBaseSelectionPlayer === opponentFaction) {
    return { state, players };
  }

  // STEP 6: End Turn
  const endRes = endTurn(state, botFaction, players);
  state = endRes.state;
  players = endRes.players;
  if (onStep) onStep(state, players);

  return { state, players };
}
