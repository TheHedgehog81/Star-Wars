import React from 'react';

interface IconProps {
  className?: string;
  glow?: boolean;
}

/**
 * Official Star Wars: The Deckbuilding Game Resource Cube Icon
 * Isometric supply crate/cube with 3 visible facets in gold/yellow,
 * chamfered edges, metallic highlight, and techno-panel lines.
 */
export const ResourceCubeIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
  glow = false,
}) => {
  const glowClass = glow ? 'drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]' : '';

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${glowClass} inline-block transition-transform flex-shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Resource Cube"
    >
      <defs>
        {/* Top face gradient */}
        <linearGradient id="resourceTop" x1="50" y1="8" x2="50" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>

        {/* Left face gradient */}
        <linearGradient id="resourceLeft" x1="10" y1="28" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        {/* Right face gradient */}
        <linearGradient id="resourceRight" x1="90" y1="28" x2="50" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>

        {/* Inset techno core glow */}
        <linearGradient id="coreGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
      </defs>

      {/* Outer subtle shadow/border */}
      <polygon
        points="50,6 92,27 92,73 50,94 8,73 8,27"
        fill="#78350f"
        opacity="0.6"
      />

      {/* TOP FACE (lightest facet) */}
      <polygon
        points="50,9 89,28.5 50,48 11,28.5"
        fill="url(#resourceTop)"
        stroke="#fef9c3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Top Face Inset Panel */}
      <polygon
        points="50,17 76,30 50,43 24,30"
        fill="#fde047"
        stroke="#ca8a04"
        strokeWidth="1.5"
      />
      {/* Top Face Center Tech pip */}
      <polygon
        points="50,24 62,30 50,36 38,30"
        fill="url(#coreGold)"
      />

      {/* LEFT FACE (mid-tone facet) */}
      <polygon
        points="11,28.5 50,48 50,89 11,69.5"
        fill="url(#resourceLeft)"
        stroke="#fef08a"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Left Face Panel grooves */}
      <polygon
        points="18,35 44,48 44,81 18,68"
        fill="#b45309"
        opacity="0.4"
      />
      <polygon
        points="22,39 42,49 42,77 22,67"
        fill="#d97706"
      />
      {/* Left Face Horizontal tech slots */}
      <line x1="26" y1="52" x2="38" y2="58" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="26" y1="62" x2="38" y2="68" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

      {/* RIGHT FACE (shaded facet) */}
      <polygon
        points="50,48 89,28.5 89,69.5 50,89"
        fill="url(#resourceRight)"
        stroke="#facc15"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Right Face Panel grooves */}
      <polygon
        points="56,48 82,35 82,68 56,81"
        fill="#78350f"
        opacity="0.4"
      />
      <polygon
        points="58,49 78,39 78,67 58,77"
        fill="#b45309"
      />
      {/* Right Face Horizontal tech slots */}
      <line x1="62" y1="58" x2="74" y2="52" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="62" y1="68" x2="74" y2="62" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

      {/* Corner reinforcement rivets / highlights */}
      <circle cx="50" cy="48" r="2" fill="#fff" opacity="0.9" />
      <circle cx="11" cy="28.5" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="89" cy="28.5" r="1.5" fill="#fef08a" opacity="0.8" />
      <circle cx="50" cy="89" r="1.5" fill="#d97706" opacity="0.8" />
    </svg>
  );
};

/**
 * Official Star Wars: The Deckbuilding Game Attack Blaster Pistol Icon
 * Crimson/red blaster pistol silhouette pointing right with barrel,
 * flash suppressor / compensator, top targeting scope, power pack,
 * grip, and trigger guard.
 */
export const BlasterAttackIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
  glow = false,
}) => {
  const glowClass = glow ? 'drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]' : '';

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${glowClass} inline-block transition-transform flex-shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Blaster Pistol Attack"
    >
      <defs>
        {/* Blaster Body Gradient */}
        <linearGradient id="blasterRed" x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>

        {/* Laser Glow on Muzzle */}
        <radialGradient id="laserGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
      </defs>

      {/* High-power Blaster Pistol Silhouette */}
      <g>
        {/* 1. TOP TARGETING SCOPE */}
        {/* Scope Tube */}
        <rect x="36" y="22" width="34" height="6.5" rx="2" fill="url(#blasterRed)" stroke="#fecaca" strokeWidth="1" />
        {/* Scope Front Bell / Lens */}
        <path d="M70 20.5 L78 18.5 L78 32 L70 30 Z" fill="#f87171" stroke="#fca5a5" strokeWidth="0.8" />
        {/* Scope Rear Eyepiece */}
        <rect x="30" y="20" width="6" height="10.5" rx="1.5" fill="#b91c1c" stroke="#f87171" strokeWidth="0.8" />
        {/* Scope Mount Brackets */}
        <rect x="42" y="28.5" width="5" height="7.5" fill="#991b1b" />
        <rect x="60" y="28.5" width="5" height="7.5" fill="#991b1b" />

        {/* 2. MAIN RECEIVER & BARREL */}
        {/* Receiver Frame */}
        <path
          d="M32 35 L74 35 L74 46 L64 48 L61 58 L54 58 L54 48 L32 48 Z"
          fill="url(#blasterRed)"
          stroke="#fca5a5"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Forward Barrel Extension */}
        <rect x="74" y="37.5" width="13" height="6.5" fill="#ef4444" />

        {/* Conical Muzzle Flash Suppressor / Compensator (DL-44 Style) */}
        <path
          d="M87 34.5 L97 32 L97 49.5 L87 47 Z"
          fill="url(#laserGlow)"
          stroke="#fee2e2"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Muzzle Vent Slots */}
        <line x1="91" y1="36" x2="91" y2="45.5" stroke="#7f1d1d" strokeWidth="1.5" />
        <line x1="94" y1="35" x2="94" y2="46.5" stroke="#7f1d1d" strokeWidth="1.5" />

        {/* Cooling Fins on Barrel */}
        <line x1="48" y1="38" x2="48" y2="44" stroke="#fecaca" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="53" y1="38" x2="53" y2="44" stroke="#fecaca" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="58" y1="38" x2="58" y2="44" stroke="#fecaca" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="63" y1="38" x2="63" y2="44" stroke="#fecaca" strokeWidth="1.5" strokeLinecap="round" />

        {/* Magazine / Power Pack Housing in front of trigger */}
        <path
          d="M54 48 L62 48 L60 61 L53 61 Z"
          fill="#991b1b"
          stroke="#f87171"
          strokeWidth="0.8"
        />

        {/* 3. TRIGGER GUARD & TRIGGER */}
        {/* Trigger Guard Loop */}
        <path
          d="M52 48 C52 64, 38 64, 38 52"
          stroke="#fca5a5"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Curved Trigger */}
        <path
          d="M45 49 C46 54, 43 56, 41 57"
          stroke="#fef08a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* 4. PISTOL GRIP & RECEIVER TANG */}
        {/* Receiver Tang / Hammer Arch */}
        <path
          d="M32 35 C27 36, 25 41, 26 47 L29 48 Z"
          fill="#7f1d1d"
        />
        {/* Ergonomic Angled Handgrip */}
        <path
          d="M26 47 L36 49 L29 82 C28 85, 23 87, 18 86 C14 85, 12 80, 14 76 L24 49 Z"
          fill="url(#blasterRed)"
          stroke="#fca5a5"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Grip Texture Ribs / Grooves */}
        <line x1="21" y1="56" x2="31" y2="58" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="64" x2="28" y2="66" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="72" x2="26" y2="74" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />

        {/* Grip Base Butt-plate */}
        <path
          d="M13 77 L18 86 C18 87, 26 86, 29 82"
          stroke="#fef08a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
