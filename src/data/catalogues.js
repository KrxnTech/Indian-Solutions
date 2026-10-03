/**
 * AUTOMATIC PRODUCT CATALOGUE DISCOVERY & DATA LAYER
 * Dynamically discovers all .pdf files inside the /Catalogue directory using Vite's asset glob.
 * If new PDF catalogues are added to /Catalogue, they will automatically be included.
 */

// Vite automatic glob discovery for PDF files in the Catalogue folder
const pdfModules = import.meta.glob(
  ['/Catalogue/*.pdf', '/**/Catalogue/*.pdf', '../../Catalogue/*.pdf'],
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

/**
 * Curated metadata enhancements for known ISS catalogue documents
 * Graceful fallbacks apply automatically for newly added catalogues.
 */
const CATALOGUE_METADATA_PRESETS = {
  'ISS Fire extinguisher Catalog B.pdf': {
    title: 'Fire Extinguishers & Fire Fighting Equipment',
    subtitle: 'ABC dry powder, clean agent, CO₂, mechanical foam, modular systems, landing valves, and hydrant line accessories.',
    category: 'Fire Protection',
    badge: 'ISI / CE Certified',
    size: '72.0 MB',
    tagColor: 'bg-red-50 text-red-700 border-red-200',
    iconColor: 'text-[#D71920]',
    featured: true,
    pageCount: '80+ Pages',
  },
  'ISS catlog- Signboard.pdf': {
    title: 'Safety Signboards & Plant Hazard Signage',
    subtitle: 'Photoluminescent evacuation wayfinding, fire action notices, chemical hazard placards, and mandatory plant PPE boards.',
    category: 'Facility Signages',
    badge: 'ISO 7010 Glow',
    size: '31.5 MB',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    iconColor: 'text-[#FFC400]',
    featured: true,
    pageCount: '45+ Pages',
  },
  'SAFETY PRODUCT IMAGES.pdf': {
    title: 'Industrial PPE & Personal Safety Equipment',
    subtitle: 'Certified safety helmets, safety footwear, chemical suits, eye protection, ear defenders, fall arrest harnesses & respiratory gear.',
    category: 'Personal Protection (PPE)',
    badge: 'EN / IS Certified',
    size: '29.4 MB',
    tagColor: 'bg-blue-50 text-blue-800 border-blue-200',
    iconColor: 'text-[#062A4F]',
    featured: true,
    pageCount: '60+ Pages',
  },
  'FIRE DOORS ISS PDF.pdf': {
    title: 'Fire Rated Steel Doors & Smoke Containment',
    subtitle: '1-hour to 2-hour fire rated steel doors, panic exit devices, certified vision panels, and acoustic smoke seal assemblies.',
    category: 'Passive Fire Protection',
    badge: 'CBRI / UL Tested',
    size: '8.5 MB',
    tagColor: 'bg-rose-50 text-rose-800 border-rose-200',
    iconColor: 'text-[#D71920]',
    featured: false,
    pageCount: '24+ Pages',
  },
  'DOORS ISS.pdf': {
    title: 'Industrial, Cleanroom & Plant Partition Doors',
    subtitle: 'Heavy-duty galvanized steel and stainless steel doors, pharma cleanroom hermetic doors, and high-traffic plant partitions.',
    category: 'Industrial Doors',
    badge: 'Heavy Spec',
    size: '13.1 MB',
    tagColor: 'bg-slate-100 text-slate-800 border-slate-200',
    iconColor: 'text-[#062A4F]',
    featured: false,
    pageCount: '32+ Pages',
  },
};

/**
 * Format raw filename into a clean, human-readable title for unknown PDFs
 */
function cleanCatalogueTitle(fileName) {
  const baseName = fileName.replace(/\.[^/.]+$/, '').trim();
  
  if (/fire\s*doors/i.test(baseName)) return 'Fire Rated Doors & Smoke Containment';
  if (/doors/i.test(baseName)) return 'Industrial & Cleanroom Doors';
  if (/fire\s*extinguisher/i.test(baseName)) return 'Fire Extinguishers & Fire Systems';
  if (/signboard/i.test(baseName)) return 'Safety Signboards & Plant Signage';
  if (/safety\s*product/i.test(baseName)) return 'Industrial PPE & Safety Equipment';
  
  return baseName
    .replace(/^ISS\s*/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Helper to determine category for newly discovered PDFs
 */
function getCatalogueCategory(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.includes('fire door') || lower.includes('door')) return 'Industrial Doors';
  if (lower.includes('extinguisher') || lower.includes('fire')) return 'Fire Protection';
  if (lower.includes('signboard') || lower.includes('sign')) return 'Safety Signages';
  if (lower.includes('safety') || lower.includes('ppe')) return 'Personal Protection';
  return 'General Safety';
}

// Process discovered PDF modules and eliminate any duplicates across glob patterns
const seenFileNames = new Set();
const parsedCatalogues = [];

for (const [rawPath, fileUrl] of Object.entries(pdfModules)) {
  const fileName = rawPath.split(/[/\\]/).pop();
  if (!fileName || seenFileNames.has(fileName)) continue;
  seenFileNames.add(fileName);

  const preset = CATALOGUE_METADATA_PRESETS[fileName];
  const title = preset?.title || cleanCatalogueTitle(fileName);
  const subtitle = preset?.subtitle || 'Official technical catalogue specification document by Indian Safety Solution.';
  const category = preset?.category || getCatalogueCategory(fileName);
  const badge = preset?.badge || 'Official PDF';
  const size = preset?.size || 'PDF Document';
  const tagColor = preset?.tagColor || 'bg-slate-100 text-slate-800 border-slate-200';
  const iconColor = preset?.iconColor || 'text-[#062A4F]';
  const featured = Boolean(preset?.featured);
  const pageCount = preset?.pageCount || 'Document';

  parsedCatalogues.push({
    id: fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    fileName,
    title,
    subtitle,
    category,
    badge,
    size,
    tagColor,
    iconColor,
    featured,
    pageCount,
    url: fileUrl,
    rawPath,
  });
}

// Preferred visual presentation order
const PRIORITY_ORDER = [
  'ISS Fire extinguisher Catalog B.pdf',
  'SAFETY PRODUCT IMAGES.pdf',
  'ISS catlog- Signboard.pdf',
  'FIRE DOORS ISS PDF.pdf',
  'DOORS ISS.pdf',
];

parsedCatalogues.sort((a, b) => {
  const idxA = PRIORITY_ORDER.indexOf(a.fileName);
  const idxB = PRIORITY_ORDER.indexOf(b.fileName);
  if (idxA !== -1 && idxB !== -1) return idxA - idxB;
  if (idxA !== -1) return -1;
  if (idxB !== -1) return 1;
  return a.title.localeCompare(b.title);
});

export const ALL_CATALOGUES = parsedCatalogues;
export const CATALOGUES_COUNT = parsedCatalogues.length;
