import React from 'react';
import { PlayerState, Card } from '../types/game';
import { FACTION_CONFIGS, getFactionSolidCardStyle } from '../data/factions';
import { FactionIcon } from './FactionIcon';
import { CardView } from './CardView';
import {
  BlasterAttackIcon,
  StarshipFleetIcon,
  SolidShieldIcon,
  SolidPlanetIcon,
} from './GameIcons';
import {
  Shield,
  Layers,
  Award,
  AlertTriangle,
  Swords,
  Flame,
  Sparkles,
} from 'lucide-react';

interface BotAreaProps {
  bot: PlayerState;
  humanAttack: number;
  isPlayerTurn: boolean;
  language: 'it' | 'en';
  basesToWin: number;
  onAttackBase: (damage: number) => void;
  onAttackCapitalShip: (shipId: string, damage: number) => void;
  onInspectCard: (card: Card) => void;
}

export const BotArea: React.FC<BotAreaProps> = ({
  bot,
  humanAttack,
  isPlayerTurn,
  language,
  basesToWin,
  onAttackBase,
  onAttackCapitalShip,
  onInspectCard,
}) => {
  const isRebel = bot.faction === 'rebel';
  const guardingShips = bot.fleet.filter(
    (s) => (s.hull || 0) > (s.currentDamage || 0)
  );
  const baseIsGuarded = guardingShips.length > 0;

  const baseHpPercent = Math.max(
    0,
    Math.min(100, (bot.activeBase.currentHp / bot.activeBase.maxHp) * 100)
  );

  return (
    <div
      id="bot-area-container"
      className="w-full bg-slate-950/80 border border-slate-800/90 rounded-2xl p-3 shadow-2xl backdrop-blur-md"
    >
      {/* Top status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg border flex items-center justify-center ${
              FACTION_CONFIGS[bot.faction]?.badgeColor || 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <FactionIcon faction={bot.faction} className="w-4 h-4" glow />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5 text-slate-400" />
                <span>{bot.name}</span>
              </h3>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  FACTION_CONFIGS[bot.faction]?.badgeColor || 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                <FactionIcon faction={bot.faction} className="w-3 h-3 flex-shrink-0" glow />
                <span>
                  {language === 'it'
                    ? FACTION_CONFIGS[bot.faction]?.nameIt || bot.faction
                    : FACTION_CONFIGS[bot.faction]?.name || bot.faction}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Trophies (Bases destroyed by Opponent) */}
        <div className="flex items-center gap-3 text-xs">
          <div
            title={
              language === 'it'
                ? 'Basi nemiche distrutte dall\'Avversario'
                : 'Enemy bases destroyed by Opponent'
            }
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300 font-mono"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-slate-400">
              {language === 'it' ? 'Basi distrutte:' : 'Bases won:'}
            </span>
            <strong className="text-amber-300">
              {bot.destroyedBases.length}/{basesToWin}
            </strong>
          </div>

          {/* Cards counts */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
              <Layers className="w-3 h-3 text-slate-500" />
              {language === 'it' ? 'Mano:' : 'Hand:'} <strong>{bot.hand.length}</strong>
            </span>
            <span className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
              {language === 'it' ? 'Mazzo:' : 'Deck:'} <strong>{bot.deck.length}</strong>
            </span>
            <span className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
              {language === 'it' ? 'Scarti:' : 'Discard:'} <strong>{bot.discard.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Bot Zone (Active Base + Fleet Zone) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
        {/* Active Base Card */}
        {(() => {
          const baseSolid = getFactionSolidCardStyle(bot.activeBase.faction);
          return (
            <div
              id="bot-active-base"
              className={`md:col-span-4 flex flex-col justify-between p-3 rounded-lg border-2 ${baseSolid.bg} ${baseSolid.border} relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded text-white border border-black/80">
                    {language === 'it' ? 'Base Attiva Nemica' : 'Enemy Active Base'}
                  </span>
                  {baseIsGuarded && (
                    <span
                      title={
                        language === 'it'
                          ? 'Base difesa da Navi Ammiraglie! Devi prima distruggerle.'
                          : 'Base guarded by Capital Ships! Destroy them first.'
                      }
                      className="flex items-center gap-1 text-[10px] font-bold uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded"
                    >
                      <Shield className="w-3 h-3" />
                      {language === 'it' ? 'Protetto' : 'Guarded'}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-black text-white mt-2 tracking-wide flex items-center gap-1.5">
                  <FactionIcon faction={bot.activeBase.faction} className="w-4 h-4 flex-shrink-0" />
                  <span>{language === 'it' ? bot.activeBase.nameIt : bot.activeBase.name}</span>
                </h4>

                {/* HP Bar */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-purple-300 flex items-center gap-1 font-bold">
                      <SolidPlanetIcon className="w-3.5 h-3.5 text-purple-300" />
                      {language === 'it' ? 'Punti Struttura' : 'Hull Points'}
                    </span>
                    <span className="font-bold text-purple-300 bg-black/70 px-2 py-0.5 rounded border border-purple-500/40 flex items-center gap-1">
                      <SolidPlanetIcon className="w-3 h-3 text-purple-300" />
                      <span>{bot.activeBase.currentHp} / {bot.activeBase.maxHp} PF</span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-black/70 rounded overflow-hidden border border-black/80">
                    <div
                      className={`h-full transition-all duration-300 ${
                        baseHpPercent > 50
                          ? 'bg-purple-500'
                          : baseHpPercent > 25
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${baseHpPercent}%` }}
                    />
                  </div>
                </div>

                {/* Base ability text */}
                <p className="mt-2 text-[11px] text-white leading-snug bg-black/60 p-2 rounded border border-black/70 font-medium">
                  {language === 'it'
                    ? bot.activeBase.abilityTextIt
                    : bot.activeBase.abilityText}
                </p>
              </div>

              {/* Attack Base Button */}
              <div className="mt-3 pt-2 border-t border-black/50">
                {isPlayerTurn && (
                  <button
                    id="btn-attack-enemy-base"
                    disabled={baseIsGuarded || humanAttack <= 0}
                    onClick={() => onAttackBase(Math.min(humanAttack, bot.activeBase.currentHp))}
                    className={`w-full py-2 px-3 rounded font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                      !baseIsGuarded && humanAttack > 0
                        ? 'bg-red-600 hover:bg-red-500 text-white active:scale-95'
                        : 'bg-black/50 text-slate-400 cursor-not-allowed border border-black/60'
                    }`}
                  >
                    <BlasterAttackIcon className="w-4 h-4" />
                    <span>
                      {baseIsGuarded
                        ? language === 'it'
                          ? 'Distruggi prima le Navi Ammiraglie'
                          : 'Destroy Capital Ships first'
                        : humanAttack > 0
                        ? `${language === 'it' ? 'Attacca Base (-' : 'Attack Base (-'}${Math.min(
                            humanAttack,
                            bot.activeBase.currentHp
                          )} PF)`
                        : language === 'it'
                        ? 'Nessun Attacco disponibile'
                        : 'No Attack available'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* Fleet Zone (Capital Ships) */}
        <div
          id="bot-fleet-zone"
          className="md:col-span-8 flex flex-col justify-between bg-slate-900/40 rounded-xl p-3 border border-slate-800"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
              <StarshipFleetIcon className="w-4 h-4 text-blue-400" />
              <span>{language === 'it' ? 'Flotta Nemica (Navi Ammiraglie)' : 'Enemy Fleet (Capital Ships)'}</span>
              <span className="font-mono text-slate-500">({bot.fleet.length})</span>
            </div>
            {baseIsGuarded && (
              <span className="text-[10px] text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {language === 'it'
                  ? 'Fanno da scudo alla Base nemica!'
                  : 'Shielding enemy Base!'}
              </span>
            )}
          </div>

          {/* Ships grid */}
          {bot.fleet.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[140px] text-slate-600 text-xs font-mono border border-dashed border-slate-800 rounded-lg p-4 text-center">
              <StarshipFleetIcon className="w-6 h-6 mb-1 text-slate-700" />
              <span>
                {language === 'it'
                  ? 'Nessuna Nave Ammiraglia nemica in gioco. La Base è vulnerabile!'
                  : 'No enemy Capital Ships in play. Base is exposed!'}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-1">
              {bot.fleet.map((ship) => {
                const remainingHull = (ship.hull || 0) - (ship.currentDamage || 0);
                const hullPercent = Math.max(
                  0,
                  Math.min(100, (remainingHull / (ship.hull || 1)) * 100)
                );
                const canAttackShip = isPlayerTurn && humanAttack > 0;

                const shipSolid = getFactionSolidCardStyle(ship.faction);
                return (
                  <div
                    key={ship.instanceId}
                    className={`relative flex flex-col justify-between w-36 sm:w-40 rounded-lg border-2 ${shipSolid.bg} ${shipSolid.border} p-2`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] uppercase font-bold text-white mb-1">
                        <span className="flex items-center gap-1">
                          <StarshipFleetIcon className="w-3 h-3" />
                          {language === 'it' ? 'Flotta' : 'Fleet'}
                        </span>
                        <span className="bg-black/70 px-1.5 py-0.5 rounded font-mono font-bold text-purple-300 border border-purple-500/40 flex items-center gap-1">
                          <SolidShieldIcon className="w-2.5 h-2.5 text-purple-300" />
                          <span>{remainingHull}/{ship.hull} PF</span>
                        </span>
                      </div>

                      <h5 className="font-bold text-xs text-white leading-tight">
                        {language === 'it' ? ship.nameIt : ship.name}
                      </h5>

                      {/* Hull bar */}
                      <div className="w-full h-1.5 bg-black/70 rounded overflow-hidden my-1.5 border border-black/80">
                        <div
                          className="h-full bg-purple-500 transition-all duration-300"
                          style={{ width: `${hullPercent}%` }}
                        />
                      </div>

                      <p className="text-[10px] text-white leading-tight line-clamp-2 bg-black/55 p-1 rounded font-medium">
                        {language === 'it' ? ship.abilityTextIt : ship.abilityText}
                      </p>
                    </div>

                    {/* Attack Ship Action */}
                    <div className="mt-2 pt-1 border-t border-slate-800">
                      {isPlayerTurn && canAttackShip && (
                        <button
                          id={`btn-attack-ship-${ship.instanceId}`}
                          onClick={() =>
                            onAttackCapitalShip(
                              ship.instanceId,
                              Math.min(humanAttack, remainingHull)
                            )
                          }
                          className="w-full py-1 px-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shadow active:scale-95 transition"
                        >
                          <BlasterAttackIcon className="w-3.5 h-3.5" glow />
                          <span>
                            {language === 'it' ? 'Attacca (-' : 'Attack (-'}
                            {Math.min(humanAttack, remainingHull)} PF)
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
