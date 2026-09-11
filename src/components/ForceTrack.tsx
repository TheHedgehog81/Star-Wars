import React from 'react';
import { ForceStarWarsIcon } from './GameIcons';
import { PlayableFaction } from '../types/game';
import { FACTION_CONFIGS } from '../data/factions';
import { FactionIcon } from './FactionIcon';

interface ForceTrackProps {
  forceBalance: number; // -6 (Human Player side) to +6 (Bot side)
  playerFaction: PlayableFaction;
  botFaction?: PlayableFaction;
  language: 'it' | 'en';
}

export const ForceTrack: React.FC<ForceTrackProps> = ({
  forceBalance,
  playerFaction,
  botFaction,
  language,
}) => {
  const steps = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  const isPlayerFavor = forceBalance < 0;
  const isBotFavor = forceBalance > 0;
  const isForceWithPlayer = isPlayerFavor;

  const playerConfig = FACTION_CONFIGS[playerFaction];
  const botConfig = botFaction ? FACTION_CONFIGS[botFaction] : null;

  const leftName = language === 'it' ? playerConfig?.shortNameIt || 'Giocatore' : playerConfig?.shortName || 'Player';
  const rightName = botConfig
    ? language === 'it'
      ? botConfig.shortNameIt
      : botConfig.shortName
    : language === 'it'
    ? 'Avversario'
    : 'Opponent';

  return (
    <div
      id="force-track-container"
      className="relative w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 backdrop-blur-md shadow-2xl"
    >
      {/* Header labels */}
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-1.5 font-bold tracking-wider text-cyan-400">
          <FactionIcon faction={playerFaction} className="w-4 h-4" />
          <span>{leftName.toUpperCase()}</span>
          {forceBalance === -6 && (
            <span className="ml-1 text-[10px] bg-cyan-600 text-white border border-cyan-400 px-1.5 py-0.5 rounded font-bold">
              +1 {language === 'it' ? 'Risorsa' : 'Resource'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase tracking-wider border ${
              isForceWithPlayer
                ? 'bg-emerald-800 border-emerald-500 text-white'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            {isForceWithPlayer
              ? language === 'it'
                ? 'La Forza è con Te'
                : 'Force is with You'
              : language === 'it'
              ? 'La Forza è avversa'
              : 'Force is against You'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-bold tracking-wider text-red-400">
          {forceBalance === 6 && (
            <span className="mr-1 text-[10px] bg-red-600 text-white border border-red-400 px-1.5 py-0.5 rounded font-bold">
              +1 {language === 'it' ? 'Risorsa' : 'Resource'}
            </span>
          )}
          <span>{rightName.toUpperCase()}</span>
          {botFaction && <FactionIcon faction={botFaction} className="w-4 h-4" />}
        </div>
      </div>

      {/* Force Track Bar with Segments */}
      <div className="relative flex items-center justify-between gap-1 bg-slate-900 p-1.5 rounded border border-slate-800">
        {steps.map((val) => {
          const isMarker = val === forceBalance;
          const isPlayerSide = val < 0;
          const isBotSide = val > 0;

          let slotBg = 'bg-slate-800/60 border-slate-700';
          if (isPlayerSide) {
            slotBg =
              val >= forceBalance && forceBalance < 0
                ? 'bg-cyan-700 border-cyan-400'
                : 'bg-cyan-950/40 border-cyan-900';
          } else if (isBotSide) {
            slotBg =
              val <= forceBalance && forceBalance > 0
                ? 'bg-red-700 border-red-400'
                : 'bg-red-950/40 border-red-900';
          }

          return (
            <div
              key={val}
              className={`relative flex-1 h-7 rounded flex items-center justify-center border transition-all duration-200 ${slotBg}`}
            >
              {/* Value label */}
              <span
                className={`text-[10px] font-mono font-bold ${
                  isMarker
                    ? 'text-white'
                    : isPlayerSide
                    ? 'text-cyan-200'
                    : isBotSide
                    ? 'text-red-200'
                    : 'text-slate-400'
                }`}
              >
                {val === 0 ? '0' : Math.abs(val)}
              </span>

              {/* Active Force Marker Indicator (Jedi Order icon) */}
              {isMarker && (
                <div
                  id="force-track-marker"
                  className={`absolute inset-0 m-auto w-6 h-6 rounded border-2 flex items-center justify-center transition-transform duration-200 scale-110 ${
                    isPlayerSide
                      ? 'bg-cyan-400 border-white text-slate-950 font-bold'
                      : isBotSide
                      ? 'bg-red-600 border-white text-white font-bold'
                      : 'bg-amber-400 border-white text-slate-950 font-bold'
                  }`}
                >
                  <ForceStarWarsIcon className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer explanation note */}
      <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
        <span>
          {language === 'it'
            ? '← Sposta a Sinistra: abilità della tua fazione'
            : '← Move Left: abilities of your faction'}
        </span>
        <span className="font-mono text-slate-400">
          {language === 'it' ? 'Bilanciamento:' : 'Balance:'}{' '}
          {forceBalance < 0
            ? `${Math.abs(forceBalance)} (${leftName})`
            : forceBalance > 0
            ? `${forceBalance} (${rightName})`
            : 'Neutro (0)'}
        </span>
        <span>
          {language === 'it'
            ? 'Sposta a Destra: abilità dell\'Avversario →'
            : 'Move Right: Opponent abilities →'}
        </span>
      </div>
    </div>
  );
};
