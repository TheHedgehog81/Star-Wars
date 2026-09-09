import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PlayableFaction, PlayerState } from '../types/game';
import { FACTION_CONFIGS } from '../data/factions';
import { FactionIcon } from './FactionIcon';
import { Trophy, Skull, RotateCcw, Swords, Award, Zap } from 'lucide-react';

interface VictoryModalProps {
  winner: PlayableFaction;
  playerFaction: PlayableFaction;
  turnNumber: number;
  forceBalance: number;
  players: Record<string, PlayerState>;
  language: 'it' | 'en';
  onRematch: () => void;
  onOpenSetup: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  winner,
  playerFaction,
  turnNumber,
  forceBalance,
  players,
  language,
  onRematch,
  onOpenSetup,
}) => {
  const isHumanWinner = winner === playerFaction;
  const winnerConfig = FACTION_CONFIGS[winner];
  const winnerName = language === 'it' ? winnerConfig?.nameIt || winner : winnerConfig?.name || winner;

  useEffect(() => {
    if (isHumanWinner) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#06b6d4', '#10b981', '#ffffff'],
        });
      } catch {}
    }
  }, [isHumanWinner]);

  const winnerPlayer = players[winner];
  const destroyedBasesCount = winnerPlayer ? winnerPlayer.destroyedBases.length : 0;

  return (
    <div
      id="victory-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        id="victory-modal-content"
        className={`relative w-full max-w-lg rounded-3xl border-2 p-6 text-center text-white shadow-2xl ${
          isHumanWinner
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/40 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.3)]'
            : 'bg-gradient-to-b from-slate-950 via-slate-900 to-red-950/40 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]'
        }`}
      >
        {/* Victory/Defeat Icon & Faction Crest */}
        <div className="flex justify-center items-center gap-3 mb-3">
          <div
            className={`p-3.5 rounded-full border-2 shadow-xl ${
              isHumanWinner
                ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                : 'bg-red-500/20 border-red-500 text-red-500'
            }`}
          >
            {isHumanWinner ? (
              <Trophy className="w-10 h-10 animate-bounce" />
            ) : (
              <Skull className="w-10 h-10" />
            )}
          </div>
          <div
            className={`p-3.5 rounded-full border-2 shadow-xl ${
              winnerConfig?.badgeColor || 'bg-slate-900 border-slate-700 text-slate-200'
            }`}
          >
            <FactionIcon faction={winner} className="w-10 h-10" glow />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          {isHumanWinner
            ? language === 'it'
              ? 'VITTORIA GALATTICA!'
              : 'GALACTIC VICTORY!'
            : language === 'it'
            ? 'SCONFITTA!'
            : 'DEFEAT!'}
        </h1>

        <p className="text-sm text-slate-300 mt-1 max-w-sm mx-auto leading-snug">
          {isHumanWinner
            ? language === 'it'
              ? `Hai annientato le basi nemiche e trionfato per conto di ${winnerName}!`
              : `You annihilated the enemy bases and secured dominance for the ${winnerName}!`
            : language === 'it'
            ? `Le forze di ${winnerName} hanno sopraffatto la tua resistenza. La galassia è caduta nelle loro mani.`
            : `The forces of ${winnerName} overwhelmed your defenses. The galaxy is in their control.`}
        </p>

        {/* Match Statistics */}
        <div className="grid grid-cols-3 gap-2 my-5 bg-slate-950/70 p-3 rounded-2xl border border-slate-800 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-4 h-4 text-amber-400 mb-0.5" />
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {language === 'it' ? 'Turni Giocati' : 'Turns'}
            </span>
            <span className="text-base font-black font-mono text-slate-100">
              {turnNumber}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Swords className="w-4 h-4 text-red-400 mb-0.5" />
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {language === 'it' ? 'Basi Distrutte' : 'Bases Won'}
            </span>
            <span className="text-base font-black font-mono text-slate-100">
              {destroyedBasesCount}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Zap className="w-4 h-4 text-cyan-400 mb-0.5" />
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {language === 'it' ? 'Stato Forza' : 'Force End'}
            </span>
            <span className="text-base font-black font-mono text-slate-100">
              {forceBalance === 0
                ? '0'
                : forceBalance < 0
                ? `L${Math.abs(forceBalance)}`
                : `R${forceBalance}`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            id="btn-play-again"
            onClick={onRematch}
            className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.3)] active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'it' ? 'Rivincita' : 'Rematch'}</span>
          </button>

          <button
            id="btn-new-match-setup"
            onClick={onOpenSetup}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition border border-slate-700 active:scale-95"
          >
            <span>{language === 'it' ? 'Nuova Partita' : 'New Match'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
