import { PlayableFaction } from '../types/game';

export interface FactionConfig {
  id: PlayableFaction;
  name: string;
  nameIt: string;
  shortName: string;
  shortNameIt: string;
  era: 'original' | 'clone_wars' | 'mandalorian';
  eraName: string;
  eraNameIt: string;
  expansion: 'base' | 'mandalorian' | 'clone_wars';
  description: string;
  descriptionIt: string;
  lore: string;
  loreIt: string;
  keyUnits: string;
  keyUnitsIt: string;
  starterBaseName: string;
  starterBaseNameIt: string;
  alignment: 'light' | 'dark' | 'clan';
  defaultOpponent: PlayableFaction;
  defaultRival: PlayableFaction;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  badgeColor: string;
  accentColor: string;
  themeGradient: string;
  iconName: string; // Lucide icon name
}

export const FACTION_CONFIGS: Record<PlayableFaction, FactionConfig> = {
  rebel: {
    id: 'rebel',
    name: 'Rebel Alliance',
    nameIt: 'Alleanza Ribelle',
    shortName: 'Rebels',
    shortNameIt: 'Ribelli',
    era: 'original',
    eraName: 'Original Trilogy',
    eraNameIt: 'Trilogia Classica',
    expansion: 'base',
    description: 'Mastery of the Force, fast starfighters, and heroic unity against the Empire.',
    descriptionIt: "Maestria della Forza, caccia stellari agili e unità eroica contro l'Impero.",
    lore: 'Led by Mon Mothma, Leia Organa, and Luke Skywalker, fighting to restore freedom.',
    loreIt: "Guidata da Mon Mothma, Leia Organa e Luke Skywalker per restaurare la libertà.",
    keyUnits: 'Luke Skywalker, Millennium Falcon, Mon Calamari Cruiser',
    keyUnitsIt: 'Luke Skywalker, Millennium Falcon, Incrociatore Mon Calamari',
    starterBaseName: 'Dantooine',
    starterBaseNameIt: 'Dantooine',
    alignment: 'light',
    defaultOpponent: 'empire',
    defaultRival: 'empire',
    badgeBg: 'bg-blue-950/80',
    badgeBorder: 'border-blue-500/40',
    badgeText: 'text-blue-400',
    badgeColor: 'bg-blue-950/80 border-blue-500/50 text-blue-300',
    accentColor: '#3b82f6',
    themeGradient: 'from-blue-950/80 via-slate-900 to-black',
    iconName: 'Sparkles',
  },
  empire: {
    id: 'empire',
    name: 'Galactic Empire',
    nameIt: 'Impero Galattico',
    shortName: 'Empire',
    shortNameIt: 'Impero',
    era: 'original',
    eraName: 'Original Trilogy',
    eraNameIt: 'Trilogia Classica',
    expansion: 'base',
    description: 'Overwhelming starfleet firepower, Sith brutality, and calculated domination.',
    descriptionIt: 'Potenza di fuoco schiacciante della flotta, brutalità Sith e dominio calcolato.',
    lore: 'Ruled by Emperor Palpatine and Darth Vader through fear and the Death Star.',
    loreIt: "Governato dall'Imperatore Palpatine e Darth Vader attraverso il terrore e la Morte Nera.",
    keyUnits: 'Darth Vader, Grand Moff Tarkin, Star Destroyer, Death Star',
    keyUnitsIt: 'Darth Vader, Grand Moff Tarkin, Star Destroyer, Morte Nera',
    starterBaseName: 'Lothal',
    starterBaseNameIt: 'Lothal',
    alignment: 'dark',
    defaultOpponent: 'rebel',
    defaultRival: 'rebel',
    badgeBg: 'bg-red-950/80',
    badgeBorder: 'border-red-500/40',
    badgeText: 'text-red-400',
    badgeColor: 'bg-red-950/80 border-red-500/50 text-red-300',
    accentColor: '#ef4444',
    themeGradient: 'from-red-950/80 via-zinc-900 to-black',
    iconName: 'Flame',
  },
  mandalorian: {
    id: 'mandalorian',
    name: 'Mandalorian Clans',
    nameIt: 'Clan Mandaloriani',
    shortName: 'Mandalorians',
    shortNameIt: 'Mandaloriani',
    era: 'mandalorian',
    eraName: 'The Mandalorian Expansion',
    eraNameIt: 'Espansione The Mandalorian',
    expansion: 'mandalorian',
    description: 'Indestructible Beskar armor, Creed honor, Bounty Hunting, and fierce combat tactics.',
    descriptionIt: "Armature in Beskar indistruttibili, onore del Credo, Caccia alle Taglie e tattiche d'élite.",
    lore: 'Warriors bound by the Way of the Mandalore, surviving the Purge to reclaim their honor.',
    loreIt: 'Guerrieri legati dalla Via di Mandalore, sopravvissuti alla Purga per riscattare il proprio onore.',
    keyUnits: 'Din Djarin (Mando), Grogu, Bo-Katan Kryze, Razor Crest, The Armorer',
    keyUnitsIt: "Din Djarin (Il Mandaloriano), Grogu, Bo-Katan Kryze, Razor Crest, L'Armaiola",
    starterBaseName: 'Nevarro Enclave',
    starterBaseNameIt: 'Enclave di Nevarro',
    alignment: 'clan',
    defaultOpponent: 'empire',
    defaultRival: 'empire',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400',
    badgeColor: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300',
    accentColor: '#10b981',
    themeGradient: 'from-emerald-950/80 via-teal-950 to-slate-950',
    iconName: 'Shield',
  },
  republic: {
    id: 'republic',
    name: 'Galactic Republic',
    nameIt: 'Repubblica Galattica',
    shortName: 'Republic',
    shortNameIt: 'Repubblica',
    era: 'clone_wars',
    eraName: 'Clone Wars Expansion',
    eraNameIt: 'Espansione Guerre dei Cloni',
    expansion: 'clone_wars',
    description: 'Jedi High Council, disciplined Clone Trooper squads, and formidable Venator warships.',
    descriptionIt: 'Alto Consiglio Jedi, squadre disciplinate di Soldati Clone e potenti incrociatori Venator.',
    lore: 'Defending galactic democracy under the leadership of the Jedi and Supreme Chancellor.',
    loreIt: 'A difesa della democrazia galattica sotto la guida dei Jedi e del Supremo Cancelliere.',
    keyUnits: 'Anakin Skywalker, Obi-Wan Kenobi, Captain Rex, Venator Star Destroyer',
    keyUnitsIt: 'Anakin Skywalker, Obi-Wan Kenobi, Capitano Rex, Star Destroyer Venator',
    starterBaseName: 'Coruscant Temple',
    starterBaseNameIt: 'Tempio di Coruscant',
    alignment: 'light',
    defaultOpponent: 'separatist',
    defaultRival: 'separatist',
    badgeBg: 'bg-amber-950/80',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-400',
    badgeColor: 'bg-amber-950/80 border-amber-500/50 text-amber-300',
    accentColor: '#f59e0b',
    themeGradient: 'from-amber-950/80 via-yellow-950/40 to-slate-950',
    iconName: 'Swords',
  },
  separatist: {
    id: 'separatist',
    name: 'Separatist Alliance',
    nameIt: 'Confederazione Separatista',
    shortName: 'Separatists',
    shortNameIt: 'Separatisti',
    era: 'clone_wars',
    eraName: 'Clone Wars Expansion',
    eraNameIt: 'Espansione Guerre dei Cloni',
    expansion: 'clone_wars',
    description: 'Swarming Droid armies, dark Sith machinations, and colossal Lucrehulk battleships.',
    descriptionIt: 'Sciami di armate di Droidi, oscure macchinazioni Sith e colossali navi da battaglia Lucrehulk.',
    lore: 'The Confederacy of Independent Systems, commanded by Count Dooku and General Grievous.',
    loreIt: 'La Confederazione dei Sistemi Indipendenti, comandata dal Conte Dooku e dal Generale Grievous.',
    keyUnits: 'General Grievous, Count Dooku, Asajj Ventress, Lucrehulk Battleship',
    keyUnitsIt: 'Generale Grievous, Conte Dooku, Asajj Ventress, Nave Lucrehulk',
    starterBaseName: 'Geonosis Foundry',
    starterBaseNameIt: 'Fonderia di Geonosis',
    alignment: 'dark',
    defaultOpponent: 'republic',
    defaultRival: 'republic',
    badgeBg: 'bg-purple-950/80',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-400',
    badgeColor: 'bg-purple-950/80 border-purple-500/50 text-purple-300',
    accentColor: '#a855f7',
    themeGradient: 'from-purple-950/80 via-indigo-950 to-slate-950',
    iconName: 'Zap',
  },
};

export const ALL_PLAYABLE_FACTIONS: PlayableFaction[] = [
  'rebel',
  'empire',
  'mandalorian',
  'republic',
  'separatist',
];

export const PLAYABLE_FACTIONS = ALL_PLAYABLE_FACTIONS;
