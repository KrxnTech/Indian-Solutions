import React from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Card, CardHeader, CardBody } from '../components/Card';
import RevealOnScroll from '../components/RevealOnScroll';
import { Flame, BellRing, AlertTriangle, Lock, CheckCircle2, ArrowRight, Factory, Warehouse, Building, Layers } from 'lucide-react';


export default function Projects() {
  const projectCapabilities = [
    {
      title: 'Turnkey Fire Hydrant & Piping Networks',
      icon: Flame,
      scope: 'Complete on-site layout, pipe erection, hydrant valve mounting, hose reel cabinet positioning, and hydraulic pressure testing for industrial plants.',
      points: [
        'Underground & overhead fire hydrant line erection',
        'Landing valves, hose boxes & delivery couplings',
        'Pressure testing & line integrity verification',
      ],
    },
    {
      title: 'Fire Alarm & Detection Integration',
      icon: BellRing,
      scope: 'End-to-end installation of early detection fire alarm networks, control panels, smoke and thermal detectors, manual call points, and response hooters.',
      points: [
        'Main control panel setup & zone wiring',
        'Smoke, heat & multi-criteria sensors',
        'Manual call points & audio-visual warning sirens',
      ],
    },
    {
      title: 'Plant Safety Sign Board Fabrication & Mounting',
      icon: AlertTriangle,
      scope: 'Custom site surveys, layout mapping, fabrication, and on-site fixing of photoluminescent egress signs, hazard placards, and safety instruction boards.',
      points: [
        'Facility-wide emergency evacuation route mapping',
        'Glow-in-the-dark egress & exit direction signs',
        'Chemical hazard & mandatory PPE warning boards',
      ],
    },
    {
      title: 'LOTO Energy Isolation Implementation',
      icon: Lock,
      scope: 'Assisting plant maintenance teams with hazardous energy isolation hardware, valve lockout sizing, breaker lockouts, and organized group lockout stations.',
      points: [
        'Machine-specific lockout hardware sizing',
        'Master group lockout stations & padlocks',
        'Workforce safety protocol setup',
      ],
    },
  ];

  const applicationSectors = [
    { name: 'Manufacturing & Engineering Units', icon: Factory, desc: 'Production plants, fabrication shops, and machinery units.' },
    { name: 'Chemical & Pharma Facilities', icon: Layers, desc: 'Active processing zones, cleanrooms, and chemical storage areas.' },
    { name: 'Warehouses & Logistics Hubs', icon: Warehouse, desc: 'Storage bays, distribution hubs, and fulfillment centers.' },
    { name: 'Commercial & Institutional Buildings', icon: Building, desc: 'Commercial premises, institutional campuses, and complexes.' },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            badge="Project Capabilities"
            title="Industrial Safety Project Execution"
            description="In addition to equipment supply, Indian Safety Solution undertakes site-specific fire fighting project work, hydrant erections, alarm integrations, and facility safety signages."
            align="center"
          />
        </RevealOnScroll>

        {/* 4 Core Project Capability Divisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projectCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <RevealOnScroll key={idx} delay={idx * 60} className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-[#062A4F]/10 flex items-center justify-center text-[#062A4F]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-[#062A4F]">
                          {cap.title}
                        </h3>
                        <span className="text-xs text-[#D71920] font-semibold">
                          On-Site Industrial Execution
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody className="space-y-3">
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {cap.scope}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <ul className="space-y-1.5 text-xs text-[#17202A]">
                        {cap.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#062A4F] flex-shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Sectors Served (Capability-grounded, zero fake logos) */}
        <RevealOnScroll className="mb-16">
          <div className="bg-[#F5F7FA] border border-slate-200 rounded-2xl p-8 sm:p-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
                Facility Applications
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#062A4F] mt-1">
                Sectors Served Across Gujarat &amp; Neighboring Regions
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-2">
                Our safety solutions and project works are engineered for diverse operating environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {applicationSectors.map((sector, sIdx) => {
                const SecIcon = sector.icon;
                return (
                  <div key={sIdx} className="bg-white border border-slate-200 rounded-xl p-5 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-lg bg-[#062A4F]/5 text-[#062A4F] flex items-center justify-center mb-3">
                      <SecIcon className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#062A4F] mb-1">
                      {sector.name}
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* Project RFP / Inquiry CTA */}
        <RevealOnScroll>
          <div className="bg-[#031B33] text-white rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Have an Upcoming Industrial Safety or Fire Fighting Project?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Send us your facility layout, project specifications, or required bill-of-quantities (BOQ). Our engineering desk in Kalol, Gujarat will review and provide a structured commercial quote.
            </p>
            <div className="pt-3">
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Submit Project Inquiry
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
