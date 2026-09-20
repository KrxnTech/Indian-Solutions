import React from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import RevealOnScroll from '../components/RevealOnScroll';
import { ISS_SERVICES } from '../data/services';
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function Services() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            badge="Our Services"
            title="Industrial Safety & Fire Protection Services"
            description="Comprehensive overview of the eight documented service areas provided by Indian Safety Solution, spanning equipment supply, turnkey project execution, and workplace compliance."
            align="center"
          />
        </RevealOnScroll>

        {/* 8 Documented Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {ISS_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <RevealOnScroll
                key={service.id}
                delay={Math.min(idx * 60, 240)}
                className="h-full"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#062A4F]/10 flex items-center justify-center text-[#062A4F] group-hover:bg-[#062A4F] group-hover:text-white transition-colors duration-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        SERVICE {service.number}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[#062A4F] leading-snug">
                      {service.title}
                    </h3>
                  </CardHeader>

                  <CardBody className="space-y-4">
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#17202A] mb-2.5">
                        Key Scope &amp; Offerings
                      </h4>
                      <ul className="space-y-2 text-xs text-[#64748B]">
                        {service.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D71920] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardBody>

                  <CardFooter>
                    <Button
                      to="/contact"
                      variant="outline"
                      size="sm"
                      icon={ArrowRight}
                      className="w-full sm:w-auto"
                    >
                      Inquire About This Service
                    </Button>
                  </CardFooter>
                </Card>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Project & Execution Advisory Banner */}
        <RevealOnScroll>
          <div className="bg-[#031B33] text-white p-8 sm:p-10 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC400]">
                Facility &amp; Project Support
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold">
                Require On-Site Fire Fighting Project Work or Facility Signage?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Connect with our team to discuss project layouts, bill-of-quantities (BOQ), or arrange equipment supply for your manufacturing unit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <Button to="/contact" variant="primary" size="md" icon={ArrowRight}>
                Request Service Quote
              </Button>
              <Button
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                variant="outline"
                size="md"
                icon={Phone}
                className="border-white/40 text-white hover:bg-white/10 hover:border-white"
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
