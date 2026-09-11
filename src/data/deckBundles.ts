import { DeckBundle } from '../types/game';
import {
  ALLIANCE_SHUTTLE,
  REBEL_TROOPER,
  TEMPLE_GUARDIAN,
  IMPERIAL_SHUTTLE,
  STORMTROOPER,
  INQUISITOR,
  OUTER_RIM_PILOT,
  GALAXY_TEMPLATES,
  REBEL_BASES,
  EMPIRE_BASES,
} from './cards';
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
} from './cardsCloneWars';
import {
  MANDALORIAN_FOUNDLING,
  MANDALORIAN_WARRIOR,
  CREED_INITIATE,
  MANDALORIAN_GALAXY_TEMPLATES,
  MANDALORIAN_BASES,
} from './cardsMandalorian';

// Helper to look up a card template by id
const getRebel = (id: string) => GALAXY_TEMPLATES.find((c) => c.id === id)!;
const getEmpire = (id: string) => GALAXY_TEMPLATES.find((c) => c.id === id)!;
const getNeutral = (id: string) => GALAXY_TEMPLATES.find((c) => c.id === id)!;
const getRepublic = (id: string) => REPUBLIC_GALAXY_TEMPLATES.find((c) => c.id === id)!;
const getSeparatist = (id: string) => SEPARATIST_GALAXY_TEMPLATES.find((c) => c.id === id)!;
const getMandalorian = (id: string) => MANDALORIAN_GALAXY_TEMPLATES.find((c) => c.id === id)!;

// ============================================================================
// STARTER DECKS (Mazzi Iniziali - 10 Carte ciascuno)
// ============================================================================

export const REBEL_STARTER_DECK: DeckBundle = {
  id: 'deck_rebel_starter',
  name: 'Rebel Alliance Starter Deck',
  nameIt: 'Mazzo Iniziale Alleanza Ribelle',
  faction: 'rebel',
  category: 'starter',
  description:
    'The standard 10-card starting deck for the Rebel Alliance. Consists of 7 resource-generating shuttles, 2 attack combat troops, and 1 Force-attuned guardian.',
  descriptionIt:
    'Il mazzo iniziale standard da 10 carte dell\'Alleanza Ribelle. Composto da 7 navette di rifornimento, 2 soldati d\'assalto e 1 guardiano sintonizzato con la Forza.',
  totalCards: 10,
  sheetSource: 'IR_Starter_R.png',
  cards: [
    { template: ALLIANCE_SHUTTLE, quantity: 7 },
    { template: REBEL_TROOPER, quantity: 2 },
    { template: TEMPLE_GUARDIAN, quantity: 1 },
  ],
};

export const EMPIRE_STARTER_DECK: DeckBundle = {
  id: 'deck_empire_starter',
  name: 'Galactic Empire Starter Deck',
  nameIt: 'Mazzo Iniziale Impero Galattico',
  faction: 'empire',
  category: 'starter',
  description:
    'The standard 10-card starting deck for the Galactic Empire. Consists of 7 resource shuttles, 2 frontline Stormtroopers, and 1 dark side Inquisitor.',
  descriptionIt:
    'Il mazzo iniziale standard da 10 carte dell\'Impero Galattico. Composto da 7 navette imperiali, 2 assaltatori di prima linea e 1 inquisitore del lato oscuro.',
  totalCards: 10,
  sheetSource: 'IR_Starter_I.png',
  cards: [
    { template: IMPERIAL_SHUTTLE, quantity: 7 },
    { template: STORMTROOPER, quantity: 2 },
    { template: INQUISITOR, quantity: 1 },
  ],
};

export const REPUBLIC_STARTER_DECK: DeckBundle = {
  id: 'deck_republic_starter',
  name: 'Galactic Republic Starter Deck',
  nameIt: 'Mazzo Iniziale Repubblica Galattica',
  faction: 'republic',
  category: 'starter',
  description:
    'The standard 10-card starting deck for the Grand Army of the Republic. Features 7 Clone Cadets, 2 Phase I Clone Troopers, and 1 Temple Padawan.',
  descriptionIt:
    'Il mazzo iniziale da 10 carte del Grande Esercito della Repubblica. Include 7 cloni cadetti, 2 soldati clone di Fase I e 1 padawan del tempio.',
  totalCards: 10,
  sheetSource: 'SR_Starter_R.png',
  cards: [
    { template: CLONE_CADET, quantity: 7 },
    { template: CLONE_TROOPER_P1, quantity: 2 },
    { template: TEMPLE_PADAWAN, quantity: 1 },
  ],
};

export const SEPARATIST_STARTER_DECK: DeckBundle = {
  id: 'deck_separatist_starter',
  name: 'Separatist Alliance Starter Deck',
  nameIt: 'Mazzo Iniziale Alleanza Separatista',
  faction: 'separatist',
  category: 'starter',
  description:
    'The standard 10-card starting deck for the Confederacy of Independent Systems. Contains 7 OOM Pilot Droids, 2 B1 Battle Droids, and 1 Dark Acolyte.',
  descriptionIt:
    'Il mazzo iniziale da 10 carte della Confederazione dei Sistemi Indipendenti. Contiene 7 droidi pilota OOM, 2 droidi da battaglia B1 e 1 accolita oscura.',
  totalCards: 10,
  sheetSource: 'SR_Starter_S.png',
  cards: [
    { template: OOM_PILOT_DROID, quantity: 7 },
    { template: B1_BATTLE_DROID, quantity: 2 },
    { template: SEPARATIST_ACOLYTE, quantity: 1 },
  ],
};

export const MANDALORIAN_STARTER_DECK: DeckBundle = {
  id: 'deck_mandalorian_starter',
  name: 'Mandalorian Enclave Starter Deck',
  nameIt: 'Mazzo Iniziale Enclave Mandaloriana',
  faction: 'mandalorian',
  category: 'starter',
  description:
    'The standard 10-card starting deck for Clan Mudhorn and the Mandalorian Enclave. Includes 7 Foundlings, 2 Warriors, and 1 Creed Initiate.',
  descriptionIt:
    'Il mazzo iniziale da 10 carte dell\'Enclave Mandaloriana. Include 7 trovatelli, 2 guerrieri e 1 iniziato del credo.',
  totalCards: 10,
  sheetSource: 'M_Starter_M.png',
  cards: [
    { template: MANDALORIAN_FOUNDLING, quantity: 7 },
    { template: MANDALORIAN_WARRIOR, quantity: 2 },
    { template: CREED_INITIATE, quantity: 1 },
  ],
};

// ============================================================================
// OUTER RIM PILOTS SUPPLY DECK (10 Copie)
// ============================================================================

export const OUTER_RIM_PILOTS_DECK: DeckBundle = {
  id: 'deck_outer_rim_pilots',
  name: 'Outer Rim Pilots Supply Deck',
  nameIt: 'Mazzo Riserva Piloti dell\'Orlo Esterno',
  faction: 'neutral',
  category: 'pilots',
  description:
    'Supply deck consisting of 10 identical Outer Rim Pilot cards available for purchase anytime during a player turn for 2 resources. Exiling gives +1 Force toward your side and returns the card to this deck.',
  descriptionIt:
    'Mazzo di riserva composto da 10 copie identiche del Pilota dell\'Orlo Esterno, acquistabile per 2 risorse. Esiliarlo fornisce +1 Forza verso la propria fazione e rimette la carta nella riserva.',
  totalCards: 10,
  sheetSource: 'IR_PilotiEsterni_N.png',
  cards: [{ template: OUTER_RIM_PILOT, quantity: 10 }],
};

// ============================================================================
// GALAXY DECKS (Mazzi Galassia)
// ============================================================================

export const REBEL_GALAXY_DECK: DeckBundle = {
  id: 'deck_rebel_galaxy',
  name: 'Rebel Alliance Galaxy Deck',
  nameIt: 'Mazzo Galassia Alleanza Ribelle',
  faction: 'rebel',
  category: 'galaxy',
  description:
    'Complete Rebel Alliance Galaxy cards. Legendary heroes (Luke, Leia, Han, Chewbacca, Falcon) are unique (1 copy), while starfighters and line infantry have multiple copies (2-3 copies each).',
  descriptionIt:
    'Mazzo completo delle carte dell\'Alleanza Ribelle per il Mazzo Galassia. Gli eroi leggendari sono unici (1 copia), mentre caccia stellari e truppe di linea hanno copie multiple (2-3 copie ciascuno).',
  totalCards: 32,
  sheetSource: 'IR_Mazzo_R.png',
  cards: [
    // Unique Heroes & Flagships (1 copy)
    { template: getRebel('reb_luke'), quantity: 1 },
    { template: getRebel('reb_leia'), quantity: 1 },
    { template: getRebel('reb_han_solo'), quantity: 1 },
    { template: getRebel('reb_chewbacca'), quantity: 1 },
    { template: getRebel('reb_falcon'), quantity: 1 },
    // Multiple Copies (Starfighters & Troops)
    { template: getRebel('reb_x_wing'), quantity: 3 },
    { template: getRebel('reb_y_wing'), quantity: 2 },
    { template: getRebel('reb_u_wing'), quantity: 2 },
    { template: getRebel('reb_b_wing'), quantity: 2 },
    { template: getRebel('reb_pathfinder'), quantity: 2 },
    { template: getRebel('reb_fleet_officer'), quantity: 2 },
    // Rogue One / Expansion Heroes & Operatives
    { template: getRebel('reb_jyn_erso'), quantity: 1 },
    { template: getRebel('reb_cassian'), quantity: 1 },
    { template: getRebel('reb_baze_malbus'), quantity: 2 },
    { template: getRebel('reb_chirrut'), quantity: 1 },
    { template: getRebel('reb_mon_mothma'), quantity: 1 },
    { template: getRebel('reb_a_wing'), quantity: 2 },
    // Capital Ships
    { template: getRebel('reb_corvette'), quantity: 2 },
    { template: getRebel('reb_nebulon'), quantity: 2 },
    { template: getRebel('reb_mon_cala_cruiser'), quantity: 2 },
  ],
};

export const EMPIRE_GALAXY_DECK: DeckBundle = {
  id: 'deck_empire_galaxy',
  name: 'Galactic Empire Galaxy Deck',
  nameIt: 'Mazzo Galassia Impero Galattico',
  faction: 'empire',
  category: 'galaxy',
  description:
    'Complete Galactic Empire cards for the Galaxy Deck. High commanders (Darth Vader, Grand Moff Tarkin, Director Krennic) are unique (1 copy), while TIE swarms, troopers, and capital ships have multiple copies (2-3 copies).',
  descriptionIt:
    'Mazzo completo delle carte dell\'Impero Galattico. Comandanti supremi (Darth Vader, Grand Moff Tarkin, Direttore Krennic) sono unici (1 copia), mentre formazioni TIE, truppe e navi hanno copie multiple (2-3 copie).',
  totalCards: 32,
  sheetSource: 'IR_Mazzo_I.png',
  cards: [
    // Unique Leaders (1 copy)
    { template: getEmpire('emp_vader'), quantity: 1 },
    { template: getEmpire('emp_tarkin'), quantity: 1 },
    { template: getEmpire('emp_krennic'), quantity: 1 },
    { template: getEmpire('emp_veers'), quantity: 1 },
    // Swarm Fighters & Heavy Starfighters
    { template: getEmpire('emp_tie_fighter'), quantity: 3 },
    { template: getEmpire('emp_tie_interceptor'), quantity: 2 },
    { template: getEmpire('emp_tie_bomber'), quantity: 2 },
    { template: getEmpire('emp_tie_advanced'), quantity: 2 },
    // Imperial Troops & Officers
    { template: getEmpire('emp_scout_trooper'), quantity: 3 },
    { template: getEmpire('emp_stormtrooper_cmd'), quantity: 2 },
    { template: getEmpire('emp_royal_guard'), quantity: 2 },
    { template: getEmpire('emp_tie_pilot'), quantity: 2 },
    { template: getEmpire('emp_fleet_officer'), quantity: 2 },
    { template: getEmpire('emp_death_trooper'), quantity: 2 },
    // Capital Ships
    { template: getEmpire('emp_gozanti'), quantity: 2 },
    { template: getEmpire('emp_raider'), quantity: 2 },
    { template: getEmpire('emp_star_destroyer'), quantity: 2 },
  ],
};

export const NEUTRAL_GALAXY_DECK: DeckBundle = {
  id: 'deck_neutral_galaxy',
  name: 'Neutral Scum & Bounty Hunters Deck',
  nameIt: 'Mazzo Galassia Neutrale e Cacciatori di Taglie',
  faction: 'neutral',
  category: 'galaxy',
  description:
    'Neutral galaxy cards purchasable or sabotaged by any faction. Renowned bounty hunters (Boba Fett, Bossk, Dengar, IG-88, Cad Bane) are unique, with 2 copies of standard mercenaries, smugglers, and light freighters.',
  descriptionIt:
    'Carte galattiche neutrali reclutabili o sabotabili da qualunque fazione. Famosi cacciatori di taglie (Boba Fett, Bossk, Dengar, IG-88, Cad Bane) sono unici, con 2 copie di mercenari, contrabbandieri e navi da trasporto.',
  totalCards: 24,
  sheetSource: 'IR_Mazzo_N.png',
  cards: [
    // Unique Scum & Bounty Hunters
    { template: getNeutral('neu_boba_fett'), quantity: 1 },
    { template: getNeutral('neu_bossk'), quantity: 1 },
    { template: getNeutral('neu_dengar'), quantity: 1 },
    { template: getNeutral('neu_ig88'), quantity: 1 },
    { template: getNeutral('neu_cad_bane'), quantity: 1 },
    { template: getNeutral('neu_lando'), quantity: 1 },
    { template: getNeutral('neu_jabba_barge'), quantity: 1 },
    // Common Smugglers, Mercenaries, & Ships
    { template: getNeutral('neu_smuggler'), quantity: 2 },
    { template: getNeutral('neu_jawa'), quantity: 2 },
    { template: getNeutral('neu_rodian'), quantity: 2 },
    { template: getNeutral('neu_quarren'), quantity: 2 },
    { template: getNeutral('neu_headhunter'), quantity: 2 },
    { template: getNeutral('neu_hwk290'), quantity: 2 },
    { template: getNeutral('neu_fang_fighter'), quantity: 2 },
    { template: getNeutral('neu_weequay'), quantity: 2 },
  ],
};

export const REPUBLIC_GALAXY_DECK: DeckBundle = {
  id: 'deck_republic_galaxy',
  name: 'Grand Army of the Republic Galaxy Deck',
  nameIt: 'Mazzo Galassia Grande Esercito della Repubblica',
  faction: 'republic',
  category: 'galaxy',
  description:
    'Clone Wars Republic cards featuring Jedi Generals (Anakin, Obi-Wan, Ahsoka, Yoda, Mace Windu) as unique characters, alongside Clone commanders, Gunships, and Venator Star Destroyers.',
  descriptionIt:
    'Carte della Repubblica dell\'era Clone Wars con Generali Jedi (Anakin, Obi-Wan, Ahsoka, Yoda, Mace Windu) unici, comandanti cloni, cannoniere LAAT e Incrociatori Venator.',
  totalCards: 25,
  sheetSource: 'SR_Mazzo_R.png',
  cards: [
    { template: getRepublic('rep_anakin'), quantity: 1 },
    { template: getRepublic('rep_obiwan'), quantity: 1 },
    { template: getRepublic('rep_ahsoka'), quantity: 1 },
    { template: getRepublic('rep_yoda'), quantity: 1 },
    { template: getRepublic('rep_mace'), quantity: 1 },
    { template: getRepublic('rep_rex'), quantity: 1 },
    { template: getRepublic('rep_cody'), quantity: 1 },
    { template: getRepublic('rep_padme'), quantity: 1 },
    { template: getRepublic('rep_laat'), quantity: 3 },
    { template: getRepublic('rep_arc170'), quantity: 3 },
    { template: getRepublic('rep_atte'), quantity: 3 },
    { template: getRepublic('rep_delta7'), quantity: 3 },
    { template: getRepublic('rep_venator'), quantity: 2 },
  ],
};

export const SEPARATIST_GALAXY_DECK: DeckBundle = {
  id: 'deck_separatist_galaxy',
  name: 'Separatist Droid Army Galaxy Deck',
  nameIt: 'Mazzo Galassia Armata dei Droidi Separatista',
  faction: 'separatist',
  category: 'galaxy',
  description:
    'Confederacy forces featuring Count Dooku, General Grievous, Asajj Ventress, and Darth Maul as unique commanders, backed by Droidekas, B2 Battle Droids, and Lucrehulk Battleships.',
  descriptionIt:
    'Forze della Confederazione con Conte Dooku, Generale Grievous, Asajj Ventress e Darth Maul unici, supportati da Droideka, Droidi B2 e Navi da Guerra Lucrehulk.',
  totalCards: 24,
  sheetSource: 'SR_Mazzo_S.png',
  cards: [
    { template: getSeparatist('sep_grievous'), quantity: 1 },
    { template: getSeparatist('sep_dooku'), quantity: 1 },
    { template: getSeparatist('sep_ventress'), quantity: 1 },
    { template: getSeparatist('sep_maul_cw'), quantity: 1 },
    { template: getSeparatist('sep_nute_gunray'), quantity: 1 },
    { template: getSeparatist('sep_droideka'), quantity: 2 },
    { template: getSeparatist('sep_b2'), quantity: 3 },
    { template: getSeparatist('sep_vulture'), quantity: 3 },
    { template: getSeparatist('sep_trifighter'), quantity: 3 },
    { template: getSeparatist('sep_aat'), quantity: 3 },
    { template: getSeparatist('sep_munificent'), quantity: 2 },
    { template: getSeparatist('sep_lucrehulk'), quantity: 2 },
  ],
};

export const MANDALORIAN_GALAXY_DECK: DeckBundle = {
  id: 'deck_mandalorian_galaxy',
  name: 'Mandalorian Clans Galaxy Deck',
  nameIt: 'Mazzo Galassia Clan Mandaloriani',
  faction: 'mandalorian',
  category: 'galaxy',
  description:
    'Legendary warriors (Din Djarin, Grogu, The Armorer, Bo-Katan Kryze, Paz Vizsla) and the Razor Crest alongside clan warriors, Gauntlet troop transports, and heavy infantry.',
  descriptionIt:
    'Guerrieri leggendari (Din Djarin, Grogu, L\'Armaiola, Bo-Katan Kryze, Paz Vizsla) e la Razor Crest assieme a guerrieri d\'élite, trasporti Gauntlet e fanteria pesante.',
  totalCards: 24,
  sheetSource: 'M_Mazzo_M.png',
  cards: [
    { template: getMandalorian('mnd_din_djarin'), quantity: 1 },
    { template: getMandalorian('mnd_grogu'), quantity: 1 },
    { template: getMandalorian('mnd_bo_katan'), quantity: 1 },
    { template: getMandalorian('mnd_armorer'), quantity: 1 },
    { template: getMandalorian('mnd_paz_vizsla'), quantity: 1 },
    { template: getMandalorian('mnd_greef_karga'), quantity: 1 },
    { template: getMandalorian('mnd_ig11'), quantity: 1 },
    { template: getMandalorian('mnd_boba_daimyo'), quantity: 1 },
    { template: getMandalorian('mnd_razor_crest'), quantity: 1 },
    { template: getMandalorian('mnd_gauntlet'), quantity: 2 },
    { template: getMandalorian('mnd_fang_fighter'), quantity: 3 },
    { template: getMandalorian('mnd_nite_owls'), quantity: 3 },
    { template: getMandalorian('mnd_amban'), quantity: 3 },
    { template: getMandalorian('mnd_heavy_trooper'), quantity: 3 },
  ],
};

// ============================================================================
// BASE DECKS (Mazzi Basi)
// ============================================================================

export const REBEL_BASES_DECK: DeckBundle = {
  id: 'deck_rebel_bases',
  name: 'Rebel Alliance Bases Deck',
  nameIt: 'Mazzo Basi Alleanza Ribelle',
  faction: 'rebel',
  category: 'base',
  description:
    'Complete pool of 10 Rebel Alliance bases, including Dantooine as the starter base and 9 secondary worlds (Hoth, Mon Cala, Yavin IV, Dagobah, Alderaan, Bespin, Jedha, Sullust, Tatooine).',
  descriptionIt:
    'Mazzo completo delle 10 basi dell\'Alleanza Ribelle, con Dantooine come base iniziale e 9 mondi secondari (Hoth, Mon Cala, Yavin IV, Dagobah, Alderaan, Bespin, Jedha, Sullust, Tatooine).',
  totalCards: 10,
  sheetSource: 'IR_Basi_R.png',
  cards: [],
  bases: REBEL_BASES,
};

export const EMPIRE_BASES_DECK: DeckBundle = {
  id: 'deck_empire_bases',
  name: 'Galactic Empire Bases Deck',
  nameIt: 'Mazzo Basi Impero Galattico',
  faction: 'empire',
  category: 'base',
  description:
    'Complete pool of 10 Galactic Empire bases, featuring Lothal as the starter base and 9 strategic outposts (Death Star, Coruscant, Corellia, Mustafar, Kuat Drive Yards, Endor, Ord Mantell, Kamino, Rodia).',
  descriptionIt:
    'Mazzo completo delle 10 basi dell\'Impero Galattico, con Lothal come base iniziale e 9 avamposti strategici (Morte Nera, Coruscant, Corellia, Mustafar, Cantieri di Kuat, Endor, Ord Mantell, Kamino, Rodia).',
  totalCards: 10,
  sheetSource: 'IR_Basi_I.png',
  cards: [],
  bases: EMPIRE_BASES,
};

export const REPUBLIC_BASES_DECK: DeckBundle = {
  id: 'deck_republic_bases',
  name: 'Galactic Republic Bases Deck',
  nameIt: 'Mazzo Basi Repubblica Galattica',
  faction: 'republic',
  category: 'base',
  description:
    'Complete pool of 10 Grand Republic bases, featuring Kamino as the starter cloning facility, Jedi Temple on Coruscant, Naboo, and Christophsis.',
  descriptionIt:
    'Mazzo completo delle 10 basi della Repubblica, con Kamino come struttura di clonazione iniziale, il Tempio Jedi su Coruscant, Naboo e Christophsis.',
  totalCards: 10,
  sheetSource: 'SR_Basi_R.png',
  cards: [],
  bases: REPUBLIC_BASES,
};

export const SEPARATIST_BASES_DECK: DeckBundle = {
  id: 'deck_separatist_bases',
  name: 'Separatist Alliance Bases Deck',
  nameIt: 'Mazzo Basi Alleanza Separatista',
  faction: 'separatist',
  category: 'base',
  description:
    'Complete pool of 10 Separatist fortress worlds, featuring Geonosis Foundry as starter base, Raxus Secundus, and Utapau.',
  descriptionIt:
    'Mazzo completo delle 10 basi della Confederazione, con le Fonderie di Geonosis come base iniziale, Raxus Secundus e Utapau.',
  totalCards: 10,
  sheetSource: 'SR_Basi_S.png',
  cards: [],
  bases: SEPARATIST_BASES,
};

export const MANDALORIAN_BASES_DECK: DeckBundle = {
  id: 'deck_mandalorian_bases',
  name: 'Mandalorian Enclave Bases Deck',
  nameIt: 'Mazzo Basi Enclave Mandaloriana',
  faction: 'mandalorian',
  category: 'base',
  description:
    'Complete pool of 10 Mandalorian strongholds, featuring Nevarro Guild Outpost as starter base, Mandalore Sundari Dome, and Concordia.',
  descriptionIt:
    'Mazzo completo delle 10 basi mandaloriane, con l\'Avamposto di Nevarro come base iniziale, la Cupola di Sundari su Mandalore e Concordia.',
  totalCards: 10,
  sheetSource: 'M_Basi_M.png',
  cards: [],
  bases: MANDALORIAN_BASES,
};

// ============================================================================
// FLEET DECKS (Mazzi Flotta / Navi Ammiraglie)
// ============================================================================

export const REBEL_FLEET_DECK: DeckBundle = {
  id: 'deck_rebel_fleet',
  name: 'Rebel Alliance Capital Ships & Fleet',
  nameIt: 'Flotta e Navi Ammiraglie dell\'Alleanza Ribelle',
  faction: 'rebel',
  category: 'fleet',
  description:
    'Alliance naval vessels that enter play into the Fleet zone to protect friendly bases, providing defensive shields and high tactical bombardment fire.',
  descriptionIt:
    'Navi da guerra dell\'Alleanza Ribelle che entrano nella zona Flotta a difesa delle Basi, fornendo scudi protettivi e potente fuoco di supporto.',
  totalCards: 6,
  sheetSource: 'IR_Flotta_R.png',
  cards: [
    { template: getRebel('reb_corvette'), quantity: 2 },
    { template: getRebel('reb_nebulon'), quantity: 2 },
    { template: getRebel('reb_mon_cala_cruiser'), quantity: 2 },
  ],
};

export const EMPIRE_FLEET_DECK: DeckBundle = {
  id: 'deck_empire_fleet',
  name: 'Imperial Navy Capital Ships & Fleet',
  nameIt: 'Flotta e Navi Ammiraglie della Flotta Imperiale',
  faction: 'empire',
  category: 'fleet',
  description:
    'Imperial naval dominance featuring Gozanti Cruisers, Raider-class Corvettes, and towering Imperial Star Destroyers that shield bases and control space lanes.',
  descriptionIt:
    'Supremazia navale imperiale con Incrociatori Gozanti, Corvette Raider e possenti Star Destroyer Imperiali a presidio delle Basi.',
  totalCards: 6,
  sheetSource: 'IR_Flotta_I.png',
  cards: [
    { template: getEmpire('emp_gozanti'), quantity: 2 },
    { template: getEmpire('emp_raider'), quantity: 2 },
    { template: getEmpire('emp_star_destroyer'), quantity: 2 },
  ],
};

// All available Deck Bundles in the game
export const ALL_DECK_BUNDLES: DeckBundle[] = [
  // Starter Decks
  REBEL_STARTER_DECK,
  EMPIRE_STARTER_DECK,
  REPUBLIC_STARTER_DECK,
  SEPARATIST_STARTER_DECK,
  MANDALORIAN_STARTER_DECK,

  // Outer Rim Supply
  OUTER_RIM_PILOTS_DECK,

  // Galaxy Decks
  REBEL_GALAXY_DECK,
  EMPIRE_GALAXY_DECK,
  NEUTRAL_GALAXY_DECK,
  REPUBLIC_GALAXY_DECK,
  SEPARATIST_GALAXY_DECK,
  MANDALORIAN_GALAXY_DECK,

  // Fleet Decks
  REBEL_FLEET_DECK,
  EMPIRE_FLEET_DECK,

  // Base Decks
  REBEL_BASES_DECK,
  EMPIRE_BASES_DECK,
  REPUBLIC_BASES_DECK,
  SEPARATIST_BASES_DECK,
  MANDALORIAN_BASES_DECK,
];
