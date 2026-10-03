import React, { useState } from 'react';

/**
 * Extracts 2-letter initials for company fallback badge
 */
function getCompanyInitials(name = '') {
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase() || 'CO';
}

/**
 * ClientLogoCard Component
 *
 * Displays company logo in its 100% authentic original brand colors.
 * Zero grayscale, zero desaturation, full opacity by default.
 * Features smooth elevation, subtle colored hover glow, and accessible modal trigger.
 */
export default function ClientLogoCard({ company, onSelect }) {
  const [hasImgError, setHasImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(company)}
      aria-label={`View relationship and project details for ${company.name}`}
      className="group relative bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl shadow-2xs hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1 w-40 sm:w-44 md:w-48 lg:w-52 h-22 sm:h-24 md:h-28 shrink-0 flex items-center justify-center p-2 sm:p-2.5 cursor-pointer select-none text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F] focus-visible:ring-offset-2 overflow-hidden"
    >
      {!hasImgError ? (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={company.logo}
            alt={company.name}
            loading="lazy"
            onError={() => setHasImgError(true)}
            className="client-logo transition-transform duration-300 pointer-events-none group-hover:scale-105"
          />
        </div>
      ) : (
        /* Clean fallback if an image file fails to load */
        <div className="flex items-center gap-2.5 max-w-full overflow-hidden px-1">
          <div className="w-8 h-8 rounded-lg bg-[#062A4F]/10 text-[#062A4F] font-heading font-bold text-xs flex items-center justify-center shrink-0">
            {getCompanyInitials(company.name)}
          </div>
          <span className="font-heading font-semibold text-xs text-[#062A4F] truncate transition-colors">
            {company.name}
          </span>
        </div>
      )}
    </button>
  );
}
