export type PlayableFaction = 'rebel' | 'empire' | 'mandalorian' | 'republic' | 'separatist';
export type Faction = PlayableFaction | 'neutral';
export type CardType = 'unit' | 'capital_ship';
export type BotDifficulty = 'recruit' | 'officer' | 'master';

export interface CardReward {
  description: string;
  descriptionIt: string;
  resources?: number;
  attack?: number;
  force?: number;
  drawCards?: number;
  healBase?: number;
}

export interface CardTemplate {
  id: string;
  name: string;
  nameIt: string;
  faction: Faction;
  type: CardType;
  cost: number;
  attack: number;
  resources: number;
  force: number;
  hull?: number; // for capital ships
  targetValue?: number; // for opposing sabotage/reward
  targetReward?: CardReward;
  abilityText: string;
  abilityTextIt: string;
  hasForceAbility?: boolean;
  forceBonusAttack?: number;
  forceBonusResources?: number;
  forceBonusDraw?: number;
  traits?: string[];
  uniqueName?: string;
  iconName?: string; // Lucide icon identifier
  colorTone: string;
}

export interface Card extends CardTemplate {
  instanceId: string;
  currentDamage?: number; // for capital ships in fleet
}

export interface Base {
  id: string;
  name: string;
  nameIt: string;
  faction: PlayableFaction;
  isStarter: boolean;
  maxHp: number;
  currentHp: number;
  abilityText: string;
  abilityTextIt: string;
  abilityType?: 'passive' | 'action' | 'on_destroy';
  usedAbilityThisTurn?: boolean;
  colorTone: string;
}

export interface DeckCardEntry {
  template: CardTemplate;
  quantity: number;
}

export interface DeckBundle {
  id: string;
  name: string;
  nameIt: string;
  faction: Faction;
  category: 'starter' | 'galaxy' | 'base' | 'fleet' | 'pilots';
  description: string;
  descriptionIt: string;
  totalCards: number;
  sheetSource?: string;
  cards: DeckCardEntry[];
  bases?: Base[];
}

export interface PlayerState {
  faction: PlayableFaction;
  isHuman: boolean;
  name: string;
  resources: number;
  attack: number;
  deck: Card[];
  hand: Card[];
  inPlay: Card[]; // Units played this turn
  fleet: Card[]; // Capital ships in fleet
  discard: Card[];
  activeBase: Base;
  availableBases: Base[];
  destroyedBases: Base[]; // Enemy bases destroyed by this player
}

export type PlayersMap = Record<string, PlayerState>;

export interface GameLogEntry {
  id: string;
  turn: number;
  faction: PlayableFaction;
  actorName: string;
  message: string;
  messageIt: string;
  type: 'play' | 'buy' | 'sabotage' | 'attack' | 'force' | 'base_destroyed' | 'ability' | 'turn_start' | 'info';
  timestamp: number;
}

export interface GameSettings {
  playerFaction: PlayableFaction;
  botFaction: PlayableFaction;
  difficulty: BotDifficulty;
  basesToWin: number; // 3 or 4
  firstTurnHandicap: boolean; // Turn 1 first player draws 3 cards
  soundEnabled: boolean;
  language: 'it' | 'en';
  galaxyDeckType?: 'duel' | 'all_eras';
}

export interface GameState {
  settings: GameSettings;
  forceBalance: number; // -6 (Player / Light) to 0 (Neutral) to +6 (Bot / Dark)
  galaxyDeck: Card[];
  galaxyRow: (Card | null)[];
  galaxyDiscard: Card[];
  outerRimPilotsCount: number;
  currentTurn: PlayableFaction;
  turnNumber: number;
  phase: 'action' | 'base_selection' | 'game_over';
  winner: PlayableFaction | null;
  logs: GameLogEntry[];
  pendingBaseSelectionPlayer: PlayableFaction | null;
  selectedCardForInspect: Card | null;
  selectedBaseForInspect: Base | null;
  pendingExilePrompt: {
    titleIt: string;
    titleEn: string;
    cards: Card[];
    source: 'hand' | 'discard';
  } | null;
}
