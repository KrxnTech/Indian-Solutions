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
 * ClientCompanyCard Component
 *
 * Renders an individual company card inside the scrolling train track.
 * Supports image logo loading with an automatic fallback monogram badge.
 */
export default function ClientCompanyCard({ company, onSelect }) {
  const [hasImgError, setHasImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(company)}
      aria-label={`View relationship and project details for ${company.name}`}
      className="group relative bg-white border border-slate-200/90 hover:border-[#062A4F]/40 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 w-52 sm:w-64 md:w-72 h-28 sm:h-32 flex flex-col items-center justify-center p-4 sm:p-5 shrink-0 cursor-pointer select-none text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F] focus-visible:ring-offset-2"
    >
      {/* Top micro-badge indicator */}
      <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#D71920] transition-colors duration-200" />

      {!hasImgError ? (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            loading="lazy"
            onError={() => setHasImgError(true)}
            className="max-h-12 sm:max-h-14 max-w-[85%] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        /* High-quality monogram fallback when logo image file is yet to be placed */
        <div className="w-full flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-lg bg-[#062A4F]/5 text-[#062A4F] border border-slate-200 flex items-center justify-center font-heading font-bold text-xs shrink-0 group-hover:bg-[#062A4F] group-hover:text-white transition-colors duration-300">
            {getCompanyInitials(company.name)}
          </div>
          <div className="overflow-hidden min-w-0 flex-1">
            <h4 className="font-heading font-bold text-xs sm:text-sm text-[#062A4F] truncate group-hover:text-[#D71920] transition-colors duration-200">
              {company.name}
            </h4>
            <span className="text-[11px] text-[#64748B] truncate block mt-0.5">
              {company.industry}
            </span>
          </div>
        </div>
      )}

      {/* Bottom faint highlight on hover */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#062A4F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
