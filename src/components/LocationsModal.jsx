import React, { useEffect, useRef } from 'react';
import { X, MapPin, Phone, Mail, Building2, ShieldCheck, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { ADDITIONAL_LOCATIONS } from '../data/locations';

/**
 * LocationsModal Component
 *
 * Displays the 5 additional company locations alongside the primary Head Office
 * in an elegant, accessible corporate modal dialog.
 */
export default function LocationsModal({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  // Close on Escape key & lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="locations-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#031B33]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 focus:outline-none max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close locations dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#062A4F] hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D71920]" />
            <span className="font-heading text-xs uppercase tracking-widest font-bold text-[#D71920]">
              Operational Network
            </span>
          </div>
          <h2
            id="locations-modal-title"
            className="font-heading text-2xl sm:text-3xl font-extrabold text-[#062A4F]"
          >
            Company Locations
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Find our head office and operational branch locations across Gujarat and India.
          </p>
        </div>

        {/* Primary Head Office Highlight */}
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-[#031B33] text-white border border-slate-700 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
            <div>
              <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-wider text-[#FFC400] bg-white/10 px-2 py-0.5 rounded-xs mb-1">
                Head Office &amp; Operations
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                {COMPANY_INFO.name}
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=7CJR%2B874+Hotel+Amiras+Compound,+to,+Ahmedabad+-+Mehsana+Rd,+near+Chhatral,+Chokdi,+GIDC+Chhatral,+Gujarat+382729"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-[#FFC400] hover:text-white transition-colors"
            >
              <span>View on Map</span>
              <span>→</span>
            </a>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed mb-3">
            <p>{COMPANY_INFO.address.full}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-700 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D71920]" />
              <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-[#FFC400] transition-colors">
                {COMPANY_INFO.phonePrimary}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#FFC400]" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#FFC400] transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* 5 Additional Locations Header */}
        <div className="flex items-center justify-between gap-2 mb-4 pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            <h4 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-[#062A4F]">
              Additional Locations (+5)
            </h4>
          </div>
          <span className="text-[11px] font-heading font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            5 Regional Branches
          </span>
        </div>

        {/* 5 Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ADDITIONAL_LOCATIONS.map((location) => {
            const mapHref =
              location.mapUrl ||
              (location.address && !location.address.toLowerCase().includes('to be updated')
                ? `https://maps.google.com/?q=${encodeURIComponent(`${location.name} ${location.address}`)}`
                : `https://maps.google.com/?q=${encodeURIComponent(`${location.name} Gujarat India`)}`);

            return (
              <div
                key={location.id}
                className="group relative bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-[#062A4F]/30 rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-md"
              >
                <div>
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#062A4F]/5 text-[#D71920] flex items-center justify-center shrink-0 group-hover:bg-[#062A4F] group-hover:text-white transition-colors duration-200">
                      <MapPin className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block text-[9px] font-heading font-bold uppercase tracking-wider text-[#062A4F] bg-slate-200/80 px-1.5 py-0.5 rounded-xs mb-0.5">
                        Branch
                      </span>
                      <h5 className="font-heading text-sm font-bold text-[#062A4F] truncate">
                        {location.name}
                      </h5>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {location.address}
                  </p>

                  {(location.phone || location.email) && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 mb-3">
                      {location.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#D71920] shrink-0" />
                          <a href={`tel:${location.phone.replace(/\s+/g, '')}`} className="hover:text-[#062A4F] transition-colors">
                            {location.phone}
                          </a>
                        </div>
                      )}
                      {location.email && (
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#062A4F] shrink-0" />
                          <a href={`mailto:${location.email}`} className="hover:text-[#D71920] transition-colors truncate">
                            {location.email}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-[#062A4F] hover:text-[#D71920] transition-colors group/link"
                  >
                    <span>View on Map</span>
                    <span className="text-xs text-[#D71920] transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
