import React from 'react';

/**
 * Reusable Card Design Foundation for ISS
 * Features:
 * - White background
 * - Subtle border (border-slate-200)
 * - Subtle shadow (shadow-sm)
 * - Moderate radius (rounded-lg)
 * - Subtle elevation on hover (-translate-y-1, shadow-md, 200ms)
 */
export function Card({ children, className = '', hoverable = true, ...props }) {
  return (
    <div
      className={`group bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col ${
        hoverable ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-slate-300' : 'shadow-sm'
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Consistent Card Media / Image wrapper
 * Enforces responsive aspect ratio, object-fit: cover, and smooth hover zoom
 */
export function CardMedia({
  src,
  alt = 'Industrial Safety Equipment',
  aspectRatio = 'aspect-[4/3]',
  badge,
  children,
  className = '',
}) {
  return (
    <div className={`relative w-full ${aspectRatio} overflow-hidden bg-slate-100 flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
          {children || (
            <svg className="w-10 h-10 stroke-current stroke-1" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      )}

      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-heading font-semibold uppercase tracking-wider bg-[#062A4F]/90 backdrop-blur-xs text-white rounded shadow-sm">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`px-5 pt-5 pb-2 ${className}`.trim()}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`px-5 py-2 last:pb-5 flex-grow text-[#64748B] text-sm leading-relaxed ${className}`.trim()}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`px-5 pt-3 pb-5 mt-auto border-t border-slate-100 flex items-center justify-between ${className}`.trim()}>{children}</div>;
}

export default Card;
