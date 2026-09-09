import React from 'react';
import { Card, Base } from '../types/game';
import { FACTION_CONFIGS } from '../data/factions';
import { FactionIcon } from './FactionIcon';
import { ResourceCubeIcon, BlasterAttackIcon } from './GameIcons';
import {
  X,
  Shield,
  Zap,
  Target,
  Anchor,
  Sparkles,
} from 'lucide-react';

interface CardInspectorModalProps {
  card: Card | null;
  base: Base | null;
  language: 'it' | 'en';
  onClose: () => void;
}

export const CardInspectorModal: React.FC<CardInspectorModalProps> = ({
  card,
  base,
  language,
  onClose,
}) => {
  if (!card && !base) return null;

  return (
    <div
      id="inspector-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="inspector-modal-content"
        className="relative w-full max-w-md bg-slate-950 border-2 border-slate-700 rounded-2xl p-5 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-inspector"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {card && (
          <div className="flex flex-col gap-4">
            {/* Faction & Cost */}
            <div className="flex items-center justify-between pr-8">
              <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 border ${
                card.faction !== 'neutral' && FACTION_CONFIGS[card.faction]
                  ? FACTION_CONFIGS[card.faction].badgeColor
                  : 'bg-slate-800 text-slate-200 border-slate-700'
              }`}>
                <FactionIcon faction={card.faction} className="w-3.5 h-3.5 flex-shrink-0" glow />
                <span>
                  {card.faction !== 'neutral' && FACTION_CONFIGS[card.faction]
                    ? language === 'it'
                      ? FACTION_CONFIGS[card.faction].nameIt
                      : FACTION_CONFIGS[card.faction].name
                    : language === 'it'
                    ? 'Neutrale / Feccia Galattica'
                    : 'Neutral / Scum & Mercenaries'}
                </span>
              </span>

              {card.cost > 0 && (
                <div className="flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg text-sm shadow">
                  <ResourceCubeIcon className="w-4 h-4" glow />
                  <span>
                    {card.cost} {language === 'it' ? 'Risorse' : 'Credits'}
                  </span>
                </div>
              )}
            </div>

            {/* Name & Type */}
            <div>
              <h2 className="text-2xl font-black text-slate-100 tracking-wide">
                {language === 'it' ? card.nameIt : card.name}
              </h2>
              <div className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">
                {card.type === 'capital_ship'
                  ? language === 'it'
                    ? 'Nave Ammiraglia (Difende la Base)'
                    : 'Capital Ship (Guards Base)'
                  : language === 'it'
                  ? 'Unità'
                  : 'Unit'}
              </div>
            </div>

            {/* Big Stats Row */}
            <div className="grid grid-cols-4 gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="flex flex-col items-center">
                <BlasterAttackIcon className="w-5 h-5 text-red-400 mb-1" glow />
                <span className="text-xs text-slate-400 uppercase font-bold">
                  {language === 'it' ? 'Attacco' : 'Attack'}
                </span>
                <span className="text-lg font-mono font-bold text-red-400">
                  {card.attack}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <ResourceCubeIcon className="w-5 h-5 text-amber-400 mb-1" glow />
                <span className="text-xs text-slate-400 uppercase font-bold">
                  {language === 'it' ? 'Risorse' : 'Credits'}
                </span>
                <span className="text-lg font-mono font-bold text-amber-400">
                  {card.resources}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Zap className="w-5 h-5 text-cyan-400 mb-1" />
                <span className="text-xs text-slate-400 uppercase font-bold">
                  {language === 'it' ? 'Forza' : 'Force'}
                </span>
                <span className="text-lg font-mono font-bold text-cyan-400">
                  {card.force}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Shield className="w-5 h-5 text-blue-400 mb-1" />
                <span className="text-xs text-slate-400 uppercase font-bold">
                  {language === 'it' ? 'Scafo' : 'Hull'}
                </span>
                <span className="text-lg font-mono font-bold text-blue-400">
                  {card.hull || '-'}
                </span>
              </div>
            </div>

            {/* Ability */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {language === 'it' ? 'Abilità della Carta' : 'Card Ability'}
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {language === 'it' ? card.abilityTextIt : card.abilityText}
              </p>
            </div>

            {/* Target Value & Sabotage Reward */}
            {card.targetValue && card.targetReward && (
              <div className="bg-red-950/40 border border-red-500/40 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-red-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {language === 'it' ? 'Bersaglio / Sabotaggio:' : 'Target Value:'}
                  </span>
                  <span className="font-mono bg-red-900/60 px-2 py-0.5 rounded text-red-200">
                    {card.targetValue} {language === 'it' ? 'Attacco' : 'Attack'}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-red-300">
                    {language === 'it' ? 'Ricompensa:' : 'Reward:'}
                  </strong>{' '}
                  {language === 'it'
                    ? card.targetReward.descriptionIt
                    : card.targetReward.description}
                </p>
              </div>
            )}
          </div>
        )}

        {base && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pr-8">
              <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 border ${
                FACTION_CONFIGS[base.faction]?.badgeColor || 'bg-slate-800 text-slate-200 border-slate-700'
              }`}>
                <FactionIcon faction={base.faction} className="w-3.5 h-3.5 flex-shrink-0" glow />
                <span>
                  {language === 'it'
                    ? `Base ${FACTION_CONFIGS[base.faction]?.nameIt || base.faction}`
                    : `${FACTION_CONFIGS[base.faction]?.name || base.faction} Base`}
                </span>
              </span>
              <div className="flex items-center gap-1 text-cyan-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 font-mono font-bold text-sm">
                <Shield className="w-4 h-4" />
                {base.maxHp} PF
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-100">
              {language === 'it' ? base.nameIt : base.name}
            </h2>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {language === 'it' ? 'Effetto / Abilità' : 'Ability / Effect'}
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {language === 'it' ? base.abilityTextIt : base.abilityText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
