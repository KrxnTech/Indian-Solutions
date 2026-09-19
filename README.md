# Indian Safety Solution (ISS)

Official corporate B2B website and digital product catalogue for **Indian Safety Solution (ISS)**, an industrial safety and fire protection equipment supplier and turnkey contractor based in Kalol, Gandhinagar, Gujarat.

---

## Project Overview

This web platform is designed specifically as a corporate digital presence and interactive B2B product catalogue. It enables plant safety engineers, EPC contractors, institutional buyers, and procurement teams to discover certified personal protective equipment (PPE), fire hydrant systems, fire extinguishers, emergency apparatus, and safety sign boards, and submit direct quotation enquiries.

**Non-Goals**: This is strictly a B2B enquiry and corporate catalogue platform. It contains **no** consumer e-commerce cart, checkout, payment gateways, customer account login, or fake pricing.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) (Client-side routing with clean URL search params)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Quality**: [Oxlint](https://oxc.rs/)

---

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

```bash
# Clone or navigate to the project directory
cd ISS

# Install project dependencies
npm install
```

### Development

```bash
# Start the local Vite development server
npm run dev
```

The application will launch locally at `http://localhost:5173/` (or next available port).

---

## Production Build & Verification

```bash
# Run production build
npm run build

# Preview production build locally
npm run preview

# Run Oxlint linter
npx oxlint
# or
npm run lint
```

Target:
- Build output: `0 build errors`
- Lint output: `0 warnings, 0 errors`

---

## Main Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | [Home](file:///c:/Users/krish/Desktop/ISS/src/pages/Home.jsx) | Company introduction, core offerings, application sectors, and category discovery |
| `/about` | [About](file:///c:/Users/krish/Desktop/ISS/src/pages/About.jsx) | Profile of Indian Safety Solution, facility address in Kalol, and operating focus |
| `/services` | [Services](file:///c:/Users/krish/Desktop/ISS/src/pages/Services.jsx) | Detailed scope of the 8 documented industrial safety and fire fighting services |
| `/products` | [Products](file:///c:/Users/krish/Desktop/ISS/src/pages/Products.jsx) | Digital product catalogue with instant search, category/subcategory filters, and pagination |
| `/products/:category/:slug` | [ProductDetail](file:///c:/Users/krish/Desktop/ISS/src/pages/ProductDetail.jsx) | Dedicated product page with technical specifications, image gallery, quote CTA, and WhatsApp link |
| `/projects` | [Projects](file:///c:/Users/krish/Desktop/ISS/src/pages/Projects.jsx) | On-site project execution capabilities (hydrants, alarms, sign boards, LOTO) |
| `/contact` | [Contact](file:///c:/Users/krish/Desktop/ISS/src/pages/Contact.jsx) | Corporate enquiry form with automatic quotation prefilling and verified contact details |
| `*` | [NotFound](file:///c:/Users/krish/Desktop/ISS/src/pages/NotFound.jsx) | Dedicated 404 recovery page for unmapped routes |

---

## Product Catalogue Engine

The catalogue is powered by verified structured data models in `src/data/products/` with 75 products across 16 categories.

### Key Capabilities

1. **Instant Multi-Field Search**: Searches across product names, categories, subcategories, brands, specifications, sign numbers, and tags without artificial suggestions.
2. **Category & Subcategory Filters**: Live counts per category, active category highlight in Deep Navy (`#062A4F`), and contextual subcategory chips.
3. **Active Filter Summary Bar**: Removable chips (`[ Category × ] [ Subcategory × ] [ "Query" × ] [ Clear All ]`) for immediate filter visibility.
4. **Mobile Filter Drawer**: Compact `[ Filters ▾ ]` toggle prevents vertical scrolling bloat on mobile viewports.
5. **Pagination**: 12 items per page with desktop ellipsis navigation and mobile `Page X of Y` indicator.
6. **Graceful Fallbacks**: Neutral SVG fallback ([placeholder.svg](file:///c:/Users/krish/Desktop/ISS/public/assets/products/placeholder.svg)) with `onError` listeners ensures missing images never break layouts.
7. **Quote Request Flow**: Clicking "Quote" or "Request a Quote" prefills `/contact` with Product name, Category, and the message:
   > *"I am interested in [Product Name]. Please provide quotation and specifications."*
8. **WhatsApp Direct Enquiry**: Generates verified links to `+91 89 80 748 339` with URL-encoded product names.

---

## Client Editing Guide

For future maintenance and updates, edit the files at these designated locations:

| Component / Content Area | File / Directory Path | Description |
|---|---|---|
| **Company Information** | [`src/data/company.js`](file:///c:/Users/krish/Desktop/ISS/src/data/company.js) | Phones, email, facility address, working hours, description |
| **Navigation Menus** | [`src/data/navigation.js`](file:///c:/Users/krish/Desktop/ISS/src/data/navigation.js) | Navbar header links, footer service list, footer product links |
| **Category Taxonomy** | [`src/data/categories.js`](file:///c:/Users/krish/Desktop/ISS/src/data/categories.js) | Core 14 categories, descriptions, and icon mappings |
| **Product Datasets** | [`src/data/products/`](file:///c:/Users/krish/Desktop/ISS/src/data/products/) | Modular product files by category (e.g. `footwear.js`, `fireExtinguishers.js`) |
| **Unified Product Registry** | [`src/data/products.js`](file:///c:/Users/krish/Desktop/ISS/src/data/products.js) | Aggregation, category slug aliases, search algorithm |
| **Product Image Assets** | [`public/assets/products/`](file:///c:/Users/krish/Desktop/ISS/public/assets/products/) | Category-sorted SVG illustrations and `placeholder.svg` |
| **Core Page Views** | [`src/pages/`](file:///c:/Users/krish/Desktop/ISS/src/pages/) | `Home.jsx`, `About.jsx`, `Services.jsx`, `Products.jsx`, `ProductDetail.jsx`, `Projects.jsx`, `Contact.jsx`, `NotFound.jsx` |
| **Design System Components** | [`src/components/`](file:///c:/Users/krish/Desktop/ISS/src/components/) | `Button.jsx`, `Card.jsx`, `Logo.jsx`, `Navbar.jsx`, `Footer.jsx`, `SectionHeading.jsx`, `ProductCard.jsx`, `ProductFilters.jsx`, `ProductSearch.jsx`, `Pagination.jsx`, `ProductGallery.jsx` |

### How to Add a New Product
1. Open the relevant file in `src/data/products/<category>.js` (e.g. `src/data/products/headProtection.js`).
2. Add a new object following the standard schema:
   ```javascript
   {
     id: 'unique-id',
     name: 'Product Name',
     slug: 'url-friendly-slug',
     category: 'Category Name',
     categorySlug: 'canonical-category-slug',
     subCategory: 'Subcategory',
     brand: 'Brand',
     image: '/assets/products/<category>/<filename>.svg',
     images: ['/assets/products/<category>/<filename>.svg'],
     description: 'Product description...',
     specifications: {
       Material: 'Specification value',
       // Omit any unverified fields
     },
     tags: ['tag1', 'tag2'],
     featured: false,
     source: 'ISS Source',
   }
   ```
3. Place the SVG illustration in `public/assets/products/<category>/<filename>.svg`.
4. Run `npm run build` and `npx oxlint` to verify.

---

## Production Deployment & DNS Guide

The project is pre-configured for instant zero-configuration deployment to static hosting platforms such as **Vercel** or **Netlify**.

### 1. Canonical Domain Architecture
- **Canonical Primary URL**: `https://indiansafetysolution.com/` (Apex)
- **Secondary Domain**: `https://www.indiansafetysolution.com/` (Configured to 301 redirect to apex)
- **Sitemap Location**: `https://indiansafetysolution.com/sitemap.xml`
- **Robots Directives**: `public/robots.txt`

### 2. Single-Page Application (SPA) Routing Configuration
- **Vercel**: Handled automatically via [`vercel.json`](file:///c:/Users/krish/Desktop/ISS/vercel.json) (`"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]`).
- **Netlify**: Handled automatically via [`public/_redirects`](file:///c:/Users/krish/Desktop/ISS/public/_redirects) (`/* /index.html 200`).

### 3. DNS Configuration Instructions

#### When Deploying to Vercel:
In your domain registrar DNS management panel (e.g. GoDaddy, Namecheap):
| Type | Host / Name | Value / Target | Purpose |
|---|---|---|---|
| **A** | `@` (or blank) | `76.76.21.21` | Directs apex domain `indiansafetysolution.com` to Vercel edge network |
| **CNAME** | `www` | `cname.vercel-dns.com` | Directs `www` to Vercel (set up redirect to apex in Vercel project settings) |

#### When Deploying to Netlify:
In your domain registrar DNS management panel:
| Type | Host / Name | Value / Target | Purpose |
|---|---|---|---|
| **A** | `@` (or blank) | `75.2.60.5` | Directs apex domain to Netlify load balancer |
| **CNAME** | `www` | `<your-site-name>.netlify.app` | Directs `www` to Netlify site |

*Note: SSL/TLS certificates are provisioned automatically via Let's Encrypt once DNS propagates.*

---

## Production Launch Checklist

- [x] `npm install` runs cleanly without dependency warnings
- [x] `npm run build` generates clean `dist/` bundle in under 2 seconds
- [x] `npx oxlint` reports **0 warnings and 0 errors** across all 44 files
- [x] Canonical domain established as `https://indiansafetysolution.com/`
- [x] `robots.txt` and `sitemap.xml` (97 verified URLs) present in root output
- [x] Authentic ISS safety shield `favicon.svg` configured
- [x] Open Graph (`og:*`) and Twitter card metadata configured in `index.html`
- [x] SPA client-side deep-link rewrites configured (`vercel.json`, `_redirects`)
- [x] Homepage hero, offerings, and sectors grounded in factual client data
- [x] Catalogue search, category filtering, subcategory chips, and pagination verified
- [x] All 75 product detail routes render specifications and omit missing/N/A rows
- [x] Quotation request flow prefills Product, Category, and message on `/contact`
- [x] WhatsApp direct CTA configured with verified number `+91 89 80 748 339`
- [x] Direct phone (`tel:+918980748339`) and email (`mailto:indiansafetysolution@gmail.com`) links verified
- [x] Dedicated corporate 404 page configured for unmapped routes
- [x] Zero broken image paths across all 75 product items
- [x] Zero `localhost` URLs or development artifacts in production build
- [x] Zero exposed secrets, API keys, or private tokens

---

## Verified Client Information

- **Company Name**: Indian Safety Solution
- **Facility Address**: Hotel Amiras Compound, Ahmedabad - Mehsana Highway, Ta. Kalol, Dist. Gandhinagar, Gujarat - 382729
- **Phone Primary**: `+91 89 80 748 339`
- **Phone Secondary**: `+91 88 66 448 339`
- **Email**: `indiansafetysolution@gmail.com`
- **Website**: `https://indiansafetysolution.com`
- **Business Hours**: Monday – Saturday: 09:00 AM – 06:30 PM IST
