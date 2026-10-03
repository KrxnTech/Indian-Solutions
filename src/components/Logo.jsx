import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * ISS Brand Logo Component
 * - 'dark' (Navbar / light background): Renders official ISS brand logo from /logo/logo-nav.png (fallback: /logo/logo.png)
 * - 'light' (Footer / dark background): Renders high-contrast SVG brand emblem & typography
 */
export default function Logo({ variant = 'dark', size = 'md', to = '/', className = '' }) {
  const isLight = variant === 'light';
  const [imgError, setImgError] = useState(false);

  // Height configurations
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-12 md:h-14',
    lg: 'h-14 sm:h-16',
  }[size] || 'h-11 sm:h-12 md:h-14';

  // Render the authentic logo from the /logo folder (both dark navbar and light footer)
  if (!imgError) {
    const logoImg = (
      <img
        src="/logo/logo-nav.png"
        onError={(e) => {
          // Fallback to original /logo/logo.png if logo-nav is missing, or fallback to SVG
          if (e.currentTarget.src.includes('logo-nav.png')) {
            e.currentTarget.src = '/logo/logo.png';
          } else {
            setImgError(true);
          }
        }}
        alt="Indian Safety Solution (ISS)"
        className={`${
          isLight ? 'h-11 sm:h-13' : heightClasses
        } w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
      />
    );

    const logoImgContent = isLight ? (
      <div className={`inline-flex items-center select-none group ${className}`}>
        <div className="bg-white px-3.5 py-2 rounded-xl shadow-md border border-white/20 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg inline-flex items-center">
          {logoImg}
        </div>
      </div>
    ) : (
      <div className={`flex items-center select-none group py-0.5 ${className}`}>
        {logoImg}
      </div>
    );

    if (to) {
      return (
        <Link
          to={to}
          className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F] rounded-lg"
          aria-label="Indian Safety Solution Home"
        >
          {logoImgContent}
        </Link>
      );
    }
    return logoImgContent;
  }

  // Fallback or Light Variant (for dark backgrounds like Footer)
  const svgLogoContent = (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Industrial Shield / Safety Emblem */}
      <div className="relative flex-shrink-0">
        <svg
          className={`${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'} transition-transform duration-200 group-hover:scale-105`}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer Shield */}
          <path
            d="M24 4L8 10V22C8 32.5 14.8 42.1 24 45C33.2 42.1 40 32.5 40 22V10L24 4Z"
            fill={isLight ? '#031B33' : '#062A4F'}
            stroke={isLight ? '#FFFFFF' : '#062A4F'}
            strokeWidth="1.5"
          />
          {/* Safety Yellow Accent Stripe */}
          <path
            d="M24 8L36 12.5V21C36 28.5 30.9 35.8 24 38.5V8Z"
            fill="#FFC400"
            fillOpacity="0.15"
          />
          {/* Safety Red Fire & Protection Core Symbol */}
          <path
            d="M24 13L15 16.8V23.5C15 29.8 18.8 35.7 24 37.8C29.2 35.7 33 29.8 33 23.5V16.8L24 13Z"
            fill="#D71920"
          />
          {/* Stylized ISS Flame / Cross Geometry */}
          <path
            d="M24 17V33M18 25H30"
            stroke="#FFFFFF"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="25" r="2" fill="#FFC400" />
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-heading font-extrabold tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } ${isLight ? 'text-white' : 'text-[#062A4F]'}`}
          >
            ISS
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D71920]" />
          <span
            className={`font-heading font-semibold text-xs tracking-wider uppercase ${
              isLight ? 'text-[#FFC400]' : 'text-[#D71920]'
            }`}
          >
            Safety
          </span>
        </div>
        <span
          className={`font-heading font-semibold tracking-wider uppercase ${
            size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[10px]'
          } ${isLight ? 'text-slate-300' : 'text-[#64748B]'}`}
        >
          Indian Safety Solution
        </span>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F] rounded"
        aria-label="Indian Safety Solution Home"
      >
        {svgLogoContent}
      </Link>
    );
  }

  return svgLogoContent;
}
