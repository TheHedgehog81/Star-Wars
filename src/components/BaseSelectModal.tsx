import React from 'react';
import { Base } from '../types/game';
import { FactionIcon } from './FactionIcon';
import { Shield, Zap, AlertTriangle, Check } from 'lucide-react';

interface BaseSelectModalProps {
  availableBases: Base[];
  language: 'it' | 'en';
  onSelectBase: (baseId: string) => void;
}

export const BaseSelectModal: React.FC<BaseSelectModalProps> = ({
  availableBases,
  language,
  onSelectBase,
}) => {
  return (
    <div
      id="base-select-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-3xl bg-slate-950 border-2 border-red-500/70 rounded-2xl p-5 sm:p-6 shadow-[0_0_40px_rgba(239,68,68,0.4)] text-white max-h-[90vh] overflow-y-auto">
        {/* Urgent Header */}
        <div className="flex items-center gap-3 pb-3 mb-4 border-b border-red-500/40">
          <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/50 animate-bounce">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-red-400">
              {language === 'it' ? 'ALLARME: BASE DISTRUTTA!' : 'ALERT: BASE DESTROYED!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {language === 'it'
                ? 'La tua base precedente è stata rasa al suolo. Seleziona immediatamente una nuova Base Galattica!'
                : 'Your active base has been destroyed. Select your replacement Galactic Base immediately!'}
            </p>
          </div>
        </div>

        {/* Bases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 my-4">
          {availableBases.map((base) => (
            <div
              key={base.id}
              className={`flex flex-col justify-between p-3.5 rounded-xl border-2 bg-gradient-to-b ${base.colorTone} shadow-lg transition hover:scale-102 hover:border-amber-400`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400">
                    {language === 'it' ? 'Punti Struttura' : 'Hull Points'}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-300 bg-slate-950/70 px-2 py-0.5 rounded border border-slate-700">
                    <Shield className="w-3.5 h-3.5" />
                    {base.maxHp} PF
                  </span>
                </div>

                <h3 className="font-black text-base text-slate-100 tracking-wide flex items-center gap-1.5">
                  <FactionIcon faction={base.faction} className="w-4 h-4 flex-shrink-0" glow />
                  <span>{language === 'it' ? base.nameIt : base.name}</span>
                </h3>

                <p className="mt-2 text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  {language === 'it' ? base.abilityTextIt : base.abilityText}
                </p>
              </div>

              <button
                id={`btn-select-base-${base.id}`}
                onClick={() => onSelectBase(base.id)}
                className="mt-3.5 w-full py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(251,191,36,0.3)] transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'it' ? 'Stabilisci Base' : 'Establish Base'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          {language === 'it'
            ? 'Regola Ufficiale: Eventuali danni in eccesso dell\'attacco nemico NON vengono trasferiti alla nuova base.'
            : 'Official Rule: Any excess damage from the destroying attack does NOT carry over to the new base.'}
        </div>
      </div>
    </div>
  );
};
