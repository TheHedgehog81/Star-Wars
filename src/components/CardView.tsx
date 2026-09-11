import React from 'react';
import { Card } from '../types/game';
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
import { getFactionSolidCardStyle } from '../data/factions';
import {
  Shield,
  Search,
  Target,
} from 'lucide-react';

interface CardViewProps {
  card: Card;
  language?: 'it' | 'en';
  location?: 'hand' | 'galaxy' | 'fleet' | 'in_play' | 'inspector';
  isAffordable?: boolean;
  canSabotage?: boolean;
  onPlay?: (card: Card) => void;
  onBuy?: (card: Card) => void;
  onSabotage?: (card: Card) => void;
  onInspect?: (card: Card) => void;
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  language = 'it',
  location = 'hand',
  isAffordable = false,
  canSabotage = false,
  onPlay,
  onBuy,
  onSabotage,
  onInspect,
}) => {
  const isRebel = card.faction === 'rebel';
  const isEmpire = card.faction === 'empire';
  const isMandalorian = card.faction === 'mandalorian';
  const isRepublic = card.faction === 'republic';
  const isSeparatist = card.faction === 'separatist';
  const isNeutral = card.faction === 'neutral';
  const isCapitalShip = card.type === 'capital_ship';

  // Faction solid styling (Spartan, monocolor, zero gradients, zero glow)
  const solid = getFactionSolidCardStyle(card.faction);
  const badgeStyle = `${solid.badgeBg} ${solid.badgeText} border ${solid.badgeBorder}`;

  let factionName = language === 'it' ? 'Neutrale' : 'Neutral';
  if (isRebel) factionName = language === 'it' ? 'Ribelli' : 'Rebel';
  else if (isEmpire) factionName = language === 'it' ? 'Impero' : 'Empire';
  else if (isMandalorian) factionName = language === 'it' ? 'Mandaloriani' : 'Mandalorian';
  else if (isRepublic) factionName = language === 'it' ? 'Repubblica' : 'Republic';
  else if (isSeparatist) factionName = language === 'it' ? 'Separatisti' : 'Separatist';

  const name = language === 'it' ? card.nameIt : card.name;
  const ability = language === 'it' ? card.abilityTextIt : card.abilityText;
  const typeLine = getCardTypeLine(card, language);
  const rewardDesc = card.targetReward
    ? language === 'it'
      ? card.targetReward.descriptionIt
      : card.targetReward.description
    : null;

  return (
    <div
      id={`card-${card.instanceId}`}
      className={`group relative flex flex-col justify-between w-36 sm:w-40 md:w-44 h-56 sm:h-60 md:h-64 rounded-lg border-2 ${solid.bg} ${solid.border} p-2 text-white transition-transform duration-150 select-none ${
        location === 'hand' ? 'hover:-translate-y-2 cursor-pointer' : ''
      }`}
      onClick={() => {
        if (location === 'hand' && onPlay) {
          onPlay(card);
        }
      }}
    >
      {/* Top Header: Faction Badge & Cost Badge (No Fleet badge here) */}
      <div className="flex items-start justify-between gap-1">
        <div className="flex items-center gap-1">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex items-center gap-1 ${badgeStyle}`}>
            <FactionIcon faction={card.faction} className="w-2.5 h-2.5 flex-shrink-0" />
            <span>{factionName}</span>
          </span>
        </div>

        {/* Cost Hex/Badge */}
        {card.cost > 0 && (
          <div
            title={`${language === 'it' ? 'Costo:' : 'Cost:'} ${card.cost} ${language === 'it' ? 'Risorse' : 'Resources'}`}
            className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded text-xs border border-amber-300"
          >
            <ResourceSquareIcon className="w-3.5 h-3.5" />
            <span>{card.cost}</span>
          </div>
        )}
      </div>

      {/* Card Title & Type (Shows "Flotta" with starship icon or "Unità • Tratto") */}
      <div className="mt-1">
        <div className="font-bold text-xs sm:text-sm tracking-tight leading-tight line-clamp-2 text-white group-hover:text-amber-200 transition-colors">
          {name}
        </div>
        <div className="text-[10px] flex items-center gap-1 mt-0.5 min-h-[16px]">
          {isCapitalShip ? (
            <span className="flex items-center gap-1 text-cyan-200 font-bold uppercase tracking-wider">
              <StarshipFleetIcon className="w-3 h-3 text-cyan-300 flex-shrink-0" />
              <span>{typeLine.fullLine}</span>
            </span>
          ) : (
            <span className="text-slate-200/80 truncate font-medium">
              {typeLine.fullLine}
            </span>
          )}
        </div>
      </div>

      {/* Stats Bar (Attack, Resources, Force, Hull) - Spartan Flat High-Contrast (empty when 0) */}
      <div className="grid grid-cols-4 gap-1 my-1 bg-black/60 p-1 rounded border border-black/80 text-center">
        {/* Attack */}
        <div
          title={language === 'it' ? 'Punti Attacco' : 'Attack'}
          className={`flex flex-col items-center justify-center ${card.attack > 0 ? 'text-red-300 font-bold' : 'text-slate-400 font-normal'}`}
        >
          <BlasterAttackIcon className={`w-3.5 h-3.5 ${card.attack > 0 ? 'opacity-100' : 'opacity-40'}`} />
          <span className="text-[11px] leading-none mt-0.5 min-h-[11px]">
            {card.attack > 0 ? card.attack : ''}
          </span>
        </div>

        {/* Resources */}
        <div
          title={language === 'it' ? 'Risorse generate' : 'Resources'}
          className={`flex flex-col items-center justify-center ${card.resources > 0 ? 'text-amber-300 font-bold' : 'text-slate-400 font-normal'}`}
        >
          <ResourceSquareIcon className={`w-3.5 h-3.5 ${card.resources > 0 ? 'opacity-100' : 'opacity-40'}`} />
          <span className="text-[11px] leading-none mt-0.5 min-h-[11px]">
            {card.resources > 0 ? card.resources : ''}
          </span>
        </div>

        {/* Force */}
        <div
          title={language === 'it' ? 'Forza' : 'Force'}
          className={`flex flex-col items-center justify-center ${
            card.force > 0
              ? 'text-cyan-200 font-bold'
              : 'text-slate-400 font-normal'
          }`}
        >
          <ForceStarWarsIcon className={`w-3.5 h-3.5 ${card.force > 0 ? 'opacity-100' : 'opacity-40'}`} />
          <span className="text-[11px] leading-none mt-0.5 min-h-[11px]">
            {card.force > 0 ? card.force : ''}
          </span>
        </div>

        {/* Hull / Shield (if Capital Ship) - Violet Color per user directive */}
        <div
          title={language === 'it' ? 'Punti Scafo Nave' : 'Hull / Defense'}
          className={`flex flex-col items-center justify-center ${isCapitalShip ? 'text-purple-300 font-bold' : 'text-slate-400 font-normal'}`}
        >
          <SolidShieldIcon className={`w-3.5 h-3.5 ${isCapitalShip ? 'opacity-100 text-purple-300' : 'opacity-40 text-slate-400'}`} />
          <span className="text-[11px] leading-none mt-0.5 min-h-[11px]">
            {isCapitalShip ? `${(card.hull || 0) - (card.currentDamage || 0)}` : ''}
          </span>
        </div>
      </div>

      {/* Ability Text Box - Spartan Solid High Readability Special Power */}
      <div className="flex-1 bg-black/60 p-1.5 rounded border border-black/80 flex flex-col justify-center min-h-[48px] overflow-hidden">
        {ability && ability.trim() !== '' && ability !== '—' ? (
          <div>
            {card.hasForceAbility && (
              <span className="text-[8.5px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
                ⚡ {language === 'it' ? 'Potere della Forza' : 'Force Power'}
              </span>
            )}
            <p className="text-[10px] sm:text-[10.5px] text-slate-100 leading-tight font-medium line-clamp-3">
              {ability}
            </p>
          </div>
        ) : (
          <div className="text-center text-slate-400 text-xs font-mono select-none" />
        )}
      </div>

      {/* Target / Sabotage Reward Bar (Galaxy Row only) */}
      {location === 'galaxy' && card.targetValue && (
        <div
          title={`${language === 'it' ? 'Sabotaggio' : 'Sabotage'}: ${rewardDesc}`}
          className="mt-1 bg-black/70 border border-red-700 p-1 rounded text-[9px] text-red-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-1 font-bold">
            <Target className="w-2.5 h-2.5 text-red-400" />
            <span>{card.targetValue}</span>
          </div>
          <span className="truncate text-red-200 max-w-[90px]" title={rewardDesc || ''}>
            {rewardDesc}
          </span>
        </div>
      )}

      {/* Interactive Action Overlay / Buttons for Galaxy Row */}
      {location === 'galaxy' && (
        <div className="mt-1.5 grid grid-cols-2 gap-1">
          {/* Buy Button */}
          {onBuy && isAffordable && (
            <button
              id={`btn-buy-${card.instanceId}`}
              onClick={(e) => {
                e.stopPropagation();
                onBuy(card);
              }}
              className="py-1 px-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] tracking-wider uppercase transition shadow flex items-center justify-center gap-0.5 active:scale-95"
            >
              <ResourceSquareIcon className="w-3 h-3" />
              {language === 'it' ? 'Compra' : 'Buy'}
            </button>
          )}

          {/* Sabotage Button */}
          {onSabotage && canSabotage && (
            <button
              id={`btn-sabotage-${card.instanceId}`}
              onClick={(e) => {
                e.stopPropagation();
                onSabotage(card);
              }}
              className="py-1 px-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] tracking-wider uppercase transition shadow flex items-center justify-center gap-0.5 active:scale-95"
            >
              <Target className="w-2.5 h-2.5" />
              {language === 'it' ? 'Sabota' : 'Target'}
            </button>
          )}

          {/* Inspect Button */}
          {onInspect && (
            <button
              id={`btn-inspect-${card.instanceId}`}
              onClick={(e) => {
                e.stopPropagation();
                onInspect(card);
              }}
              className="col-span-full py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[9px] flex items-center justify-center gap-1 transition"
            >
              <Search className="w-2.5 h-2.5" />
              {language === 'it' ? 'Dettagli' : 'Inspect'}
            </button>
          )}
        </div>
      )}

      {/* Click hint for hand */}
      {location === 'hand' && (
        <div className="mt-1 text-center text-[9px] text-slate-400 group-hover:text-amber-300 font-mono transition-colors">
          {language === 'it' ? 'Clicca per giocare' : 'Click to play'}
        </div>
      )}
    </div>
  );
};
