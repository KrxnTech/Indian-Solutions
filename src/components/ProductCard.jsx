import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquareQuote } from 'lucide-react';
import Button from './Button';

const FALLBACK_IMAGE = '/assets/products/placeholder.svg';

/**
 * Reusable ProductCard Component for the ISS Digital Product Catalogue
 * - Consistent 4:3 image ratio with error fallback
 * - No pricing, no cart/checkout
 * - Primary Action: "Quote"
 * - Secondary Action: "Details"
 * - Subtle hover animation (-2px)
 */
export default function ProductCard({ product }) {
  const [prevImage, setPrevImage] = useState(product?.image);
  const [imgFailed, setImgFailed] = useState(false);

  // Sync state during render when product prop changes (React recommended pattern)
  if (product?.image !== prevImage) {
    setPrevImage(product?.image);
    setImgFailed(false);
  }

  if (!product) return null;

  const imgSrc = imgFailed ? FALLBACK_IMAGE : product?.image || FALLBACK_IMAGE;
  const detailUrl = `/products/${product.categorySlug}/${product.slug}`;
  const quoteUrl = `/contact?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(
    product.category
  )}`;

  const handleImageError = () => {
    if (!imgFailed) {
      setImgFailed(true);
    }
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300">
      {/* 1. Product Image Media Container */}
      <Link
        to={detailUrl}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100 select-none p-3.5"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={imgSrc}
          alt={`${product.name} - ${product.category}`}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-contain transition-transform duration-200 ease-out group-hover:scale-105"
        />

        {/* Category & Brand Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-heading font-semibold uppercase tracking-wider bg-[#031B33]/90 text-white shadow-xs backdrop-blur-xs">
            {product.category}
          </span>
          {product.brand && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FFC400] text-[#031B33] shadow-xs">
              {product.brand}
            </span>
          )}
        </div>
      </Link>

      {/* 2. Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Category Sub-indicator / Sign Number */}
        <div className="text-[11px] font-heading font-semibold text-[#D71920] uppercase tracking-wider mb-1">
          {product.signNumber ? `Sign #${product.signNumber}` : product.subCategory || product.category}
        </div>

        {/* 3. Product Name */}
        <h3 className="font-heading font-bold text-sm sm:text-base text-[#062A4F] line-clamp-2 leading-snug group-hover:text-[#D71920] transition-colors duration-150 mb-2">
          <Link to={detailUrl}>
            {product.name}
          </Link>
        </h3>

        {/* 4. Short Description */}
        <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>

        {/* 5. Action Controls: [ Details ] [ Quote ] */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 mt-auto">
          <Button
            to={detailUrl}
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            icon={ArrowRight}
            title="View Product Details"
          >
            Details
          </Button>

          <Button
            to={quoteUrl}
            variant="primary"
            size="sm"
            className="flex-1 text-xs"
            icon={MessageSquareQuote}
            iconPosition="left"
            title="Request Quotation"
          >
            Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
