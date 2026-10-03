import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink, FileText, ShieldCheck } from 'lucide-react';

/**
 * Interactive Modal for previewing official ISS PDF catalogues directly on the website
 * Uses React Portal and z-[9999] so it renders cleanly above the sticky navigation header.
 */
export default function CatalogueModal({ catalogue, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !catalogue) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/85 backdrop-blur-sm transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[84vh] max-h-[860px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Rendered at top of dialog, fully visible and above Navbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#031B33] text-white border-b border-slate-700/80 shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D71920]/20 border border-[#D71920]/40 flex items-center justify-center shrink-0 text-[#D71920]">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#FFC400]">
                  Official Catalogue Preview
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-[11px] text-slate-300 font-medium">
                  {catalogue.size}
                </span>
              </div>
              <h3
                id="catalogue-modal-title"
                className="font-heading font-bold text-sm sm:text-base text-white truncate leading-snug"
                title={catalogue.title}
              >
                {catalogue.title}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={catalogue.url}
              download={catalogue.fileName}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D71920] hover:bg-[#b01319] text-white text-xs font-heading font-semibold transition-all duration-150 shadow-xs cursor-pointer"
              title="Download PDF to your computer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={catalogue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-medium transition-colors"
              title="Open full PDF in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
              aria-label="Close PDF preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Container */}
        <div className="flex-1 w-full bg-slate-100 relative overflow-hidden">
          <iframe
            src={`${catalogue.url}#view=FitH`}
            title={catalogue.title}
            className="w-full h-full border-0"
          />

          {/* Fallback Notice for browsers with disabled inline PDF viewing */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-slate-300 text-slate-700 px-3.5 py-1.5 rounded-full text-xs shadow-md flex items-center gap-2 pointer-events-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Having trouble previewing?</span>
            <a
              href={catalogue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#D71920] hover:underline"
            >
              Open in new tab →
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
