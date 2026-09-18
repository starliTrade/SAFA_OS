/**
 * SAFA Official Brand Logo Component
 * High-precision vector typography matching the official atelier branding:
 * Exact vector SVG provided by the user with responsive sizing and adaptive theme coloring.
 */

import React from 'react';
import { useApp } from '../../core/context/AppContext';

interface SafaBrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Separated Vector Subpaths from the master artwork
const ENGLISH_DASHED_STITCHES_PATH =
  'M52 279h10v-1H51zm-25-3h2l1 1h9v-1h-3l-1-1h-8zm56-3-1 1-7 1v2l9-2 2-1v-1zm537-1h11v-1h-11zm-24 0h11v-1h-11zm-24 0h11v-1h-11zm-190 0h11v-1h-11zm-48 0h12v-1h-12zm-24 0h12v-1h-12zm-24 0h12v-1h-12zm-23 0h11v-1h-11zM4 273l11 1-1-2H9l-1-1H4l-1 1zm476-2h11v-1h-11zm-13 0v-1h-8l-1 1h-2zm-34 1h10v-1h-9l-1-1-1 1zm-263-1h11v-1h-11zm-13 0v-1h-8l-1 1h-2zm-34 1h10v-1h-9l-2-1zm426-1 1 1h9v-1h-8l-1-2h-1zm-310-1 2 2h9v-1h-8l-2-2h-1zm-186-4h11v-1H53zm356-3v7l-1 1h-2v1h3l1-1v-5l1-1-1-2zm86-2h3l1 1v5h1v-6l-2-1h-4zm-169-1-1 1v6h1v-3l2-2h3l1-2zm-141 1h4l1 1v5h1v-6l-2-1h-5zm-80-1-5 5h-1l-2 2v1h2l2-2h1l3-3 1-3zm515 0h3l1 1h7l-1-1h-3l-1-1h-6zm-310 0h3l1 1h8l-1-1h-4l-1-1h-6zm246-1-2 1v1l10-1 1-2zm-112-1-4 2h-4v1h6l1-1 4-1v-1zm-310 0-4 2h-4v1h6l1-1 4-1v-1zm-49-2-5 4-4 1v2h2l8-5v-2zm-54 1 8 5h2v-1l-3-1-6-5h-1zm444-4 1 2 3 3h3v-1h-1l-4-4v-3h-2zM2 257l1 2h1v-8l-1-1v-2H2zm605-6 2 2h1l-3-6-1-4h-2zm-36-7 2 2v5h1v-6l-1-1v-3l-2-1zm-551-1 2 2v1h1l-4-8v-2h-2zM1 233l1 2h1v-8l-1-1v-2H1zm596-10 1 1 1 5 1 2h1v-3l-1-1-1-5-1-2h-1zm-33-3 1 1 1 7h2v-2l-1-1-2-8h-1zm-554-4 1 1 1 7h2l-1-6-1-1v-4h-2zm371 6h1v-11h-1zM2 211v-2l1-1h6v-1H1v4zm349 3h2v-11h-2zm240-13v2l1 1v4h2v-2l-3-6v-3h-2zm-311-2v3l1 1v3l1 2h1l1-2-1-1-1-5-1-2-2-1zm152 2 2 3h3v-1h-1l-2-2v-6h-2zm124-5 1 1 2 8h2v-2l-1-1-2-8h-2zm-309 2 1 1 1 6h2l-1-4-1-1v-2l-1-1v-2l-1-1zm-122 7h2v-6l-1-1v-3l-1-1zm349-11v3l-2 4v3h1l2-4v-2l1-1v-4zm-389-1 4 4 2 4h2l-2-4-5-5h-1zm453-5h11v-1h-11zm-44 3v-2l1-1h6v-1h-8l-1 4zm-113 7h1v-11h-1zm-177-10h11v-1h-11zm240-3v7l-1 1v3h2v-11zm-93 5h2v-11l-2-1zm231-13 2 4v3l2 1v-3l-1-1-1-5-1-2h-1zm-310 0 2 3 1 5h1l-1-6-1-1v-3l-2-1zm-57-2h11v-1h-11zm-24 0h11v-1h-11zm-78-1 5 6 1 3h2v-2l-2-2v-1l-4-4v-1h-2zm369-2v2l-3 6v2h2v-3l1-1v-2l1-1 1-4zm-82-3h11v-1h-11zm-19-1v6h1v-3l2-2h3v-1zm-338 2 10 5v-2l-10-5zm507 3-2 1v1h4l-2-8h-1zm-50-7-1 1-2 8h14v-1h-11l-1-1 1-1v-2l2-4v-2h-2zm-403-7h1l6 6h1v-2l-3-3-6-3zm292-3 1-1h3-11v1zm-366 0 3 3h1l3 3 3 1v-2l-4-2-3-3-3-1zm328 9h2v-11h-2zm62-12-1 1h-6v1h10l1-2zm161 1 2 3 1 5h2l-1-4-1-1v-2l-1-1v-3h-2zm-310-1 1 1 2 8h2v-2l-2-3-1-5-2-1zm-84-5-1 5-2 3v3l2-1v-3l1-1v-2l2-4zm-105-1 8 4h2v-2l-6-3-4-1zm466-1 1 1 2 8h2v-2l-1-1-2-8h-2zM8 140l2 2v1l4 4h1l-2-4-3-3-1-3H8zm422-3-1 6-2 2 1 2h1l2-3 1-8zm-49 6h1v-11h-1zm-30-2h2v-11h-2zm216-10 1 1 1 7h2l-2-9-1-2h-1zm-310 1 1 1v2l2 4h1l-1-6-1-1v-3l-2-1zm-69-7-1 2v2l-2 4v3l2-1v-3l2-4v-3zm245-2h4l2-1 4 2v-2h-10zm101 0 1 1 2 8h1l-1-6-1-1v-3l-2-1zm-497-2 6 6h1v-1l-6-6v-1l-2-1zm-34 1 1 1v2h1l-1-10-1-1zm378-3h1v-11h-1zm-30-2h2v-11h-2zm208-9 2 3 1 5h2l-1-4-1-1v-2l-1-1v-3h-2zm-310 0 2 3 1 5h2v-2l-2-3-1-5-2-1zm-131-3v6l-1 1h-3v1h5v-8zm387-2v3l-1 1v2l-2 4h2l1-5 2-3v-3zm-309-1-1 2v2l-2 4v3h1v-2l2-3 1-6zm332 3 1 1v3l2 1v-2l-1-1-2-8h-1zm-311-3 2 3v3l1 2h1v-3l-2-4v-3l-2-1zm305-7-1 6-1 1-1 4h2l1-5 2-3v-3zm-310 0v3l-1 1-1 7 2-3v-2l2-4-1-2zM30 106h2v-2l-1-1v-8h-1zm73-10 1 1 2 8h2l-1-5-2-3v-3h-2zm371 7h1V92h-2zm-13-10 1 1 2 8h1l-1-9-1-2h-2zM4 91v3l-1 1v6h1v-2l1-1 1-8zm377 4h1V84h-1zm172-6 1 1v4h2l-1-7-2-4h-1zm-310 1 2 4h1v-3l-1-1-1-6-2-1zm108 3h2V82h-2zm-234-1h1V81h-1zm396-12v3l-1 1v2l-2 4h2v-3l3-6v-2zm-310-1v3l-1 1v2l-1 1-1 4 2-1v-2l2-3v-2l1-1-1-2zM93 75l2 2 3 6h1v-3l-2-4-3-3h-1zm-55-2v1l-4 5-1 4h2v-2l2-4 3-3v-1zm408 0h1l7 7h1v-1l-6-6-3-1zM17 70l-5 5-2 4h2v-1l6-7v-1zm453 4 1 1v3l1 1V69l-2-1zm-46-8h8l1 1h2v-2h-11zm-24 0h11v-1h-11zm-19-1v6h1v-4l1-1h4v-1zm-41 0 6 2 3 3 2-1-5-4-6-1zM72 63h3l1 1h2l1 1 4 1v-2h-2l-3-2h-6zm472-1 2 3 1 5 2 1v-2l-1-1-2-8h-2zm-309 1 1 1 1 7h2v-3l-4-8zm286-6-1 6-2 3v2l2-1v-2l1-1v-2l1-1 1-4zM116 68h1v-8l-1-1v-2zM34 56l-2 2-4 2-1 2 3-1 5-4h2v-2zm426-3h5l3 3v1h1v-3l-2-2h-7zm-24 0h11v-1h-11zm-24 0h11v-1h-11zm-24 0h11v-1h-11zm-24 0h11v-1h-11zm-24 0h12v-1h-12zm-14 1-1 1v7l3 1-1-2v-7l1-2h-2zM97 53h2l1 1h8v-1h-7l-1-1h-3zm-23-3 10 1-1-2H73zm462-4-1 1h-4l-1 1h5l1-1h3l2 1v-2z';

const PERSIAN_CALLIGRAPHY_PATH =
  'M216 21l-1 3-2 2-1 3-2 2-1 3-2 2-1 3-2 2-1 3-3 4 11 10v2l-2 3-1 5 2-1 1-4 2-3h1l6 6 4 2 18-28-4-4h-1l-5-5h-1l-5-5h-1l-5-5-2-1zM44 28l-1 1v13l1 1-1 1 1 1v10l1 1v8l1 1v12l1 1v9l1 1v9l1 1v9l1 1v8l1 1v10l1 1v9l1 1v10l1 1v7l1 1 1 20 1 1v8l1 1v9l1 1v8l1 1v9l1 1v4l1 1v3l1 1 1 5 6 11 8 8 7 4h2l4 2h6l1 1h37l1-1h8l1-1h6l1-1h4l1-1h4l1-1h2l2 4 3 3h3v-1h-2l-3-3v-2l-1-1 5-3h2l3-2h2l4-2 2-2 3-1 6-5h2l5 4 8 4 2 2 6 3h2l3 2h2l3 2 6 1 1 1h3l1 1h4l1 1h8l1 1-1 1h-4l-2 1v1h5l1-1h4l2-3h25l1-1h5l1-1h3l4-2h5v-1l2-2 3-1 6-5h1l6-6 4-7 2-1 5 11 3 3v1l7 6 8 4v1l-2 1-1 2 6-3h4l1 1h14l1 1-3 12-1 1h-8v1h7l1 1-1 4-1 1v3l-1 1v5l1 1v3l2 3h2v-2l1-1v-2l1-1v-2l1-1v-2l1-1v-2l1-1v-2l1-1 2-8 4-8h4l1-1 1 2 2 1h3l1 1h5l-1-1h-5l-3-2 1-1 21-1 1-1h7l1-1 13-1 1-1 9-1 1-1h3l1-1h3l1-1h3l1 1v2h1l3-5 4-1 3-2 5-1 3-2h2l5-3h2l4-2 2-2 3-1 2-2 3-1 6-5h1l12-11v-1l4-4v-1l5-6 5-10v-2l1-1v-2l1-1v-2l1-1v-2l2-4v-4l1-1v-4l1-1v-8l1-1-1-1v-6l-1-1v-2l-1-2-9-10h-1l-4-4h-1l-6-5 1-7h-1v2l-2 4h-2l-3-2h-3l-1-1h-4l-1-1h-9l-1 1h-3l-3 2h-2l-10 5-2 2h-1l-2 2-7 4-3 3h-1l-9 8-2-1v-9h-1v12l-14 14h-1l-1 2h-1v1l-16 17v1l-3 3v1l-3 3v1l-3 3-2 4-5 6-1 3-5 7-5 10h-6l-1 1h-4l-1-1h-6l-1-1-6-1-7-4-8-8-5-10v-3l-1-1v-3l-1-1v-3l-1-1h-3v1l-5 6v1l-16 16h-1l-3 3-3 1-2 2-6 3h-2l-4 2-2-4h-2l1 2v2l-1 1h-6l-1 1h-5l-1-1h-15l-2-4v-3l-2-1 1 6-1 1h-3l-1-1h-4l-1-1h-3l-1-1-5-1-4-2-2-2 6-8 1-3 2-2 6-12v-2l3-6 1-7 1-1v-16l-1-1v-6l-1-1v-3l-1-1-1-7-1-1v-2l-2-3v-2l-2-4-2-2-2-4-2-1v-1l-8-4h-8l-1 1h-2l-4 2-5 4-1-1 1-4h-2l-1 4-1 1v2l-1 1v2l-7 8v1l-10 14-9 18-2 2h-2v3l-2 4v7l-1 1-1 7-1 1-2-1-1 4-1 1v2l-1 1v3h1l2-4v-3l1-1 1 1v12l1 1v3l1 1v2l-2 2-6 3h-2l-1-1 1-4h-2v3l-2 3-2 1h-4l-1 1h-6l-1 1h-15l-1-1 1-2v-4h-2v6l-1 1h-14l-1-1h-5l-3-2v-5l-1-1v-3l-2-1v3l1 1v5l-2 1-8-4-5-5-4-7v-2l-2-4v-4l-1-1v-7l-1-1v-11l-1-1v-11l-1-1v-11l-1-1v-12l-1-1v-11l-1-1v-11l-1-1v-12l-1-1V93l-1-1V81l-1-1V69l-1-1V57l-1-1V44l-1-1V32l-1-1V20l-1-1V8l-1-1V3v1l-3 3v1l-6 8-1 3-2 2-4 8zm412 218 1 1-1 1-1-1zm61-61h-1l-9 8-3 1-7 5-8 4h-2l-2 2h-2l-3 2h-2l-3 2h-2l-1 1h-2l-1 1h-2l-1 1h-2l-4 2h-3l-4 2-8 1-1 1-8 1-1 1h-5l-1 1h-5l-1 1h-7l-1 1h-7l-1 1h-8l-1-1 4-5v-1l4-4v-1l5-5v-1l20-21h1l8-8h1l4-4 4-2 3-3 16-9h2l1-1h2l1-1h2l4-2h6l1 1v3h2v-3l1-1 4 1 8 4 3 3h1l11 11v1l4 5zm-292-27h1l7 8 2 4 1 5 1 1v6l-4 5h-5v1h2l1 1-5 4-3 1-2 2-4 2h-2l-3 2h-2l-3 2-4 1-6-5h-1l-8-8v-1l1-1h2v-1h-5l-1-1-3-6 1-6 5-7 1 1-1 7h1v-2l1-1 2-8 3-3 3-1 2-2h2l3-2 6-1 1-1h6l1 1h2z';

export function SafaBrandLogo({ className = '', size = 'md' }: SafaBrandLogoProps) {
  const { themeMode } = useApp();
  const isDark = themeMode === 'dark';

  // Responsive scale presets (refined micro-adjustments for perfect navbar alignment)
  const heightMap = {
    sm: 'h-4.5 sm:h-5',
    md: 'h-5 sm:h-5.5 md:h-6',
    lg: 'h-7 sm:h-8 md:h-9',
    xl: 'h-10 sm:h-12',
  };

  const primaryFill = isDark ? '#FFFFFF' : '#111116';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${heightMap[size]} ${className}`}
      style={{ aspectRatio: '634 / 296' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 634 296"
        fill="none"
        className="w-full h-full object-contain transition-all duration-200"
        aria-label="SAFA صفا"
        shapeRendering="geometricPrecision"
      >
        {/* Layer 1: English Dashed Stitches 'SAFA' — one notch softer for balanced hierarchy */}
        <path
          fillRule="evenodd"
          fill={primaryFill}
          stroke={primaryFill}
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ paintOrder: 'stroke fill' }}
          opacity={isDark ? 0.76 : 0.8}
          d={ENGLISH_DASHED_STITCHES_PATH}
        />

        {/* Layer 2: Persian Master Calligraphy 'صفا' — 100% solid opacity for primary focus */}
        <path
          fillRule="evenodd"
          fill={primaryFill}
          opacity={1}
          d={PERSIAN_CALLIGRAPHY_PATH}
        />
      </svg>
    </div>
  );
}
