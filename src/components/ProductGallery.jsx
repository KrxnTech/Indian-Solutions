import React, { useState } from 'react';

const FALLBACK_IMAGE = '/assets/products/placeholder.svg';

/**
 * Reusable ProductGallery component
 * Displays main product view with interactive thumbnail picker, error fallback,
 * and keyboard accessibility.
 */
export default function ProductGallery({
  images = [],
  title = 'Product Image',
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const validImages = images && images.length > 0 ? images : [FALLBACK_IMAGE];
  const currentImage = failedImages[activeIndex]
    ? FALLBACK_IMAGE
    : validImages[activeIndex] || validImages[0] || FALLBACK_IMAGE;

  const handleImageError = (index) => {
    setFailedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {/* Main Image Frame (Consistent 4:3 Aspect Ratio) */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs flex items-center justify-center select-none">
        <img
          src={currentImage}
          alt={`${title} - View ${activeIndex + 1}`}
          loading="lazy"
          onError={() => handleImageError(activeIndex)}
          className="w-full h-full object-cover transition-opacity duration-200 ease-out"
        />
      </div>

      {/* Thumbnails (Only rendered if more than 1 image actually exists) */}
      {validImages.length > 1 && (
        <div
          role="group"
          aria-label="Product image thumbnails"
          className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin"
        >
          {validImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            const thumbSrc = failedImages[idx] ? FALLBACK_IMAGE : img;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                aria-label={`Switch to image view ${idx + 1} of ${validImages.length}`}
                aria-pressed={isActive}
                className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#062A4F] ${
                  isActive
                    ? 'border-[#D71920] ring-2 ring-[#D71920]/30 opacity-100 scale-102'
                    : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={thumbSrc}
                  alt=""
                  loading="lazy"
                  onError={() => handleImageError(idx)}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
