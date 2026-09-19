import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductSearch from '../components/ProductSearch';
import ProductFilters from '../components/ProductFilters';
import Pagination from '../components/Pagination';
import Button from '../components/Button';
import RevealOnScroll from '../components/RevealOnScroll';
import {
  ALL_PRODUCTS,
  CATALOGUE_CATEGORIES,
  resolveCategorySlug,
  searchProducts,
} from '../data/products';
import { SearchX, MessageSquareQuote, X, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

const PRODUCTS_PER_PAGE = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive state directly from URL search params & normalize category
  const rawCategoryParam = searchParams.get('category') || 'all';
  const selectedCategory = resolveCategorySlug(rawCategoryParam);
  const selectedSubCategory = searchParams.get('subCategory') || '';
  const searchQuery = searchParams.get('search') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageParam) ? 1 : Math.max(1, pageParam);

  // Helper to update search params cleanly
  const updateParams = (updates) => {
    setSearchParams(
      (prevParams) => {
        const nextParams = new URLSearchParams(prevParams);
        Object.entries(updates).forEach(([key, val]) => {
          if (
            val === undefined ||
            val === null ||
            val === '' ||
            val === 'all' ||
            (key === 'page' && Number(val) <= 1)
          ) {
            nextParams.delete(key);
          } else {
            nextParams.set(key, String(val));
          }
        });
        return nextParams;
      },
      { replace: true }
    );
  };

  // Handle Category Change
  const handleCategoryChange = (slug) => {
    updateParams({
      category: slug,
      subCategory: '',
      page: 1,
    });
  };

  // Handle SubCategory Change
  const handleSubCategoryChange = (sub) => {
    updateParams({
      subCategory: sub,
      page: 1,
    });
  };

  // Handle Search Input Change
  const handleSearchChange = (query) => {
    updateParams({
      search: query,
      page: 1,
    });
  };

  // Reset all filters
  const handleClearFilters = () => {
    updateParams({
      category: 'all',
      subCategory: '',
      search: '',
      page: 1,
    });
  };

  const handlePageChange = (p) => {
    updateParams({
      page: p,
    });
  };

  // Check if requested category is valid in catalogue taxonomy
  const isCategoryValid = useMemo(() => {
    if (selectedCategory === 'all') return true;
    return CATALOGUE_CATEGORIES.some((c) => c.slug === selectedCategory);
  }, [selectedCategory]);

  // 1. Filter by Category (with graceful fallback if category is invalid)
  const categoryFiltered = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all' || !isCategoryValid) {
      return ALL_PRODUCTS;
    }
    return ALL_PRODUCTS.filter((p) => p.categorySlug === selectedCategory);
  }, [selectedCategory, isCategoryValid]);

  // 2. Filter by SubCategory
  const subCategoryFiltered = useMemo(() => {
    if (!selectedSubCategory) {
      return categoryFiltered;
    }
    return categoryFiltered.filter((p) => p.subCategory === selectedSubCategory);
  }, [categoryFiltered, selectedSubCategory]);

  // 3. Filter by Search Query
  const finalFilteredProducts = useMemo(() => {
    return searchProducts(subCategoryFiltered, searchQuery);
  }, [subCategoryFiltered, searchQuery]);

  // Calculate Pagination values
  const totalItems = finalFilteredProducts.length;
  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
    return finalFilteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [finalFilteredProducts, safeCurrentPage]);

  // Active category metadata
  const currentCategoryObj = CATALOGUE_CATEGORIES.find((c) => c.slug === selectedCategory);
  const currentCategoryName = currentCategoryObj?.name || 'All Products';

  const hasAnyFilters =
    (selectedCategory !== 'all' && isCategoryValid) ||
    Boolean(selectedSubCategory) ||
    Boolean(searchQuery.trim());

  return (
    <div className="py-6 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Compact Page Header */}
        <RevealOnScroll>
          <header className="mb-6 sm:mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-semibold uppercase tracking-wider bg-[#062A4F]/10 text-[#062A4F] mb-2">
              <span>Product Catalogue</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#062A4F] tracking-tight">
              Industrial Safety &amp; Fire Protection Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
              Explore our industrial and fire safety product range. Certified PPE, fire installations, and facility hazard controls.
            </p>
          </header>
        </RevealOnScroll>

        {/* Invalid Category Alert Banner (Graceful fallback) */}
        {!isCategoryValid && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Category not found: </span>
              The category &ldquo;{selectedCategory}&rdquo; does not exist in our catalogue. Displaying all products below.
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-amber-900 underline hover:text-amber-700"
            >
              Reset to All
            </button>
          </div>
        )}

        {/* 2. Search & Filter Bar */}
        <RevealOnScroll>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 space-y-4">
          {/* Search Input */}
          <ProductSearch
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products, categories or brands..."
          />

          {/* Category & Subcategory Filter Component */}
          <ProductFilters
            selectedCategory={isCategoryValid ? selectedCategory : 'all'}
            selectedSubCategory={selectedSubCategory}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* 3. Active Filter Summary & Dynamic Result Count */}
        <div className="space-y-3 mb-6">
          {/* Active Filter Chips Row */}
          {hasAnyFilters && (
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-slate-100/80 border border-slate-200 text-xs">
              <span className="font-heading font-semibold text-[#062A4F] mr-1">
                Filtered by:
              </span>

              {selectedCategory !== 'all' && isCategoryValid && (
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[#062A4F] font-heading font-semibold hover:border-red-400 hover:text-[#D71920] transition-colors"
                  aria-label={`Remove filter: ${currentCategoryName}`}
                >
                  <span>{currentCategoryName}</span>
                  <X className="w-3 h-3 text-slate-400 hover:text-[#D71920]" />
                </button>
              )}

              {selectedSubCategory && (
                <button
                  type="button"
                  onClick={() => handleSubCategoryChange('')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[#062A4F] font-heading font-semibold hover:border-red-400 hover:text-[#D71920] transition-colors"
                  aria-label={`Remove subcategory filter: ${selectedSubCategory}`}
                >
                  <span>{selectedSubCategory}</span>
                  <X className="w-3 h-3 text-slate-400 hover:text-[#D71920]" />
                </button>
              )}

              {searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[#062A4F] font-heading font-semibold hover:border-red-400 hover:text-[#D71920] transition-colors"
                  aria-label={`Remove search filter: ${searchQuery}`}
                >
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <X className="w-3 h-3 text-slate-400 hover:text-[#D71920]" />
                </button>
              )}

              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-[#D71920] hover:underline font-heading font-bold ml-auto px-2 py-0.5"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Dynamic Result Count Metadata Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="font-heading font-semibold text-[#062A4F]">
                {totalItems === 0 ? (
                  '0 products found'
                ) : totalItems === ALL_PRODUCTS.length ? (
                  <>
                    Showing <span className="text-[#062A4F] font-bold">{(safeCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(safeCurrentPage * PRODUCTS_PER_PAGE, totalItems)}</span> of <span className="text-[#D71920] font-bold">{totalItems}</span> products
                  </>
                ) : (
                  <>
                    Showing <span className="text-[#062A4F] font-bold">{(safeCurrentPage - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(safeCurrentPage * PRODUCTS_PER_PAGE, totalItems)}</span> of <span className="text-[#D71920] font-bold">{totalItems}</span> products (filtered from {ALL_PRODUCTS.length})
                  </>
                )}
              </span>
            </div>

            {totalPages > 1 && (
              <div className="text-slate-400">
                Page {safeCurrentPage} of {totalPages}
              </div>
            )}
          </div>
        </div>
      </RevealOnScroll>

        {/* 4. Main Product Grid */}
        <RevealOnScroll>
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-10">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty Search / Filter State */
            <div className="py-14 text-center bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto space-y-4 my-8">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <SearchX className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-lg text-[#062A4F]">
                No Products Found
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                We couldn&rsquo;t find any safety products matching your current search or category criteria. Try adjusting your search term or clearing the active filters.
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </RevealOnScroll>

        {/* 5. Pagination Component */}
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mb-12"
        />

        {/* Bottom Procurement Advisory Banner */}
        <RevealOnScroll>
          <div className="bg-[#031B33] text-white p-6 sm:p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC400]">
                Direct B2B Procurement Support
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold">
                Looking for a Specific Model, Capacity, or Bulk BOQ?
              </h3>
              <p className="text-slate-300 text-xs max-w-xl">
                Indian Safety Solution supplies direct consignments for plant safety teams, EPC contractors, and institutional buyers across Gujarat and India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                icon={MessageSquareQuote}
                className="w-full sm:w-auto"
              >
                Request Bulk Quote
              </Button>
              <Button
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                variant="outline"
                size="md"
                className="border-white/40 text-white hover:bg-white/10 hover:border-white w-full sm:w-auto"
              >
                Call Safety Desk
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
