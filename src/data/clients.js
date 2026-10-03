/**
 * Automatic Client Image Discovery & Data Registry
 *
 * Automatically scans and imports all client logo image files in /public/images/clients/
 * Supports .png, .jpg, .jpeg, .webp, and .svg dynamically.
 * When new images are added to the folder, they are automatically discovered at build/dev time.
 */

// Vite glob import for all client logo image formats in public/images/clients/
const rawClientModules = import.meta.glob(
  '/public/images/clients/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true }
);

/**
 * Curated knowledge base for known industrial & commercial clients in Gujarat/India.
 * Used to enrich discovered images with verified industry, description, and website.
 * Any newly added image not in this dictionary will automatically get clean formatted defaults.
 */
const KNOWN_METADATA = {
  abb: {
    name: 'ABB India',
    category: 'Industrial Automation & Power Technology',
    description: 'Supplied high-voltage dielectric electrical safety gear, portable extinguisher systems, and facility-wide statutory hazard warning signages.',
    website: 'https://new.abb.com/in',
  },
  adani_shantigram: {
    name: 'Adani Shantigram',
    category: 'Township & Infrastructure',
    description: 'Executed complete fire hydrant piping erection, landing valve installations, and photoluminescent emergency evacuation route mapping.',
    website: 'https://www.adanirealty.com',
  },
  adani_wilmar: {
    name: 'Adani Wilmar',
    category: 'Food Processing & Agri-Business',
    description: 'Integrated early warning optical flame and smoke detection systems, chemical-resistant PPE gear, and hydrant hose boxes across processing bays.',
    website: 'https://www.adaniwilmar.com',
  },
  ambuja_exports_limited: {
    name: 'Ambuja Exports Limited',
    category: 'Agro-Processing & Starch Derivatives',
    description: 'Supplied explosion-proof personal protective equipment, industrial fire delivery hoses, and hazardous dust mitigation safety apparel.',
    website: 'https://www.ambujagroup.com',
  },
  arvind: {
    name: 'Arvind Limited',
    category: 'Textiles & Advanced Materials',
    description: 'Delivered plant-wide safety signage surveys, flame-retardant industrial worker garments, and fire extinguisher maintenance batteries.',
    website: 'https://www.arvind.com',
  },
  ashima: {
    name: 'Ashima Group',
    category: 'Textile Manufacturing',
    description: 'Equipped manufacturing sheds with statutory safety instruction boards, worker head & respiratory protection, and emergency egress lighting.',
    website: 'https://www.ashimagroup.com',
  },
  atul: {
    name: 'Atul Limited',
    category: 'Specialty Chemicals & Polymers',
    description: 'Delivered acid-alkali resistant chemical splash suits, safety eye-wash stations, and plant-wide chemical hazard warning placards.',
    website: 'https://www.atul.co.in',
  },
  balaji: {
    name: 'Balaji Wafers',
    category: 'Food Processing & FMCG',
    description: 'Implemented cleanroom-safe worker PPE, wet chemical kitchen/fryer fire suppression support, and emergency evacuation plans.',
    website: 'https://www.balajiwafers.com',
  },
  banco: {
    name: 'Banco Products',
    category: 'Automotive Components & Cooling',
    description: 'Supplied precision machinery LOTO isolation hardware, certified industrial safety shoes, and heavy-duty branch pipe nozzles.',
    website: 'https://www.bancoindia.com',
  },
  bob_world: {
    name: 'Bank of Baroda (bob World)',
    category: 'Banking & Commercial Facilities',
    description: 'Provided certified ABC stored-pressure extinguishers, fire safety sign boards, and corporate headquarters emergency response kits.',
    website: 'https://www.bankofbaroda.in',
  },
  cadila: {
    name: 'Cadila Pharmaceuticals',
    category: 'Pharmaceutical Formulations & Healthcare',
    description: 'Turnkey provision of cleanroom disposable apparel, clean-agent gas flooding extinguishers, and solvent area static discharge PPE.',
    website: 'https://www.cadilapharma.com',
  },
  chamak: {
    name: 'Chamak Detergents',
    category: 'Consumer Goods & Industrial Cleaning',
    description: 'Provided chemical handling face shields, heavy rubber safety boots, and hydrant network integrity testing.',
    website: 'https://chamakdetergent.com',
  },
  deepak: {
    name: 'Deepak Nitrite / Phenolics',
    category: 'Specialty Chemicals & Intermediates',
    description: 'Supplied chemical hazmat suits, vapor-tight safety goggles, and master group lockout stations for reactive chemistry reactors.',
    website: 'https://www.godeepak.com',
  },
  east_made: {
    name: 'East Made',
    category: 'Industrial Machinery & Fabrication',
    description: 'Fabrication workshop fall-arrest safety harnesses, high-amperage welding protective shields, and CO2 fire extinguishers.',
    website: 'https://eastmade.in',
  },
  eris: {
    name: 'Eris Lifesciences',
    category: 'Pharmaceutical Formulations',
    description: 'Installed early smoke detection aspiration sensors, sterile cleanroom gowns, and statutory facility regulatory safety charts.',
    website: 'https://www.eris.co.in',
  },
  farth_root: {
    name: 'Earthroot Foods',
    category: 'Food Processing & Processing Plants',
    description: 'Supplied food-grade protective gloves, dry powder fire extinguishers, and exit egress signage across packing divisions.',
    website: 'https://earthrootfoods.com',
  },
  fit_flex: {
    name: 'Fit Flex',
    category: 'Industrial Fluid Transfer Systems',
    description: 'High-pressure hydraulic hose testing, safety impact gloves, and machine energy isolation valve lockouts.',
    website: '',
  },
  gmdc: {
    name: 'GMDC Limited',
    category: 'Mining & Mineral Development (State Enterprise)',
    description: 'Heavy mining site safety helmets, high-visibility reflective safety jackets, and vehicle mounted fire suppression equipment.',
    website: 'https://www.gmdcltd.com',
  },
  gnfc: {
    name: 'GNFC Limited',
    category: 'Fertilizers & Industrial Chemicals',
    description: 'Installed hazardous ammonia/chlorine emergency route signage, breathing apparatus cylinders, and fire hydrant line valves.',
    website: 'https://www.gnfc.in',
  },
  godrej: {
    name: 'Godrej Industries',
    category: 'Consumer Goods & Conglomerate',
    description: 'Delivered distribution warehouse fire hose boxes, statutory compliance notices, and ergonomic worker protective equipment.',
    website: 'https://www.godrejindustries.com',
  },
  gujarat_state_petronet_logo: {
    name: 'Gujarat State Petronet (GSPL)',
    category: 'Natural Gas Transmission & Infrastructure',
    description: 'Supplied high-pressure pipeline safety signage, intrinsically safe spark-proof flashlights, and valve lockout hardware.',
    website: 'https://www.gspcgroup.com',
  },
  gujarat_gas: {
    name: 'Gujarat Gas Limited',
    category: 'City Gas Distribution & Utilities',
    description: 'Supplied natural gas distribution network emergency signages, dielectric safety gloves, and portable gas leak detector accessories.',
    website: 'https://www.gujaratgas.com',
  },
  gujarat_pesticides: {
    name: 'Gujarat Pesticides',
    category: 'Agrochemicals & Crop Protection',
    description: 'Provided organic vapor respirators, emergency eyewash shower stations, and chemical storage hazard classification placards.',
    website: '',
  },
  gujarat_themis: {
    name: 'Gujarat Themis Biosyn',
    category: 'Biotechnology & Active APIs',
    description: 'Supplied fermentation unit cleanroom safety equipment, fire suppression cylinders, and statutory environmental safety boards.',
    website: 'https://www.gtbl.in',
  },
  honda: {
    name: 'Honda Motorcycle & Scooter India',
    category: 'Automotive Engineering & Assembly',
    description: 'Provided automobile assembly line anti-cut gloves, electrostatic dissipative footwear, and automatic fire extinguisher batteries.',
    website: 'https://www.honda2wheelersindia.com',
  },
  house_of_patels: {
    name: 'House of Patels',
    category: 'Commercial Real Estate & Logistics Hubs',
    description: 'Commercial logistics depot fire hydrant lines, landing valves, hose reel cabinets, and glow-in-the-dark escape signs.',
    website: 'https://www.patel-india.com',
  },
  hyfun: {
    name: 'HyFun Foods',
    category: 'Frozen Food Processing & Cold Chain',
    description: 'Delivered sub-zero thermal cold storage jackets, ammonia sensor emergency sirens, and food-grade washdown safety suits.',
    website: 'https://hyfunfoods.com',
  },
  imax: {
    name: 'IMAX Multiplexes & Commercial',
    category: 'Commercial Entertainment & Hospitality',
    description: 'Equipped commercial auditorium buildings with certified public safety exit egress markers, clean-agent fire protection, and alarms.',
    website: 'https://www.imax.com',
  },
  isro: {
    name: 'ISRO (Space Application Centre)',
    category: 'Aerospace & High-Reliability Research',
    description: 'Supplied high-spec clean-agent fire suppression equipment, specialized cleanroom ESD apparel, and precision safety hardware.',
    website: 'https://www.isro.gov.in',
  },
  jk_lakshmi: {
    name: 'JK Lakshmi Cement',
    category: 'Cement & Heavy Building Materials',
    description: 'Heavy industrial dust respirators, high-impact safety goggles, and clinker plant fire fighting branch pipe nozzles.',
    website: 'https://www.jklakshmiment.com',
  },
  jmc: {
    name: 'JMC Projects',
    category: 'EPC & Civil Infrastructure',
    description: 'Delivered construction site fall-protection safety lifelines, anchor points, certified safety helmets, and warning cones.',
    website: 'https://www.jmcprojects.com',
  },
  jrj_foods: {
    name: 'JRJ Foods',
    category: 'Agro & Food Processing',
    description: 'Supplied food handling personal protective gear, wet fire hydrant lines, and hygiene-compliant statutory safety boards.',
    website: '',
  },
  jolliz: {
    name: 'Jolliz Foods',
    category: 'Confectionery & Food Packaging',
    description: 'Packaged foods processing safety uniforms, fire extinguisher refilling maintenance, and facility emergency maps.',
    website: '',
  },
  kp_group: {
    name: 'KP Group',
    category: 'Renewable Energy & Solar Infrastructure',
    description: 'Equipped solar power park switchyards with high-voltage electrical insulated rubber mats, dielectric gloves, and LOTO kits.',
    website: 'https://kpgroup.co',
  },
  larsen_toubro: {
    name: 'Larsen & Toubro (L&T)',
    category: 'Heavy Engineering & Construction',
    description: 'Turnkey site fire safety execution, scaffolding safety tags, fall-arrest harnesses, and project safety equipment supply.',
    website: 'https://www.larsentoubro.com',
  },
  lohiya: {
    name: 'Lohiya Group',
    category: 'Edible Oils & Agro Processing',
    description: 'Refinery flammable solvent vapor emergency sign boards, chemical spill containment kits, and worker foot protection.',
    website: 'https://lohiyagroup.com',
  },
  microns: {
    name: '20 Microns Limited',
    category: 'Micronized Industrial Minerals',
    description: 'Supplied mineral grinding mill dust particulate respirators, eye protection, and overhead fire pipeline verification.',
    website: 'https://www.20microns.com',
  },
  oil: {
    name: 'Oil & Petroleum Exploration',
    category: 'Upstream Petrochemicals & Exploration',
    description: 'Exploration site fire hydrant networks, explosion-proof emergency lamps, and specialized flame-resistant boiler suits.',
    website: '',
  },
  ratnamani: {
    name: 'Ratnamani Metals & Tubes',
    category: 'Industrial Piping & Metallurgy',
    description: 'Stainless steel tube mill safety face shields, cut-resistant Kevlar gloves, and facility emergency evacuation routes.',
    website: 'https://www.ratnamani.com',
  },
  roki: {
    name: 'Roki Minda',
    category: 'Automotive Air Filtration & Emission',
    description: 'Installed plastic molding station machine lockouts, worker ear protection muffs, and fire hydrant hose reel drums.',
    website: '',
  },
  shaily: {
    name: 'Shaily Engineering Plastics',
    category: 'Precision Medical & Industrial Plastics',
    description: 'Provided medical device cleanroom protective apparel, mold-changing crane safety signages, and CO2 fire extinguishers.',
    website: 'https://www.shaily.com',
  },
  tong_garden: {
    name: 'Tong Garden',
    category: 'Food Processing & Snack Manufacturing',
    description: 'Supplied food-grade safety gear, kitchen fire blankets, and statutory worker occupational health boards.',
    website: 'https://tonggarden.co.in',
  },
  toyoda_gosei: {
    name: 'Toyoda Gosei',
    category: 'Automotive Safety & Rubber Products',
    description: 'Rubber vulcanization heat-protective gauntlets, machinery safety signages, and automated fire alarm sensors.',
    website: 'https://www.toyoda-gosei.com',
  },
  toyota_tsusho: {
    name: 'Toyota Tsusho India',
    category: 'Global Trading & Industrial Logistics',
    description: 'Logistics park statutory safety signs, emergency egress marking tapes, and comprehensive fire extinguisher supply.',
    website: 'https://www.toyota-tsusho.com',
  },
  zydus: {
    name: 'Zydus Lifesciences',
    category: 'Pharmaceuticals & Global Healthcare',
    description: 'Continuous supply of sterile cleanroom apparel, chemical splash protection, and plant-wide statutory safety signage.',
    website: 'https://www.zyduslife.com',
  },
};

/**
 * Formats a raw filename into a human-readable title.
 * e.g. "adani_wilmar.png" -> "Adani Wilmar"
 */
function formatCompanyName(rawName = '') {
  return rawName
    .replace(/\.[^/.]+$/, '') // Strip file extension
    .replace(/[._-]+/g, ' ') // Replace punctuation with space
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => {
      // Keep well-known abbreviations uppercase
      const upper = word.toUpperCase();
      if (['ABB', 'GMDC', 'GNFC', 'ISRO', 'IMAX', 'JMC', 'JRJ', 'JK', 'L&T', 'KP', 'SEZ', 'LOTO', 'PPE', 'GSPL', 'API'].includes(upper)) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Generates normalized lookup key from filename
 * e.g. "Gujarat State Petronet Logo.png" -> "gujarat_state_petronet_logo"
 */
function getNormalizedKey(rawName = '') {
  return rawName
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Automatically discovered, formatted, and enriched client list.
 * Any new image placed in /public/images/clients/ is instantly discovered!
 */
export const CLIENT_COMPANIES = Object.keys(rawClientModules)
  .map((filePath, index) => {
    // Extract base filename (e.g. "adani_wilmar.png")
    const fileName = filePath.split('/').pop() || '';
    const normKey = getNormalizedKey(fileName);
    const customMeta = KNOWN_METADATA[normKey] || {};

    // In Vite, rawClientModules[filePath].default contains the resolved asset URL.
    // Fallback directly to the public path if not resolved.
    const resolvedUrl =
      rawClientModules[filePath]?.default ||
      `/images/clients/${encodeURIComponent(fileName)}`;

    const fallbackName = formatCompanyName(fileName);

    return {
      id: index + 1,
      key: normKey,
      fileName,
      name: customMeta.name || fallbackName,
      logo: resolvedUrl,
      category: customMeta.category || 'Industrial & Corporate Partner',
      industry: customMeta.category || 'Industrial & Corporate Partner',
      description:
        customMeta.description ||
        `Valued enterprise client partnered with Indian Safety Solution (ISS) for certified industrial safety gear, statutory plant signage, and turnkey fire protection solutions across Gujarat.`,
      website: customMeta.website || '',
    };
  })
  // Sort alphabetically by name for consistent, balanced presentation
  .sort((a, b) => a.name.localeCompare(b.name));

/**
 * Helper to distribute any number of client logos evenly across N animated rows.
 * e.g., 45 clients across 4 rows => ~11-12 clients per row.
 */
export function distributeClientsIntoRows(clients = CLIENT_COMPANIES, rowCount = 4) {
  const rows = Array.from({ length: rowCount }, () => []);
  clients.forEach((client, idx) => {
    rows[idx % rowCount].push(client);
  });
  return rows;
}

export default CLIENT_COMPANIES;
