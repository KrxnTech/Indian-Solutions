import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, ShieldCheck, Building2 } from 'lucide-react';
import Button from '../Button';

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
 * ClientCompanyModal Component
 *
 * Displays detailed information about a selected company in a clean corporate dialog.
 */
export default function ClientCompanyModal({ company, onClose }) {
  const [hasImgError, setHasImgError] = useState(false);
  const closeButtonRef = useRef(null);

  // Close on Escape key & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount for accessibility
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!company) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 client-modal-backdrop bg-[#031B33]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 client-modal-content focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#062A4F] hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Company Logo / Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-28 sm:w-32 h-20 sm:h-22 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center p-3 mb-4 shadow-sm">
            {!hasImgError ? (
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                onError={() => setHasImgError(true)}
                className="max-h-full max-w-full object-contain pointer-events-none"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#062A4F]">
                <Building2 className="w-6 h-6 mb-1 text-[#062A4F]" />
                <span className="font-heading font-extrabold text-sm tracking-wider">
                  {getCompanyInitials(company.name)}
                </span>
              </div>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#062A4F]/5 text-[#D71920] mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#062A4F]" />
            {company.industry || 'Industrial Partner'}
          </span>

          <h3
            id="client-modal-title"
            className="font-heading text-xl sm:text-2xl font-bold text-[#062A4F]"
          >
            {company.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#64748B] mt-3 leading-relaxed max-w-md">
            {company.description}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-heading font-semibold bg-[#062A4F] text-white hover:bg-[#031B33] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F] shadow-xs"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
