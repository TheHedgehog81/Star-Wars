import React from 'react';
import { Card, Base } from '../types/game';
import { FACTION_CONFIGS, getFactionSolidCardStyle } from '../data/factions';
import { FactionIcon } from './FactionIcon';
import {
  ResourceSquareIcon,
  BlasterAttackIcon,
  StarshipFleetIcon,
  ForceStarWarsIcon,
  SolidShieldIcon,
  SolidPlanetIcon,
} from './GameIcons';
import { getCardTypeLine } from '../utils/cardTraits';
import {
  X,
  Shield,
  Target,
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

  const factionKey = card ? card.faction : base ? base.faction : 'neutral';
  const solid = getFactionSolidCardStyle(factionKey);

  return (
    <div
      id="inspector-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="inspector-modal-content"
        className={`relative w-full max-w-md ${solid.bg} border-2 ${solid.border} rounded-lg p-5 text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-inspector"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {card && (
          <div className="flex flex-col gap-4">
            {/* Faction & Cost */}
            <div className="flex items-center justify-between pr-8">
              <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 border ${solid.badgeBg} ${solid.badgeText} ${solid.badgeBorder}`}>
                <FactionIcon faction={card.faction} className="w-3.5 h-3.5 flex-shrink-0" />
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
                <div className="flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded text-sm border border-amber-300">
                  <ResourceSquareIcon className="w-4 h-4" />
                  <span>
                    {card.cost} {language === 'it' ? 'Risorse' : 'Credits'}
                  </span>
                </div>
              )}
            </div>

            {/* Name & Type */}
            <div>
              <h2 className="text-2xl font-black text-white tracking-wide">
                {language === 'it' ? card.nameIt : card.name}
              </h2>
              <div className="text-xs uppercase tracking-widest mt-1 flex items-center gap-1.5 font-bold">
                {card.type === 'capital_ship' ? (
                  <span className="text-cyan-200 flex items-center gap-1.5">
                    <StarshipFleetIcon className="w-4 h-4 text-cyan-300" />
                    <span>{getCardTypeLine(card, language).fullLine}</span>
                  </span>
                ) : (
                  <span className="text-white/80">
                    {getCardTypeLine(card, language).fullLine}
                  </span>
                )}
              </div>
            </div>

            {/* Big Stats Row - Dash for 0 values */}
            <div className="grid grid-cols-4 gap-2 bg-black/60 p-2.5 rounded border border-black/80 text-center">
              <div className="flex flex-col items-center">
                <BlasterAttackIcon className={`w-5 h-5 mb-1 ${card.attack > 0 ? 'text-red-400 opacity-100' : 'text-slate-400 opacity-40'}`} />
                <span className="text-[10px] text-white/80 uppercase font-bold">
                  {language === 'it' ? 'Attacco' : 'Attack'}
                </span>
                <span className={`text-lg font-mono font-bold ${card.attack > 0 ? 'text-red-400' : 'text-slate-400 font-normal'} min-h-[28px]`}>
                  {card.attack > 0 ? card.attack : ''}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <ResourceSquareIcon className={`w-5 h-5 mb-1 ${card.resources > 0 ? 'text-amber-400 opacity-100' : 'text-slate-400 opacity-40'}`} />
                <span className="text-[10px] text-white/80 uppercase font-bold">
                  {language === 'it' ? 'Risorse' : 'Credits'}
                </span>
                <span className={`text-lg font-mono font-bold ${card.resources > 0 ? 'text-amber-400' : 'text-slate-400 font-normal'} min-h-[28px]`}>
                  {card.resources > 0 ? card.resources : ''}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <ForceStarWarsIcon className={`w-5 h-5 mb-1 ${card.force > 0 ? 'text-cyan-300 opacity-100' : 'text-slate-400 opacity-40'}`} />
                <span className="text-[10px] text-white/80 uppercase font-bold">
                  {language === 'it' ? 'Forza' : 'Force'}
                </span>
                <span className={`text-lg font-mono font-bold ${card.force > 0 ? 'text-cyan-300' : 'text-slate-400 font-normal'} min-h-[28px]`}>
                  {card.force > 0 ? card.force : ''}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <SolidShieldIcon className={`w-5 h-5 mb-1 ${card.hull ? 'text-purple-300 opacity-100' : 'text-slate-400 opacity-40'}`} />
                <span className="text-[10px] text-white/80 uppercase font-bold">
                  {language === 'it' ? 'Scafo' : 'Hull'}
                </span>
                <span className={`text-lg font-mono font-bold ${card.hull ? 'text-purple-300' : 'text-slate-400 font-normal'} min-h-[28px]`}>
                  {card.hull ? `${card.hull - (card.currentDamage || 0)}` : ''}
                </span>
              </div>
            </div>

            {/* Ability / Special Power */}
            <div className="bg-black/60 p-3.5 rounded border border-black/70">
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>{language === 'it' ? 'Potere Speciale della Carta' : 'Special Card Ability'}</span>
                </h4>
                {card.hasForceAbility && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-bold uppercase">
                    {language === 'it' ? 'Potere della Forza' : 'Force Power'}
                  </span>
                )}
              </div>
              <p className="text-sm text-white leading-relaxed font-medium">
                {(language === 'it' ? card.abilityTextIt : card.abilityText) &&
                (language === 'it' ? card.abilityTextIt : card.abilityText).trim() !== '' &&
                (language === 'it' ? card.abilityTextIt : card.abilityText) !== '—'
                  ? (language === 'it' ? card.abilityTextIt : card.abilityText)
                  : ''}
              </p>
            </div>

            {/* Target Value & Sabotage Reward */}
            {card.targetValue && card.targetReward && (
              <div className="bg-black/70 border border-red-700 p-3 rounded">
                <div className="flex items-center justify-between text-xs font-bold text-red-300 mb-1">
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-red-400" />
                    {language === 'it' ? 'Bersaglio / Sabotaggio:' : 'Target Value:'}
                  </span>
                  <span className="font-mono bg-red-950 px-2 py-0.5 rounded text-red-200 border border-red-800">
                    {card.targetValue} {language === 'it' ? 'Attacco' : 'Attack'}
                  </span>
                </div>
                <p className="text-xs text-white">
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
              <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 border ${solid.badgeBg} ${solid.badgeText} ${solid.badgeBorder}`}>
                <FactionIcon faction={base.faction} className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  {language === 'it'
                    ? `Base ${FACTION_CONFIGS[base.faction]?.nameIt || base.faction}`
                    : `${FACTION_CONFIGS[base.faction]?.name || base.faction} Base`}
                </span>
              </span>
              <div className="flex items-center gap-1.5 text-purple-300 bg-black/60 px-2.5 py-1 rounded border border-purple-500/40 font-mono font-bold text-sm">
                <SolidPlanetIcon className="w-4 h-4 text-purple-300" />
                <span>{base.maxHp} PF</span>
              </div>
            </div>

            <h2 className="text-2xl font-black text-white">
              {language === 'it' ? base.nameIt : base.name}
            </h2>

            <div className="bg-black/60 p-3.5 rounded border border-black/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                {language === 'it' ? 'Effetto / Abilità' : 'Ability / Effect'}
              </h4>
              <p className="text-sm text-white leading-relaxed font-medium">
                {language === 'it' ? base.abilityTextIt : base.abilityText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
