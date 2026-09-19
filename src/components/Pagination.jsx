import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable accessible Pagination Component for ISS Product Catalogue
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis collapsing for desktop
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageClick = (p) => {
    if (typeof p === 'number' && p !== currentPage) {
      onPageChange(p);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Catalogue Pagination"
      className={`flex items-center justify-between sm:justify-center gap-2 pt-8 pb-4 border-t border-slate-200 select-none ${className}`.trim()}
    >
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => handlePageClick(currentPage - 1)}
        aria-label="Previous page"
        className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-heading font-semibold rounded-md border border-slate-300 bg-white text-[#062A4F] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#062A4F]"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        <span>Previous</span>
      </button>

      {/* Desktop Page Numbers */}
      <div className="hidden sm:flex items-center gap-1.5 mx-2">
        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 text-slate-400 text-sm select-none">
                ...
              </span>
            );
          }
          const isActive = p === currentPage;
          return (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => handlePageClick(p)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Page ${p}`}
              className={`min-w-[36px] h-9 px-2.5 text-xs sm:text-sm font-heading font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#062A4F] ${
                isActive
                  ? 'bg-[#062A4F] text-white shadow-xs'
                  : 'bg-white text-[#17202A] border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Mobile Page Indicator */}
      <div className="sm:hidden text-xs font-heading font-semibold text-[#64748B]">
        Page <span className="text-[#062A4F] font-bold">{currentPage}</span> of{' '}
        <span className="text-[#062A4F] font-bold">{totalPages}</span>
      </div>

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        aria-label="Next page"
        className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-heading font-semibold rounded-md border border-slate-300 bg-white text-[#062A4F] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#062A4F]"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
