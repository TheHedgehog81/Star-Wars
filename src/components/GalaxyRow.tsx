import React from 'react';
import { Card, PlayableFaction } from '../types/game';
import { CardView } from './CardView';
import { OUTER_RIM_PILOT } from '../data/cards';
import { ResourceCubeIcon, BlasterAttackIcon } from './GameIcons';
import { Layers, Compass } from 'lucide-react';

interface GalaxyRowProps {
  galaxyRow: (Card | null)[];
  galaxyDeckCount: number;
  outerRimPilotsCount: number;
  playerResources: number;
  playerAttack: number;
  playerFaction: PlayableFaction;
  isPlayerTurn: boolean;
  language: 'it' | 'en';
  onBuySlot: (slotIndex: number) => void;
  onBuyPilot: () => void;
  onSabotageSlot: (slotIndex: number) => void;
  onInspectCard: (card: Card) => void;
}

export const GalaxyRow: React.FC<GalaxyRowProps> = ({
  galaxyRow,
  galaxyDeckCount,
  outerRimPilotsCount,
  playerResources,
  playerAttack,
  playerFaction,
  isPlayerTurn,
  language,
  onBuySlot,
  onBuyPilot,
  onSabotageSlot,
  onInspectCard,
}) => {
  const dummyPilotCard: Card = {
    ...OUTER_RIM_PILOT,
    instanceId: 'stack_outer_rim_pilot',
  };

  return (
    <div
      id="galaxy-row-container"
      className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-md"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm tracking-wide text-slate-100 flex items-center gap-2">
            <span>{language === 'it' ? 'FILA DELLA GALASSIA' : 'GALAXY ROW'}</span>
            <span className="text-xs font-normal text-slate-400 font-mono">
              ({galaxyDeckCount} {language === 'it' ? 'carte nel mazzo' : 'cards in deck'})
            </span>
          </h3>
        </div>

        {/* Player stats reminder badge */}
        {isPlayerTurn && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full">
              <ResourceCubeIcon className="w-3.5 h-3.5" glow />
              <strong>{playerResources}</strong> {language === 'it' ? 'Risorse' : 'Credits'}
            </span>
            <span className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-full">
              <BlasterAttackIcon className="w-3.5 h-3.5" glow />
              <strong>{playerAttack}</strong> {language === 'it' ? 'Attacco' : 'Attack'}
            </span>
          </div>
        )}
      </div>

      {/* Row content */}
      <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-3 justify-center lg:justify-start overflow-x-auto pb-1">
        {/* Galaxy Deck Stack */}
        <div
          id="galaxy-deck-stack"
          className="flex flex-col items-center justify-center w-24 sm:w-28 rounded-xl border-2 border-dashed border-slate-800 bg-slate-900/60 p-2 text-center select-none"
        >
          <Layers className="w-6 h-6 text-slate-600 mb-1" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {language === 'it' ? 'Mazzo Galassia' : 'Galaxy Deck'}
          </span>
          <span className="text-lg font-mono font-black text-slate-300 mt-1">
            {galaxyDeckCount}
          </span>
        </div>

        {/* Outer Rim Pilot Stack (Always purchasable) */}
        <div
          id="outer-rim-pilot-stack"
          className="relative flex flex-col items-center justify-between w-32 sm:w-36 rounded-xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-slate-950 p-2 text-center select-none shadow-lg"
        >
          <div className="flex items-center justify-between w-full text-[9px] font-bold uppercase text-emerald-300">
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3" />
              {language === 'it' ? 'Pilota' : 'Pilot'}
            </span>
            <span className="bg-emerald-900/80 px-1 py-0.5 rounded text-emerald-200 font-mono">
              x{outerRimPilotsCount}
            </span>
          </div>

          <div className="my-1 text-left w-full bg-slate-950/60 p-1 rounded border border-emerald-900/40 text-[10px] text-slate-300">
            <div className="font-bold text-emerald-200">
              {language === 'it' ? "Pilota dell'Orlo" : 'Outer Rim Pilot'}
            </div>
            <div className="text-amber-300 font-mono text-[9px] mt-0.5">
              +1 {language === 'it' ? 'Risorsa' : 'Credit'}
            </div>
          </div>

          <button
            id="btn-buy-outer-rim-pilot"
            disabled={!isPlayerTurn || playerResources < 2 || outerRimPilotsCount <= 0}
            onClick={onBuyPilot}
            className={`w-full py-1.5 px-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition flex items-center justify-center gap-1 shadow ${
              isPlayerTurn && playerResources >= 2 && outerRimPilotsCount > 0
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.3)] active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <ResourceCubeIcon className="w-3.5 h-3.5" glow />
            <span>2 {language === 'it' ? 'Risorse' : 'Credits'}</span>
          </button>
        </div>

        {/* Vertical subtle divider */}
        <div className="hidden lg:block w-[1px] bg-slate-800 my-1 self-stretch" />

        {/* The 6 Galaxy Row Cards */}
        <div className="flex flex-wrap lg:flex-nowrap gap-2.5 justify-center flex-1">
          {galaxyRow.map((card, idx) => {
            if (!card) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="w-36 sm:w-40 md:w-44 h-56 sm:h-60 md:h-64 rounded-xl border-2 border-dashed border-slate-800/80 bg-slate-900/30 flex items-center justify-center text-slate-600 text-xs font-mono"
                >
                  {language === 'it' ? 'Slot Vuoto' : 'Empty Slot'}
                </div>
              );
            }

            // Can player buy this card?
            const isFriendlyOrNeutral =
              card.faction === 'neutral' || card.faction === playerFaction;
            const isAffordable =
              isPlayerTurn && isFriendlyOrNeutral && playerResources >= card.cost;

            // Can player sabotage this card?
            const isEnemy =
              card.faction !== 'neutral' && card.faction !== playerFaction;
            const canSabotage =
              isPlayerTurn &&
              isEnemy &&
              !!card.targetValue &&
              playerAttack >= card.targetValue;

            return (
              <div key={card.instanceId} className="relative">
                <CardView
                  card={card}
                  language={language}
                  location="galaxy"
                  isAffordable={isAffordable}
                  canSabotage={canSabotage}
                  onBuy={() => onBuySlot(idx)}
                  onSabotage={() => onSabotageSlot(idx)}
                  onInspect={() => onInspectCard(card)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
