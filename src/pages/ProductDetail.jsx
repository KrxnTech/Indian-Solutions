import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { COMPANY_INFO } from '../data/company';
import ProductGallery from '../components/ProductGallery';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import {
  ChevronRight,
  MessageSquareQuote,
  MessageCircle,
  Phone,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function ProductDetail() {
  const { category, slug } = useParams();

  const product = getProductBySlug(category, slug);

  // Sync Document Title & Meta Description for SEO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      document.title = `${product.name} | Indian Safety Solution`;
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute(
          'content',
          product.description ? product.description.slice(0, 160) : `${product.name} supplied by Indian Safety Solution.`
        );
      }
    } else {
      document.title = 'Product Not Found | Indian Safety Solution';
    }
  }, [product]);

  // Clean, verified specifications: filter out any empty, 'N/A', or placeholder values
  const validSpecs = useMemo(() => {
    if (!product?.specifications) return [];
    return Object.entries(product.specifications).filter(([, val]) => {
      if (!val) return false;
      const str = String(val).trim();
      return str !== '' && str.toUpperCase() !== 'N/A' && str !== '-';
    });
  }, [product]);

  // 404 State if product does not exist
  if (!product) {
    return (
      <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-red-50 text-[#D71920] flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#062A4F]">
          Product Not Found
        </h1>
        <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
          The product you&rsquo;re looking for could not be found.
        </p>
        <div className="pt-2">
          <Button to="/products" variant="primary" icon={ArrowLeft} iconPosition="left">
            Return to Product Catalogue
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const quoteUrl = `/contact?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(
    product.category
  )}`;

  // Verified WhatsApp enquiry format (+91 89 80 748 339 -> 918980748339)
  const cleanPhone = COMPANY_INFO.phonePrimary.replace(/[^0-9]/g, '');
  const whatsAppMessage = encodeURIComponent(
    `Hello Indian Safety Solution, I am interested in ${product.name}. Please provide quotation and specifications.`
  );
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${whatsAppMessage}`;

  return (
    <div className="py-6 sm:py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle, accessible breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs font-heading font-medium text-[#64748B]">
            <li>
              <Link to="/" className="hover:text-[#062A4F] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </li>
            <li>
              <Link to="/products" className="hover:text-[#062A4F] transition-colors">
                Products
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </li>
            <li>
              <Link
                to={`/products?category=${product.categorySlug}`}
                className="hover:text-[#062A4F] transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </li>
            <li className="text-[#062A4F] font-bold truncate max-w-[180px] sm:max-w-xs" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Card Container
            Desktop: 2-column (Image on Left, Details on Right)
            Mobile: Natural linear hierarchy (Image -> Name -> Category -> Description -> Specs -> Quote CTA -> WhatsApp CTA)
        */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-xs mb-14">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} title={product.name} />

            {/* Quick Consultation Call Strip */}
            <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-[#F5F7FA] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#062A4F]">
                <Phone className="w-4 h-4 text-[#D71920] flex-shrink-0" />
                <span>Direct technical consultation:</span>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="font-bold text-[#062A4F] hover:text-[#D71920] transition-colors"
              >
                {COMPANY_INFO.phonePrimary}
              </a>
            </div>
          </div>

          {/* Right Column: Information, Specs & Actions */}
          <div className="lg:col-span-6 space-y-5 flex flex-col">
            {/* Category & Badge Header */}
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-heading font-semibold uppercase tracking-wider bg-[#062A4F] text-white">
                  {product.category}
                </span>
                {product.subCategory && (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-heading font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                    {product.subCategory}
                  </span>
                )}
                {product.brand && (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FFC400] text-[#031B33]">
                    Brand: {product.brand}
                  </span>
                )}
                {product.signNumber && (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#D71920] text-white">
                    Sign #{product.signNumber}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#062A4F] leading-snug">
                {product.name}
              </h1>
            </div>

            {/* Description */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-[#64748B]">
              <p>{product.description}</p>
            </div>

            {/* Clean Specifications Table (Missing & N/A values omitted) */}
            {validSpecs.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-[#062A4F]">
                  Documented Technical Specifications
                </h2>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {validSpecs.map(([key, val], idx) => (
                        <tr
                          key={key}
                          className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                        >
                          <th className="py-2.5 px-3.5 sm:px-4 font-heading font-semibold text-slate-600 border-b border-slate-200 w-2/5">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </th>
                          <td className="py-2.5 px-3.5 sm:px-4 text-[#17202A] font-medium border-b border-slate-200">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Product Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-heading font-semibold text-slate-400 mr-1">
                  Tags:
                </span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Conversion CTA Group (Primary: Request a Quote, Secondary: WhatsApp Enquiry) */}
            <div className="pt-5 border-t border-slate-200 mt-auto space-y-3">
              <div className="text-[11px] sm:text-xs text-[#64748B] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Direct B2B supply &amp; project quotations issued from Kalol, Gujarat.</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  to={quoteUrl}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto flex-1 font-heading text-sm"
                  icon={MessageSquareQuote}
                  iconPosition="left"
                >
                  Request a Quote
                </Button>

                <Button
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-heading text-sm"
                  icon={MessageCircle}
                  iconPosition="left"
                >
                  WhatsApp Enquiry
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6" aria-labelledby="related-products-heading">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 id="related-products-heading" className="font-heading font-bold text-lg sm:text-xl text-[#062A4F]">
                Related Products in {product.category}
              </h2>
              <Link
                to={`/products?category=${product.categorySlug}`}
                className="text-xs font-heading font-semibold text-[#D71920] hover:underline"
              >
                View all {product.category} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
