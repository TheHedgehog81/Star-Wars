import React from 'react';

interface IconProps {
  className?: string;
  glow?: boolean; // Kept for interface compatibility; glow effects removed per user directive
}

/**
 * Official Star Wars: The Deckbuilding Game Resource Icon (Risorse / Crediti)
 * The exact geometric icon from the game counter (as provided in user reference):
 * 4 quadrant squares separated by cross-slits, inner corners hollowed out
 * by a concentric circular ring around a solid center circle disc.
 * Strictly flat 2D, non-3D, no glow, pure vector.
 */
export const ResourceSquareIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} inline-block flex-shrink-0 transition-transform`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Risorse"
    >
      <g fill="currentColor">
        {/* Top-Left Quadrant Block */}
        <path d="M12 12 H46 V25.32 A25 25 0 0 0 25.32 46 H12 Z" />

        {/* Top-Right Quadrant Block */}
        <path d="M54 12 H88 V46 H74.68 A25 25 0 0 0 54 25.32 Z" />

        {/* Bottom-Right Quadrant Block */}
        <path d="M88 54 V88 H54 V74.68 A25 25 0 0 0 74.68 54 Z" />

        {/* Bottom-Left Quadrant Block */}
        <path d="M12 54 H25.32 A25 25 0 0 0 46 74.68 V88 H12 Z" />

        {/* Solid Center Disc */}
        <circle cx="50" cy="50" r="13.5" />
      </g>
    </svg>
  );
};

// Backward-compatible alias for existing imports
export const ResourceCubeIcon = ResourceSquareIcon;

/**
 * Solid Filled Shield Icon for Capital Ship Hull (Scafo colorato a pieno)
 * Fully filled shield silhouette, not just an outline.
 */
export const SolidShieldIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} inline-block flex-shrink-0 transition-transform`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Scafo Nave"
    >
      <g fill="currentColor">
        {/* Solid filled shield body */}
        <path d="M50 10 L84 23 C84 62 50 90 50 90 C50 90 16 62 16 23 Z" />
        {/* Subtle inner crest groove for crisp definition */}
        <path
          d="M50 18 L76 28.5 C76 59 50 81 50 81 C50 81 24 59 24 28.5 Z"
          fill="#000000"
          opacity="0.2"
        />
        <path d="M50 20 L50 78" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      </g>
    </svg>
  );
};

/**
 * Solid Filled Circular Planet Icon for Base HP / Structure Points
 * (Logo circolare di pianeta colorato a pieno e non solo i bordi)
 * Solid planet disc with atmospheric ring and surface relief, completely filled.
 */
export const SolidPlanetIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} inline-block flex-shrink-0 transition-transform`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Punti Struttura Base / Pianeta"
    >
      <g fill="currentColor">
        {/* Back portion of the planetary ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="15"
          transform="rotate(-26 50 50)"
          fill="currentColor"
          opacity="0.45"
        />
        {/* Solid Planetary Disc */}
        <circle cx="50" cy="50" r="31" fill="currentColor" />
        
        {/* Inner surface bands / continents */}
        <path
          d="M24 45 C32 40 44 48 58 43 C68 39 74 44 79 46 C78 54 75 62 69 68 C61 62 51 65 41 62 C32 60 26 53 24 45 Z"
          fill="#000000"
          opacity="0.22"
        />
        <circle cx="39" cy="36" r="4.5" fill="#000000" opacity="0.18" />
        <circle cx="61" cy="58" r="3.5" fill="#000000" opacity="0.18" />

        {/* Front portion of planetary ring passing over the front */}
        <path
          d="M11 63 C22 75 62 65 89 37 L93 39 C64 70 20 80 7 66 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

/**
 * Official Star Wars: The Deckbuilding Game Attack Blaster Icon (Attacco)
 * Crisp, flat 2D red blaster pistol silhouette with scope, barrel,
 * flash suppressor, trigger guard and angled grip (strictly flat 2D, no glow).
 */
export const BlasterAttackIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} inline-block flex-shrink-0 transition-transform`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Attacco Blaster"
    >
      {/* Crisp, solid, flat 2D Blaster Silhouette */}
      <g fill="#ef4444">
        {/* Top targeting scope */}
        <rect x="34" y="22" width="34" height="6.5" rx="1.5" />
        <rect x="28" y="20.5" width="6" height="9.5" rx="1" />
        <polygon points="68,21 76,19 76,31.5 68,29.5" />
        <rect x="42" y="28.5" width="4" height="7" />
        <rect x="58" y="28.5" width="4" height="7" />

        {/* Main receiver & barrel */}
        <path d="M30 35 L74 35 L74 46 L64 48 L62 58 L54 58 L54 48 L30 48 Z" />
        <rect x="74" y="37.5" width="11" height="6.5" />

        {/* Conical muzzle flash compensator */}
        <polygon points="85,34.5 96,32 96,49.5 85,47" />

        {/* Trigger guard loop */}
        <path
          d="M54 48 C54 62, 40 62, 40 50 L43 50 C43 59, 51 59, 51 48 Z"
        />

        {/* Curved trigger */}
        <path d="M47 49 C48 53, 45 55, 43 56 L44.5 57.5 C47.5 56, 50.5 53, 49 49 Z" />

        {/* Angled pistol grip */}
        <polygon points="26,47 36,49 29,82 17,84 14,76 24,49" />
      </g>
    </svg>
  );
};

/**
 * Star Wars Capital Ship / Fleet Icon (Flotta)
 * Wedge-shaped capital starship silhouette with bridge superstructure and sub-light engines.
 * Replaces the maritime anchor icon across the entire game (strictly flat 2D, no glow).
 */
export const StarshipFleetIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} inline-block flex-shrink-0 transition-transform`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Flotta Stellare"
    >
      <g>
        {/* Main triangular hull */}
        <polygon
          points="50,12 88,80 72,76 50,82 28,76 12,80"
          fill="currentColor"
        />
        {/* Center superstructure spine */}
        <polygon
          points="50,28 64,74 50,77 36,74"
          fill="#030712"
          opacity="0.35"
        />
        {/* Command bridge tower */}
        <polygon
          points="46,54 54,54 54,63 46,63"
          fill="currentColor"
        />
        <rect
          x="42"
          y="50"
          width="16"
          height="4.5"
          rx="1"
          fill="currentColor"
        />
        {/* Dual sensor shield globes */}
        <circle cx="43" cy="48" r="2" fill="currentColor" />
        <circle cx="57" cy="48" r="2" fill="currentColor" />
        {/* Engine thrusters */}
        <rect x="36" y="80" width="6" height="5" rx="1.5" fill="currentColor" />
        <rect x="47" y="83" width="6" height="5" rx="1.5" fill="currentColor" />
        <rect x="58" y="80" width="6" height="5" rx="1.5" fill="currentColor" />
      </g>
    </svg>
  );
};

/**
 * Official Jedi Order Icon (Simbolo Ufficiale dell'Ordine Jedi / La Forza)
 * Canonical Star Wars Jedi Order crest:
 * Upward-pointing lightsaber blade through the center with soaring curved wings
 * flanking it symmetrically, flat 2D vector without glowing filters.
 */
export const ForceStarWarsIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} inline-block flex-shrink-0 transition-transform`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="La Forza (Ordine Jedi)"
    >
      <g>
        {/* Central Lightsaber Blade (pointed tip at top, tapering down) */}
        <polygon points="48.5,5 51.5,5 52.5,68 50,73 47.5,68" />
        
        {/* Hilt / Emitter Base */}
        <polygon points="47,73 53,73 52,82 48,82" />

        {/* Central Core Sunburst Pip */}
        <circle cx="50" cy="62" r="4" />

        {/* Left Jedi Wing (Curving upward and wrapping around the blade) */}
        <path
          d="M45 44 C40 30, 28 20, 16 18 C15 33, 23 51, 35 62 C40 67, 44 73, 45 78 C42 71, 37 65, 29 57 C21 48, 22 34, 24 28 C32 31, 39 38, 45 44 Z"
        />
        {/* Left Inner Wing Tier */}
        <path
          d="M44 54 C38 46, 30 40, 24 38 C23 48, 30 60, 42 68 Z"
        />

        {/* Right Jedi Wing (Symmetrical mirror) */}
        <path
          d="M55 44 C60 30, 72 20, 84 18 C85 33, 77 51, 65 62 C60 67, 56 73, 55 78 C58 71, 63 65, 71 57 C79 48, 78 34, 76 28 C68 31, 61 38, 55 44 Z"
        />
        {/* Right Inner Wing Tier */}
        <path
          d="M56 54 C62 46, 70 40, 76 38 C77 48, 70 60, 58 68 Z"
        />

        {/* Lower Foundation Arc */}
        <path
          d="M42 82 C46 86, 54 86, 58 82 C55 84, 45 84, 42 82 Z"
        />
      </g>
    </svg>
  );
};

// Backward-compatible aliases
export const ForceIcon = ForceStarWarsIcon;
export const JediOrderIcon = ForceStarWarsIcon;
