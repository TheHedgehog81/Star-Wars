import React from 'react';
import { GameLogEntry } from '../types/game';
import { ResourceCubeIcon, BlasterAttackIcon } from './GameIcons';
import { X, Scroll, Zap, ShieldAlert, Award } from 'lucide-react';

interface GameLogModalProps {
  logs: GameLogEntry[];
  language: 'it' | 'en';
  onClose: () => void;
}

export const GameLogModal: React.FC<GameLogModalProps> = ({
  logs,
  language,
  onClose,
}) => {
  return (
    <div
      id="game-log-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="game-log-panel"
        className="w-full max-w-md h-full bg-slate-950 border-l border-slate-800 p-4 shadow-2xl flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scroll className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-100">
              {language === 'it' ? 'Cronologia di Battaglia' : 'Combat & Action Log'}
            </h3>
          </div>
          <button
            id="btn-close-log"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Logs List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
          {logs.map((log) => {
            const isRebel = log.faction === 'rebel';
            let icon = <Scroll className="w-3.5 h-3.5 text-slate-400" />;
            let badgeBg = 'bg-slate-800 text-slate-300';

            if (log.type === 'play') {
              icon = <Zap className="w-3.5 h-3.5 text-cyan-400" />;
              badgeBg = 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50';
            } else if (log.type === 'buy') {
              icon = <ResourceCubeIcon className="w-3.5 h-3.5" glow />;
              badgeBg = 'bg-amber-950/60 text-amber-300 border border-amber-800/50';
            } else if (log.type === 'sabotage' || log.type === 'attack') {
              icon = <BlasterAttackIcon className="w-3.5 h-3.5" glow />;
              badgeBg = 'bg-red-950/60 text-red-300 border border-red-800/50';
            } else if (log.type === 'base_destroyed') {
              icon = <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />;
              badgeBg = 'bg-red-900 text-red-200 font-black border border-red-600';
            } else if (log.type === 'turn_start') {
              icon = <Award className="w-3.5 h-3.5 text-amber-400" />;
              badgeBg = 'bg-slate-800 text-amber-300 border border-slate-700';
            }

            return (
              <div
                key={log.id}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeBg} flex items-center gap-1`}>
                    {icon}
                    <span>{log.actorName}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    T{log.turn}
                  </span>
                </div>
                <p className="leading-snug text-slate-200 mt-1">
                  {language === 'it' ? log.messageIt : log.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
