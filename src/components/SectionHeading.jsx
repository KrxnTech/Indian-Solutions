import React from 'react';

/**
 * Reusable SectionHeading Component
 * Implements strict typographic hierarchy:
 * 1. Eyebrow Badge (Red/Yellow industrial safety accent)
 * 2. Large Heading (Montserrat bold)
 * 3. Short description (Inter readable body)
 */
export default function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  inverted = false,
  className = '',
}) {
  const isCentered = align === 'center';

  return (
    <div
      className={`mb-10 md:mb-14 ${isCentered ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`.trim()}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 mb-3 ${isCentered ? 'justify-center' : 'justify-start'}`}>
          <span className="w-2 h-2 rounded-full bg-[#D71920]" aria-hidden="true" />
          <span
            className={`font-heading text-xs uppercase tracking-widest font-bold ${
              inverted ? 'text-[#FFC400]' : 'text-[#D71920]'
            }`}
          >
            {badge}
          </span>
          <span className="w-6 h-px bg-slate-300" aria-hidden="true" />
        </div>
      )}

      {title && (
        <h2
          className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
            inverted ? 'text-white' : 'text-[#062A4F]'
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            inverted ? 'text-slate-300' : 'text-[#64748B]'
          } ${isCentered ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
