import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { NAV_LINKS } from '../data/navigation';
import { COMPANY_INFO } from '../data/company';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-shadow duration-200">
      {/* Top Corporate Strip for B2B Direct Access */}
      <div className="hidden lg:block bg-[#031B33] text-slate-300 text-xs py-2 px-6 border-b border-[#062A4F]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="font-medium">Complete Industrial & Fire Safety Solutions</span>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              Kalol, Gandhinagar, Gujarat
            </span>
          </div>
          <div className="flex items-center gap-6">
            Mobile No :
            <a
              href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-150"
            >
              <Phone className="w-3 h-3 text-[#D71920]" />
              <span>{COMPANY_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white border-b border-slate-200 ${isScrolled ? 'shadow-sm' : ''
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo variant="dark" size="md" />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-sm font-heading font-semibold transition-colors duration-150 relative ${isActive
                      ? 'text-[#D71920]'
                      : 'text-[#17202A] hover:text-[#062A4F]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#D71920] rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Action CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                className="p-2 text-[#062A4F] hover:bg-slate-100 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#062A4F]"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white shadow-lg animate-in fade-in duration-200">
            <div className="px-4 pt-3 pb-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-md text-base font-heading font-medium transition-colors ${isActive
                      ? 'bg-[#F5F7FA] text-[#D71920] font-semibold border-l-4 border-[#D71920]'
                      : 'text-[#17202A] hover:bg-slate-50 hover:text-[#062A4F]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-slate-100 mt-3 space-y-3">
                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={ArrowRight}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a Quote
                </Button>

                <div className="text-xs text-[#64748B] text-center pt-2 space-y-1">
                  <div>Direct Inquiries:</div>
                  <div className="flex justify-center gap-3 font-semibold text-[#062A4F]">
                    <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}>
                      {COMPANY_INFO.phonePrimary}
                    </a>
                    <span>•</span>
                    <a href={`tel:${COMPANY_INFO.phoneSecondary.replace(/\s+/g, '')}`}>
                      {COMPANY_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
