import React, { useState } from 'react';
import { CATALOGUE_CATEGORIES, ALL_PRODUCTS } from '../data/products';
import { Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Reusable ProductFilters component
 * Supports:
 * - Desktop: Scannable category pill bar with live product counts
 * - Mobile: Collapsible filter drawer/tray to prevent vertical bloat
 * - Strong active state indicators
 * - Subcategory filtering
 */
export default function ProductFilters({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
  onClearFilters,
  className = '',
}) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Find current category object to check for available subcategories
  const currentCategoryObj = CATALOGUE_CATEGORIES.find(
    (c) => c.slug === selectedCategory
  );

  const availableSubCategories = currentCategoryObj?.subCategories || [];

  // Count items per category dynamically from actual data
  const getCategoryCount = (slug) => {
    if (slug === 'all') return ALL_PRODUCTS.length;
    return ALL_PRODUCTS.filter((p) => p.categorySlug === slug).length;
  };

  const hasActiveFilters =
    (selectedCategory && selectedCategory !== 'all') || Boolean(selectedSubCategory);

  const activeCategoryName =
    selectedCategory === 'all'
      ? 'All Products'
      : currentCategoryObj?.name || 'Category';

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {/* Top Header / Mobile Toggle Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#062A4F]">
          <Filter className="w-3.5 h-3.5 text-[#D71920]" aria-hidden="true" />
          <span>Product Categories</span>
          {hasActiveFilters && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#062A4F] text-white">
              Active: {activeCategoryName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Expand / Collapse Button */}
          <button
            type="button"
            onClick={() => setMobileExpanded(!mobileExpanded)}
            aria-expanded={mobileExpanded}
            aria-controls="mobile-category-tray"
            className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 text-xs font-heading font-semibold text-[#062A4F] bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
          >
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#D71920]" aria-label="Filter active" />
            )}
            {mobileExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-[#D71920] hover:underline font-heading font-semibold inline-flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-[#D71920] rounded px-1"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories Bar
          Desktop: always visible horizontally scrollable pills
          Mobile: toggleable tray to avoid pushing products down
      */}
      <div
        id="mobile-category-tray"
        className={`${
          mobileExpanded ? 'block' : 'hidden'
        } sm:block transition-all duration-200`}
      >
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:overflow-x-auto pb-2 scrollbar-thin">
          {CATALOGUE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const count = getCategoryCount(cat.slug);

            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  onCategoryChange(cat.slug);
                  if (onSubCategoryChange) onSubCategoryChange('');
                  // Close mobile tray after selecting if user wishes
                  setMobileExpanded(false);
                }}
                aria-pressed={isSelected}
                className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-heading font-semibold transition-all duration-150 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#062A4F] ${
                  isSelected
                    ? 'bg-[#062A4F] text-white shadow-xs ring-1 ring-[#062A4F]'
                    : 'bg-white text-[#17202A] border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-[#D71920] text-white font-bold' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Contextual Subcategory Filter (Visible when selected category has subcategories) */}
        {availableSubCategories.length > 0 && (
          <div className="pt-2.5 mt-1 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-heading font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Subcategory:
            </span>

            <button
              type="button"
              onClick={() => onSubCategoryChange('')}
              aria-pressed={!selectedSubCategory}
              className={`px-2.5 py-1 text-xs rounded font-heading font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#062A4F] ${
                !selectedSubCategory
                  ? 'bg-[#D71920] text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-[#17202A] hover:bg-slate-200'
              }`}
            >
              All {currentCategoryObj.name}
            </button>

            {availableSubCategories.map((sub) => {
              const isSubSelected = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => onSubCategoryChange(sub)}
                  aria-pressed={isSubSelected}
                  className={`px-2.5 py-1 text-xs rounded font-heading font-medium transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#062A4F] ${
                    isSubSelected
                      ? 'bg-[#D71920] text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-[#17202A] hover:bg-slate-200'
                  }`}
                >
                  {isSubSelected && <Check className="w-3 h-3" />}
                  <span>{sub}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
