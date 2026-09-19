import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button Component adhering to ISS Design System tokens:
 * - Primary: Red (#D71920)
 * - Secondary: Navy (#062A4F)
 * - Outline: Transparent with Navy border
 * - Ghost: Transparent with subtle background on hover
 * Supports rendering as a standard button or React Router Link if 'to' is specified.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles =
    'group inline-flex items-center justify-center font-heading font-semibold text-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none rounded-md';

  const variantStyles = {
    primary:
      'bg-[#D71920] text-white hover:bg-[#B7151B] active:bg-[#9B1217] focus-visible:ring-[#D71920] shadow-sm',
    secondary:
      'bg-[#062A4F] text-white hover:bg-[#031B33] active:bg-[#021222] focus-visible:ring-[#062A4F] shadow-sm',
    outline:
      'bg-transparent border border-[#062A4F] text-[#062A4F] hover:bg-[#062A4F] hover:text-white active:bg-[#031B33] focus-visible:ring-[#062A4F]',
    ghost:
      'bg-transparent text-[#17202A] hover:bg-slate-100 hover:text-[#062A4F] active:bg-slate-200 focus-visible:ring-[#062A4F]',
    accent:
      'bg-[#FFC400] text-[#031B33] hover:bg-[#E6B000] active:bg-[#CC9D00] focus-visible:ring-[#FFC400] font-bold shadow-sm',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 min-h-[34px] gap-1.5',
    md: 'text-sm px-5 py-2.5 min-h-[42px] gap-2',
    lg: 'text-base px-6 py-3.5 min-h-[50px] gap-2.5',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${
    sizeStyles[size] || sizeStyles.md
  } ${className}`.trim();

  const iconElement = Icon ? (
    <Icon
      className={`${
        size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
      } flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5`}
      aria-hidden="true"
    />
  ) : null;

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {iconPosition === 'left' && iconElement}
        <span>{children}</span>
        {iconPosition === 'right' && iconElement}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {iconPosition === 'left' && iconElement}
        <span>{children}</span>
        {iconPosition === 'right' && iconElement}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {iconPosition === 'right' && iconElement}
    </button>
  );
}
