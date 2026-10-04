import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import RevealOnScroll from '../components/RevealOnScroll';
import ClientCompanies from '../components/ClientCompanies';
import { COMPANY_INFO } from '../data/company';
import {
  Shield,
  Eye,
  Target,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Award,
  Layers,
  Repeat,
  CheckCircle2,
  HeartHandshake,
  Factory,
  Flame,
  Check,
} from 'lucide-react';

export default function About() {
  const corporateValues = [
    {
      title: 'Safety for Anything and Everything',
      icon: Shield,
      description: 'Comprehensive protection protocols spanning all industrial applications.',
    },
    {
      title: 'Flexibility',
      icon: Layers,
      description: 'Adaptable fire safety engineering tailored to bespoke facility requirements.',
    },
    {
      title: 'Consistency',
      icon: Repeat,
      description: 'Rigorous quality standards maintained across every production batch.',
    },
    {
      title: 'Reliability',
      icon: CheckCircle2,
      description: 'Dependable performance in extreme industrial and emergency conditions.',
    },
    {
      title: 'Integrity and Ethics',
      icon: HeartHandshake,
      description: 'Uncompromising compliance with statutory norms and transparent conduct.',
    },
  ];

  const applicationSectors = [
    'Pharmaceutical Sector',
    'Defence Sector',
    'Government Sector',
    'Residential Complexes',
    'Industrial Sector',
    'Transportation Sector',
    'Banking Hubs',
    'Warehouses & Logistics',
    'Commercial Malls',
    'High-Rise Buildings',
    'Oil & Gas Sector',
    'Power & Energy',
  ];

  return (
    <div className="py-12 md:py-20 space-y-16 md:space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
        {/* Section Heading */}
        <RevealOnScroll>
          <SectionHeading
            badge="Corporate Profile"
            title="About Indian Safety Solution"
            description="Forefront global partner in certified fire protection systems, personal safety apparatus, and industrial safety project execution."
            align="center"
          />
        </RevealOnScroll>

        {/* ----------------------------------------------------
            1. ABOUT US (COMPANY OVERVIEW)
            ---------------------------------------------------- */}
        <RevealOnScroll>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs relative overflow-hidden">
            {/* Subtle Top Red Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D71920] via-[#D71920]/80 to-[#062A4F]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Formatted Corporate Narrative */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                  <Flame className="w-3.5 h-3.5 text-[#D71920]" />
                  <span>About Us</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#062A4F] tracking-tight">
                  Protecting Lives &amp; Securing Industry Since 2015
                </h3>

                {/* Paragraph 1 */}
                <p className="text-[#17202A] text-sm sm:text-base leading-relaxed font-medium">
                  Established in the year <strong className="text-[#D71920] font-bold">2015</strong> under the brand name <strong className="text-[#062A4F]">INDIAN SAFETY SOLUTION</strong>, now recognized as <strong className="text-[#062A4F]">INDIAN SAFETY SOLUTIONS</strong>, an <strong className="text-[#062A4F]">ISO 9001:2015 Certified</strong> prominent manufacturer and supplier for a premium range of fire protection systems &amp; accessories conforming to Indian Standards and other relevant benchmarks. We are also an <span className="underline decoration-[#D71920] decoration-2 underline-offset-2">Approved Licensed Agency for the Directorate of Maharashtra Fire Services</span>.
                </p>

                {/* Paragraph 2 */}
                <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                  We have emerged to become one of the trusted and most innovative manufacturers of portable, trolley &amp; trailer-mounted fire extinguishers and gas cartridges, as well as fire alarm and hydrant systems, fire detection &amp; suppression systems, and comprehensive safety products for commercial and industrial applications. The <strong className="text-[#062A4F]">INDIAN AGNI</strong> brand is renowned across the industry for the quality of its products and reliability of services.
                </p>

                {/* Paragraph 3 */}
                <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                  We have earned a stellar reputation for excellence in the fire protection industry. Our policy of continual investment in state-of-the-art technology and innovative product development allows us to offer a unique brand and high-quality safety solutions at great value.
                </p>

                {/* Paragraph 4 */}
                <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                  To ensure our clients and customers receive the highest quality fire protection equipment, all our products undergo rigorous in-house testing at all stages of production. Third-party testing is also available on demand to fulfill customized project specifications.
                </p>

                {/* Paragraph 5 */}
                <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                  The <strong className="text-[#062A4F]">INDIAN AGNI</strong> brand is managed by a highly qualified management team and possesses in-house engineering expertise, dedicated project teams, and comprehensive quality control supported by a well-equipped testing lab. Supported by many years of proven performance serving esteemed clients across India, we continue to achieve total quality in fire protection solutions that deliver complete customer satisfaction.
                </p>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Button to="/contact" variant="primary" icon={ArrowRight}>
                    Contact Our Team
                  </Button>
                  <Button to="/services" variant="outline">
                    Explore Services
                  </Button>
                </div>
              </div>

              {/* Right Column: Key Credentials & Location Details */}
              <div className="lg:col-span-5 space-y-6">
                {/* Credentials Badge Box */}
                <div className="bg-[#031B33] text-white p-6 sm:p-7 rounded-xl space-y-5 border border-slate-800 shadow-md">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-700/80">
                    <Award className="w-5 h-5 text-[#FFC400]" />
                    <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-100">
                      Certified Credentials
                    </h4>
                  </div>

                  <ul className="space-y-3.5 text-xs sm:text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D71920]/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#D71920]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">ISO 9001:2015 Certified</span>
                        <span className="text-slate-300 text-xs">Standardized Quality Management System</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D71920]/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#D71920]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Approved Licensed Agency</span>
                        <span className="text-slate-300 text-xs">Directorate of Maharashtra Fire Services</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D71920]/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#D71920]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">100% In-House Lab Testing</span>
                        <span className="text-slate-300 text-xs">Hydraulic, burst &amp; discharge validation</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D71920]/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#D71920]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">Turnkey Contract Manufacturing</span>
                        <span className="text-slate-300 text-xs">State-of-the-art setups across India and abroad</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Company Contact Details Card */}
                <div className="bg-[#F5F7FA] border border-slate-200 p-6 rounded-xl space-y-4">
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#062A4F] border-b border-slate-200 pb-3 flex items-center gap-2">
                    <Factory className="w-4 h-4 text-[#D71920]" />
                    <span>Headquarters &amp; Works</span>
                  </h4>

                  <div className="space-y-3.5 text-xs sm:text-sm text-[#17202A]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D71920] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#062A4F]">Facility Address:</span>
                        <span className="text-[#64748B]">{COMPANY_INFO.address.compound}, {COMPANY_INFO.address.highway}, {COMPANY_INFO.address.taluka}, {COMPANY_INFO.address.district}, {COMPANY_INFO.address.stateZip}</span>
                        <div className="pt-2">
                          <Link
                            to="/contact#our-locations"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#062A4F] hover:bg-[#D71920] text-slate-100 hover:text-white text-[11px] font-heading font-medium transition-all duration-200 shadow-xs group"
                          >
                            <span>View All 6 Branch Locations</span>
                            <span className="text-[#FFC400] group-hover:text-white transition-transform group-hover:translate-x-0.5">
                              →
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#062A4F] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#062A4F]">Direct Inquiries:</span>
                        <div className="text-[#64748B]">{COMPANY_INFO.phonePrimary}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#062A4F] flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#062A4F]">Email:</span>{' '}
                        <span className="text-[#64748B]">{COMPANY_INFO.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* ----------------------------------------------------
            2 & 3. VISION & MISSION (SIDE-BY-SIDE CARDS)
            ---------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* VISION CARD */}
          <RevealOnScroll delay={0} className="h-full">
            <div className="h-full bg-white border border-slate-200 border-l-4 border-l-[#D71920] rounded-xl p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D71920]">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                    Core Direction
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                    Future Horizon
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#062A4F]">
                    VISION
                  </h3>
                </div>

                <p className="text-[#17202A] text-sm sm:text-base leading-relaxed font-medium pt-2">
                  &ldquo;INDIAN SAFETY SOLUTIONS aspires to be recognized as a forefront global leader and synonymous with saving lives and protecting properties in the fire and safety sector.&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-heading font-semibold text-[#062A4F]">
                <Target className="w-4 h-4 text-[#D71920]" />
                <span>Forefront Global Safety Benchmark</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* MISSION CARD */}
          <RevealOnScroll delay={100} className="h-full">
            <div className="h-full bg-white border border-slate-200 border-l-4 border-l-[#062A4F] rounded-xl p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#062A4F]">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                    Daily Commitment
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                    Quality Standards
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#062A4F]">
                    MISSION
                  </h3>
                </div>

                <p className="text-[#17202A] text-sm sm:text-base leading-relaxed font-medium pt-2">
                  &ldquo;INDIAN SAFETY SOLUTIONS is committed to raise the bar of excellence in the area of services, products and quality. We believe in endeavoring our commitment by upholding the highest ethical standard, commitment &amp; integrity.&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-heading font-semibold text-[#062A4F]">
                <Shield className="w-4 h-4 text-[#062A4F]" />
                <span>Excellence, Ethics &amp; Integrity</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* ----------------------------------------------------
            4. OUR VALUES
            ---------------------------------------------------- */}
        <div className="space-y-8">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                Core Principles
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#062A4F]">
                OUR VALUES
              </h3>
              <p className="text-[#64748B] text-xs sm:text-sm">
                Guiding our manufacturing accuracy, safety engineering, and customer partnerships.
              </p>
            </div>
          </RevealOnScroll>

          {/* 5 Value Cards in a balanced responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {corporateValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <RevealOnScroll key={idx} delay={idx * 70} className="h-full">
                  <div className="h-full bg-white border border-slate-200 hover:border-[#D71920]/40 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between group">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-[#D71920] group-hover:bg-[#D71920] group-hover:text-white flex items-center justify-center mb-3.5 transition-colors duration-200">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-[#062A4F] leading-snug mb-2">
                        {val.title}
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {val.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#D71920]">
                      <Check className="w-3.5 h-3.5" />
                      <span>ISS Value #{idx + 1}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------
            AREAS OF APPLICATION & CONTRACT MANUFACTURING
            ---------------------------------------------------- */}
        <RevealOnScroll>
          <div className="bg-[#F5F7FA] border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                  Industry Footprint
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#062A4F]">
                  Areas of Application
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-md">
                Our state-of-the-art manufacturing setups and strategically placed branch offices across India and abroad make us the preferred partner for turnkey fire protection and contract manufacturing.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {applicationSectors.map((sector, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-lg p-3 text-center shadow-2xs hover:border-[#D71920]/40 transition-colors flex items-center justify-center"
                >
                  <span className="text-xs font-semibold text-[#17202A] leading-tight">
                    {sector}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Dedicated Full-Width Animated Client Companies Train Section */}
      <ClientCompanies />

      {/* CTA Box Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center bg-[#062A4F] text-white rounded-xl p-8 sm:p-10 space-y-4">
            <h3 className="font-heading font-bold text-2xl">
              Partner with Indian Safety Solution for Your Workplace Safety
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Reach out to our sales and technical team for product catalogues, price estimation, or fire fighting project queries.
            </p>
            <div className="pt-2">
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Request Information / Quote
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
