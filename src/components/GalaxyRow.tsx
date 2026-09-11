import React from 'react';
import { Card, PlayableFaction } from '../types/game';
import { CardView } from './CardView';
import { OUTER_RIM_PILOT } from '../data/cards';
import { ResourceSquareIcon, BlasterAttackIcon } from './GameIcons';
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
            <span className="flex items-center gap-1.5 bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded border border-amber-300">
              <ResourceSquareIcon className="w-3.5 h-3.5" />
              <strong>{playerResources}</strong> {language === 'it' ? 'Risorse' : 'Credits'}
            </span>
            <span className="flex items-center gap-1.5 bg-red-600 text-white font-bold px-2 py-0.5 rounded border border-red-500">
              <BlasterAttackIcon className="w-3.5 h-3.5" />
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
          className="flex flex-col items-center justify-center w-24 sm:w-28 rounded-lg border-2 border-slate-700 bg-slate-900 p-2 text-center select-none flex-shrink-0"
        >
          <Layers className="w-7 h-7 text-slate-400 mb-2" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            {language === 'it' ? 'Mazzo Galassia' : 'Galaxy Deck'}
          </span>
          <span className="text-xl font-mono font-black text-white mt-1">
            {galaxyDeckCount}
          </span>
        </div>

        {/* Outer Rim Pilot Stack (Always purchasable, exact same card template & dimension) */}
        <div id="outer-rim-pilot-stack" className="relative flex-shrink-0">
          {/* Stack count badge */}
          <div
            className="absolute -top-2.5 -right-2 z-20 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 border-2 border-slate-950 text-[11px] font-mono font-black shadow-lg flex items-center gap-1"
            title={`${outerRimPilotsCount} ${language === 'it' ? 'Piloti rimanenti nella riserva' : 'Pilots left in supply'}`}
          >
            <Compass className="w-3.5 h-3.5 text-slate-950" />
            <span>x{outerRimPilotsCount}</span>
          </div>

          <CardView
            card={dummyPilotCard}
            language={language}
            location="galaxy"
            isAffordable={isPlayerTurn && playerResources >= dummyPilotCard.cost && outerRimPilotsCount > 0}
            onBuy={onBuyPilot}
            onInspect={() => onInspectCard(dummyPilotCard)}
          />

          {outerRimPilotsCount <= 0 && (
            <div className="absolute inset-0 z-30 bg-black/85 rounded-lg flex flex-col items-center justify-center text-red-400 font-bold text-xs uppercase tracking-wider p-2 text-center">
              <span>{language === 'it' ? 'Esaurito' : 'Sold Out'}</span>
            </div>
          )}
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
