import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import RevealOnScroll from '../components/RevealOnScroll';
import { COMPANY_INFO } from '../data/company';
import { ISS_SERVICES } from '../data/services';
import { PRODUCT_CATEGORIES } from '../data/categories';
import { MapPin, Phone, Mail, Clock, Globe, Send, CheckCircle2, Shield, MessageSquareQuote } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            badge="Direct Inquiries"
            title="Contact Indian Safety Solution (ISS)"
            description="Connect with our sales and technical team in Kalol, Gujarat to request product catalogues, project estimations, or bulk safety equipment quotations."
            align="center"
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Authentic Client Contact Information */}
          <RevealOnScroll delay={0} className="lg:col-span-5 space-y-6">
            <div className="bg-[#031B33] text-white rounded-2xl p-6 sm:p-8 border border-slate-700 space-y-6">
              <div>
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC400]">
                  Head Office &amp; Operations
                </span>
                <h3 className="font-heading text-2xl font-bold mt-1 text-white">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Complete Industrial &amp; Fire Safety Solutions
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D71920] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Facility Address:</strong>
                    <div className="leading-relaxed text-slate-300">
                      <div>{COMPANY_INFO.address.compound}</div>
                      <div>{COMPANY_INFO.address.highway}</div>
                      <div>{COMPANY_INFO.address.taluka}, {COMPANY_INFO.address.district}</div>
                      <div className="text-white font-medium">{COMPANY_INFO.address.stateZip}</div>
                    </div>
                  </div>
                </div>

                {/* Phone Numbers (Exact client numbers preserved) */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D71920] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Direct Phone Numbers:</strong>
                    <div className="space-y-1">
                      <div>
                        <a
                          href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                          className="hover:text-[#FFC400] transition-colors font-medium"
                        >
                          {COMPANY_INFO.phonePrimary}
                        </a>
                      </div>
                      <div>
                        <a
                          href={`tel:${COMPANY_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                          className="hover:text-[#FFC400] transition-colors font-medium"
                        >
                          {COMPANY_INFO.phoneSecondary}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#FFC400] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Official Email:</strong>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="hover:text-[#FFC400] transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Website:</strong>
                    <a
                      href={COMPANY_INFO.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FFC400] transition-colors"
                    >
                      {COMPANY_INFO.website}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium mb-0.5">Working Hours:</strong>
                    <span className="text-slate-300">{COMPANY_INFO.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Service scope footer badge */}
              <div className="pt-4 border-t border-slate-700/80 flex items-center gap-2 text-xs text-slate-300">
                <Shield className="w-4 h-4 text-[#FFC400] flex-shrink-0" />
                <span>Supplying industrial safety products &amp; fire fighting services across Gujarat and India.</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Corporate Enquiry Form */}
          <RevealOnScroll delay={80} className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#062A4F] mb-1">
                Request a Corporate Quotation
              </h3>
              <p className="text-xs text-[#64748B] mb-4">
                Fill in the details below to receive equipment pricing, project consultation, or bulk order rates.
              </p>

              {(prefillProduct || prefillCategory) && (
                <div className="mb-5 p-4 rounded-xl bg-[#062A4F]/5 border border-[#062A4F]/15 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider text-[#D71920]">
                    <MessageSquareQuote className="w-4 h-4" />
                    <span>Product Quotation Request</span>
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
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-emerald-900">
                    Enquiry Details Submitted
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to <strong>{COMPANY_INFO.name}</strong>. Your enquiry details have been recorded. Our team will contact you directly via phone or email.
                  </p>
                  <div className="pt-2">
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5">
                        Company / Organization *
                      </label>
                      <input
                        id="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Gujarat Industrial Corp."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="requirement" className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5">
                      Requirement Category *
                    </label>
                    <select
                      id="requirement"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white text-[#17202A]"
                    >
                      <optgroup label="Core Services">
                        {ISS_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Product Lines">
                        {prefillCategory &&
                          !PRODUCT_CATEGORIES.some((c) => c.name === prefillCategory) && (
                            <option value={prefillCategory}>{prefillCategory}</option>
                          )}
                        {PRODUCT_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="General">
                        <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                        <option value="Turnkey Fire Fighting Tender / RFP">Turnkey Fire Fighting Tender / RFP</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-heading font-semibold text-[#17202A] mb-1.5">
                      Message / Specifications
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter quantities, required sizes, site location, or project scope..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062A4F] bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                      icon={Send}
                    >
                      Submit Corporate Enquiry
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>

        {/* Location & Interactive Google Map Section */}
        <RevealOnScroll className="mt-12" id="location-map">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            {/* Header / Info bar above map */}
            <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/70">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#062A4F]/5 text-[#062A4F] flex items-center justify-center flex-shrink-0">
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
              <div className="flex-shrink-0 flex items-center gap-3">
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

            {/* Key Logistics & Travel Highlights strip */}
            <div className="p-4 sm:p-6 bg-white border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#D71920] mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="block text-[#062A4F] font-semibold">Strategic Industrial Corridor</strong>
                  <span className="text-[#64748B]">Immediate access to Ahmedabad - Mehsana Highway &amp; GIDC Chhatral</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FFC400] mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="block text-[#062A4F] font-semibold">Loading Dock &amp; Logistics</strong>
                  <span className="text-[#64748B]">Equipped for bulk dispatch, heavy vehicles &amp; freight carriers</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="block text-[#062A4F] font-semibold">Office Hours &amp; Visits</strong>
                  <span className="text-[#64748B]">Monday – Saturday: 09:00 AM – 06:30 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
