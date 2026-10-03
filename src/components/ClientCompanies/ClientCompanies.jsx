import React, { useState, useMemo } from 'react';
import { CLIENT_COMPANIES, distributeClientsIntoRows } from '../../data/clients';
import ClientLogoRow from './ClientLogoRow';
import ClientCompanyModal from './ClientCompanyModal';
import RevealOnScroll from '../RevealOnScroll';
import './clientCompanies.css';

/**
 * ClientCompanies Component — Multi-Row Animated Client Logo Wall
 *
 * Automatically renders all discovered client logos across 4 alternating
 * bi-directional infinite streams (Row 1 ←, Row 2 →, Row 3 ←, Row 4 →).
 *
 * @param {Object} props
 * @param {Array} [props.companies=CLIENT_COMPANIES] - Array of all discovered clients
 * @param {string} [props.className=''] - Additional section classes
 */
export default function ClientCompanies({
  companies = CLIENT_COMPANIES,
  className = '',
}) {
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Automatically balance all clients across 4 distinct streams
  const rows = useMemo(() => {
    return distributeClientsIntoRows(companies, 4);
  }, [companies]);

  // Calibrated organic speeds for each row so movement feels natural rather than synchronized
  const rowConfigs = [
    { direction: 'left', speed: '46s' },
    { direction: 'right', speed: '52s' },
    { direction: 'left', speed: '44s' },
    { direction: 'right', speed: '50s' },
  ];

  const totalClientsCount = companies.length;

  return (
    <section
      aria-label="Our Trusted Clients and Corporate Partners"
      className={`w-full client-wall-section border-y border-slate-200/90 py-16 sm:py-20 relative overflow-hidden ${className}`.trim()}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-10 sm:mb-14">
        <RevealOnScroll>
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#062A4F]/5 border border-[#062A4F]/10 text-xs font-semibold uppercase tracking-wider mb-3.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#062A4F] font-bold">Trusted Corporate Partners</span>
            <span className="text-slate-300">|</span>
            <span className="text-[#D71920] font-bold">{totalClientsCount}+ Organizations</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062A4F] tracking-tight">
            Our Trusted Clients
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Building lasting partnerships with organizations across industries.
          </p>
        </RevealOnScroll>
      </div>

      {/* 4-Row Animated Logo Wall Viewport with Edge Fade Masks */}
      <div className="logo-wall-viewport relative w-full">
        <div className="flex flex-col gap-3 sm:gap-4 w-full">
          {rows.map((rowItems, idx) => {
            const config = rowConfigs[idx % rowConfigs.length];
            return (
              <ClientLogoRow
                key={`logo-wall-row-${idx}`}
                rowIndex={idx}
                items={rowItems}
                direction={config.direction}
                speed={config.speed}
                onSelect={setSelectedCompany}
              />
            );
          })}
        </div>
      </div>

      {/* Supporting Footer Hint */}
      <div className="max-w-6xl mx-auto px-6 mt-6 sm:mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 bg-white/70 px-4 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
          <span>Click any organization logo to view relationship details</span>
        </div>
      </div>

      {/* Interactive Modal Details Popup */}
      {selectedCompany && (
        <ClientCompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </section>
  );
}
