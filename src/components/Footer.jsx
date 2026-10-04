import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS, FOOTER_SERVICES, FOOTER_PRODUCTS } from '../data/navigation';
import { COMPANY_INFO } from '../data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#031B33] text-white border-t-4 border-[#D71920]">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1: Brand & Core Capabilities (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="light" size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>

            {/* Core Capability Chips */}
            <div className="pt-2">
              <div className="text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC400] mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Core Business Areas</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {COMPANY_INFO.coreFocus.map((focus) => (
                  <span
                    key={focus}
                    className="inline-block px-2.5 py-1 text-xs font-medium bg-[#062A4F] text-slate-200 border border-slate-700/60 rounded"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Documented Services */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150 py-0.5"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contact Information */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
              Contact Details
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFC400] flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <div className="text-white font-medium">{COMPANY_INFO.address.compound}</div>
                  <div>{COMPANY_INFO.address.highway}</div>
                  <div>{COMPANY_INFO.address.taluka}, {COMPANY_INFO.address.district}</div>
                  <div className="text-slate-200">{COMPANY_INFO.address.stateZip}</div>

                  {/* Get More Addresses Button */}
                  <div className="pt-2">
                    <Link
                      to="/contact#our-locations"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#062A4F] hover:bg-[#D71920] text-slate-100 hover:text-white text-[11px] font-heading font-medium border border-slate-700/80 hover:border-[#D71920] transition-all duration-200 shadow-xs group whitespace-nowrap"
                    >
                      <span>View All 6 Locations</span>
                      <span className="text-[#FFC400] group-hover:text-white transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D71920] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>
                    <a
                      href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                      className="hover:text-white transition-colors"
                    >
                      {COMPANY_INFO.phonePrimary}
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <a
                  href={COMPANY_INFO.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.website}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Categories Strip */}
      <div className="bg-[#021324] border-t border-[#062A4F] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-heading font-semibold uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#FFC400]">Product Lines:</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {FOOTER_PRODUCTS.map((prod, idx) => (
                <span key={prod.name} className="inline-flex items-center">
                  <Link to={prod.path} className="hover:text-slate-200 transition-colors">
                    {prod.name}
                  </Link>
                  {idx < FOOTER_PRODUCTS.length - 1 && (
                    <span className="ml-3 text-slate-600">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#010C17] py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            © {currentYear} {COMPANY_INFO.name}. All rights reserved. Complete Industrial & Fire Safety Solution.
          </p>
          <p className="text-slate-400">
            {COMPANY_INFO.address.taluka}, {COMPANY_INFO.address.district}, Gujarat
          </p>
        </div>
      </div>
    </footer>
  );
}
