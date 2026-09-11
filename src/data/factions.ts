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
    badgeBg: 'bg-[#4a1c24]',
    badgeBorder: 'border-rose-400/50',
    badgeText: 'text-rose-200',
    badgeColor: 'bg-[#4a1c24] border-rose-400/50 text-rose-200',
    accentColor: '#8a3541',
    themeGradient: 'from-[#4a1c24] via-stone-900 to-black',
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
    badgeBg: 'bg-[#1c2c3d]',
    badgeBorder: 'border-sky-400/50',
    badgeText: 'text-sky-200',
    badgeColor: 'bg-[#1c2c3d] border-sky-400/50 text-sky-200',
    accentColor: '#36516e',
    themeGradient: 'from-[#1c2c3d] via-slate-900 to-black',
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
    badgeBg: 'bg-[#1c3527]',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-200',
    badgeColor: 'bg-[#1c3527] border-emerald-500/50 text-emerald-200',
    accentColor: '#37624b',
    themeGradient: 'from-[#1c3527] via-slate-900 to-black',
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
    badgeBg: 'bg-[#421925]',
    badgeBorder: 'border-rose-400/50',
    badgeText: 'text-rose-200',
    badgeColor: 'bg-[#421925] border-rose-400/50 text-rose-200',
    accentColor: '#6f2e3e',
    themeGradient: 'from-[#421925] via-slate-900 to-black',
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
    badgeBg: 'bg-[#183446]',
    badgeBorder: 'border-sky-400/50',
    badgeText: 'text-sky-200',
    badgeColor: 'bg-[#183446] border-sky-400/50 text-sky-200',
    accentColor: '#2b5874',
    themeGradient: 'from-[#183446] via-slate-900 to-black',
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

/**
 * Spartan solid monocolor styles for cards and bases (no gradients, no glow, pure flat 2D)
 * - Ribelli: Rosso carminio tenue (#6b2a34) (invertito con Impero per richiesta utente)
 * - Impero: Blu ardesia tenue (#2b3e54) (invertito con Ribelli per richiesta utente)
 * - Repubblica: Amaranto tenue (#5e2533)
 * - Neutrali: Grigio tenue (#39424e)
 * - Separatisti: Azzurro tenue (#24465c)
 * - Mandaloriani: Verde salvia tenue (#284a36)
 */
export function getFactionSolidCardStyle(faction: string): {
  bg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentHex: string;
} {
  switch (faction) {
    case 'rebel':
      // Ribelli: Rosso carminio tenue (invertito con Impero)
      return {
        bg: 'bg-[#6b2a34]',
        border: 'border-[#451820]',
        badgeBg: 'bg-[#3b141b]',
        badgeText: 'text-rose-100',
        badgeBorder: 'border-rose-400/60',
        accentHex: '#80323e',
      };
    case 'empire':
      // Impero: Blu tenue (invertito con Ribelli)
      return {
        bg: 'bg-[#2b3e54]',
        border: 'border-[#182535]',
        badgeBg: 'bg-[#151f2c]',
        badgeText: 'text-sky-100',
        badgeBorder: 'border-sky-400/60',
        accentHex: '#354c66',
      };
    case 'republic':
      return {
        bg: 'bg-[#5e2533]',
        border: 'border-[#3a141e]',
        badgeBg: 'bg-[#2e1017]',
        badgeText: 'text-rose-100',
        badgeBorder: 'border-rose-300/60',
        accentHex: '#733040',
      };
    case 'separatist':
      return {
        bg: 'bg-[#24465c]',
        border: 'border-[#152a37]',
        badgeBg: 'bg-[#0f1e28]',
        badgeText: 'text-sky-100',
        badgeBorder: 'border-sky-300/60',
        accentHex: '#2d546e',
      };
    case 'mandalorian':
      return {
        bg: 'bg-[#284a36]',
        border: 'border-[#172e21]',
        badgeBg: 'bg-[#112117]',
        badgeText: 'text-emerald-100',
        badgeBorder: 'border-emerald-300/60',
        accentHex: '#335b43',
      };
    case 'neutral':
    default:
      return {
        bg: 'bg-[#39424e]',
        border: 'border-[#222830]',
        badgeBg: 'bg-[#1a1f26]',
        badgeText: 'text-slate-200',
        badgeBorder: 'border-slate-400/60',
        accentHex: '#4d5867',
      };
  }
}
