import React from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Card, CardHeader, CardBody } from '../components/Card';
import RevealOnScroll from '../components/RevealOnScroll';
import { COMPANY_INFO } from '../data/company';
import { Shield, Target, CheckCircle2, ArrowRight, MapPin, Phone, Mail, Wrench } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            badge="Company Profile"
            title="About Indian Safety Solution (ISS)"
            description="A dedicated provider of complete industrial safety equipment, fire protection infrastructure, and workplace safety services based in Gujarat."
            align="center"
          />
        </RevealOnScroll>

        {/* Company Overview Card */}
        <RevealOnScroll>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                <span>Industrial &amp; Fire Safety Solutions</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#062A4F]">
                Our Company Overview
              </h3>
              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                <strong>{COMPANY_INFO.name} (ISS)</strong> is established as a single-source provider for industrial safety and fire-fighting requirements. Operating from Kalol in the Gandhinagar district of Gujarat, we serve manufacturing facilities, processing plants, warehousing hubs, and commercial complexes.
              </p>
              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                Our portfolio encompasses industrial fire safety equipment, portable and automatic fire extinguishers, personal protective equipment (PPE), specialized pharma cleanroom apparel, safety sign boards, hazardous energy lockout/tagout (LOTO) systems, and turnkey fire fighting project execution.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primary" icon={ArrowRight}>
                  Contact Our Team
                </Button>
                <Button to="/services" variant="outline">
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Quick Facts & Location Details */}
            <div className="lg:col-span-5 bg-[#F5F7FA] border border-slate-200 p-6 rounded-xl space-y-4">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#062A4F] border-b border-slate-200 pb-3">
                Company Information
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-[#17202A]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D71920] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#062A4F]">Facility Address:</span>
                    <span>{COMPANY_INFO.address.compound}, {COMPANY_INFO.address.highway}, {COMPANY_INFO.address.taluka}, {COMPANY_INFO.address.district}, {COMPANY_INFO.address.stateZip}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#062A4F] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#062A4F]">Direct Inquiries:</span>
                    <div>{COMPANY_INFO.phonePrimary}</div>
                    <div>{COMPANY_INFO.phoneSecondary}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#062A4F] flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#062A4F]">Email:</span>{' '}
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

        {/* 3 Core Operating Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RevealOnScroll delay={0} className="h-full">
            <Card className="h-full">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#062A4F]/10 flex items-center justify-center text-[#062A4F] mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#062A4F]">Comprehensive Supply</h4>
              </CardHeader>
              <CardBody>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Supplying everything from daily worker PPE to specialized chemical spill kits, fire hydrant line valves, and emergency egress signage under one roof.
                </p>
              </CardBody>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={60} className="h-full">
            <Card className="h-full">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#D71920]/10 flex items-center justify-center text-[#D71920] mb-3">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#062A4F]">Turnkey Project Execution</h4>
              </CardHeader>
              <CardBody>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Undertaking industrial fire fighting piping installations, hydrant network erections, alarm panel integrations, and safety sign board fabrication.
                </p>
              </CardBody>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll delay={120} className="h-full">
            <Card className="h-full">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-[#FFC400]/20 flex items-center justify-center text-[#062A4F] mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#062A4F]">Industrial Safety Focus</h4>
              </CardHeader>
              <CardBody>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Dedicated to helping plants maintain safe operations, prevent fire incidents, protect personnel from industrial hazards, and fulfill statutory safety norms.
                </p>
              </CardBody>
            </Card>
          </RevealOnScroll>
        </div>

        {/* Core Areas of Business List */}
        <RevealOnScroll className="mb-12">
          <div className="bg-[#F5F7FA] border border-slate-200 rounded-xl p-8">
            <h3 className="font-heading font-bold text-xl text-[#062A4F] mb-4">
              Documented Business Divisions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {COMPANY_INFO.coreFocus.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#17202A] bg-white p-3 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D71920] flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* CTA Box */}
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
