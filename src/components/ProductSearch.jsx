import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Accessible, instant ProductSearch component
 */
export default function ProductSearch({
  value,
  onChange,
  placeholder = 'Search products, categories or brands...',
  className = '',
}) {
  return (
    <div className={`relative w-full ${className}`.trim()}>
      <label htmlFor="catalogue-search-input" className="sr-only">
        Search products, categories or brands
      </label>

      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" aria-hidden="true" />
      </div>

      {/* Search Input */}
      <input
        id="catalogue-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products, categories or brands"
        autoComplete="off"
        className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] text-[#17202A] placeholder-slate-400 transition-shadow duration-150"
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search query"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#062A4F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#062A4F] rounded-r-lg"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
