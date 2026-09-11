import React, { useState } from 'react';
import { GameSettings, PlayableFaction, BotDifficulty } from '../types/game';
import { FACTION_CONFIGS, PLAYABLE_FACTIONS } from '../data/factions';
import { FactionIcon } from './FactionIcon';
import {
  Volume2,
  VolumeX,
  ShieldAlert,
  Sparkles,
  Swords,
} from 'lucide-react';

interface GameSetupModalProps {
  initialSettings: GameSettings;
  isOpen: boolean;
  language: 'it' | 'en';
  onStartGame: (settings: GameSettings) => void;
}

const FACTION_THEMES: Record<
  PlayableFaction,
  {
    bgUnselected: string;
    bgSelected: string;
    borderUnselected: string;
    borderSelected: string;
    badgeBg: string;
    textAccent: string;
    chosenBadge: string;
    botSelectedBg: string;
    botSelectedBorder: string;
    botChosenBadge: string;
  }
> = {
  rebel: {
    bgUnselected: 'bg-slate-900',
    bgSelected: 'bg-[#1d4ed8]',
    borderUnselected: 'border-slate-700 hover:border-blue-400',
    borderSelected: 'border-white ring-2 ring-blue-500',
    badgeBg: 'bg-black/60 border-black/80 text-white',
    textAccent: 'text-white',
    chosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
    botSelectedBg: 'bg-[#1d4ed8]',
    botSelectedBorder: 'border-white text-white ring-2 ring-blue-500',
    botChosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
  },
  empire: {
    bgUnselected: 'bg-slate-900',
    bgSelected: 'bg-[#800014]',
    borderUnselected: 'border-slate-700 hover:border-red-400',
    borderSelected: 'border-white ring-2 ring-red-600',
    badgeBg: 'bg-black/60 border-black/80 text-white',
    textAccent: 'text-white',
    chosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
    botSelectedBg: 'bg-[#800014]',
    botSelectedBorder: 'border-white text-white ring-2 ring-red-600',
    botChosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
  },
  mandalorian: {
    bgUnselected: 'bg-slate-900',
    bgSelected: 'bg-[#15803d]',
    borderUnselected: 'border-slate-700 hover:border-emerald-400',
    borderSelected: 'border-white ring-2 ring-emerald-500',
    badgeBg: 'bg-black/60 border-black/80 text-white',
    textAccent: 'text-white',
    chosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
    botSelectedBg: 'bg-[#15803d]',
    botSelectedBorder: 'border-white text-white ring-2 ring-emerald-500',
    botChosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
  },
  republic: {
    bgUnselected: 'bg-slate-900',
    bgSelected: 'bg-[#881337]',
    borderUnselected: 'border-slate-700 hover:border-rose-400',
    borderSelected: 'border-white ring-2 ring-rose-500',
    badgeBg: 'bg-black/60 border-black/80 text-white',
    textAccent: 'text-white',
    chosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
    botSelectedBg: 'bg-[#881337]',
    botSelectedBorder: 'border-white text-white ring-2 ring-rose-500',
    botChosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
  },
  separatist: {
    bgUnselected: 'bg-slate-900',
    bgSelected: 'bg-[#0369a1]',
    borderUnselected: 'border-slate-700 hover:border-sky-400',
    borderSelected: 'border-white ring-2 ring-sky-500',
    badgeBg: 'bg-black/60 border-black/80 text-white',
    textAccent: 'text-white',
    chosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
    botSelectedBg: 'bg-[#0369a1]',
    botSelectedBorder: 'border-white text-white ring-2 ring-sky-500',
    botChosenBadge: 'text-white bg-black/70 border-black/90 font-bold',
  },
};

export const GameSetupModal: React.FC<GameSetupModalProps> = ({
  initialSettings,
  isOpen,
  language,
  onStartGame,
}) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);

  if (!isOpen) return null;

  const getFactionIcon = (faction: PlayableFaction) => {
    return <FactionIcon faction={faction} className="w-5 h-5" glow />;
  };

  const handlePlayerFactionSelect = (faction: PlayableFaction) => {
    const config = FACTION_CONFIGS[faction];
    // Set appropriate recommended rival bot if bot is currently identical or invalid
    let newBotFaction = settings.botFaction;
    if (newBotFaction === faction) {
      newBotFaction = config.defaultRival;
    }
    setSettings({
      ...settings,
      playerFaction: faction,
      botFaction: newBotFaction,
    });
  };

  return (
    <div
      id="game-setup-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        id="game-setup-content"
        className="relative w-full max-w-2xl bg-slate-950 border-2 border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl text-white max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="text-center pb-3 mb-4 border-b border-slate-800">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
            STAR WARS: THE DECKBUILDING GAME
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-100 mt-0.5">
            {settings.language === 'it' ? 'Preparazione Partita & Espansioni' : 'Game & Expansion Setup'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {settings.language === 'it'
              ? 'Scegli la fazione da comandare e quella dell\'Avversario'
              : 'Choose your faction and the Opponent faction'}
          </p>
        </div>

        {/* 1. Player Faction Choice */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
              1. {settings.language === 'it' ? 'La tua Fazione (Giocatore)' : 'Your Faction (Player)'}
            </label>
            <span className="text-[10px] text-amber-400/80 font-mono">
              {PLAYABLE_FACTIONS.length} {settings.language === 'it' ? 'Fazioni disponibili' : 'Factions available'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {PLAYABLE_FACTIONS.map((factionKey) => {
              const config = FACTION_CONFIGS[factionKey];
              const theme = FACTION_THEMES[factionKey];
              const isSelected = settings.playerFaction === factionKey;
              return (
                <button
                  key={factionKey}
                  type="button"
                  id={`btn-select-faction-${factionKey}`}
                  onClick={() => handlePlayerFactionSelect(factionKey)}
                  className={`p-3 rounded-2xl border-2 transition text-left relative flex flex-col justify-between ${
                    isSelected
                      ? `${theme.bgSelected} ${theme.borderSelected}`
                      : `${theme.bgUnselected} ${theme.borderUnselected}`
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`p-1.5 rounded-lg border ${theme.badgeBg}`}>
                          {getFactionIcon(factionKey)}
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide text-slate-100">
                          {settings.language === 'it' ? config.shortNameIt : config.shortName}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-700/60 text-slate-300">
                        {config.expansion === 'base'
                          ? 'Base'
                          : config.expansion === 'mandalorian'
                          ? 'Mando'
                          : 'Clone Wars'}
                      </span>
                    </div>

                    <p className={`text-[11px] ${theme.textAccent} line-clamp-2 leading-snug font-medium`}>
                      {settings.language === 'it' ? config.descriptionIt : config.description}
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-1.5">
                    <span className="text-[10px] text-slate-300/80 font-mono">
                      Base: {settings.language === 'it' ? config.starterBaseNameIt : config.starterBaseName}
                    </span>
                    {isSelected ? (
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${theme.chosenBadge}`}>
                        {settings.language === 'it' ? '✓ Selezionata' : '✓ Selected'}
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase font-bold text-slate-400 opacity-60">
                        {settings.language === 'it' ? 'Scegli' : 'Select'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Opponent Faction Choice */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-rose-400" />
              <span>2. {settings.language === 'it' ? 'Fazione dell\'Avversario' : 'Opponent Faction'}</span>
            </label>
            <span className="text-[10px] text-slate-400">
              {settings.language === 'it' ? 'Scegli chi affronterai' : 'Choose your adversary'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PLAYABLE_FACTIONS.filter((f) => f !== settings.playerFaction).map((botFactionKey) => {
              const config = FACTION_CONFIGS[botFactionKey];
              const theme = FACTION_THEMES[botFactionKey];
              const isSelected = settings.botFaction === botFactionKey;
              return (
                <button
                  key={botFactionKey}
                  type="button"
                  id={`btn-select-bot-${botFactionKey}`}
                  onClick={() => setSettings({ ...settings, botFaction: botFactionKey })}
                  className={`p-2.5 rounded-xl border-2 transition text-center flex flex-col items-center justify-center ${
                    isSelected
                      ? `${theme.botSelectedBg} ${theme.botSelectedBorder} font-bold`
                      : `${theme.bgUnselected} ${theme.borderUnselected}`
                  }`}
                >
                  <div className="mb-1">{getFactionIcon(botFactionKey)}</div>
                  <div className="text-xs uppercase tracking-wide font-black text-slate-100">
                    {settings.language === 'it' ? config.shortNameIt : config.shortName}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[9px] font-mono text-slate-300 opacity-80">
                      {config.expansion === 'base' ? 'Base' : config.expansion === 'mandalorian' ? 'Mando' : 'Clone Wars'}
                    </span>
                    {isSelected && (
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${theme.botChosenBadge}`}>
                        {settings.language === 'it' ? 'Rivale' : 'Rival'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Galaxy Deck Mode & Bot Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Galaxy Deck Era Composition */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
              {settings.language === 'it' ? 'Mazzo Galassia' : 'Galaxy Deck Mode'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, galaxyDeckType: 'duel' })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium transition border text-center ${
                  settings.galaxyDeckType === 'duel' || !settings.galaxyDeckType
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}
              >
                <div>{settings.language === 'it' ? 'Duello Fazioni' : 'Faction Duel'}</div>
                <div className="text-[9px] text-slate-400 font-normal">
                  {settings.language === 'it' ? 'Solo le 2 fazioni in gara' : 'Only current 2 factions'}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, galaxyDeckType: 'all_eras' })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium transition border text-center ${
                  settings.galaxyDeckType === 'all_eras'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}
              >
                <div>{settings.language === 'it' ? 'Tutte le Ere' : 'All Eras'}</div>
                <div className="text-[9px] text-slate-400 font-normal">
                  {settings.language === 'it' ? 'Mazzo espanso completo' : 'Full combined deck'}
                </div>
              </button>
            </div>
          </div>

          {/* Opponent Difficulty */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
              {settings.language === 'it' ? 'Difficoltà dell\'Avversario' : 'Opponent Difficulty'}
            </span>
            <div className="grid grid-cols-3 gap-1">
              {(['recruit', 'officer', 'master'] as BotDifficulty[]).map((diff) => {
                const isSel = settings.difficulty === diff;
                const labels = {
                  recruit: settings.language === 'it' ? 'Recluta' : 'Recruit',
                  officer: settings.language === 'it' ? 'Ufficiale' : 'Officer',
                  master: settings.language === 'it' ? 'Maestro' : 'Master',
                };
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSettings({ ...settings, difficulty: diff })}
                    className={`py-1.5 px-1 rounded-lg border text-center text-xs transition ${
                      isSel
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {labels[diff]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Bases to win & Handicap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Bases to win */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
              {settings.language === 'it' ? 'Basi per Vincere' : 'Bases to Win'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, basesToWin: 3 })}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono transition border ${
                  settings.basesToWin === 3
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}
              >
                3 {settings.language === 'it' ? '(Rapida)' : '(Fast)'}
              </button>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, basesToWin: 4 })}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono transition border ${
                  settings.basesToWin === 4
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}
              >
                4 {settings.language === 'it' ? '(Standard)' : '(Standard)'}
              </button>
            </div>
          </div>

          {/* First turn handicap */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
              {settings.language === 'it' ? 'Regola Ufficiale Handicap' : 'First Turn Handicap'}
            </span>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 mt-1">
              <input
                type="checkbox"
                checked={settings.firstTurnHandicap}
                onChange={(e) =>
                  setSettings({ ...settings, firstTurnHandicap: e.target.checked })
                }
                className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700 focus:ring-0"
              />
              <span>
                {settings.language === 'it'
                  ? 'Il primo giocatore pesca 3 carte al Turno 1'
                  : 'First player draws 3 cards on Turn 1'}
              </span>
            </label>
          </div>
        </div>

        {/* Audio & Language toggles */}
        <div className="flex items-center justify-between pt-3 mb-5 border-t border-slate-800 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
            className="flex items-center gap-1.5 hover:text-slate-200 transition"
          >
            {settings.soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>{settings.language === 'it' ? 'Audio: Attivo' : 'Audio: On'}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span>{settings.language === 'it' ? 'Audio: Spento' : 'Audio: Off'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setSettings({
                ...settings,
                language: settings.language === 'it' ? 'en' : 'it',
              })
            }
            className="flex items-center gap-1.5 hover:text-slate-200 transition font-mono"
          >
            <span>Lingua / Language:</span>
            <strong className="text-amber-300 uppercase">
              {settings.language === 'it' ? 'Italiano' : 'English'}
            </strong>
          </button>
        </div>

        {/* Start Game Button */}
        <button
          id="btn-start-game"
          type="button"
          onClick={() => onStartGame(settings)}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(251,191,36,0.4)] transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Swords className="w-5 h-5" />
          <span>
            {settings.language === 'it' ? 'INIZIA LA BATTAGLIA!' : 'LAUNCH BATTLE!'}
          </span>
        </button>
      </div>
    </div>
  );
};
