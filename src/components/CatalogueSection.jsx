import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ALL_CATALOGUES, CATALOGUES_COUNT } from '../data/catalogues';
import CatalogueModal from './CatalogueModal';

export default function CatalogueSection({ className = '', highlightCategory = null }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activePreviewCatalogue, setActivePreviewCatalogue] = useState(null);

  // Extract unique categories dynamically from discovered catalogues
  const availableCategories = ['all', ...new Set(ALL_CATALOGUES.map((c) => c.category))];

  const filteredCatalogues =
    selectedFilter === 'all'
      ? ALL_CATALOGUES
      : ALL_CATALOGUES.filter((c) => c.category === selectedFilter);

  return (
    <section
      id="product-catalogues"
      className={`bg-gradient-to-b from-slate-50 via-white to-slate-50/60 border border-slate-200/90 rounded-3xl p-5 sm:p-7 lg:p-9 shadow-xs transition-all ${className}`}
      aria-labelledby="catalogues-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 pb-6 border-b border-slate-200/80">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#D71920]/10 text-[#D71920] border border-[#D71920]/20 mb-2.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Engineering Documentation</span>
          </div>
          <h2
            id="catalogues-heading"
            className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#062A4F] tracking-tight"
          >
            Download Official ISS Product Catalogues
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
            Instant access to verified engineering specification sheets, ISI/CE certification records, dimensional drawings, and equipment catalogues for procurement teams.
          </p>
        </div>

        {/* Total Catalogues Counter Badge */}
        <div className="shrink-0 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#062A4F] text-white text-xs font-heading font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC400]" />
            <span>{CATALOGUES_COUNT} Catalogues Available (PDF)</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (if multiple categories exist) */}
      {availableCategories.length > 2 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-heading font-semibold text-slate-500 mr-1">
            Filter by:
          </span>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-medium transition-all duration-150 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#062A4F] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-[#062A4F] hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Catalogues' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Discovered Catalogues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredCatalogues.map((cat) => {
          const isHighlighted =
            highlightCategory &&
            cat.category.toLowerCase().includes(highlightCategory.toLowerCase());

          return (
            <div
              key={cat.id}
              className={`group relative bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isHighlighted
                  ? 'border-[#D71920] ring-2 ring-[#D71920]/20 shadow-md'
                  : 'border-slate-200 hover:border-[#062A4F]/40 shadow-xs'
              }`}
            >
              <div>
                {/* Top Row: PDF Badge + Category */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] border border-red-200 flex items-center justify-center font-heading font-extrabold text-[11px] shrink-0 group-hover:scale-105 transition-transform">
                      PDF
                    </div>
                    <span className="text-[11px] font-heading font-semibold text-slate-500">
                      {cat.size}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.tagColor}`}
                  >
                    {cat.category}
                  </span>
                </div>

                {/* Catalogue Title */}
                <h3 className="font-heading text-base font-bold text-[#062A4F] leading-snug group-hover:text-[#D71920] transition-colors mb-2">
                  {cat.title}
                </h3>

                {/* Subtitle / Contents */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {cat.subtitle}
                </p>

                {/* Meta Highlights Badge */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mb-5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{cat.badge} • {cat.pageCount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={cat.url}
                  download={cat.fileName}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#062A4F] hover:bg-[#D71920] text-white text-xs font-heading font-bold transition-all duration-150 shadow-xs hover:shadow-md cursor-pointer group/btn"
                  title={`Download ${cat.title} (${cat.size})`}
                >
                  <Download className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActivePreviewCatalogue(cat)}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-[#062A4F] bg-slate-50 hover:bg-white text-slate-700 hover:text-[#062A4F] text-xs font-heading font-medium transition-colors cursor-pointer"
                  title="Quick Preview PDF"
                  aria-label={`Preview ${cat.title}`}
                >
                  <Eye className="w-4 h-4" />
                </button>

                <a
                  href={cat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 hover:border-[#062A4F] bg-slate-50 hover:bg-white text-slate-700 hover:text-[#062A4F] text-xs font-heading font-medium transition-colors cursor-pointer"
                  title="Open in New Tab"
                  aria-label={`Open ${cat.title} in new tab`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info Notice */}
      <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#D71920] shrink-0" />
          <span>
            All catalogues are authentic manufacturer documentation supplied directly by Indian Safety Solution.
          </span>
        </div>
        <div className="text-slate-400">
          Need physical hardcopy samples? <a href="/contact" className="text-[#D71920] font-bold hover:underline">Contact Safety Desk →</a>
        </div>
      </div>

      {/* Interactive PDF Preview Modal */}
      <CatalogueModal
        catalogue={activePreviewCatalogue}
        isOpen={Boolean(activePreviewCatalogue)}
        onClose={() => setActivePreviewCatalogue(null)}
      />
    </section>
  );
}
