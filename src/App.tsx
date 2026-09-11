/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameState,
  GameSettings,
  PlayersMap,
  Card,
  Base,
  PlayableFaction,
} from './types/game';
import {
  initializeGame,
  initializePlayers,
  playCard,
  playAllHand,
  buyGalaxyRowCard,
  buyOuterRimPilotCard,
  sabotageGalaxyCard,
  attackCapitalShip,
  attackEnemyBase,
  useActiveBaseAbility,
  selectReplacementBase,
  endTurn,
  exileOuterRimPilot,
  useJabbaBribe,
} from './logic/gameEngine';
import { executeBotTurn, chooseBotReplacementBase } from './logic/botAi';
import { sounds } from './audio/soundEffects';
import { FACTION_CONFIGS } from './data/factions';

// Components
import { ForceTrack } from './components/ForceTrack';
import { GalaxyRow } from './components/GalaxyRow';
import { PlayerArea } from './components/PlayerArea';
import { BotArea } from './components/BotArea';
import { GameSetupModal } from './components/GameSetupModal';
import { RulesModal } from './components/RulesModal';
import { GameLogModal } from './components/GameLogModal';
import { BaseSelectModal } from './components/BaseSelectModal';
import { CardInspectorModal } from './components/CardInspectorModal';
import { CardDatabaseModal } from './components/CardDatabaseModal';
import { VictoryModal } from './components/VictoryModal';
import { FactionIcon } from './components/FactionIcon';

// Icons
import {
  BookOpen,
  Scroll,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Layers,
} from 'lucide-react';

const DEFAULT_SETTINGS: GameSettings = {
  playerFaction: 'rebel',
  botFaction: 'empire',
  difficulty: 'officer',
  basesToWin: 4,
  firstTurnHandicap: true,
  soundEnabled: true,
  language: 'it',
  galaxyDeckType: 'all_eras',
};

export default function App() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [gameState, setGameState] = useState<GameState>(() =>
    initializeGame(DEFAULT_SETTINGS)
  );
  const [players, setPlayers] = useState<PlayersMap>(() =>
    initializePlayers(DEFAULT_SETTINGS)
  );

  // Modals & UI state
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [showCardDatabaseModal, setShowCardDatabaseModal] = useState<boolean>(false);
  const [inspectingCard, setInspectingCard] = useState<Card | null>(null);
  const [inspectingBase, setInspectingBase] = useState<Base | null>(null);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);

  // Bot thinking ref guard to avoid duplicate executions
  const botTurnRunningRef = useRef<boolean>(false);

  // Sync sound setting
  useEffect(() => {
    sounds.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  // Restart / Start match with new settings
  const startNewGame = useCallback((newSettings: GameSettings) => {
    setSettings(newSettings);
    const newGameState = initializeGame(newSettings);
    const newPlayers = initializePlayers(newSettings);
    setGameState(newGameState);
    setPlayers(newPlayers);
    setShowSetupModal(false);
    sounds.playCard();
  }, []);

  // Current human player & bot player
  const humanFaction: PlayableFaction = settings.playerFaction;
  const botFaction: PlayableFaction =
    settings.botFaction || (humanFaction === 'rebel' ? 'empire' : 'rebel');

  const humanPlayer = players[humanFaction] || players[Object.keys(players)[0]];
  const botPlayer = players[botFaction] || players[Object.keys(players)[1]];

  const isHumanTurn =
    gameState.currentTurn === humanFaction && gameState.phase === 'action';

  const humanConfig = FACTION_CONFIGS[humanFaction];

  // Bot Turn Trigger Watcher & Automatic Base Replacement Watcher
  useEffect(() => {
    // 1. Bot needs to choose a replacement base (e.g. after human destroys it)
    if (
      gameState.phase === 'base_selection' &&
      gameState.pendingBaseSelectionPlayer === botFaction &&
      !isBotThinking &&
      !botTurnRunningRef.current &&
      !gameState.winner
    ) {
      botTurnRunningRef.current = true;
      setIsBotThinking(true);

      const timer = setTimeout(() => {
        try {
          const bot = players[botFaction];
          if (bot) {
            const chosenBaseId = chooseBotReplacementBase(gameState, bot, gameState.settings.difficulty);
            if (chosenBaseId) {
              const res = selectReplacementBase(gameState, botFaction, chosenBaseId, players);
              setGameState(res.state);
              setPlayers(res.players);
            }
          }
        } catch (err) {
          console.error('Bot base selection error:', err);
        } finally {
          setIsBotThinking(false);
          botTurnRunningRef.current = false;
        }
      }, 250);

      return () => clearTimeout(timer);
    }

    // 2. Normal Bot Turn execution (rapid, decisive)
    if (
      gameState.currentTurn === botFaction &&
      gameState.phase === 'action' &&
      !isBotThinking &&
      !botTurnRunningRef.current &&
      !gameState.winner
    ) {
      botTurnRunningRef.current = true;
      setIsBotThinking(true);

      const timer = setTimeout(async () => {
        try {
          const res = await executeBotTurn(
            gameState,
            players,
            (intermediateState, intermediatePlayers) => {
              setGameState(intermediateState);
              setPlayers(intermediatePlayers);
            },
            180 // Fast 180ms delay between actions
          );
          setGameState(res.state);
          setPlayers(res.players);
        } catch (err) {
          console.error('Bot execution error:', err);
        } finally {
          setIsBotThinking(false);
          botTurnRunningRef.current = false;
        }
      }, 300); // 300ms reaction time instead of 700ms

      return () => clearTimeout(timer);
    }
  }, [
    gameState.currentTurn,
    gameState.phase,
    gameState.pendingBaseSelectionPlayer,
    botFaction,
    isBotThinking,
    gameState.winner,
    gameState,
    players,
  ]);

  // Player Actions:
  const handlePlayCard = (card: Card) => {
    if (!isHumanTurn) return;
    const res = playCard(gameState, humanFaction, card.instanceId, players);
    setGameState(res.state);
    setPlayers(res.players);
  };

  const handlePlayAll = () => {
    if (!isHumanTurn) return;
    const res = playAllHand(gameState, humanFaction, players);
    setGameState(res.state);
    setPlayers(res.players);
  };

  const handleBuySlot = (slotIndex: number) => {
    if (!isHumanTurn) return;
    const res = buyGalaxyRowCard(gameState, humanFaction, slotIndex, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleBuyPilot = () => {
    if (!isHumanTurn) return;
    const res = buyOuterRimPilotCard(gameState, humanFaction, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleSabotageSlot = (slotIndex: number) => {
    if (!isHumanTurn) return;
    const res = sabotageGalaxyCard(gameState, humanFaction, slotIndex, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleAttackCapitalShip = (shipId: string, damage: number) => {
    if (!isHumanTurn) return;
    const res = attackCapitalShip(gameState, humanFaction, shipId, damage, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleAttackBase = (damage: number) => {
    if (!isHumanTurn) return;
    const res = attackEnemyBase(gameState, humanFaction, damage, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleUseBaseAbility = () => {
    if (!isHumanTurn) return;
    const res = useActiveBaseAbility(gameState, humanFaction, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleExileOuterRimPilot = (instanceId: string, source: 'hand' | 'inPlay') => {
    if (!isHumanTurn) return;
    const res = exileOuterRimPilot(gameState, humanFaction, instanceId, source, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleUseJabbaBribe = () => {
    if (!isHumanTurn) return;
    const res = useJabbaBribe(gameState, humanFaction, players);
    if (res) {
      setGameState(res.state);
      setPlayers(res.players);
    }
  };

  const handleEndTurn = () => {
    if (!isHumanTurn) return;
    const res = endTurn(gameState, humanFaction, players);
    setGameState(res.state);
    setPlayers(res.players);
  };

  const handleSelectReplacementBase = (baseId: string) => {
    const res = selectReplacementBase(gameState, humanFaction, baseId, players);
    setGameState(res.state);
    setPlayers(res.players);
  };

  const toggleLanguage = () => {
    const nextLang = settings.language === 'it' ? 'en' : 'it';
    setSettings({ ...settings, language: nextLang });
  };

  const toggleSound = () => {
    const nextSound = !settings.soundEnabled;
    setSettings({ ...settings, soundEnabled: nextSound });
    sounds.enabled = nextSound;
  };

  // Human needs to pick a base check
  const showBaseSelectModal =
    gameState.phase === 'base_selection' &&
    gameState.pendingBaseSelectionPlayer === humanFaction;

  const latestLog = gameState.logs[0];

  return (
    <div className="min-h-screen starfield-bg text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 pb-8">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border flex items-center justify-center shadow ${
                humanConfig?.badgeColor || 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              <FactionIcon faction={humanFaction} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-sm sm:text-base tracking-wider uppercase text-slate-100 font-display">
                  Star Wars: Deckbuilding
                </h1>
                <span className="text-[10px] font-mono uppercase bg-slate-800/80 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">
                  {settings.language === 'it' ? 'vs Avversario' : 'vs Opponent'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">
                {settings.language === 'it'
                  ? `Turno ${gameState.turnNumber} • ${humanConfig?.nameIt || humanFaction} vs ${
                      FACTION_CONFIGS[botFaction]?.nameIt || botFaction
                    }`
                  : `Turn ${gameState.turnNumber} • ${humanConfig?.name || humanFaction} vs ${
                      FACTION_CONFIGS[botFaction]?.name || botFaction
                    }`}
              </p>
            </div>
          </div>

          {/* Center Status / Turn indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 shadow ${
                isHumanTurn
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300 animate-pulse'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isHumanTurn ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span>
                {isHumanTurn
                  ? settings.language === 'it'
                    ? 'È il Tuo Turno!'
                    : 'Your Turn!'
                  : settings.language === 'it'
                  ? 'Turno dell\'Avversario...'
                  : 'Opponent is playing...'}
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Card Archive Button */}
            <button
              id="btn-nav-cards-archive"
              onClick={() => setShowCardDatabaseModal(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 transition flex items-center gap-1.5 text-xs cursor-pointer shadow-sm"
              title={settings.language === 'it' ? 'Archivio Carte per Fazione' : 'Cards by Faction'}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline font-bold">
                {settings.language === 'it' ? 'Archivio' : 'Cards'}
              </span>
            </button>

            {/* Rules Button */}
            <button
              id="btn-nav-rules"
              onClick={() => setShowRulesModal(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 transition flex items-center gap-1 text-xs cursor-pointer"
              title={settings.language === 'it' ? 'Regolamento' : 'Rules'}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">
                {settings.language === 'it' ? 'Regole' : 'Rules'}
              </span>
            </button>

            {/* Combat Log Button */}
            <button
              id="btn-nav-log"
              onClick={() => setShowLogModal(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition flex items-center gap-1 text-xs cursor-pointer"
              title={settings.language === 'it' ? 'Cronologia' : 'Action Log'}
            >
              <Scroll className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">
                {settings.language === 'it' ? 'Registro' : 'Log'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-nav-sound"
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
              title={settings.soundEnabled ? 'Audio Attivo' : 'Audio Disattivo'}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              id="btn-nav-lang"
              onClick={toggleLanguage}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition font-mono text-xs font-bold uppercase cursor-pointer"
              title="Cambia Lingua"
            >
              {settings.language}
            </button>

            {/* New Match / Settings */}
            <button
              id="btn-nav-new-match"
              onClick={() => setShowSetupModal(true)}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {settings.language === 'it' ? 'Nuova Partita' : 'New Match'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Board Layout */}
      <main className="max-w-7xl mx-auto w-full p-2 sm:p-4 space-y-3.5 flex-1">
        {/* Latest Log Ticker */}
        {latestLog && (
          <div
            onClick={() => setShowLogModal(true)}
            className="w-full bg-slate-950/60 hover:bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-400 flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
              <span className="font-mono text-slate-500 font-bold">
                T{latestLog.turn} [{latestLog.actorName}]:
              </span>
              <span className="text-slate-300 truncate">
                {settings.language === 'it' ? latestLog.messageIt : latestLog.message}
              </span>
            </div>
            <span className="text-[10px] text-amber-400 font-bold ml-2 whitespace-nowrap">
              {settings.language === 'it' ? 'Vedi tutto »' : 'View all »'}
            </span>
          </div>
        )}

        {/* 1. TOP: Bot Area (Base & Fleet) */}
        {botPlayer && (
          <BotArea
            bot={botPlayer}
            humanAttack={humanPlayer?.attack || 0}
            isPlayerTurn={isHumanTurn}
            language={settings.language}
            basesToWin={settings.basesToWin}
            onAttackBase={handleAttackBase}
            onAttackCapitalShip={handleAttackCapitalShip}
            onInspectCard={(card) => setInspectingCard(card)}
          />
        )}

        {/* 2. MIDDLE: Force Track + Galaxy Row */}
        <div className="space-y-3">
          <ForceTrack
            forceBalance={gameState.forceBalance}
            playerFaction={humanFaction}
            botFaction={botFaction}
            language={settings.language}
          />

          <GalaxyRow
            galaxyRow={gameState.galaxyRow}
            galaxyDeckCount={gameState.galaxyDeck.length}
            outerRimPilotsCount={gameState.outerRimPilotsCount}
            playerResources={humanPlayer?.resources || 0}
            playerAttack={humanPlayer?.attack || 0}
            playerFaction={humanFaction}
            isPlayerTurn={isHumanTurn}
            language={settings.language}
            onBuySlot={handleBuySlot}
            onBuyPilot={handleBuyPilot}
            onSabotageSlot={handleSabotageSlot}
            onInspectCard={(card) => setInspectingCard(card)}
          />
        </div>

        {/* 3. BOTTOM: Player Area (Base, Fleet, Stats & Hand) */}
        {humanPlayer && (
          <PlayerArea
            player={humanPlayer}
            isPlayerTurn={isHumanTurn}
            language={settings.language}
            basesToWin={settings.basesToWin}
            onPlayCard={handlePlayCard}
            onPlayAll={handlePlayAll}
            onUseBaseAbility={handleUseBaseAbility}
            onEndTurn={handleEndTurn}
            onInspectCard={(card) => setInspectingCard(card)}
            onExileOuterRimPilot={handleExileOuterRimPilot}
            onUseJabbaBribe={handleUseJabbaBribe}
          />
        )}
      </main>

      {/* MODALS */}
      {/* 1. Game Setup Modal */}
      <GameSetupModal
        initialSettings={settings}
        isOpen={showSetupModal}
        language={settings.language}
        onStartGame={startNewGame}
      />

      {/* 2. Card Database / Archive Modal */}
      {showCardDatabaseModal && (
        <CardDatabaseModal
          isOpen={showCardDatabaseModal}
          language={settings.language}
          onClose={() => setShowCardDatabaseModal(false)}
        />
      )}

      {/* 3. Rules Guide Modal */}
      {showRulesModal && (
        <RulesModal
          language={settings.language}
          onClose={() => setShowRulesModal(false)}
        />
      )}

      {/* 3. Action Log Modal */}
      {showLogModal && (
        <GameLogModal
          logs={gameState.logs}
          language={settings.language}
          onClose={() => setShowLogModal(false)}
        />
      )}

      {/* 4. Card / Base Inspector Modal */}
      {(inspectingCard || inspectingBase) && (
        <CardInspectorModal
          card={inspectingCard}
          base={inspectingBase}
          language={settings.language}
          onClose={() => {
            setInspectingCard(null);
            setInspectingBase(null);
          }}
        />
      )}

      {/* 5. Base Selection Modal (When player base is destroyed) */}
      {showBaseSelectModal && humanPlayer && (
        <BaseSelectModal
          availableBases={humanPlayer.availableBases}
          language={settings.language}
          onSelectBase={handleSelectReplacementBase}
        />
      )}

      {/* 6. Victory / Defeat Modal */}
      {gameState.phase === 'game_over' && gameState.winner && (
        <VictoryModal
          winner={gameState.winner}
          playerFaction={humanFaction}
          turnNumber={gameState.turnNumber}
          forceBalance={gameState.forceBalance}
          players={players}
          language={settings.language}
          onRematch={() => startNewGame(settings)}
          onOpenSetup={() => {
            setShowSetupModal(true);
          }}
        />
      )}
    </div>
  );
}
