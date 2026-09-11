import React, { useState, useMemo } from 'react';
import { CardTemplate, Base, Faction } from '../types/game';
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
  GALAXY_TEMPLATES,
  REBEL_TROOPER,
  REBEL_COMMANDO,
  TEMPLE_GUARDIAN,
  IMPERIAL_SHUTTLE,
  STORMTROOPER,
  INQUISITOR,
  REBEL_BASES,
  EMPIRE_BASES,
  OUTER_RIM_PILOT,
} from '../data/cards';
import {
  CLONE_CADET,
  CLONE_TROOPER_P1,
  TEMPLE_PADAWAN,
  REPUBLIC_GALAXY_TEMPLATES,
  REPUBLIC_BASES,
  OOM_PILOT_DROID,
  B1_BATTLE_DROID,
  SEPARATIST_ACOLYTE,
  SEPARATIST_GALAXY_TEMPLATES,
  SEPARATIST_BASES,
} from '../data/cardsCloneWars';
import {
  MANDALORIAN_FOUNDLING,
  MANDALORIAN_WARRIOR,
  CREED_INITIATE,
  MANDALORIAN_GALAXY_TEMPLATES,
  MANDALORIAN_BASES,
} from '../data/cardsMandalorian';
import {
  X,
  Search,
  BookOpen,
  Filter,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Crosshair,
  Compass,
} from 'lucide-react';

interface CardDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'it' | 'en';
}

type CategoryFilter = 'all' | 'unit' | 'capital_ship' | 'base';

export const CardDatabaseModal: React.FC<CardDatabaseModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [selectedFaction, setSelectedFaction] = useState<Faction>('rebel');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardForDetail, setSelectedCardForDetail] = useState<CardTemplate | Base | null>(null);

  // Group all card and base data per faction
  const factionData = useMemo(() => {
    // Rebels
    const rebelStarters: CardTemplate[] = [
      REBEL_TROOPER,
      REBEL_COMMANDO,
      TEMPLE_GUARDIAN,
    ];
    const rebelGalaxy = GALAXY_TEMPLATES.filter((c) => c.faction === 'rebel');
    const rebelBases = REBEL_BASES;

    // Empire
    const empireStarters: CardTemplate[] = [
      IMPERIAL_SHUTTLE,
      STORMTROOPER,
      INQUISITOR,
    ];
    const empireGalaxy = GALAXY_TEMPLATES.filter((c) => c.faction === 'empire');
    const empireBases = EMPIRE_BASES;

    // Republic
    const republicStarters: CardTemplate[] = [CLONE_CADET, CLONE_TROOPER_P1, TEMPLE_PADAWAN];
    const republicGalaxy = REPUBLIC_GALAXY_TEMPLATES;
    const republicBases = REPUBLIC_BASES;

    // Separatists
    const separatistStarters: CardTemplate[] = [OOM_PILOT_DROID, B1_BATTLE_DROID, SEPARATIST_ACOLYTE];
    const separatistGalaxy = SEPARATIST_GALAXY_TEMPLATES;
    const separatistBases = SEPARATIST_BASES;

    // Mandalorian
    const mandalorianStarters: CardTemplate[] = [MANDALORIAN_FOUNDLING, MANDALORIAN_WARRIOR, CREED_INITIATE];
    const mandalorianGalaxy = MANDALORIAN_GALAXY_TEMPLATES;
    const mandalorianBases = MANDALORIAN_BASES;

    // Neutral
    const neutralGalaxy = [
      OUTER_RIM_PILOT,
      ...GALAXY_TEMPLATES.filter((c) => c.faction === 'neutral' && c.id !== 'neu_outer_rim_pilot'),
    ];

    return {
      rebel: {
        cards: [...rebelStarters, ...rebelGalaxy],
        bases: rebelBases,
      },
      empire: {
        cards: [...empireStarters, ...empireGalaxy],
        bases: empireBases,
      },
      republic: {
        cards: [...republicStarters, ...republicGalaxy],
        bases: republicBases,
      },
      separatist: {
        cards: [...separatistStarters, ...separatistGalaxy],
        bases: separatistBases,
      },
      mandalorian: {
        cards: [...mandalorianStarters, ...mandalorianGalaxy],
        bases: mandalorianBases,
      },
      neutral: {
        cards: neutralGalaxy,
        bases: [] as Base[],
      },
    };
  }, []);

  if (!isOpen) return null;

  const currentFactionInfo = factionData[selectedFaction] || { cards: [], bases: [] };

  // Filter cards and bases
  const filteredCards = currentFactionInfo.cards.filter((card) => {
    if (categoryFilter === 'base') return false;
    if (categoryFilter === 'unit' && card.type !== 'unit') return false;
    if (categoryFilter === 'capital_ship' && card.type !== 'capital_ship') return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      card.name.toLowerCase().includes(q) ||
      card.nameIt.toLowerCase().includes(q) ||
      card.abilityText.toLowerCase().includes(q) ||
      card.abilityTextIt.toLowerCase().includes(q)
    );
  });

  const filteredBases = currentFactionInfo.bases.filter((base) => {
    if (categoryFilter !== 'all' && categoryFilter !== 'base') return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      base.name.toLowerCase().includes(q) ||
      base.nameIt.toLowerCase().includes(q) ||
      base.abilityText.toLowerCase().includes(q) ||
      base.abilityTextIt.toLowerCase().includes(q)
    );
  });

  const totalFactionItems = currentFactionInfo.cards.length + currentFactionInfo.bases.length;

  const factionsList: Faction[] = ['rebel', 'empire', 'republic', 'separatist', 'mandalorian', 'neutral'];

  return (
    <div
      id="faction-card-database-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-slate-950 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-100 flex items-center gap-2">
                <span>{language === 'it' ? 'Archivio Galattico delle Carte' : 'Galactic Card Archive'}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 font-mono text-amber-400">
                  {totalFactionItems} {language === 'it' ? 'Elementi' : 'Items'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'it'
                  ? 'Consulta tutte le Unità, Navi Ammiraglie e Basi Galattiche suddivise per Fazione'
                  : 'Explore all Units, Capital Ships, and Galactic Bases organized by Faction'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-card-database"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Faction Selector Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-800 bg-slate-950/90 overflow-x-auto">
          {factionsList.map((fac) => {
            const config = FACTION_CONFIGS[fac];
            const isSelected = selectedFaction === fac;
            return (
              <button
                key={fac}
                id={`btn-tab-faction-${fac}`}
                onClick={() => {
                  setSelectedFaction(fac);
                  setSelectedCardForDetail(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition whitespace-nowrap border ${
                  isSelected
                    ? `${config?.badgeColor || 'bg-slate-800 text-white'} ring-2 ring-amber-400/50 scale-105 shadow-md`
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <FactionIcon faction={fac} className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{language === 'it' ? config?.nameIt || fac : config?.name || fac}</span>
              </button>
            );
          })}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/40 text-xs">
          {/* Category tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 rounded font-bold transition ${
                categoryFilter === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {language === 'it' ? 'Tutte' : 'All'}
            </button>
            <button
              onClick={() => setCategoryFilter('unit')}
              className={`px-2.5 py-1 rounded font-bold transition ${
                categoryFilter === 'unit'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {language === 'it' ? 'Unità' : 'Units'}
            </button>
            <button
              onClick={() => setCategoryFilter('capital_ship')}
              className={`px-2.5 py-1 rounded font-bold transition ${
                categoryFilter === 'capital_ship'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {language === 'it' ? 'Navi Ammiraglie' : 'Capital Ships'}
            </button>
            {selectedFaction !== 'neutral' && (
              <button
                onClick={() => setCategoryFilter('base')}
                className={`px-2.5 py-1 rounded font-bold transition ${
                  categoryFilter === 'base'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {language === 'it' ? 'Basi Galattiche' : 'Bases'}
              </button>
            )}
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'it' ? 'Cerca per nome o abilità...' : 'Search name or ability...'}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filteredCards.length === 0 && filteredBases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <Compass className="w-10 h-10 mb-2 opacity-40 animate-pulse" />
              <p className="text-sm font-medium">
                {language === 'it' ? 'Nessuna carta trovata con questi filtri.' : 'No cards found matching filters.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cards Section */}
              {filteredCards.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'it' ? 'Unità e Navi Ammiraglie' : 'Units & Capital Ships'}</span>
                    <span className="font-mono text-slate-500">({filteredCards.length})</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {filteredCards.map((card) => {
                      const solid = getFactionSolidCardStyle(card.faction);
                      const isCapitalShip = card.type === 'capital_ship';
                      const isSelected = selectedCardForDetail?.id === card.id;

                      return (
                        <div
                          key={card.id}
                          onClick={() => setSelectedCardForDetail(card)}
                          className={`relative flex flex-col justify-between rounded-xl border-2 ${solid.bg} ${solid.border} p-2.5 transition cursor-pointer hover:scale-102 hover:shadow-xl ${
                            isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950' : ''
                          }`}
                        >
                          {/* Top Bar: Cost & Faction */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div
                                title={language === 'it' ? 'Costo di Reclutamento' : 'Recruit Cost'}
                                className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow"
                              >
                                {card.cost}
                              </div>
                              <span className="text-[10px] uppercase font-bold text-white/90 flex items-center gap-1">
                                <FactionIcon faction={card.faction} className="w-3 h-3" />
                                <span>{isCapitalShip ? (language === 'it' ? 'Ammiraglia' : 'Capital') : (language === 'it' ? 'Unità' : 'Unit')}</span>
                              </span>
                            </div>

                            <h4 className="font-black text-xs sm:text-sm text-white leading-tight tracking-wide mb-1">
                              {language === 'it' ? card.nameIt : card.name}
                            </h4>

                            <div className="text-[9px] text-slate-300 italic mb-1.5">
                              {getCardTypeLine(card, language).fullLine}
                            </div>

                            {/* Ability Box */}
                            <p className="text-[10px] text-white leading-tight bg-black/60 p-2 rounded border border-black/80 font-medium min-h-[44px]">
                              {((language === 'it' ? card.abilityTextIt : card.abilityText) || '').replace(/^—$/, '')}
                            </p>
                          </div>

                          {/* Stats Bar */}
                          <div className="mt-2.5 pt-1.5 border-t border-black/50 grid grid-cols-4 gap-1 text-center bg-black/40 rounded py-1 px-0.5">
                            {/* Attack */}
                            <div className="flex flex-col items-center">
                              <BlasterAttackIcon className="w-3 h-3 text-red-400" />
                              <span className="text-[11px] font-mono font-bold text-red-400 min-h-[14px]">
                                {card.attack > 0 ? card.attack : ''}
                              </span>
                            </div>

                            {/* Resources */}
                            <div className="flex flex-col items-center">
                              <ResourceSquareIcon className="w-3 h-3 text-amber-400" />
                              <span className="text-[11px] font-mono font-bold text-amber-300 min-h-[14px]">
                                {card.resources > 0 ? card.resources : ''}
                              </span>
                            </div>

                            {/* Force */}
                            <div className="flex flex-col items-center">
                              <ForceStarWarsIcon className="w-3 h-3 text-blue-400" />
                              <span className="text-[11px] font-mono font-bold text-blue-300 min-h-[14px]">
                                {card.force > 0 ? card.force : ''}
                              </span>
                            </div>

                            {/* Hull - Violet Color with Solid Shield Icon */}
                            <div
                              title={language === 'it' ? 'Punti Scafo' : 'Hull Points'}
                              className="flex flex-col items-center text-purple-300"
                            >
                              <SolidShieldIcon className={`w-3 h-3 ${isCapitalShip ? 'text-purple-300 opacity-100' : 'text-slate-500 opacity-40'}`} />
                              <span className={`text-[11px] font-mono font-bold ${isCapitalShip ? 'text-purple-300' : 'text-slate-500'} min-h-[14px]`}>
                                {isCapitalShip && card.hull ? card.hull : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bases Section */}
              {filteredBases.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <SolidPlanetIcon className="w-3.5 h-3.5 text-purple-300" />
                    <span>{language === 'it' ? 'Basi Galattiche' : 'Galactic Bases'}</span>
                    <span className="font-mono text-slate-500">({filteredBases.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {filteredBases.map((base) => {
                      const solid = getFactionSolidCardStyle(base.faction);
                      const isSelected = selectedCardForDetail?.id === base.id;

                      return (
                        <div
                          key={base.id}
                          onClick={() => setSelectedCardForDetail(base)}
                          className={`relative flex flex-col justify-between rounded-xl border-2 ${solid.bg} ${solid.border} p-3 transition cursor-pointer hover:scale-102 hover:shadow-xl ${
                            isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950' : ''
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[9px] font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded text-white border border-black/80">
                                {base.isStarter
                                  ? language === 'it' ? 'Base Iniziale' : 'Starter Base'
                                  : language === 'it' ? 'Base Galattica' : 'Galactic Base'}
                              </span>

                              {/* Base HP - Violet Color with Solid Planet Icon */}
                              <div
                                title={language === 'it' ? 'Punti Struttura Base' : 'Base Hull Points'}
                                className="flex items-center gap-1 text-purple-300 font-mono font-bold text-xs bg-black/70 px-2 py-0.5 rounded border border-purple-500/40"
                              >
                                <SolidPlanetIcon className="w-3.5 h-3.5 text-purple-300" />
                                <span>{base.maxHp} PF</span>
                              </div>
                            </div>

                            <h4 className="font-black text-sm text-white tracking-wide flex items-center gap-1.5 mb-1.5">
                              <FactionIcon faction={base.faction} className="w-4 h-4 flex-shrink-0" />
                              <span>{language === 'it' ? base.nameIt : base.name}</span>
                            </h4>

                            <p className="text-xs text-white leading-relaxed bg-black/60 p-2.5 rounded border border-black/80 font-medium">
                              {language === 'it' ? base.abilityTextIt : base.abilityText}
                            </p>
                          </div>

                          <div className="mt-2 text-[10px] text-slate-300 flex items-center justify-between font-mono">
                            <span>{language === 'it' ? 'Tipo:' : 'Type:'} {base.abilityType === 'action' ? (language === 'it' ? 'Azione attiva' : 'Action') : (language === 'it' ? 'Passiva / Reazione' : 'Passive')}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-purple-300 font-semibold">
              <SolidShieldIcon className="w-3 h-3 text-purple-300" />
              <span>{language === 'it' ? 'Scafo Ammiraglia' : 'Capital Hull'}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-purple-300 font-semibold">
              <SolidPlanetIcon className="w-3 h-3 text-purple-300" />
              <span>{language === 'it' ? 'Punti Struttura Base' : 'Base HP'}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
          >
            {language === 'it' ? 'Chiudi Archivio' : 'Close Archive'}
          </button>
        </div>
      </div>
    </div>
  );
};
