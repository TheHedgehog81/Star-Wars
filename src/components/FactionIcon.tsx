import React from 'react';
import { Faction, PlayableFaction } from '../types/game';

interface FactionIconProps {
  faction: Faction | PlayableFaction | 'force' | 'jedi';
  className?: string;
  glow?: boolean; // Kept for interface compatibility; glow effects removed per instructions
}

/**
 * Official Star Wars Faction & Galactic Emblems
 * Rendered as clean, flat, high-contrast 2D vectors without glowing/bloom effects.
 * Based on canonical Star Wars vector insignia:
 * - Rebel Alliance: Starbird / Phoenix Crest
 * - Galactic Empire: 6-Spoke Imperial Cog
 * - Mandalorian Clans: Mythosaur Skull (Kya'ram)
 * - Galactic Republic: 8-Spoke Republic Roundel (GAR / Bendu)
 * - Separatist Alliance: Hexagonal CIS Crest
 * - Neutral: Bounty Hunters Guild / Outer Rim Crest
 * - Force / Jedi: Official Jedi Order Crest (Wings & Blade)
 */
export const FactionIcon: React.FC<FactionIconProps> = ({
  faction,
  className = 'w-5 h-5',
}) => {
  switch (faction) {
    // 1. REBEL ALLIANCE - Official Starbird / Phoenix Crest (Blu)
    case 'rebel':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} inline-block flex-shrink-0 transition-transform`}
          aria-label="Alleanza Ribelle"
        >
          {/* Central Crest Feather & Head */}
          <path d="M50 8 C48 18, 46 25, 42 35 C45 34, 48 34, 50 34 C52 34, 55 34, 58 35 C54 25, 52 18, 50 8 Z" />
          {/* Main Starbird Wings and Body */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 38 C44 38, 38 41, 33 46 C27 38, 22 24, 20 16 C17 28, 14 46, 17 62 C19 72, 25 82, 34 89 C30 83, 27 74, 27 65 C27 52, 37 43, 49 43 C50 43, 50 43, 51 43 C63 43, 73 52, 73 65 C73 74, 70 83, 66 89 C75 82, 81 72, 83 62 C86 46, 83 28, 80 16 C78 24, 73 38, 67 46 C62 41, 56 38, 50 38 Z"
          />
          {/* Lower Tail Flare */}
          <path d="M47 50 C44 60, 42 74, 38 84 C42 83, 46 82, 50 82 C54 82, 58 83, 62 84 C58 74, 56 60, 53 50 C51 49, 49 49, 47 50 Z" />
        </svg>
      );

    // 2. GALACTIC EMPIRE - Official 6-Spoke Imperial Cog Insignia (Rosso Carminio)
    case 'empire':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} inline-block flex-shrink-0 transition-transform`}
          aria-label="Impero Galattico"
        >
          {/* Outer Ring */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 4 C24.6 4, 4 24.6, 4 50 C4 75.4, 24.6 96, 50 96 C75.4 96, 96 75.4, 96 50 C96 24.6, 75.4 4, 50 4 Z M50 11 C71.5 11, 89 28.5, 89 50 C89 71.5, 71.5 89, 50 89 C28.5 89, 11 71.5, 11 50 C11 28.5, 28.5 11, 50 11 Z"
          />
          {/* Central Hub Core */}
          <circle cx="50" cy="50" r="13" />
          {/* 6 Radial Imperial Spokes */}
          <g>
            <path d="M46 17 L54 17 L52.5 32 L47.5 32 Z" />
            <path d="M46 17 L54 17 L52.5 32 L47.5 32 Z" transform="rotate(60 50 50)" />
            <path d="M46 17 L54 17 L52.5 32 L47.5 32 Z" transform="rotate(120 50 50)" />
            <path d="M46 17 L54 17 L52.5 32 L47.5 32 Z" transform="rotate(180 50 50)" />
            <path d="M46 17 L54 17 L52.5 32 L47.5 32 Z" transform="rotate(240 50 50)" />
            <path d="M46 17 L54 17 L52.5 32 L47.5 32 Z" transform="rotate(300 50 50)" />
          </g>
          {/* 6 Segment Plates between spokes */}
          <g>
            <path d="M58 20 C67 24, 73 30, 77 38 L68 41 C65 35, 61 31, 56 28 Z" />
            <path d="M58 20 C67 24, 73 30, 77 38 L68 41 C65 35, 61 31, 56 28 Z" transform="rotate(60 50 50)" />
            <path d="M58 20 C67 24, 73 30, 77 38 L68 41 C65 35, 61 31, 56 28 Z" transform="rotate(120 50 50)" />
            <path d="M58 20 C67 24, 73 30, 77 38 L68 41 C65 35, 61 31, 56 28 Z" transform="rotate(180 50 50)" />
            <path d="M58 20 C67 24, 73 30, 77 38 L68 41 C65 35, 61 31, 56 28 Z" transform="rotate(240 50 50)" />
            <path d="M58 20 C67 24, 73 30, 77 38 L68 41 C65 35, 61 31, 56 28 Z" transform="rotate(300 50 50)" />
          </g>
        </svg>
      );

    // 3. MANDALORIAN CLANS - Official Mythosaur Skull Insignia (Verde)
    case 'mandalorian':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} inline-block flex-shrink-0 transition-transform`}
          aria-label="Clan Mandaloriani"
        >
          {/* Main Skull Crown & Downward Horns */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 10 C58 10, 68 13, 76 20 C85 28, 88 40, 86 52 C84 65, 77 76, 68 85 C66 87, 63 87, 62 84 C61 80, 63 76, 67 71 C73 63, 78 54, 77 44 C76 34, 71 27, 63 23 C57 20, 50 20, 44 21 C41 21, 39 19, 40 16 C41 12, 45 10, 50 10 Z"
          />
          {/* Left Horn Mirror */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 10 C42 10, 32 13, 24 20 C15 28, 12 40, 14 52 C16 65, 23 76, 32 85 C34 87, 37 87, 38 84 C39 80, 37 76, 33 71 C27 63, 22 54, 23 44 C24 34, 29 27, 37 23 C43 20, 50 20, 56 21 C59 21, 61 19, 60 16 C59 12, 55 10, 50 10 Z"
          />
          {/* Central Forehead Spine */}
          <path d="M47 18 L53 18 L52 42 L48 42 Z" />
          {/* Eye Socket Cavities */}
          <path d="M38 36 C42 36, 45 40, 44 46 C43 51, 39 53, 35 52 C31 51, 30 46, 32 40 C33 37, 36 36, 38 36 Z" />
          <path d="M62 36 C58 36, 55 40, 56 46 C57 51, 61 53, 65 52 C69 51, 70 46, 68 40 C67 37, 64 36, 62 36 Z" />
          {/* Downward Tapered Snout */}
          <path d="M44 48 L56 48 L54 74 L50 90 L46 74 Z" />
          {/* Outer Fang Tusks */}
          <path d="M40 56 C40 64, 41 72, 38 82 C37 80, 36 74, 36 67 C36 61, 38 57, 40 56 Z" />
          <path d="M60 56 C60 64, 59 72, 62 82 C63 80, 64 74, 64 67 C64 61, 62 57, 60 56 Z" />
        </svg>
      );

    // 4. GALACTIC REPUBLIC - Official 8-Spoke Republic Roundel (GAR / Bendu) (Amaranto)
    case 'republic':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} inline-block flex-shrink-0 transition-transform`}
          aria-label="Repubblica Galattica"
        >
          {/* Outer Border Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          />
          {/* Inner Circular Rim */}
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          {/* Center Hub */}
          <circle cx="50" cy="50" r="10" />
          {/* 8 Radial Arrowhead Sunburst Teeth */}
          <g>
            <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
            <path d="M46 27 L54 27 L50 37 Z" />
            <g transform="rotate(45 50 50)">
              <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
              <path d="M46 27 L54 27 L50 37 Z" />
            </g>
            <g transform="rotate(90 50 50)">
              <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
              <path d="M46 27 L54 27 L50 37 Z" />
            </g>
            <g transform="rotate(135 50 50)">
              <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
              <path d="M46 27 L54 27 L50 37 Z" />
            </g>
            <g transform="rotate(180 50 50)">
              <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
              <path d="M46 27 L54 27 L50 37 Z" />
            </g>
            <g transform="rotate(225 50 50)">
              <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
              <path d="M46 27 L54 27 L50 37 Z" />
            </g>
            <g transform="rotate(270 50 50)">
              <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
              <path d="M46 27 L54 27 L50 37 Z" />
            </g>
            <g transform="rotate(315 50 50)">
              <path d="M47 12 L53 12 L51.5 25 L48.5 25 Z" />
              <path d="M46 27 L54 27 L50 37 Z" />
            </g>
          </g>
        </svg>
      );

    // 5. SEPARATIST ALLIANCE (CIS) - Official Hexagonal Crest (Azzurro Scuro)
    case 'separatist':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} inline-block flex-shrink-0 transition-transform`}
          aria-label="Confederazione Separatista"
        >
          {/* Outer Hexagonal Shield Outline */}
          <polygon
            points="50,6 88,26 88,74 50,94 12,74 12,26"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Inner Hexagonal Border */}
          <polygon
            points="50,16 80,32 80,68 50,84 20,68 20,32"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Central Vertical Core Hex Column */}
          <polygon
            points="50,23 61,30 61,70 50,77 39,70 39,30"
          />
          {/* Central Slit Aperture */}
          <polygon
            points="50,33 55,36 55,64 50,67 45,64 45,36"
            fill="#030712"
          />
          {/* Left Wing Flank */}
          <path
            d="M33 34 L25 38 L25 62 L33 66 L33 56 L30 54 L30 46 L33 44 Z"
          />
          {/* Right Wing Flank */}
          <path
            d="M67 34 L75 38 L75 62 L67 66 L67 56 L70 54 L70 46 L67 44 Z"
          />
        </svg>
      );

    // 6. FORCE / JEDI ORDER - Official Jedi Order Crest (Wings & Blade)
    case 'force':
    case 'jedi':
      return (
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} inline-block flex-shrink-0 transition-transform`}
          aria-label="Ordine Jedi / La Forza"
        >
          {/* Central Lightsaber Blade */}
          <polygon points="48.5,5 51.5,5 52.5,68 50,73 47.5,68" />
          {/* Hilt Base */}
          <polygon points="47,73 53,73 52,82 48,82" />
          {/* Central Sunburst Core */}
          <circle cx="50" cy="62" r="4.5" />
          {/* Left Wing (Soaring upward feathers) */}
          <path
            d="M45 44 C40 30, 28 20, 16 18 C15 33, 23 51, 35 62 C40 67, 44 73, 45 78 C42 71, 37 65, 29 57 C21 48, 22 34, 24 28 C32 31, 39 38, 45 44 Z"
          />
          <path
            d="M44 54 C38 46, 30 40, 24 38 C23 48, 30 60, 42 68 Z"
          />
          {/* Right Wing (Symmetrical mirror) */}
          <path
            d="M55 44 C60 30, 72 20, 84 18 C85 33, 77 51, 65 62 C60 67, 56 73, 55 78 C58 71, 63 65, 71 57 C79 48, 78 34, 76 28 C68 31, 61 38, 55 44 Z"
          />
          <path
            d="M56 54 C62 46, 70 40, 76 38 C77 48, 70 60, 58 68 Z"
          />
          {/* Foundation Arc */}
          <path
            d="M42 82 C46 86, 54 86, 58 82 C55 84, 45 84, 42 82 Z"
          />
        </svg>
      );

    // 7. NEUTRAL - Official Bounty Hunters Guild / Outer Rim Crest (Grigio)
    case 'neutral':
    default:
      return (
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} inline-block flex-shrink-0 transition-transform`}
          aria-label="Neutrali / Gilda dei Cacciatori"
        >
          {/* Outer Targeting Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
          {/* Inner Ring */}
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* 4 Cardinal Targeting Crosshairs */}
          <rect x="47" y="6" width="6" height="15" rx="1" />
          <rect x="47" y="79" width="6" height="15" rx="1" />
          <rect x="6" y="47" width="15" height="6" rx="1" />
          <rect x="79" y="47" width="15" height="6" rx="1" />
          {/* Center Circular Pip & Diamond Reticle */}
          <circle cx="50" cy="50" r="11" />
          <circle cx="50" cy="50" r="5" fill="#030712" />
        </svg>
      );
  }
};
