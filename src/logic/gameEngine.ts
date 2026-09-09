import {
  GameState,
  GameSettings,
  PlayerState,
  Card,
  Base,
  GameLogEntry,
  Faction,
  PlayableFaction,
} from '../types/game';
import {
  createStartingDeck,
  createGalaxyDeck,
  createCardInstance,
  OUTER_RIM_PILOT,
  getBasesForFaction,
  shuffle,
} from '../data/cards';
import { FACTION_CONFIGS } from '../data/factions';
import { sounds } from '../audio/soundEffects';

export type PlayersMap = Record<string, PlayerState>;

let logCounter = 1;
export function createLog(
  turn: number,
  faction: PlayableFaction,
  actorName: string,
  message: string,
  messageIt: string,
  type: GameLogEntry['type']
): GameLogEntry {
  return {
    id: `log_${Date.now()}_${logCounter++}`,
    turn,
    faction,
    actorName,
    message,
    messageIt,
    type,
    timestamp: Date.now(),
  };
}

// Get the opponent faction in the current match
export function getOpponentFaction(state: GameState, currentFaction: PlayableFaction): PlayableFaction {
  return currentFaction === state.settings.playerFaction
    ? state.settings.botFaction
    : state.settings.playerFaction;
}

// Draw cards helper for a player
export function drawCards(player: PlayerState, count: number): { player: PlayerState; drawn: Card[] } {
  let deck = [...player.deck];
  let discard = [...player.discard];
  const hand = [...player.hand];
  const drawn: Card[] = [];

  for (let i = 0; i < count; i++) {
    if (deck.length === 0) {
      if (discard.length === 0) break;
      deck = shuffle(discard);
      discard = [];
    }
    const card = deck.pop();
    if (card) {
      hand.push(card);
      drawn.push(card);
    }
  }

  return {
    player: {
      ...player,
      deck,
      hand,
      discard,
    },
    drawn,
  };
}

// Initialize player state
export function createInitialPlayerState(
  faction: PlayableFaction,
  isHuman: boolean,
  language: 'it' | 'en'
): PlayerState {
  const config = FACTION_CONFIGS[faction];
  const bases = getBasesForFaction(faction);
  const starterBase = { ...bases.find((b) => b.isStarter)! };
  const availableBases = bases.filter((b) => !b.isStarter).map((b) => ({ ...b }));

  const defaultName = isHuman
    ? language === 'it'
      ? `Comandante ${config.shortNameIt}`
      : `${config.shortName} Commander`
    : language === 'it'
    ? `Bot ${config.shortNameIt}`
    : `${config.shortName} Bot`;

  return {
    faction,
    isHuman,
    name: defaultName,
    resources: 0,
    attack: 0,
    deck: createStartingDeck(faction),
    hand: [],
    inPlay: [],
    fleet: [],
    discard: [],
    activeBase: starterBase,
    availableBases,
    destroyedBases: [],
  };
}

// Initialize players for both sides
export function initializePlayers(settings: GameSettings): PlayersMap {
  let humanPlayer = createInitialPlayerState(settings.playerFaction, true, settings.language);
  let botPlayer = createInitialPlayerState(settings.botFaction, false, settings.language);

  // First player gets 3 cards if handicap enabled, else 5 cards
  const humanHandSize = settings.firstTurnHandicap ? 3 : 5;
  const botHandSize = 5;

  const humanDraw = drawCards(humanPlayer, humanHandSize);
  humanPlayer = humanDraw.player;

  const botDraw = drawCards(botPlayer, botHandSize);
  botPlayer = botDraw.player;

  return {
    [settings.playerFaction]: humanPlayer,
    [settings.botFaction]: botPlayer,
  };
}

// Initialize complete game
export function initializeGame(settings: GameSettings): GameState {
  // Setup Galaxy Deck & initial Row
  const fullGalaxyDeck = createGalaxyDeck(
    settings.playerFaction,
    settings.botFaction,
    settings.galaxyDeckType || 'duel'
  );
  const galaxyRow: (Card | null)[] = [];
  for (let i = 0; i < 6; i++) {
    galaxyRow.push(fullGalaxyDeck.pop() || null);
  }

  const humanConfig = FACTION_CONFIGS[settings.playerFaction];
  const botConfig = FACTION_CONFIGS[settings.botFaction];

  const initialLogs: GameLogEntry[] = [
    createLog(
      1,
      settings.playerFaction,
      'Sistema',
      `Match started: ${humanConfig.name} vs ${botConfig.name}. May the Force be with you!`,
      `Partita iniziata: ${humanConfig.nameIt} vs ${botConfig.nameIt}. Che la Forza sia con te!`,
      'info'
    ),
    createLog(
      1,
      settings.playerFaction,
      humanConfig.nameIt,
      `Turn 1: Target: Destroy ${settings.basesToWin} enemy bases to win!`,
      `Turno 1: Obiettivo: Distruggi ${settings.basesToWin} basi nemiche per vincere!`,
      'turn_start'
    ),
  ];

  return {
    settings,
    forceBalance: 0, // 0 is neutral
    galaxyDeck: fullGalaxyDeck,
    galaxyRow,
    galaxyDiscard: [],
    outerRimPilotsCount: 10,
    currentTurn: settings.playerFaction,
    turnNumber: 1,
    phase: 'action',
    winner: null,
    logs: initialLogs,
    pendingBaseSelectionPlayer: null,
    selectedCardForInspect: null,
    selectedBaseForInspect: null,
    pendingExilePrompt: null,
  };
}

// Check if the Force is with the given faction
export function isForceWith(
  faction: Faction,
  forceBalance: number,
  playerFaction: PlayableFaction = 'rebel'
): boolean {
  if (faction === 'neutral') return false;
  // If faction is the human player's faction, Force favors them when < 0
  if (faction === playerFaction) {
    return forceBalance < 0;
  }
  // If opposing faction, Force favors them when > 0
  return forceBalance > 0;
}

// Check if player has Capital Ships in fleet
export function getGuardingCapitalShips(player: PlayerState): Card[] {
  return player.fleet.filter((ship) => (ship.hull || 0) > (ship.currentDamage || 0));
}

// Sound helper according to faction
function playFactionBlaster(faction: PlayableFaction) {
  if (faction === 'mandalorian') {
    sounds.playBlaster('heavy');
  } else if (faction === 'empire' || faction === 'separatist') {
    sounds.playBlaster('empire');
  } else {
    sounds.playBlaster('rebel');
  }
}

// Play card from hand
export function playCard(
  state: GameState,
  playerFaction: PlayableFaction,
  instanceId: string,
  players: PlayersMap
): { state: GameState; players: PlayersMap } {
  const current = { ...players[playerFaction] };
  if (!current) return { state, players };

  const cardIndex = current.hand.findIndex((c) => c.instanceId === instanceId);
  if (cardIndex === -1) return { state, players };

  const card = current.hand[cardIndex];
  const newHand = [...current.hand];
  newHand.splice(cardIndex, 1);

  let newResources = current.resources + card.resources;
  let newAttack = current.attack + card.attack;
  let newForceBalance = state.forceBalance;

  // Force movement:
  // Player moves Force towards negative (-6), Bot moves Force towards positive (+6)
  if (card.force > 0) {
    if (playerFaction === state.settings.playerFaction) {
      newForceBalance = Math.max(-6, newForceBalance - card.force);
      sounds.playForce('light');
    } else {
      newForceBalance = Math.min(6, newForceBalance + card.force);
      sounds.playForce('dark');
    }
  }

  // Check Force bonuses
  const forceIsWithPlayer = isForceWith(playerFaction, newForceBalance, state.settings.playerFaction);
  let bonusDesc = '';
  let bonusDescIt = '';

  if (card.hasForceAbility && forceIsWithPlayer) {
    if (card.forceBonusAttack) {
      newAttack += card.forceBonusAttack;
      bonusDesc += ` (+${card.forceBonusAttack} Force Attack)`;
      bonusDescIt += ` (+${card.forceBonusAttack} Attacco dalla Forza)`;
    }
    if (card.forceBonusResources) {
      newResources += card.forceBonusResources;
      bonusDesc += ` (+${card.forceBonusResources} Force Resources)`;
      bonusDescIt += ` (+${card.forceBonusResources} Risorse dalla Forza)`;
    }
  }

  // Execute special card abilities
  let updatedPlayer: PlayerState = {
    ...current,
    hand: newHand,
    resources: newResources,
    attack: newAttack,
  };

  // If card draws extra cards
  if (
    (card.hasForceAbility && forceIsWithPlayer && card.forceBonusDraw) ||
    card.id === 'reb_leia' ||
    card.id === 'emp_tarkin' ||
    card.id === 'reb_u_wing' ||
    card.id === 'emp_probe_droid' ||
    card.id === 'neu_lando' ||
    card.id === 'mnd_bo_katan' ||
    card.id === 'rep_obiwan' ||
    card.id === 'rep_yoda'
  ) {
    const drawCount = card.id === 'rep_yoda' ? 2 : 1;
    const res = drawCards(updatedPlayer, drawCount);
    updatedPlayer = res.player;
  }

  // Base healing cards
  if (card.id === 'reb_chewbacca') {
    const healedBase = {
      ...updatedPlayer.activeBase,
      currentHp: Math.min(updatedPlayer.activeBase.maxHp, updatedPlayer.activeBase.currentHp + 3),
    };
    updatedPlayer.activeBase = healedBase;
  } else if (card.id === 'emp_royal_guard') {
    const healedBase = {
      ...updatedPlayer.activeBase,
      currentHp: Math.min(updatedPlayer.activeBase.maxHp, updatedPlayer.activeBase.currentHp + 2),
    };
    updatedPlayer.activeBase = healedBase;
  } else if (card.id === 'mnd_grogu') {
    const healedBase = {
      ...updatedPlayer.activeBase,
      currentHp: Math.min(updatedPlayer.activeBase.maxHp, updatedPlayer.activeBase.currentHp + 4),
    };
    updatedPlayer.activeBase = healedBase;
  }

  // Capital Ship vs Unit destination
  if (card.type === 'capital_ship') {
    updatedPlayer.fleet = [...updatedPlayer.fleet, card];
  } else {
    updatedPlayer.inPlay = [...updatedPlayer.inPlay, card];
  }

  sounds.playCard();

  const newLog = createLog(
    state.turnNumber,
    playerFaction,
    updatedPlayer.name,
    `Played ${card.name}.${bonusDesc}`,
    `Ha giocato ${card.nameIt}.${bonusDescIt}`,
    'play'
  );

  return {
    state: {
      ...state,
      forceBalance: newForceBalance,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [playerFaction]: updatedPlayer,
    },
  };
}

// Play all cards currently in hand
export function playAllHand(
  state: GameState,
  playerFaction: PlayableFaction,
  players: PlayersMap
): { state: GameState; players: PlayersMap } {
  let currentState = state;
  let currentPlayers = players;
  const currentHand = [...(currentPlayers[playerFaction]?.hand || [])];

  for (const card of currentHand) {
    const res = playCard(currentState, playerFaction, card.instanceId, currentPlayers);
    currentState = res.state;
    currentPlayers = res.players;
  }

  return { state: currentState, players: currentPlayers };
}

// Buy card from Galaxy Row
export function buyGalaxyRowCard(
  state: GameState,
  playerFaction: PlayableFaction,
  slotIndex: number,
  players: PlayersMap
): { state: GameState; players: PlayersMap } | null {
  const card = state.galaxyRow[slotIndex];
  if (!card) return null;

  // Cannot buy opposing faction card (can only sabotage)
  if (card.faction !== playerFaction && card.faction !== 'neutral') {
    return null;
  }

  const current = { ...players[playerFaction] };
  if (!current) return null;

  // Calculate cost discount (e.g. Sullust or Kuat bases for capital ships)
  let actualCost = card.cost;
  if (
    card.type === 'capital_ship' &&
    (current.activeBase.id === 'base_sullust' || current.activeBase.id === 'base_kuat')
  ) {
    actualCost = Math.max(0, actualCost - 2);
  }

  if (current.resources < actualCost) return null;

  current.resources -= actualCost;
  current.discard = [card, ...current.discard];

  // Refill galaxy slot
  const newGalaxyDeck = [...state.galaxyDeck];
  const newRow = [...state.galaxyRow];
  newRow[slotIndex] = newGalaxyDeck.pop() || null;

  sounds.playPurchase();

  const newLog = createLog(
    state.turnNumber,
    playerFaction,
    current.name,
    `Purchased ${card.name} for ${actualCost} Resources.`,
    `Ha reclutato ${card.nameIt} per ${actualCost} Risorse.`,
    'buy'
  );

  return {
    state: {
      ...state,
      galaxyDeck: newGalaxyDeck,
      galaxyRow: newRow,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [playerFaction]: current,
    },
  };
}

// Buy Outer Rim Pilot
export function buyOuterRimPilotCard(
  state: GameState,
  playerFaction: PlayableFaction,
  players: PlayersMap
): { state: GameState; players: PlayersMap } | null {
  if (state.outerRimPilotsCount <= 0) return null;

  const current = { ...players[playerFaction] };
  if (!current || current.resources < OUTER_RIM_PILOT.cost) return null;

  current.resources -= OUTER_RIM_PILOT.cost;
  const newCard = createCardInstance(OUTER_RIM_PILOT);
  current.discard = [newCard, ...current.discard];

  sounds.playPurchase();

  const newLog = createLog(
    state.turnNumber,
    playerFaction,
    current.name,
    `Hired an Outer Rim Pilot for ${OUTER_RIM_PILOT.cost} Resources.`,
    `Ha ingaggiato un Pilota dell'Orlo Esterno per ${OUTER_RIM_PILOT.cost} Risorse.`,
    'buy'
  );

  return {
    state: {
      ...state,
      outerRimPilotsCount: state.outerRimPilotsCount - 1,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [playerFaction]: current,
    },
  };
}

// Sabotage opposing card in Galaxy Row
export function sabotageGalaxyCard(
  state: GameState,
  playerFaction: PlayableFaction,
  slotIndex: number,
  players: PlayersMap
): { state: GameState; players: PlayersMap } | null {
  const card = state.galaxyRow[slotIndex];
  if (!card) return null;

  // Can only target enemy card (not friendly, not neutral)
  const isEnemy = card.faction !== playerFaction && card.faction !== 'neutral';
  if (!isEnemy || !card.targetValue) return null;

  const current = { ...players[playerFaction] };
  if (!current || current.attack < card.targetValue) return null;

  // Deduct attack
  current.attack -= card.targetValue;

  // Apply reward
  let rewardMsg = '';
  let rewardMsgIt = '';
  let newForceBalance = state.forceBalance;

  if (card.targetReward) {
    if (card.targetReward.resources) {
      current.resources += card.targetReward.resources;
      rewardMsg += ` +${card.targetReward.resources} Resources`;
      rewardMsgIt += ` +${card.targetReward.resources} Risorse`;
    }
    if (card.targetReward.attack) {
      current.attack += card.targetReward.attack;
      rewardMsg += ` +${card.targetReward.attack} Attack`;
      rewardMsgIt += ` +${card.targetReward.attack} Attacco`;
    }
    if (card.targetReward.force) {
      if (playerFaction === state.settings.playerFaction) {
        newForceBalance = Math.max(-6, newForceBalance - card.targetReward.force);
      } else {
        newForceBalance = Math.min(6, newForceBalance + card.targetReward.force);
      }
      rewardMsg += ` +${card.targetReward.force} Force`;
      rewardMsgIt += ` +${card.targetReward.force} Forza`;
    }
    if (card.targetReward.drawCards) {
      const drawn = drawCards(current, card.targetReward.drawCards);
      Object.assign(current, drawn.player);
      rewardMsg += ` Drew ${card.targetReward.drawCards} card(s)`;
      rewardMsgIt += ` Ha pescato ${card.targetReward.drawCards} carta/e`;
    }
    if (card.targetReward.healBase && current.activeBase) {
      current.activeBase = {
        ...current.activeBase,
        currentHp: Math.min(current.activeBase.maxHp, current.activeBase.currentHp + card.targetReward.healBase),
      };
      rewardMsg += ` Healed ${card.targetReward.healBase} Base HP`;
      rewardMsgIt += ` Riparato ${card.targetReward.healBase} PF alla Base`;
    }
  }

  // Refill galaxy slot and discard targeted card
  const newGalaxyDeck = [...state.galaxyDeck];
  const newRow = [...state.galaxyRow];
  newRow[slotIndex] = newGalaxyDeck.pop() || null;

  playFactionBlaster(playerFaction);

  const newLog = createLog(
    state.turnNumber,
    playerFaction,
    current.name,
    `Sabotaged enemy ${card.name} in Galaxy Row! Gained reward:${rewardMsg}`,
    `Ha sabotato ${card.nameIt} nella Galassia! Ricompensa riscossa:${rewardMsgIt}`,
    'sabotage'
  );

  return {
    state: {
      ...state,
      forceBalance: newForceBalance,
      galaxyDeck: newGalaxyDeck,
      galaxyRow: newRow,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [playerFaction]: current,
    },
  };
}

// Attack enemy Capital Ship in Fleet
export function attackCapitalShip(
  state: GameState,
  playerFaction: PlayableFaction,
  shipInstanceId: string,
  damageToAssign: number,
  players: PlayersMap
): { state: GameState; players: PlayersMap } | null {
  const opponentFaction = getOpponentFaction(state, playerFaction);
  const current = { ...players[playerFaction] };
  const targetPlayer = { ...players[opponentFaction] };
  if (!current || !targetPlayer) return null;

  const shipIndex = targetPlayer.fleet.findIndex((s) => s.instanceId === shipInstanceId);
  if (shipIndex === -1) return null;

  const ship = targetPlayer.fleet[shipIndex];
  const remainingHp = (ship.hull || 0) - (ship.currentDamage || 0);
  const actualDamage = Math.min(current.attack, Math.min(remainingHp, damageToAssign));

  if (actualDamage <= 0) return null;

  current.attack -= actualDamage;
  const newDamage = (ship.currentDamage || 0) + actualDamage;

  sounds.playBlaster('heavy');

  let logMsg = '';
  let logMsgIt = '';

  const newFleet = [...targetPlayer.fleet];
  if (newDamage >= (ship.hull || 0)) {
    // Ship is destroyed!
    newFleet.splice(shipIndex, 1);
    targetPlayer.discard = [ship, ...targetPlayer.discard];
    sounds.playExplosion();
    logMsg = `Destroyed enemy Capital Ship ${ship.name}!`;
    logMsgIt = `Ha distrutto la Nave Ammiraglia nemica ${ship.nameIt}!`;
  } else {
    newFleet[shipIndex] = { ...ship, currentDamage: newDamage };
    logMsg = `Dealt ${actualDamage} damage to Capital Ship ${ship.name} (${newDamage}/${ship.hull} damage).`;
    logMsgIt = `Ha inflitto ${actualDamage} danni alla Nave Ammiraglia ${ship.nameIt} (${newDamage}/${ship.hull} danni).`;
  }

  targetPlayer.fleet = newFleet;

  const newLog = createLog(
    state.turnNumber,
    playerFaction,
    current.name,
    logMsg,
    logMsgIt,
    'attack'
  );

  return {
    state: {
      ...state,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [playerFaction]: current,
      [opponentFaction]: targetPlayer,
    },
  };
}

// Attack enemy active Base
export function attackEnemyBase(
  state: GameState,
  playerFaction: PlayableFaction,
  damageToAssign: number,
  players: PlayersMap
): { state: GameState; players: PlayersMap } | null {
  const opponentFaction = getOpponentFaction(state, playerFaction);
  const current = { ...players[playerFaction] };
  const defender = { ...players[opponentFaction] };
  if (!current || !defender) return null;

  // Guarding capital ships check
  const guards = getGuardingCapitalShips(defender);
  if (guards.length > 0) {
    return null; // Cannot attack base while Capital Ships guard it
  }

  const actualDamage = Math.min(current.attack, Math.min(defender.activeBase.currentHp, damageToAssign));
  if (actualDamage <= 0) return null;

  current.attack -= actualDamage;
  const newHp = defender.activeBase.currentHp - actualDamage;

  sounds.playBlaster('heavy');

  let updatedState = { ...state };
  let newLog: GameLogEntry;

  if (newHp <= 0) {
    // BASE DESTROYED!
    sounds.playExplosion();
    const destroyedBase = { ...defender.activeBase, currentHp: 0 };
    const newDestroyedBases = [...defender.destroyedBases, destroyedBase];
    defender.destroyedBases = newDestroyedBases;

    newLog = createLog(
      state.turnNumber,
      playerFaction,
      current.name,
      `KABOOM! Destroyed enemy Base: ${destroyedBase.name}! (${newDestroyedBases.length}/${state.settings.basesToWin} bases destroyed)`,
      `BOOM! Ha distrutto la Base nemica: ${destroyedBase.nameIt}! (${newDestroyedBases.length}/${state.settings.basesToWin} basi distrutte)`,
      'base_destroyed'
    );

    // Check Win Condition!
    if (newDestroyedBases.length >= state.settings.basesToWin) {
      sounds.playVictory();
      updatedState = {
        ...updatedState,
        phase: 'game_over',
        winner: playerFaction,
      };
    } else {
      // Defender must select a new base!
      updatedState = {
        ...updatedState,
        phase: 'base_selection',
        pendingBaseSelectionPlayer: defender.faction,
      };
    }
  } else {
    defender.activeBase = { ...defender.activeBase, currentHp: newHp };
    newLog = createLog(
      state.turnNumber,
      playerFaction,
      current.name,
      `Attacked enemy Base ${defender.activeBase.name} for ${actualDamage} damage! (${newHp}/${defender.activeBase.maxHp} HP left)`,
      `Ha bombardato la Base nemica ${defender.activeBase.nameIt} per ${actualDamage} danni! (${newHp}/${defender.activeBase.maxHp} PF rimasti)`,
      'attack'
    );
  }

  updatedState.logs = [newLog, ...updatedState.logs];

  return {
    state: updatedState,
    players: {
      ...players,
      [playerFaction]: current,
      [opponentFaction]: defender,
    },
  };
}

// Select a replacement base after previous base was destroyed
export function selectReplacementBase(
  state: GameState,
  playerFaction: PlayableFaction,
  baseId: string,
  players: PlayersMap
): { state: GameState; players: PlayersMap } {
  const current = { ...players[playerFaction] };
  if (!current) return { state, players };

  const baseIndex = current.availableBases.findIndex((b) => b.id === baseId);
  if (baseIndex === -1) return { state, players };

  const chosenBase = { ...current.availableBases[baseIndex], currentHp: current.availableBases[baseIndex].maxHp };
  const newAvailable = [...current.availableBases];
  newAvailable.splice(baseIndex, 1);

  current.activeBase = chosenBase;
  current.availableBases = newAvailable;

  const newLog = createLog(
    state.turnNumber,
    playerFaction,
    current.name,
    `Established new Active Base: ${chosenBase.name} (${chosenBase.maxHp} HP)`,
    `Ha stabilito la nuova Base Attiva: ${chosenBase.nameIt} (${chosenBase.maxHp} PF)`,
    'info'
  );

  return {
    state: {
      ...state,
      phase: 'action',
      pendingBaseSelectionPlayer: null,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [playerFaction]: current,
    },
  };
}

// Use active Base action ability
export function useActiveBaseAbility(
  state: GameState,
  playerFaction: PlayableFaction,
  players: PlayersMap
): { state: GameState; players: PlayersMap } | null {
  const current = { ...players[playerFaction] };
  if (!current) return null;
  const base = current.activeBase;

  if (base.usedAbilityThisTurn || base.abilityType !== 'action') return null;

  let newResources = current.resources;
  let newAttack = current.attack;
  let newForceBalance = state.forceBalance;
  let desc = '';
  let descIt = '';

  const forceIsWith = isForceWith(playerFaction, newForceBalance, state.settings.playerFaction);

  switch (base.id) {
    case 'base_hoth':
    case 'base_endor_emp':
      if (!forceIsWith) return null;
      newAttack += 2;
      desc = '+2 Attack (Force is with you)';
      descIt = '+2 Attacco (La Forza è con te)';
      break;

    case 'base_yavin4':
    case 'base_rodia':
    case 'base_concordia':
    case 'base_naboo':
    case 'base_raxus': {
      const res = drawCards(current, 1);
      Object.assign(current, res.player);
      desc = 'Drew 1 card';
      descIt = 'Ha pescato 1 carta';
      break;
    }

    case 'base_coruscant':
    case 'base_endor_reb':
    case 'base_geonosis_rep':
      newResources += 2;
      desc = '+2 Resources';
      descIt = '+2 Risorse';
      break;

    case 'base_utapau':
      newResources += 3;
      desc = '+3 Resources';
      descIt = '+3 Risorse';
      break;

    case 'base_scipio':
      newResources += 4;
      desc = '+4 Resources';
      descIt = '+4 Risorse';
      break;

    case 'base_mandalore':
      newResources += 2;
      newAttack += 1;
      desc = '+2 Resources and +1 Attack';
      descIt = '+2 Risorse e +1 Attacco';
      break;

    case 'base_kaspar':
    case 'base_christophsis':
    case 'base_cato':
      newAttack += 3;
      desc = '+3 Attack';
      descIt = '+3 Attacco';
      break;

    case 'base_arvala7':
    case 'base_ryloth':
      current.activeBase = {
        ...current.activeBase,
        currentHp: Math.min(current.activeBase.maxHp, current.activeBase.currentHp + 4),
      };
      desc = 'Healed 4 damage to Base';
      descIt = 'Riparato 4 danni alla Base';
      break;

    case 'base_dagobah':
      newForceBalance = Math.max(-6, newForceBalance - 2);
      desc = 'Moved Force 2 toward Light Side';
      descIt = 'Ha spostato la Forza di 2 verso il Lato Chiaro';
      sounds.playForce('light');
      break;

    case 'base_kalevala':
      if (playerFaction === state.settings.playerFaction) {
        newForceBalance = Math.max(-6, newForceBalance - 2);
      } else {
        newForceBalance = Math.min(6, newForceBalance + 2);
      }
      desc = 'Moved Force 2 toward your faction';
      descIt = 'Ha spostato la Forza di 2 verso la propria fazione';
      sounds.playForce('light');
      break;

    case 'base_coruscant_temple':
      newForceBalance = Math.max(-6, newForceBalance - 2);
      newResources += 2;
      desc = 'Moved Force 2 toward Light Side and gained +2 Resources';
      descIt = 'Ha spostato la Forza di 2 verso il Lato Chiaro e ottenuto +2 Risorse';
      sounds.playForce('light');
      break;

    case 'base_mustafar':
    case 'base_mustafar_sep':
      newForceBalance = Math.min(6, newForceBalance + 2);
      desc = 'Moved Force 2 toward Dark Side';
      descIt = 'Ha spostato la Forza di 2 verso il Lato Oscuro';
      sounds.playForce('dark');
      break;

    case 'base_serenno':
      newForceBalance = Math.min(6, newForceBalance + 1);
      newResources += 2;
      desc = '+2 Resources and moved Force 1 toward Dark Side';
      descIt = '+2 Risorse e ha spostato la Forza di 1 verso il Lato Oscuro';
      sounds.playForce('dark');
      break;

    case 'base_death_star': {
      if (newResources < 3) return null;
      newResources -= 3;
      newAttack += 4;
      desc = 'Superlaser fired! +4 Attack (spent 3 Resources)';
      descIt = 'Superlaser attivato! +4 Attacco (spese 3 Risorse)';
      sounds.playBlaster('heavy');
      break;
    }

    default:
      return null;
  }

  current.resources = newResources;
  current.attack = newAttack;
  current.activeBase = { ...base, usedAbilityThisTurn: true };

  const newLog = createLog(
    state.turnNumber,
    playerFaction,
    current.name,
    `Used Base ability [${base.name}]: ${desc}`,
    `Ha attivato l'abilità della Base [${base.nameIt}]: ${descIt}`,
    'ability'
  );

  return {
    state: {
      ...state,
      forceBalance: newForceBalance,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [playerFaction]: current,
    },
  };
}

// End turn and transition to next player
export function endTurn(
  state: GameState,
  activeFaction: PlayableFaction,
  players: PlayersMap
): { state: GameState; players: PlayersMap } {
  const nextFaction = getOpponentFaction(state, activeFaction);

  const endingPlayer = { ...players[activeFaction] };
  const incomingPlayer = { ...players[nextFaction] };

  // Discard units in play & remaining hand
  endingPlayer.discard = [...endingPlayer.inPlay, ...endingPlayer.hand, ...endingPlayer.discard];
  endingPlayer.inPlay = [];
  endingPlayer.hand = [];
  endingPlayer.resources = 0;
  endingPlayer.attack = 0;
  if (endingPlayer.activeBase) {
    endingPlayer.activeBase = { ...endingPlayer.activeBase, usedAbilityThisTurn: false };
  }

  // Draw 5 new cards for ending player so they are ready for their next turn
  const endingDrawn = drawCards(endingPlayer, 5);
  Object.assign(endingPlayer, endingDrawn.player);

  // Incoming player start of turn:
  // 1. Capital ships in fleet produce their recurring resources/attack
  let incomingAttack = 0;
  let incomingResources = 0;

  for (const ship of incomingPlayer.fleet) {
    incomingAttack += ship.attack;
    incomingResources += ship.resources;
  }

  // 2. Force Track Bonus:
  // If the Force is completely on their side (-6 for Player, +6 for Bot), +1 Resource!
  let forceBonusLog = '';
  let forceBonusLogIt = '';
  if (nextFaction === state.settings.playerFaction && state.forceBalance === -6) {
    incomingResources += 1;
    forceBonusLog = ' (Full Favor bonus: +1 Resource!)';
    forceBonusLogIt = ' (Bonus Massimo Equilibrio: +1 Risorsa!)';
  } else if (nextFaction === state.settings.botFaction && state.forceBalance === 6) {
    incomingResources += 1;
    forceBonusLog = ' (Full Favor bonus: +1 Resource!)';
    forceBonusLogIt = ' (Bonus Massimo Equilibrio: +1 Risorsa!)';
  }

  incomingPlayer.attack = incomingAttack;
  incomingPlayer.resources = incomingResources;
  if (incomingPlayer.activeBase) {
    incomingPlayer.activeBase = { ...incomingPlayer.activeBase, usedAbilityThisTurn: false };
  }

  const nextTurnNumber = nextFaction === state.settings.playerFaction ? state.turnNumber + 1 : state.turnNumber;

  const newLog = createLog(
    nextTurnNumber,
    nextFaction,
    incomingPlayer.name,
    `Turn ${nextTurnNumber} started.${forceBonusLog}`,
    `Turno ${nextTurnNumber} iniziato.${forceBonusLogIt}`,
    'turn_start'
  );

  return {
    state: {
      ...state,
      currentTurn: nextFaction,
      turnNumber: nextTurnNumber,
      logs: [newLog, ...state.logs],
    },
    players: {
      ...players,
      [activeFaction]: endingPlayer,
      [nextFaction]: incomingPlayer,
    },
  };
}
