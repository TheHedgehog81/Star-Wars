import { CardTemplate } from '../types/game';

// Italian and English translations for Star Wars card traits
export const TRAIT_TRANSLATIONS: Record<string, { it: string; en: string }> = {
  'Bounty Hunter': { it: 'Cacciatore di Taglie', en: 'Bounty Hunter' },
  'Trooper': { it: 'Soldato', en: 'Trooper' },
  'Droid': { it: 'Droide', en: 'Droid' },
  'Vehicle': { it: 'Veicolo', en: 'Vehicle' },
  'Pilot': { it: 'Pilota', en: 'Pilot' },
  'Jedi': { it: 'Jedi', en: 'Jedi' },
  'Sith': { it: 'Sith', en: 'Sith' },
  'Officer': { it: 'Ufficiale', en: 'Officer' },
  'Leader': { it: 'Leader', en: 'Leader' },
  'Scoundrel': { it: 'Contrabbandiere', en: 'Scoundrel' },
  'Inquisitor': { it: 'Inquisitore', en: 'Inquisitor' },
  'Mandalorian': { it: 'Mandaloriano', en: 'Mandalorian' },
  'Wookiee': { it: 'Wookiee', en: 'Wookiee' },
  'Spy': { it: 'Spia', en: 'Spy' },
  'Partisan': { it: 'Partigiano', en: 'Partisan' },
  'Guardian': { it: 'Guardiano', en: 'Guardian' },
  'Senator': { it: 'Senatore', en: 'Senator' },
  'General': { it: 'Generale', en: 'General' },
  'Ally': { it: 'Alleato', en: 'Ally' },
  'Force Sensitive': { it: 'Sensibile alla Forza', en: 'Force Sensitive' },
  'Scavenger': { it: 'Scavatore', en: 'Scavenger' },
};

/**
 * Returns the primary trait(s) for a card template, resolving either
 * from explicit traits array or standard Star Wars lore mappings.
 */
export function getCardTraits(card: CardTemplate): string[] {
  if (card.traits && card.traits.length > 0) {
    return card.traits;
  }

  const id = card.id.toLowerCase();
  const name = (card.name + ' ' + (card.abilityText || '')).toLowerCase();

  // 1. Bounty Hunters
  if (
    id.includes('boba') ||
    id.includes('bossk') ||
    id.includes('dengar') ||
    id.includes('cad_bane') ||
    id.includes('fennec') ||
    id.includes('din_djarin') ||
    id.includes('greef') ||
    id.includes('ig88') ||
    id.includes('ig11') ||
    name.includes('bounty hunter') ||
    name.includes('cacciatore di taglie')
  ) {
    if (id.includes('ig88') || id.includes('ig11')) {
      return ['Bounty Hunter', 'Droid'];
    }
    if (id.includes('din_djarin')) {
      return ['Bounty Hunter', 'Mandalorian'];
    }
    return ['Bounty Hunter'];
  }

  // 2. Droids
  if (
    id.includes('droid') ||
    id.includes('c3po') ||
    id.includes('r2d2') ||
    id.includes('droideka') ||
    id.includes('magnaguard') ||
    name.includes('droid') ||
    name.includes('droide')
  ) {
    if (id.includes('grievous')) {
      return ['Droid', 'General'];
    }
    if (id.includes('b1') || id.includes('b2') || id.includes('commando_droid')) {
      return ['Droid', 'Trooper'];
    }
    return ['Droid'];
  }

  // 3. Jedi
  if (
    id.includes('luke') ||
    id.includes('yoda') ||
    id.includes('obi_wan') ||
    id.includes('mace') ||
    id.includes('anakin') ||
    id.includes('ahsoka') ||
    id.includes('jedi') ||
    id.includes('padawan') ||
    id.includes('temple_initiate') ||
    id.includes('grogu')
  ) {
    return ['Jedi'];
  }

  // 4. Sith / Inquisitors
  if (id.includes('vader') || id.includes('palpatine') || id.includes('dooku') || id.includes('maul') || id.includes('ventress')) {
    return ['Sith'];
  }
  if (id.includes('inquisitor') || id.includes('acolyte')) {
    return ['Inquisitor'];
  }

  // 5. Vehicles / Starfighters
  if (
    id.includes('wing') ||
    id.includes('tie') ||
    id.includes('tank') ||
    id.includes('aat') ||
    id.includes('walker') ||
    id.includes('at_at') ||
    id.includes('at_st') ||
    id.includes('at_te') ||
    id.includes('fighter') ||
    id.includes('speeder') ||
    id.includes('vulture')
  ) {
    return ['Vehicle'];
  }

  // 6. Troopers
  if (
    id.includes('trooper') ||
    id.includes('commando') ||
    id.includes('cadet') ||
    id.includes('warrior') ||
    id.includes('rex') ||
    id.includes('cody') ||
    id.includes('jyn_erso') ||
    id.includes('spearman') ||
    id.includes('nite_owl')
  ) {
    return ['Trooper'];
  }

  // 7. Officers & Leaders
  if (id.includes('tarkin') || id.includes('veers') || id.includes('krennic')) {
    return ['Officer'];
  }
  if (id.includes('leia') || id.includes('mon_mothma') || id.includes('bo_katan')) {
    return ['Leader'];
  }
  if (id.includes('padme')) {
    return ['Senator'];
  }

  // 8. Scoundrels & Smugglers
  if (id.includes('han_solo') || id.includes('lando') || id.includes('jabba') || id.includes('chewbacca')) {
    return id.includes('chewbacca') ? ['Wookiee', 'Scoundrel'] : ['Scoundrel'];
  }

  // 9. Pilots
  if (id.includes('pilot') || id.includes('wedge')) {
    return ['Pilot'];
  }

  // 10. Mandalorians
  if (id.includes('armorer') || id.includes('paz_vizsla') || id.includes('foundling')) {
    return ['Mandalorian'];
  }

  if (id.includes('jawa')) {
    return ['Scavenger'];
  }

  return [];
}

/**
 * Returns formatted display text for the card type line.
 * For Capital Ships: "Flotta" / "Fleet"
 * For Units: "Unità • Cacciatore di Taglie", "Unità • Soldato", "Unità • Droide", etc.
 */
export function getCardTypeLine(
  card: CardTemplate,
  language: 'it' | 'en' | string = 'it'
): {
  isCapitalShip: boolean;
  mainLabel: string;
  traitLabel?: string;
  fullLine: string;
} {
  const lang = language === 'en' ? 'en' : 'it';
  const isCapitalShip = card.type === 'capital_ship';

  if (isCapitalShip) {
    const mainLabel = lang === 'it' ? 'Flotta' : 'Fleet';
    return {
      isCapitalShip: true,
      mainLabel,
      fullLine: mainLabel,
    };
  }

  const mainLabel = lang === 'it' ? 'Unità' : 'Unit';
  const traits = getCardTraits(card);

  if (traits.length === 0) {
    return {
      isCapitalShip: false,
      mainLabel,
      fullLine: mainLabel,
    };
  }

  const translatedTraits = traits
    .map((t) => (TRAIT_TRANSLATIONS[t] ? TRAIT_TRANSLATIONS[t][lang] : t))
    .join(' • ');

  return {
    isCapitalShip: false,
    mainLabel,
    traitLabel: translatedTraits,
    fullLine: `${mainLabel} • ${translatedTraits}`,
  };
}
