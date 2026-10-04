import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import RevealOnScroll from '../components/RevealOnScroll';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/company';
import { ISS_SERVICES } from '../data/services';
import { PRODUCT_CATEGORIES } from '../data/categories';
import { ALL_LOCATIONS } from '../data/locations';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  CheckCircle2,
  Shield,
  MessageSquareQuote,
  ChevronDown,
  Check,
  Building2,
  Clock,
} from 'lucide-react';

// Progressive descending heights for the 6 location cards in a single row
// Decreasing from Left (Head Office: 265px) to Right (Siddhpur: 115px) on a shared bottom baseline
const DESCENDING_CARD_HEIGHTS = [265, 235, 205, 175, 145, 115];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefillProduct = searchParams.get('product') || '';
  const prefillCategory = searchParams.get('category') || '';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(() => ({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: prefillCategory || 'General Corporate Inquiry',
    message: prefillProduct
      ? `I am interested in ${prefillProduct}. Please provide quotation and specifications.`
      : '',
  }));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const requirementGroups = [
    {
      label: 'General Inquiries',
      items: [
        'General Corporate Inquiry',
        'Turnkey Fire Fighting Tender / RFP',
      ],
    },
    {
      label: 'Core Services',
      items: ISS_SERVICES.map((s) => s.title),
    },
    {
      label: 'Product Lines',
      items: [
        ...(prefillCategory && !PRODUCT_CATEGORIES.some((c) => c.name === prefillCategory)
          ? [prefillCategory]
          : []),
        ...PRODUCT_CATEGORIES.map((c) => c.name),
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 md:space-y-20">

        {/* Page Main Heading */}
        <RevealOnScroll>
          <SectionHeading
            badge="Direct Inquiries"
            title="Contact Indian Safety Solution (ISS)"
            description="Connect with our sales and technical team to request product catalogues, project estimations, or bulk safety equipment quotations across Gujarat and India."
            align="center"
          />
        </RevealOnScroll>

        {/* 1. FULL-WIDTH COMPANY LOCATIONS SECTION */}
        <RevealOnScroll>
          <section id="our-locations" aria-labelledby="our-locations-heading">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 mb-2 justify-center">
                <span className="w-2 h-2 rounded-full bg-[#D71920]" aria-hidden="true" />
                <span className="font-heading text-xs uppercase tracking-widest font-bold text-[#D71920]">
                  Company Presence
                </span>
                <span className="w-6 h-px bg-slate-300" aria-hidden="true" />
              </div>
              <h2
                id="our-locations-heading"
                className="font-heading text-2xl sm:text-3xl font-extrabold text-[#062A4F] tracking-tight"
              >
                OUR LOCATIONS
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#64748B] leading-relaxed">
                Serving clients across key industrial and commercial locations.
              </p>
            </div>

            {/* Horizontal 6-Location Cards Row with Descending Heights and Shared Bottom Baseline */}
            <div className="w-full overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[840px] lg:min-w-0 grid grid-cols-6 items-end gap-3 sm:gap-3.5 w-full">
                {ALL_LOCATIONS.map((loc, index) => {
                  const isHead = loc.isHeadOffice;
                  const cardHeight = DESCENDING_CARD_HEIGHTS[index] || 150;

                  return (
                    <div
                      key={loc.id}
                      style={{ height: `${cardHeight}px` }}
                      className={`group relative bg-white border rounded-xl p-3 sm:p-3.5 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between ${isHead
                          ? 'border-slate-300 hover:border-[#D71920]/60 ring-1 ring-slate-200/60'
                          : 'border-slate-200/90 hover:border-[#062A4F]/40'
                        }`}
                    >
                      <div className="flex flex-col min-w-0">
                        {/* Top Header: Pin & Tag */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="w-6 h-6 rounded-md bg-[#062A4F]/5 text-[#D71920] flex items-center justify-center shrink-0 group-hover:bg-[#062A4F] group-hover:text-white transition-colors duration-200">
                            <MapPin className="w-3 h-3 shrink-0" />
                          </div>
                          <span
                            className={`text-[9px] font-heading font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full truncate ${isHead
                                ? 'bg-[#D71920]/10 text-[#D71920] border border-[#D71920]/20'
                                : loc.id === 'workshop'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
                                  : 'bg-slate-100 text-[#062A4F] border border-slate-200/60'
                              }`}
                          >
                            {isHead ? 'Head Office' : loc.id === 'workshop' ? 'Work Shop' : 'Branch'}
                          </span>
                        </div>

                        {/* Location Name */}
                        <h3
                          className="font-heading text-xs sm:text-sm font-bold text-[#062A4F] leading-tight mb-1 truncate"
                          title={loc.name}
                        >
                          {loc.name}
                        </h3>

                        {/* Address */}
                        <p
                          className="text-[10px] sm:text-[11px] text-slate-600 leading-snug line-clamp-4"
                          title={loc.address}
                        >
                          {loc.address}
                        </p>
                      </div>

                      {/* Phone & Email (if present, docked to bottom) */}
                      {(loc.phone || loc.email) && (
                        <div className="space-y-1 pt-2 border-t border-slate-100 text-[10px] text-slate-500 mt-auto">
                          {loc.phone && (
                            <div className="flex items-center gap-1.5 truncate">
                              <Phone className="w-2.5 h-2.5 text-[#D71920] shrink-0" />
                              <a
                                href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                                className="hover:text-[#062A4F] hover:underline transition-colors truncate"
                              >
                                {loc.phone}
                              </a>
                            </div>
                          )}
                          {loc.email && (
                            <div className="flex items-center gap-1.5 truncate">
                              <Mail className="w-2.5 h-2.5 text-[#FFC400] shrink-0" />
                              <a
                                href={`mailto:${loc.email}`}
                                className="hover:text-[#D71920] hover:underline transition-colors truncate"
                              >
                                {loc.email}
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* 2. FULL-WIDTH CORPORATE QUOTATION FORM */}
        <RevealOnScroll>
          <section
            id="quotation-form"
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs"
            aria-labelledby="quotation-heading"
          >
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D71920]" aria-hidden="true" />
                <span className="font-heading text-xs uppercase tracking-widest font-bold text-[#D71920]">
                  Direct Quotation &amp; Project Inquiries
                </span>
              </div>
              <h3
                id="quotation-heading"
                className="font-heading text-2xl sm:text-3xl font-extrabold text-[#062A4F]"
              >
                Request a Corporate Quotation
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
                Fill in the details below to receive equipment pricing, turnkey fire safety project estimations, or bulk industrial supply rates.
              </p>
            </div>

            {(prefillProduct || prefillCategory) && (
              <div className="mb-6 p-4 rounded-xl bg-[#062A4F]/5 border border-[#062A4F]/15 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider text-[#D71920]">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Prefilled Inquiry Context</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[#062A4F]">
                  {prefillProduct && (
                    <div>
                      <span className="text-[#64748B] font-medium">Product: </span>
                      <strong className="font-bold">{prefillProduct}</strong>
                    </div>
                  )}
                  {prefillCategory && (
                    <div>
                      <span className="text-[#64748B] font-medium">Category: </span>
                      <strong className="font-bold">{prefillCategory}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            {submitted ? (
              <div className="p-8 sm:p-12 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 animate-in fade-in duration-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-lg sm:text-xl text-emerald-900">
                  Enquiry Details Successfully Submitted
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                  Thank you for contacting <strong>{COMPANY_INFO.name}</strong>. Your requirement has been routed directly to our sales &amp; engineering team. We will respond promptly.
                </p>
                <div className="pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 4-Column Responsive Grid on Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5"
                    >
                      Company / Organization *
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Gujarat Industrial Corp."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Requirement Category Selector */}
                <div className="relative" ref={dropdownRef}>
                  <label
                    htmlFor="requirement-btn"
                    className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5"
                  >
                    Requirement Category *
                  </label>

                  <button
                    id="requirement-btn"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-lg bg-white text-[#17202A] flex items-center justify-between text-left transition-all cursor-pointer ${isDropdownOpen
                        ? 'border-[#062A4F] ring-2 ring-[#062A4F]/20'
                        : 'border-slate-300 hover:border-slate-400'
                      }`}
                  >
                    <span className="font-medium truncate pr-2">
                      {formData.requirement}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#062A4F]' : ''
                        }`}
                    />
                  </button>

                  <input type="hidden" name="requirement" value={formData.requirement} />

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 sm:max-h-72 overflow-y-auto py-1 divide-y divide-slate-100">
                      {requirementGroups.map((group) => (
                        <div key={group.label} className="py-1">
                          <div className="px-3.5 py-1.5 text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 bg-slate-50 sticky top-0 z-10">
                            {group.label}
                          </div>
                          <div role="listbox" className="py-0.5">
                            {group.items.map((item) => {
                              const isSelected = formData.requirement === item;
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, requirement: item }));
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-3.5 py-2 text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${isSelected
                                      ? 'bg-[#062A4F]/10 text-[#062A4F] font-semibold'
                                      : 'text-[#17202A] hover:bg-slate-50 hover:text-[#062A4F]'
                                    }`}
                                >
                                  <span className="truncate pr-2">{item}</span>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-[#062A4F] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message / Specifications */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5"
                  >
                    Message / Specifications
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter quantities, required safety ratings, site location, or project scope..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white transition-all"
                  />
                </div>

                {/* Submit Row with Corporate Helplines */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    icon={Send}
                  >
                    Submit Corporate Enquiry
                  </Button>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500">
                    <a
                      href={getWhatsAppUrl('Hello Indian Safety Solution, I would like to inquire about industrial safety products and quotations.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-[#25D366] hover:text-[#20bd5a] transition-all duration-200 hover:scale-110 cursor-pointer"
                      title="Chat with ISS on WhatsApp (+91 89 80 748 339)"
                      aria-label="Chat with ISS on WhatsApp"
                    >
                      <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#25D366] shrink-0 drop-shadow-xs" />
                    </a>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Mail className="w-3.5 h-3.5 text-[#062A4F] shrink-0" />
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="hover:text-[#D71920] transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>24hr Turnaround</span>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </section>
        </RevealOnScroll>

        {/* 3. INTERACTIVE GOOGLE MAP & LOGISTICS SECTION */}
        <RevealOnScroll className="mt-12 md:mt-16" id="location-map">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            {/* Header above map */}
            <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/70">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#062A4F]/5 text-[#062A4F] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#D71920]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-[#D71920] mb-1">
                    <span>Google Maps Location</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg sm:text-xl text-[#062A4F]">
                    Visit Our Facility &amp; Head Office
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
                    Hotel Amiras Compound, Ahmedabad - Mehsana Highway, near Chhatral Chokdi, GIDC Chhatral, Ahmedabad / Kalol, Gujarat 382729
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <Button
                  href="https://maps.google.com/?q=7CJR%2B874+Hotel+Amiras+Compound,+to,+Ahmedabad+-+Mehsana+Rd,+near+Chhatral,+Chokdi,+GIDC+Chhatral,+Gujarat+382729"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                  icon={Globe}
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="relative w-full h-[380px] sm:h-[450px] bg-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3140.033045114586!2d72.4407044!3d23.28080929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2489006d5a41%3A0x3168a1d650bf96ee!2s7CJR%2B874%20Hotel%20Amiras%20Compound%2C%20to%2C%20Ahmedabad%20-%20Mehsana%20Rd%2C%20near%20Chhatral%2C%20Chokdi%2C%20GIDC%20Chhatral%2C%20Ahmedabad%2C%20Chhatral%2C%20Gujarat%20382729!5e1!3m2!1sen!2sin!4v1789903132281!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Indian Safety Solution (ISS) Location Map - Hotel Amiras Compound, Chhatral, Kalol, Gujarat"
                className="w-full h-full"
              />
            </div>

            {/* Logistics Strip */}
            <div className="p-4 sm:p-6 bg-white border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D71920] mt-1.5 shrink-0" />
                <div>
                  <strong className="block text-[#062A4F] font-semibold">Strategic Industrial Corridor</strong>
                  <span className="text-[#64748B]">Immediate access to Ahmedabad - Mehsana Highway &amp; GIDC Chhatral</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FFC400] mt-1.5 shrink-0" />
                <div>
                  <strong className="block text-[#062A4F] font-semibold">Loading Dock &amp; Logistics</strong>
                  <span className="text-[#64748B]">Equipped for bulk dispatch, heavy vehicles &amp; freight carriers</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
}
