import {
  Flame,
  Activity,
  BellRing,
  Wrench,
  Shield,
  GraduationCap,
  AlertTriangle,
  Lock,
} from 'lucide-react';

export const ISS_SERVICES = [
  {
    id: 'industrial-fire-safety-equipment',
    number: '01',
    title: 'Industrial Fire Safety Equipment',
    icon: Flame,
    shortDesc:
      'Supply and specification of certified industrial fire safety equipment, hydrant valves, delivery hoses, and fire protection accessories.',
    fullDesc:
      'Indian Safety Solution supplies a complete spectrum of industrial fire safety equipment built for high-hazard production plants, warehouses, and commercial premises. Products include certified fire hydrant valves, single and double landing valves, reinforced delivery hoses, branch pipes, nozzles, and emergency fire accessories.',
    highlights: [
      'Industrial fire hydrant valves & accessories',
      'High-pressure fire delivery hoses & couplings',
      'Branch pipes, nozzles & hose reels',
      'Fire fighting hardware for industrial installations',
    ],
  },
  {
    id: 'surgical-product-pharma-ppe',
    number: '02',
    title: 'Surgical Product & Pharma PPE',
    icon: Activity,
    shortDesc:
      'Specialized cleanroom apparel, surgical grade protective gear, and clean environment pharma PPE solutions.',
    fullDesc:
      'Targeted protective products for pharmaceutical manufacturing facilities, chemical cleanrooms, healthcare centers, and laboratory operations. Our range includes sterile and non-sterile surgical disposables, cleanroom coveralls, specialized gloves, face masks, shoe covers, and medical-grade PPE.',
    highlights: [
      'Cleanroom & pharmaceutical coveralls',
      'Surgical grade gloves & disposable protection',
      'Medical & particulate respiratory masks',
      'Hygiene & contamination-control apparel',
    ],
  },
  {
    id: 'fire-alarm-special-equipment',
    number: '03',
    title: 'Fire Alarm & Special Equipment',
    icon: BellRing,
    shortDesc:
      'Detection systems, alarm panels, smoke detectors, and specialized emergency warning installations.',
    fullDesc:
      'Comprehensive early-warning fire alarm systems, smoke and heat detectors, manual call points, response indicators, sounders, and central control panels. Engineered to provide immediate alert notification and reliable actuation in industrial and commercial buildings.',
    highlights: [
      'Addressable & conventional fire alarm panels',
      'Smoke, heat, and multi-sensor detectors',
      'Manual call points & electronic hooters',
      'Special emergency alert & signaling equipment',
    ],
  },
  {
    id: 'fire-fighting-project-work',
    number: '04',
    title: 'Fire Fighting Project Work',
    icon: Wrench,
    shortDesc:
      'End-to-end execution of turnkey fire fighting projects, hydrant piping layouts, and system installations.',
    fullDesc:
      'Full project execution services for industrial facilities, infrastructure, and commercial establishments. ISS undertakes on-site installation of fire hydrant networks, sprinkler piping layouts, fire pump room integration, and system commissioning.',
    highlights: [
      'Turnkey fire hydrant piping & network erection',
      'Industrial sprinkler system installation',
      'Pump room assembly & line connection',
      'Project commissioning & functional testing',
    ],
  },
  {
    id: 'fire-extinguishers',
    number: '05',
    title: 'Fire Extinguishers',
    icon: Shield,
    shortDesc:
      'Portable and wheeled fire extinguishers across ABC powder, CO2, clean agent, foam, and water types.',
    fullDesc:
      'Complete supply, deployment, and refilling solutions for portable, trolley-mounted, and modular automatic fire extinguishers. Sized and formulated to suppress Class A, B, C, D, and electrical hazard fires with rapid knockdown capability.',
    highlights: [
      'ABC dry powder stored pressure extinguishers',
      'Carbon dioxide (CO2) portable & trolley units',
      'Clean agent (HFC/FE) gas extinguishers',
      'Mechanical foam & water type extinguishers',
    ],
  },
  {
    id: 'safety-training-documentary-work',
    number: '06',
    title: 'Safety Training & Documentary Work',
    icon: GraduationCap,
    shortDesc:
      'Workplace safety instruction, emergency evacuation drills, and statutory safety documentation support.',
    fullDesc:
      'Practical safety training programs and documentary guidance for plant staff and industrial workers. Covers safe equipment operation, fire extinguisher usage drills, emergency evacuation procedures, and required workplace safety documentation.',
    highlights: [
      'Practical fire extinguisher operation drills',
      'Workplace emergency response & evacuation guidance',
      'PPE usage & equipment maintenance instruction',
      'Safety documentation & compliance support',
    ],
  },
  {
    id: 'safety-sign-board-work',
    number: '07',
    title: 'Safety Sign Board Work',
    icon: AlertTriangle,
    shortDesc:
      'Design, fabrication, and mounting of photoluminescent egress signs, hazard warnings, and plant safety boards.',
    fullDesc:
      'Customized fabrication and installation of industrial safety signages. Options include photoluminescent (glow-in-the-dark) emergency exit signs, hazardous chemical diamond boards, mandatory PPE signs, fire equipment markers, and facility floor safety tapes.',
    highlights: [
      'Photoluminescent emergency exit & egress boards',
      'Hazard warning, caution & danger placards',
      'Mandatory personal protection notices',
      'Custom bilingual & multilingual industrial signs',
    ],
  },
  {
    id: 'lockout-tagout',
    number: '08',
    title: 'Lockout & Tagout (LOTO)',
    icon: Lock,
    shortDesc:
      'Hazardous energy isolation solutions including safety padlocks, lockout hasps, valve locks, and stations.',
    fullDesc:
      'Complete lockout/tagout equipment designed to control hazardous energy during maintenance and servicing operations. Products include non-conductive safety padlocks, multi-lock steel hasps, ball valve and gate valve lockouts, circuit breaker lockouts, and organized group lockout stations.',
    highlights: [
      'Industrial non-conductive dielectric safety padlocks',
      'Multi-person lockout hasps & cable lockouts',
      'Circuit breaker, switch & electrical isolators',
      'Ball valve, gate valve & pneumatic lockouts',
    ],
  },
];
