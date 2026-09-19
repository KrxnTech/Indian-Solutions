import { FOOTWEAR_PRODUCTS } from './products/footwear';
import { BODY_PROTECTION_PRODUCTS } from './products/bodyProtection';
import { HAND_PROTECTION_PRODUCTS } from './products/handProtection';
import { HEAD_PROTECTION_PRODUCTS } from './products/headProtection';
import { FACE_PROTECTION_PRODUCTS } from './products/faceProtection';
import { EYE_PROTECTION_PRODUCTS } from './products/eyeProtection';
import { TRAFFIC_SAFETY_PRODUCTS } from './products/trafficSafety';
import { MARKING_TAPES_PRODUCTS } from './products/markingTapes';
import { FIRE_HYDRANT_PRODUCTS } from './products/fireHydrant';
import { FIRE_EXTINGUISHER_PRODUCTS } from './products/fireExtinguishers';
import { FIRST_AID_PRODUCTS } from './products/firstAid';
import { FALL_PROTECTION_PRODUCTS } from './products/fallProtection';
import { LOTO_PRODUCTS } from './products/loto';
import { SPECIAL_PRODUCTS } from './products/specialProducts';
import { FIRE_DOOR_PRODUCTS } from './products/fireDoors';
import { SAFETY_SIGN_PRODUCTS } from './products/safetySigns';

/**
 * Unified Catalogue Dataset containing all verified products across ISS catalogues.
 */
export const ALL_PRODUCTS = [
  ...FOOTWEAR_PRODUCTS,
  ...BODY_PROTECTION_PRODUCTS,
  ...HAND_PROTECTION_PRODUCTS,
  ...HEAD_PROTECTION_PRODUCTS,
  ...FACE_PROTECTION_PRODUCTS,
  ...EYE_PROTECTION_PRODUCTS,
  ...TRAFFIC_SAFETY_PRODUCTS,
  ...MARKING_TAPES_PRODUCTS,
  ...FIRE_HYDRANT_PRODUCTS,
  ...FIRE_EXTINGUISHER_PRODUCTS,
  ...FIRST_AID_PRODUCTS,
  ...FALL_PROTECTION_PRODUCTS,
  ...LOTO_PRODUCTS,
  ...SPECIAL_PRODUCTS,
  ...FIRE_DOOR_PRODUCTS,
  ...SAFETY_SIGN_PRODUCTS,
];

/**
 * Verified Catalogue Taxonomy:
 * 14 Core ISS Categories + 2 Specialized Families (Fire Doors, Safety Sign Boards)
 */
export const CATALOGUE_CATEGORIES = [
  {
    name: 'All Products',
    slug: 'all',
    subCategories: [],
  },
  {
    name: 'Foot Protection',
    slug: 'foot-protection',
    subCategories: ['Safety Shoes', 'Gumboots'],
  },
  {
    name: 'Body Protection',
    slug: 'body-protection',
    subCategories: ['Coveralls', 'High-Vis Apparel', 'Chemical Protection', 'Aprons'],
  },
  {
    name: 'Hand Protection',
    slug: 'hand-protection',
    subCategories: ['Chemical Gloves', 'Mechanical Gloves', 'Welding Gloves', 'Electrical Gloves', 'General Handling'],
  },
  {
    name: 'Head Protection',
    slug: 'head-protection',
    subCategories: ['Safety Helmets', 'Bump Caps'],
  },
  {
    name: 'Face Protection',
    slug: 'face-protection',
    subCategories: ['Face Shields', 'Welding Shields'],
  },
  {
    name: 'Eye Protection',
    slug: 'eye-protection',
    subCategories: ['Safety Glasses', 'Safety Goggles', 'Welding Goggles'],
  },
  {
    name: 'Traffic Safety',
    slug: 'traffic-safety',
    subCategories: ['Traffic Cones', 'Barriers', 'Speed Bumps', 'Convex Mirrors'],
  },
  {
    name: 'Safety Marking Tapes',
    slug: 'safety-marking-tapes',
    subCategories: ['Floor Tapes', 'Barricade Tapes', 'Glow Tapes'],
  },
  {
    name: 'Fire Hydrant System',
    slug: 'fire-hydrant-system',
    subCategories: ['Hydrant Valves', 'Delivery Hoses', 'Nozzles & Pipes', 'Hose Reels'],
  },
  {
    name: 'Fire Extinguisher Solutions',
    slug: 'fire-extinguisher-solutions',
    subCategories: ['ABC Powder', 'CO2', 'Clean Agent', 'Foam', 'Water'],
  },
  {
    name: 'First Aid & Rescue',
    slug: 'first-aid-rescue',
    subCategories: ['First Aid Kits', 'Eye Wash & Showers', 'Rescue Equipment'],
  },
  {
    name: 'Fall Protection',
    slug: 'fall-protection',
    subCategories: ['Safety Harnesses', 'Lanyards', 'Fall Arresters', 'Lifelines'],
  },
  {
    name: 'Lockout & Tagout',
    slug: 'lockout-tagout',
    subCategories: ['Safety Padlocks', 'Lockout Hasps', 'Electrical Lockouts', 'Valve Lockouts', 'Lockout Stations'],
  },
  {
    name: 'Special Products',
    slug: 'special-products',
    subCategories: ['Spill Control', 'Respiratory Apparatus', 'Safety Lighting'],
  },
  {
    name: 'Fire Doors',
    slug: 'fire-doors',
    subCategories: [
      'Fire Rated Steel Doors',
      'HMPS Non Fire Rated Doors',
      'Shaft Doors',
      'Clean Room Doors',
      'Fire Rated Glazed Doors',
      'Fire Rated Acoustic Doors',
    ],
  },
  {
    name: 'Safety Sign Boards',
    slug: 'safety-sign-boards',
    subCategories: ['Emergency Signs', 'Fire Equipment Signs', 'Mandatory Signs', 'Hazard Warning Signs', 'Prohibition Signs'],
  },
];

/**
 * Alias mapping to bridge legacy/shorthand URL slugs with canonical catalogue category slugs
 */
export const CATEGORY_ALIASES = {
  'fire-extinguishers': 'fire-extinguisher-solutions',
  'fire-hydrant': 'fire-hydrant-system',
  'first-aid': 'first-aid-rescue',
  'marking-tapes': 'safety-marking-tapes',
  'loto': 'lockout-tagout',
  'safety-signs': 'safety-sign-boards',
};

/**
 * Resolves a category slug to its canonical catalogue slug
 */
export function resolveCategorySlug(slug) {
  if (!slug) return 'all';
  const clean = slug.trim().toLowerCase();
  return CATEGORY_ALIASES[clean] || clean;
}

/**
 * Retrieve a single product by categorySlug and slug
 */
export function getProductBySlug(categorySlug, slug) {
  if (!slug) return null;
  const canonicalCategory = categorySlug ? resolveCategorySlug(categorySlug) : null;
  // First match both category and slug
  const directMatch = ALL_PRODUCTS.find(
    (p) => p.slug === slug && (!canonicalCategory || p.categorySlug === canonicalCategory)
  );
  if (directMatch) return directMatch;
  // Fallback to matching slug alone
  return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
}

/**
 * Retrieve related products based on same category and subcategory
 */
export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const sameSubCat = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug && p.subCategory === product.subCategory
  );
  if (sameSubCat.length >= limit) {
    return sameSubCat.slice(0, limit);
  }
  const sameCat = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug && !sameSubCat.some((s) => s.id === p.id)
  );
  return [...sameSubCat, ...sameCat].slice(0, limit);
}

/**
 * Retrieve all featured products
 */
export function getFeaturedProducts() {
  return ALL_PRODUCTS.filter((p) => p.featured);
}

/**
 * Client-side search across name, category, subCategory, brand, tags, and description
 */
export function searchProducts(products, query) {
  if (!query || typeof query !== 'string') return products;
  const q = query.trim().toLowerCase();
  if (!q) return products;

  return products.filter((item) => {
    const inName = item.name.toLowerCase().includes(q);
    const inCat = item.category.toLowerCase().includes(q);
    const inSubCat = item.subCategory ? item.subCategory.toLowerCase().includes(q) : false;
    const inBrand = item.brand ? item.brand.toLowerCase().includes(q) : false;
    const inDesc = item.description ? item.description.toLowerCase().includes(q) : false;
    const inTags = item.tags ? item.tags.some((tag) => tag.toLowerCase().includes(q)) : false;
    const inSignNum = item.signNumber ? item.signNumber.toLowerCase().includes(q) : false;

    return inName || inCat || inSubCat || inBrand || inDesc || inTags || inSignNum;
  });
}
