import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Flame,
  ArrowRight,
  Phone,
  Factory,
  Building,
  Layers,
  CheckCircle2,
  HardHat,
  Wrench,
  Sparkles,
  MapPin,
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import HeroHeadline from '../components/HeroHeadline';
import RevealOnScroll from '../components/RevealOnScroll';

import { COMPANY_INFO, getWhatsAppUrl } from '../data/company';
import { ISS_SERVICES } from '../data/services';
import { PRODUCT_CATEGORIES } from '../data/categories';
import WhatsAppButton, { WhatsAppIcon } from '../components/WhatsAppButton';

export default function Home() {
  const whatsAppUrl = getWhatsAppUrl();

  // Documented industrial application scopes (no fabricated client statistics)
  const applicationEnvironments = [
    {
      title: 'Manufacturing & Heavy Plants',
      icon: Factory,
      description: 'Industrial fire hydrant networks, machinery LOTO energy isolation, and protective workwear.',
    },
    {
      title: 'Pharma & Chemical Facilities',
      icon: Layers,
      description: 'Surgical cleanroom disposables, chemical protective coveralls, and emergency eyewash stations.',
    },
    {
      title: 'Warehouses & Logistics Centers',
      icon: Building,
      description: 'High-visibility safety markers, floor marking tapes, traffic cones, and rapid fire extinguisher setups.',
    },
    {
      title: 'Infrastructure & Construction Sites',
      icon: HardHat,
      description: 'Certified fall protection harnesses, heavy-duty safety footwear, headgear, and hazard signages.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* --------------------------------------------------
          SECTION 1 — HERO
          -------------------------------------------------- */}
      <section className="relative bg-[#031B33] text-white py-16 md:py-24 overflow-hidden border-b-4 border-[#D71920]">
        {/* Subtle industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Location & Brand Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#062A4F] border border-slate-700 text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC400]">
                <MapPin className="w-3.5 h-3.5 text-[#D71920]" />
                <span>Kalol, Gandhinagar, Gujarat</span>
              </div>

              {/* Exact Company Headline with corporate type-reveal animation */}
              <HeroHeadline />

              {/* Source-grounded Supporting Text */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-body animate-hero-desc">
                {COMPANY_INFO.name} provides end-to-end industrial safety products, personal protective equipment (PPE), fire fighting systems, safety sign boards, emergency apparatus, and turnkey fire fighting project execution.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2 animate-hero-cta">
                <Button
                  to="/products"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Explore Products
                </Button>
                <Button
                  to="/contact"
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white"
                >
                  Get a Quote
                </Button>
                <Button
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="bg-emerald-600/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                  icon={WhatsAppIcon}
                >
                  WhatsApp Us
                </Button>
              </div>

              {/* Core Business Pillars Strip */}
              <div className="pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-4 animate-hero-pillars">
                <div className="space-y-1">
                  <div className="text-xs text-[#FFC400] font-heading font-bold uppercase tracking-wider">
                    Fire Systems
                  </div>
                  <div className="text-xs text-slate-300">
                    Hydrants, Extinguishers &amp; Project Work
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#FFC400] font-heading font-bold uppercase tracking-wider">
                    PPE Equipment
                  </div>
                  <div className="text-xs text-slate-300">
                    Head, Body, Hand, Eye &amp; Foot Protection
                  </div>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <div className="text-xs text-[#FFC400] font-heading font-bold uppercase tracking-wider">
                    Plant Safety
                  </div>
                  <div className="text-xs text-slate-300">
                    LOTO, Sign Boards &amp; Training
                  </div>
                </div>
              </div>
            </div>

            {/* Right Overview Card */}
            <div className="lg:col-span-5 animate-hero-card">
              <div className="bg-[#062A4F]/80 border border-slate-700 rounded-xl p-6 sm:p-8 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#FFC400]" />
                    <span className="font-heading text-sm font-bold uppercase tracking-wider text-white">
                      ISS Core Offerings
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-[#D71920] text-white rounded font-bold uppercase">
                    B2B Supply
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="p-3 rounded-lg bg-[#031B33]/80 border border-slate-700 flex items-start gap-3">
                    <Flame className="w-5 h-5 text-[#D71920] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-white">Industrial Fire Protection</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Hydrant lines, delivery hoses, branch pipes, and ABC/CO2 extinguishers.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#031B33]/80 border border-slate-700 flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-[#FFC400] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-white">Personal Protective Equipment</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Certified head, eye, face, hand, body, and foot safety products.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#031B33]/80 border border-slate-700 flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-white">Fire Fighting Project Work</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Turnkey site installation of piping, hydrants, alarms, and emergency signs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                  <span>Direct Gujarat Office Support:</span>
                  <a
                    href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                    className="text-[#FFC400] font-semibold hover:underline"
                  >
                    {COMPANY_INFO.phonePrimary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          SECTION 2 — ABOUT ISS
          -------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <SectionHeading
                  badge="About Indian Safety Solution"
                  title="Dedicated Provider of Industrial & Fire Safety Equipment"
                  align="left"
                  className="mb-4"
                />
                <p className="text-[#64748B] text-base leading-relaxed">
                  <strong>{COMPANY_INFO.name} (ISS)</strong>, based in Kalol, Gandhinagar, Gujarat, is engaged in supplying reliable industrial safety products, fire suppression systems, and specialized safety services for industrial production units and commercial establishments.
                </p>
                <p className="text-[#64748B] text-base leading-relaxed">
                  Our operations span the full requirements of modern plant safety—ranging from head-to-toe PPE workwear, specialized pharmaceutical cleanroom apparel, and OSHA-compliant LOTO energy isolation, to industrial fire hydrant lines, fire alarm panels, and safety sign board fabrication.
                </p>

                <div className="pt-2">
                  <Button to="/about" variant="secondary" icon={ArrowRight}>
                    Learn More About ISS
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F7FA] border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
                <h3 className="font-heading font-bold text-base text-[#062A4F] uppercase tracking-wider">
                  Core Areas of Business
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#17202A]">
                  {COMPANY_INFO.coreFocus.map((focus, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D71920] flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-[#17202A]">{focus}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-slate-200 text-xs text-[#64748B]">
                  Located at Hotel Amiras Compound, Ahmedabad - Mehsana Highway, Kalol, Gujarat.
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --------------------------------------------------
          SECTION 3 — OUR SERVICES (Exact 8 Documented Services)
          -------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-[#F5F7FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading
              badge="Our Services"
              title="Documented Industrial Safety & Fire Services"
              description="The eight specialized service divisions supplied and executed by Indian Safety Solution across industrial plants and commercial premises."
              align="center"
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISS_SERVICES.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <RevealOnScroll
                  key={service.id}
                  delay={Math.min(idx * 60, 240)}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-lg bg-[#062A4F]/10 flex items-center justify-center text-[#062A4F] group-hover:bg-[#062A4F] group-hover:text-white transition-colors duration-200">
                          <ServiceIcon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {service.number}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#062A4F] leading-snug">
                        {service.title}
                      </h3>
                    </CardHeader>
                    <CardBody>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Link
                        to="/services"
                        className="text-xs font-heading font-semibold text-[#D71920] inline-flex items-center gap-1 group-hover:underline"
                      >
                        <span>Service Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </CardFooter>
                  </Card>
                </RevealOnScroll>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <RevealOnScroll delay={150}>
              <Button to="/services" variant="outline" size="md">
                View Complete Service Breakdown
              </Button>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          SECTION 4 — PRODUCT CATEGORIES (Preview of 14 Categories)
          -------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading
              badge="Product Categories"
              title="Comprehensive Industrial Safety Catalogue"
              description="Explore the 14 core safety categories from the ISS product catalogue, covering personal protection, fire fighting infrastructure, and facility safety."
              align="center"
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {PRODUCT_CATEGORIES.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <RevealOnScroll
                  key={cat.id}
                  delay={Math.min(idx * 35, 240)}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-10 h-10 rounded-lg bg-[#062A4F]/5 text-[#062A4F] flex items-center justify-center mb-3">
                        <CatIcon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#062A4F] leading-snug group-hover:text-[#D71920] transition-colors duration-150">
                        {cat.name}
                      </h3>
                    </CardHeader>
                    <CardBody>
                      <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                        {cat.shortDesc}
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Link
                        to={`/products?category=${cat.id}`}
                        className="text-xs font-heading font-semibold text-[#062A4F] group-hover:text-[#D71920] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Explore Category</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardFooter>
                  </Card>
                </RevealOnScroll>
              );
            })}
          </div>

          <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <RevealOnScroll delay={150}>
              <Button to="/products" variant="primary" size="lg" icon={ArrowRight}>
                Explore All 14 Product Divisions
              </Button>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <Button
                to="/products#product-catalogues"
                variant="outline"
                size="lg"
                className="border-[#062A4F] text-[#062A4F] hover:bg-[#062A4F] hover:text-white"
              >
                <span>Download Official Catalogues (PDF)</span>
              </Button>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          SECTION 5 — WHY ISS (Capability-Driven, Zero Fabricated Stats)
          -------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-[#031B33] text-white border-b border-[#062A4F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading
              badge="Why Indian Safety Solution"
              title="Documented Capabilities &amp; Product Breadth"
              description="Our strength lies in delivering a comprehensive, single-source procurement and project capability for industrial safety and fire protection requirements."
              align="center"
              inverted={true}
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RevealOnScroll delay={0} className="h-full">
              <div className="p-6 rounded-lg bg-[#062A4F]/60 border border-slate-700 h-full">
                <Shield className="w-9 h-9 text-[#FFC400] mb-4" />
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Extensive Range
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  From basic head and foot PPE to complete fire hydrant valves and automatic alarm systems, ISS covers all workplace safety needs.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={60} className="h-full">
              <div className="p-6 rounded-lg bg-[#062A4F]/60 border border-slate-700 h-full">
                <Wrench className="w-9 h-9 text-[#D71920] mb-4" />
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Project Execution
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We handle turnkey fire fighting project work, on-site piping installation, hydrant erection, and alarm panel commissioning.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120} className="h-full">
              <div className="p-6 rounded-lg bg-[#062A4F]/60 border border-slate-700 h-full">
                <Sparkles className="w-9 h-9 text-emerald-400 mb-4" />
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Pharma &amp; Cleanroom
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dedicated surgical products, cleanroom coveralls, and specialized pharma PPE suited for sensitive chemical and healthcare environments.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={180} className="h-full">
              <div className="p-6 rounded-lg bg-[#062A4F]/60 border border-slate-700 h-full">
                <Layers className="w-9 h-9 text-sky-400 mb-4" />
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Direct B2B Supply
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Prompt dispatch from our Kalol, Gujarat facility for plant maintenance teams, project contractors, and safety procurement heads.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          SECTION 6 — SAFETY SOLUTIONS ACROSS INDUSTRIAL REQUIREMENTS
          -------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-[#F5F7FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading
              badge="Industrial Scope"
              title="Safety Solutions Across Industrial Requirements"
              description="Targeted safety equipment and systems tailored to the operational conditions of various workplace environments."
              align="center"
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationEnvironments.map((env, i) => {
              const EnvIcon = env.icon;
              return (
                <RevealOnScroll key={i} delay={i * 60} className="h-full">
                  <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col hover:border-[#062A4F] hover:shadow-xs transition-all duration-200 h-full">
                    <div className="w-12 h-12 rounded-lg bg-[#062A4F]/5 flex items-center justify-center text-[#062A4F] mb-4">
                      <EnvIcon className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-[#062A4F] mb-2">
                      {env.title}
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {env.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          SECTION 7 — CAPABILITIES & PROJECTS PREVIEW
          -------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="bg-[#062A4F]/5 border border-slate-200 rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                  <Wrench className="w-4 h-4" />
                  <span>On-Site Execution &amp; Installation</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#062A4F]">
                  Project Work &amp; Facility Safety Implementation
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Beyond product supply, Indian Safety Solution undertakes site-specific fire fighting project work, fire hydrant network erections, alarm installations, and custom plant safety sign board mountings.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Button to="/projects" variant="secondary" size="lg" icon={ArrowRight}>
                  View Project Capabilities
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --------------------------------------------------
          SECTION 8 — CONTACT CTA
          -------------------------------------------------- */}
      <section className="py-16 md:py-20 bg-[#062A4F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#031B33] border border-slate-700 text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC400]">
              <span>Direct B2B Procurement Desk</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-4">
              Need the Right Safety Solution?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mt-4">
              Contact Indian Safety Solution to discuss equipment specifications, request quotation for bulk safety supplies, or discuss on-site fire fighting project requirements.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Get a Quote
              </Button>
              <Button
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-0 font-heading font-semibold"
                icon={WhatsAppIcon}
              >
                WhatsApp Chat
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 hover:border-white"
              >
                Contact ISS
              </Button>
            </div>

            <div className="pt-6 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D71920]" />
                <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white">
                  {COMPANY_INFO.phonePrimary}
                </a>
              </span>
              <span>•</span>
              <span>{COMPANY_INFO.email}</span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppButton />
    </div>
  );
}
