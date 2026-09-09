import React from 'react';
import { PlayerState, Card } from '../types/game';
import { FACTION_CONFIGS } from '../data/factions';
import { FactionIcon } from './FactionIcon';
import { CardView } from './CardView';
import { ResourceCubeIcon, BlasterAttackIcon } from './GameIcons';
import {
  Shield,
  Anchor,
  Layers,
  Award,
  Zap,
  Play,
  CheckCircle,
  AlertCircle,
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
            <ResourceCubeIcon className="w-6 h-6" glow />
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
              <span>{language === 'it' ? 'Turno del Bot...' : 'Bot Turn...'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Middle section: Active Base & Fleet */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
        {/* Active Base */}
        <div
          id="player-active-base"
          className={`md:col-span-4 flex flex-col justify-between p-3 rounded-xl border-2 bg-gradient-to-b ${player.activeBase.colorTone} shadow-lg`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                {language === 'it' ? 'Tua Base Attiva' : 'Your Active Base'}
              </span>
              <span className="text-xs font-mono text-slate-300">
                {player.activeBase.currentHp} / {player.activeBase.maxHp} PF
              </span>
            </div>

            <h4 className="text-base font-black text-slate-100 mt-1.5 tracking-wide">
              {language === 'it' ? player.activeBase.nameIt : player.activeBase.name}
            </h4>

            {/* HP Bar */}
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/80 my-2">
              <div
                className={`h-full transition-all duration-500 ${
                  baseHpPercent > 50
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                    : baseHpPercent > 25
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                    : 'bg-gradient-to-r from-red-600 to-red-400 animate-pulse'
                }`}
                style={{ width: `${baseHpPercent}%` }}
              />
            </div>

            {/* Ability text */}
            <p className="text-[11px] text-slate-300 leading-snug bg-slate-950/50 p-2 rounded border border-slate-800">
              {language === 'it'
                ? player.activeBase.abilityTextIt
                : player.activeBase.abilityText}
            </p>
          </div>

          {/* Base Ability button */}
          {player.activeBase.abilityType === 'action' && (
            <div className="mt-2.5 pt-2 border-t border-slate-800/80">
              <button
                id="btn-use-base-ability"
                disabled={!canUseBaseAbility}
                onClick={onUseBaseAbility}
                className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                  canUseBaseAbility
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)] active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
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

        {/* Player Fleet Zone (Capital Ships) */}
        <div
          id="player-fleet-zone"
          className="md:col-span-8 flex flex-col justify-between bg-slate-900/40 rounded-xl p-3 border border-slate-800"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Anchor className="w-4 h-4 text-cyan-400" />
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
              <Anchor className="w-5 h-5 mb-1 text-slate-700" />
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

                return (
                  <div
                    key={ship.instanceId}
                    className="relative flex flex-col justify-between w-36 sm:w-40 rounded-xl border-2 border-cyan-500/50 bg-gradient-to-b from-cyan-950/40 to-slate-950 p-2 shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] uppercase font-bold text-cyan-300 mb-1">
                        <span className="flex items-center gap-0.5">
                          <Anchor className="w-3 h-3" />
                          {language === 'it' ? 'In Flotta' : 'In Fleet'}
                        </span>
                        <span className="bg-cyan-900/60 px-1 py-0.5 rounded font-mono">
                          {remainingHull}/{ship.hull} PF
                        </span>
                      </div>

                      <h5 className="font-bold text-xs text-slate-100 leading-tight">
                        {language === 'it' ? ship.nameIt : ship.name}
                      </h5>

                      {/* Hull bar */}
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden my-1.5 border border-slate-700">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-300"
                          style={{ width: `${hullPercent}%` }}
                        />
                      </div>

                      <p className="text-[10px] text-slate-300 leading-tight line-clamp-2">
                        {language === 'it' ? ship.abilityTextIt : ship.abilityText}
                      </p>
                    </div>

                    <div className="mt-1 text-[9px] text-cyan-400 font-mono">
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
              <div key={card.instanceId} className="flex-shrink-0">
                <CardView
                  card={card}
                  language={language}
                  location="hand"
                  onPlay={() => isPlayerTurn && onPlayCard(card)}
                  onInspect={() => onInspectCard(card)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
