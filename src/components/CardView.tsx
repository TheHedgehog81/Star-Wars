import React from 'react';
import { Card } from '../types/game';
import { FactionIcon } from './FactionIcon';
import { ResourceCubeIcon, BlasterAttackIcon } from './GameIcons';
import {
  Shield,
  Zap,
  Anchor,
  Flame,
  Plane,
  Sparkles,
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

  // Faction styling
  let borderStyle = 'border-slate-700 hover:border-slate-500';
  let badgeStyle = 'bg-slate-800 text-slate-300';
  let factionName = language === 'it' ? 'Neutrale' : 'Neutral';

  if (isRebel) {
    borderStyle = 'border-blue-500/60 hover:border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]';
    badgeStyle = 'bg-blue-950/80 text-blue-300 border border-blue-500/50';
    factionName = language === 'it' ? 'Ribelli' : 'Rebel';
  } else if (isEmpire) {
    borderStyle = 'border-red-600/60 hover:border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.15)]';
    badgeStyle = 'bg-red-950/80 text-red-300 border border-red-500/50';
    factionName = language === 'it' ? 'Impero' : 'Empire';
  } else if (isMandalorian) {
    borderStyle = 'border-emerald-500/60 hover:border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]';
    badgeStyle = 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50';
    factionName = language === 'it' ? 'Mandaloriani' : 'Mandalorian';
  } else if (isRepublic) {
    borderStyle = 'border-amber-500/60 hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]';
    badgeStyle = 'bg-amber-950/80 text-amber-300 border border-amber-500/50';
    factionName = language === 'it' ? 'Repubblica' : 'Republic';
  } else if (isSeparatist) {
    borderStyle = 'border-purple-600/60 hover:border-purple-400 shadow-[0_0_12px_rgba(147,51,234,0.15)]';
    badgeStyle = 'bg-purple-950/80 text-purple-300 border border-purple-500/50';
    factionName = language === 'it' ? 'Separatisti' : 'Separatist';
  } else {
    borderStyle = 'border-emerald-600/60 hover:border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.15)]';
    badgeStyle = 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50';
    factionName = language === 'it' ? 'Neutrale' : 'Neutral';
  }

  const name = language === 'it' ? card.nameIt : card.name;
  const ability = language === 'it' ? card.abilityTextIt : card.abilityText;
  const rewardDesc = card.targetReward
    ? language === 'it'
      ? card.targetReward.descriptionIt
      : card.targetReward.description
    : null;

  return (
    <div
      id={`card-${card.instanceId}`}
      className={`group relative flex flex-col justify-between w-36 sm:w-40 md:w-44 h-56 sm:h-60 md:h-64 rounded-xl border-2 bg-gradient-to-b ${card.colorTone} p-2 text-white shadow-xl transition-all duration-200 select-none ${borderStyle} ${
        location === 'hand' ? 'hover:-translate-y-2.5 cursor-pointer' : ''
      }`}
      onClick={() => {
        if (location === 'hand' && onPlay) {
          onPlay(card);
        }
      }}
    >
      {/* Top Header: Faction Badge & Cost Badge */}
      <div className="flex items-start justify-between gap-1">
        <div className="flex items-center gap-1">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex items-center gap-1 ${badgeStyle}`}>
            <FactionIcon faction={card.faction} className="w-2.5 h-2.5 flex-shrink-0" />
            <span>{factionName}</span>
          </span>
          {isCapitalShip && (
            <span className="text-[9px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 py-0.5 rounded flex items-center gap-0.5">
              <Anchor className="w-2.5 h-2.5" />
              {language === 'it' ? 'Flotta' : 'Fleet'}
            </span>
          )}
        </div>

        {/* Cost Hex/Badge */}
        {card.cost > 0 && (
          <div
            title={`${language === 'it' ? 'Costo:' : 'Cost:'} ${card.cost} ${language === 'it' ? 'Risorse' : 'Resources'}`}
            className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md text-xs shadow-md border border-amber-300"
          >
            <ResourceCubeIcon className="w-3.5 h-3.5" glow />
            <span>{card.cost}</span>
          </div>
        )}
      </div>

      {/* Card Title & Type */}
      <div className="mt-1">
        <div className="font-bold text-xs sm:text-sm tracking-tight leading-tight line-clamp-2 text-slate-100 group-hover:text-amber-200 transition-colors">
          {name}
        </div>
        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
          {isCapitalShip ? (language === 'it' ? 'Nave Ammiraglia' : 'Capital Ship') : (language === 'it' ? 'Unità' : 'Unit')}
        </div>
      </div>

      {/* Stats Bar (Attack, Resources, Force, Hull) */}
      <div className="grid grid-cols-4 gap-1 my-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800 text-center">
        {/* Attack */}
        <div
          title={language === 'it' ? 'Punti Attacco' : 'Attack'}
          className={`flex flex-col items-center justify-center ${card.attack > 0 ? 'text-red-400 font-bold' : 'text-slate-600'}`}
        >
          <BlasterAttackIcon className="w-3.5 h-3.5" glow={card.attack > 0} />
          <span className="text-[11px] leading-none mt-0.5">{card.attack}</span>
        </div>

        {/* Resources */}
        <div
          title={language === 'it' ? 'Risorse generate' : 'Resources'}
          className={`flex flex-col items-center justify-center ${card.resources > 0 ? 'text-amber-400 font-bold' : 'text-slate-600'}`}
        >
          <ResourceCubeIcon className="w-3.5 h-3.5" glow={card.resources > 0} />
          <span className="text-[11px] leading-none mt-0.5">{card.resources}</span>
        </div>

        {/* Force */}
        <div
          title={language === 'it' ? 'Forza' : 'Force'}
          className={`flex flex-col items-center justify-center ${
            card.force > 0
              ? isRebel
                ? 'text-cyan-400 font-bold'
                : 'text-red-400 font-bold'
              : 'text-slate-600'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span className="text-[11px] leading-none mt-0.5">{card.force}</span>
        </div>

        {/* Hull / Shield (if Capital Ship) */}
        <div
          title={language === 'it' ? 'Punti Struttura / Scafo' : 'Hull / Defense'}
          className={`flex flex-col items-center justify-center ${isCapitalShip ? 'text-blue-400 font-bold' : 'text-slate-600'}`}
        >
          <Shield className="w-3 h-3" />
          <span className="text-[11px] leading-none mt-0.5">
            {isCapitalShip ? `${(card.hull || 0) - (card.currentDamage || 0)}` : '-'}
          </span>
        </div>
      </div>

      {/* Ability Text Box */}
      <div className="flex-1 bg-slate-950/50 p-1.5 rounded-md border border-slate-800/80 overflow-hidden flex flex-col justify-center">
        <p className="text-[10px] sm:text-[11px] text-slate-200 leading-snug line-clamp-3">
          {ability}
        </p>
      </div>

      {/* Target / Sabotage Reward Bar (Galaxy Row only) */}
      {location === 'galaxy' && card.targetValue && (
        <div
          title={`${language === 'it' ? 'Sabotaggio' : 'Sabotage'}: ${rewardDesc}`}
          className="mt-1 bg-red-950/70 border border-red-800/70 p-1 rounded text-[9px] text-red-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-1 font-bold">
            <Target className="w-2.5 h-2.5 text-red-400" />
            <span>{card.targetValue}</span>
          </div>
          <span className="truncate text-red-300 max-w-[90px]" title={rewardDesc || ''}>
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
              <ResourceCubeIcon className="w-3 h-3" />
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
