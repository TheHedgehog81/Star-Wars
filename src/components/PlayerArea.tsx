import React from 'react';
import { PlayerState, Card } from '../types/game';
import { FACTION_CONFIGS, getFactionSolidCardStyle } from '../data/factions';
import { FactionIcon } from './FactionIcon';
import { CardView } from './CardView';
import {
  ResourceSquareIcon,
  BlasterAttackIcon,
  StarshipFleetIcon,
  SolidShieldIcon,
  SolidPlanetIcon,
} from './GameIcons';
import {
  Shield,
  Layers,
  Award,
  Zap,
  Play,
  CheckCircle,
  AlertCircle,
  Coins,
} from 'lucide-react';

interface PlayerAreaProps {
  player: PlayerState;
  isPlayerTurn: boolean;
  language: 'it' | 'en';
  basesToWin: number;
  onPlayCard: (card: Card) => void;
  onPlayAll: () => void;
  onUseBaseAbility: () => void;
  onEndTurn: () => void;
  onInspectCard: (card: Card) => void;
  onExileOuterRimPilot?: (instanceId: string, source: 'hand' | 'inPlay') => void;
  onUseJabbaBribe?: () => void;
}

export const PlayerArea: React.FC<PlayerAreaProps> = ({
  player,
  isPlayerTurn,
  language,
  basesToWin,
  onPlayCard,
  onPlayAll,
  onUseBaseAbility,
  onEndTurn,
  onInspectCard,
  onExileOuterRimPilot,
  onUseJabbaBribe,
}) => {
  const isRebel = player.faction === 'rebel';
  const baseHpPercent = Math.max(
    0,
    Math.min(100, (player.activeBase.currentHp / player.activeBase.maxHp) * 100)
  );

  const canUseBaseAbility =
    isPlayerTurn &&
    !player.activeBase.usedAbilityThisTurn &&
    player.activeBase.abilityType === 'action';

  return (
    <div
      id="player-area-container"
      className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-md"
    >
      {/* Top action / resource control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 mb-2.5 border-b border-slate-800">
        {/* Left: Player Identity & Trophies */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                FACTION_CONFIGS[player.faction]?.badgeColor || 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              <FactionIcon faction={player.faction} className="w-3.5 h-3.5" glow />
              <span>
                {language === 'it'
                  ? FACTION_CONFIGS[player.faction]?.nameIt || player.faction
                  : FACTION_CONFIGS[player.faction]?.name || player.faction}
              </span>
            </span>
            <h3 className="font-bold text-sm text-slate-100">{player.name}</h3>
          </div>

          <div
            title={
              language === 'it'
                ? 'Basi nemiche distrutte (Obiettivo Vittoria)'
                : 'Enemy bases destroyed (Win condition)'
            }
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-slate-200 font-mono text-xs shadow-inner"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">
              {language === 'it' ? 'Vittorie Basi:' : 'Base Wins:'}
            </span>
            <strong className="text-amber-300 text-sm">
              {player.destroyedBases.length}/{basesToWin}
            </strong>
          </div>
        </div>

        {/* Center: Large High-Contrast Counters for Resources & Attack */}
        <div className="flex items-center gap-3">
          {/* Credits Counter */}
          <div
            id="player-resources-counter"
            title={
              language === 'it'
                ? 'Risorse disponibili per comprare carte'
                : 'Resources available to buy cards'
            }
            className="flex items-center gap-2 bg-amber-950/40 border-2 border-amber-500/50 px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.25)] text-amber-300"
          >
            <ResourceSquareIcon className="w-6 h-6" glow />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-amber-400/80 leading-none">
                {language === 'it' ? 'Risorse' : 'Credits'}
              </span>
              <span className="text-xl font-black font-mono leading-none mt-0.5">
                {player.resources}
              </span>
            </div>
          </div>

          {/* Attack Counter */}
          <div
            id="player-attack-counter"
            title={
              language === 'it'
                ? 'Attacco disponibile per combattere o sabotare'
                : 'Attack available for combat or sabotage'
            }
            className="flex items-center gap-2 bg-red-950/40 border-2 border-red-500/50 px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.25)] text-red-400"
          >
            <BlasterAttackIcon className="w-6 h-6" glow />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-red-400/80 leading-none">
                {language === 'it' ? 'Attacco' : 'Attack'}
              </span>
              <span className="text-xl font-black font-mono leading-none mt-0.5">
                {player.attack}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Turn Actions */}
        <div className="flex items-center gap-2">
          {/* Play All button */}
          {isPlayerTurn && player.hand.length > 0 && (
            <button
              id="btn-play-all-hand"
              onClick={onPlayAll}
              className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs uppercase tracking-wider transition border border-slate-600 shadow flex items-center gap-1.5 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span>{language === 'it' ? 'Gioca Tutte' : 'Play All'}</span>
            </button>
          )}

          {/* End Turn button */}
          {isPlayerTurn ? (
            <button
              id="btn-end-turn"
              onClick={onEndTurn}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-[0_0_18px_rgba(251,191,36,0.35)] flex items-center gap-1.5 active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{language === 'it' ? 'Termina Turno' : 'End Turn'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{language === 'it' ? 'Turno dell\'Avversario...' : 'Opponent\'s Turn...'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Middle section: Active Base & Fleet */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
        {/* Active Base */}
        {(() => {
          const baseSolid = getFactionSolidCardStyle(player.activeBase.faction);
          return (
            <div
              id="player-active-base"
              className={`md:col-span-4 flex flex-col justify-between p-3 rounded-lg border-2 ${baseSolid.bg} ${baseSolid.border}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded text-white border border-black/80">
                    {language === 'it' ? 'Tua Base Attiva' : 'Your Active Base'}
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-bold bg-black/70 px-2 py-0.5 rounded border border-purple-500/40 flex items-center gap-1">
                    <SolidPlanetIcon className="w-3.5 h-3.5 text-purple-300" />
                    <span>{player.activeBase.currentHp} / {player.activeBase.maxHp} PF</span>
                  </span>
                </div>

                <h4 className="text-base font-black text-white mt-1.5 tracking-wide flex items-center gap-1.5">
                  <FactionIcon faction={player.activeBase.faction} className="w-4 h-4 flex-shrink-0" />
                  <span>{language === 'it' ? player.activeBase.nameIt : player.activeBase.name}</span>
                </h4>

                {/* HP Bar */}
                <div className="w-full h-2.5 bg-black/70 rounded overflow-hidden border border-black/80 my-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      baseHpPercent > 50
                        ? 'bg-emerald-500'
                        : baseHpPercent > 25
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${baseHpPercent}%` }}
                  />
                </div>

                {/* Ability text */}
                <p className="text-[11px] text-white leading-snug bg-black/60 p-2 rounded border border-black/70 font-medium">
                  {language === 'it'
                    ? player.activeBase.abilityTextIt
                    : player.activeBase.abilityText}
                </p>
              </div>

              {/* Base Ability button */}
              {player.activeBase.abilityType === 'action' && (
                <div className="mt-2.5 pt-2 border-t border-black/50">
                  <button
                    id="btn-use-base-ability"
                    disabled={!canUseBaseAbility}
                    onClick={onUseBaseAbility}
                    className={`w-full py-1.5 px-2.5 rounded text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                      canUseBaseAbility
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold active:scale-95'
                        : 'bg-black/50 text-slate-400 cursor-not-allowed border border-black/60'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {player.activeBase.usedAbilityThisTurn
                        ? language === 'it'
                          ? 'Abilità già usata'
                          : 'Ability Used'
                        : language === 'it'
                        ? 'Attiva Abilità Base'
                        : 'Use Base Ability'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* Player Fleet Zone (Capital Ships) */}
        <div
          id="player-fleet-zone"
          className="md:col-span-8 flex flex-col justify-between bg-slate-900/40 rounded-xl p-3 border border-slate-800"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
              <StarshipFleetIcon className="w-4 h-4 text-cyan-400" />
              <span>
                {language === 'it' ? 'La Tua Flotta (Navi Ammiraglie)' : 'Your Fleet (Capital Ships)'}
              </span>
              <span className="font-mono text-slate-500">({player.fleet.length})</span>
            </div>
            <span className="text-[10px] text-cyan-400">
              {language === 'it'
                ? 'Difendono la tua Base e producono bonus ogni turno!'
                : 'Defend your Base and provide bonuses each turn!'}
            </span>
          </div>

          {player.fleet.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[110px] text-slate-600 text-xs font-mono border border-dashed border-slate-800 rounded-lg p-3 text-center">
              <StarshipFleetIcon className="w-5 h-5 mb-1 text-slate-700" />
              <span>
                {language === 'it'
                  ? 'Nessuna Nave Ammiraglia schierata. Reclutane una dalla Galassia!'
                  : 'No Capital Ships deployed. Recruit one from the Galaxy!'}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-1">
              {player.fleet.map((ship) => {
                const remainingHull = (ship.hull || 0) - (ship.currentDamage || 0);
                const hullPercent = Math.max(
                  0,
                  Math.min(100, (remainingHull / (ship.hull || 1)) * 100)
                );

                const shipSolid = getFactionSolidCardStyle(ship.faction);
                return (
                  <div
                    key={ship.instanceId}
                    className={`relative flex flex-col justify-between w-36 sm:w-40 rounded-lg border-2 ${shipSolid.bg} ${shipSolid.border} p-2`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] uppercase font-bold text-white mb-1">
                        <span className="flex items-center gap-1">
                          <StarshipFleetIcon className="w-3 h-3" />
                          {language === 'it' ? 'In Flotta' : 'In Fleet'}
                        </span>
                        <span className="bg-black/70 px-1.5 py-0.5 rounded font-mono font-bold text-purple-300 border border-purple-500/40 flex items-center gap-1">
                          <SolidShieldIcon className="w-2.5 h-2.5 text-purple-300" />
                          <span>{remainingHull}/{ship.hull} PF</span>
                        </span>
                      </div>

                      <h5 className="font-bold text-xs text-white leading-tight">
                        {language === 'it' ? ship.nameIt : ship.name}
                      </h5>

                      {/* Hull bar */}
                      <div className="w-full h-1.5 bg-black/70 rounded overflow-hidden my-1.5 border border-black/80">
                        <div
                          className="h-full bg-purple-500 transition-all duration-300"
                          style={{ width: `${hullPercent}%` }}
                        />
                      </div>

                      <p className="text-[10px] text-white leading-tight line-clamp-2 bg-black/55 p-1 rounded font-medium">
                        {language === 'it' ? ship.abilityTextIt : ship.abilityText}
                      </p>
                    </div>

                    <div className="mt-1 text-[9px] text-amber-300 font-mono font-bold bg-black/40 px-1 py-0.5 rounded">
                      +{ship.attack} {language === 'it' ? 'Att.' : 'Atk'} | +{ship.resources}{' '}
                      {language === 'it' ? 'Ris.' : 'Res'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Hand Cards Tray */}
      <div id="player-hand-tray" className="pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>{language === 'it' ? 'La Tua Mano' : 'Your Hand'}</span>
            <span className="font-mono text-slate-500">({player.hand.length})</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>
              {language === 'it' ? 'Mazzo:' : 'Deck:'} <strong>{player.deck.length}</strong>
            </span>
            <span>
              {language === 'it' ? 'Scarti:' : 'Discard:'} <strong>{player.discard.length}</strong>
            </span>
            {player.inPlay.length > 0 && (
              <span className="text-amber-400">
                {language === 'it' ? 'In Gioco:' : 'In Play:'}{' '}
                <strong>{player.inPlay.length}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Hand Cards Scrollable Tray */}
        {player.hand.length === 0 ? (
          <div className="flex items-center justify-center p-6 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs font-mono">
            {language === 'it'
              ? 'Nessuna carta rimasta in mano. Termina il turno per pescare 5 nuove carte!'
              : 'No cards left in hand. End turn to draw 5 new cards!'}
          </div>
        ) : (
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 overflow-x-auto pb-2 pt-1 px-1">
            {player.hand.map((card) => (
              <div key={card.instanceId} className="flex-shrink-0 flex flex-col items-center">
                <CardView
                  card={card}
                  language={language}
                  location="hand"
                  onPlay={() => isPlayerTurn && onPlayCard(card)}
                  onInspect={() => onInspectCard(card)}
                />
                {/* Special rule: Outer Rim Pilot can be exiled to gain +1 Force */}
                {card.id === 'neu_outer_rim_pilot' && isPlayerTurn && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExileOuterRimPilot && onExileOuterRimPilot(card.instanceId, 'hand');
                    }}
                    className="w-full mt-1 py-1 px-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-400/50 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition shadow hover:scale-102 active:scale-95"
                    title={
                      language === 'it'
                        ? 'Esilia per muovere la Forza di 1 (il pilota ritorna nel mazzo piloti esterni)'
                        : 'Exile to move Force 1 toward your side (returns to outer rim deck)'
                    }
                  >
                    <Zap className="w-3 h-3 text-cyan-400 fill-current" />
                    <span>{language === 'it' ? 'Esilia (+1 Forza)' : 'Exile (+1 Force)'}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Cards In Play this turn & special abilities */}
        {player.inPlay.length > 0 && (
          <div className="mt-3 pt-2 border-t border-slate-800/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {language === 'it' ? 'Carte Giocate Questo Turno (In Gioco)' : 'Cards In Play This Turn'}
              </span>
              {/* Jabba special bribe if present in play */}
              {player.inPlay.some((c) => c.id === 'neu_jabba') && isPlayerTurn && (
                <button
                  onClick={onUseJabbaBribe}
                  disabled={player.resources < 2}
                  className={`py-1 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition border ${
                    player.resources >= 2
                      ? 'bg-amber-950/80 hover:bg-amber-900 text-amber-300 border-amber-500/60 shadow active:scale-95 cursor-pointer'
                      : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
                  }`}
                  title={language === 'it' ? 'Spendi 2 Risorse per spostare la Forza di 2' : 'Spend 2 Credits to move Force 2'}
                >
                  <Coins className="w-3 h-3 text-amber-400" />
                  <span>{language === 'it' ? 'Jabba: Spendi 2 Risorse (+2 Forza)' : 'Jabba: Spend 2 Credits (+2 Force)'}</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {player.inPlay.map((card) => (
                <div
                  key={card.instanceId}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200"
                >
                  <span className="font-bold">{language === 'it' ? card.nameIt : card.name}</span>
                  {/* Outer Rim Pilot exile from inPlay */}
                  {card.id === 'neu_outer_rim_pilot' && isPlayerTurn && (
                    <button
                      onClick={() => onExileOuterRimPilot && onExileOuterRimPilot(card.instanceId, 'inPlay')}
                      className="ml-1 px-1.5 py-0.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 text-[9px] font-bold flex items-center gap-0.5 transition"
                      title={language === 'it' ? 'Esilia per +1 Forza' : 'Exile for +1 Force'}
                    >
                      <Zap className="w-2.5 h-2.5 text-cyan-400 fill-current" />
                      <span>+1 Forza</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
