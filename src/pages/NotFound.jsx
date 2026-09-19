import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Home, Phone } from 'lucide-react';
import Button from '../components/Button';
import { COMPANY_INFO } from '../data/company';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found | Indian Safety Solution';
  }, []);

  return (
    <div className="py-16 sm:py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        {/* Error Icon */}
        <div className="w-20 h-20 rounded-2xl bg-[#062A4F]/5 border border-[#062A4F]/15 flex items-center justify-center mx-auto text-[#D71920] shadow-xs">
          <ShieldAlert className="w-10 h-10" aria-hidden="true" />
        </div>

        {/* 404 Headline */}
        <div className="space-y-2">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#D71920]">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#062A4F] tracking-tight">
            Looking for Safety Equipment or Project Details?
          </h1>
          <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist, has been relocated, or the URL was entered incorrectly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            to="/products"
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
          >
            Browse Product Catalogue
          </Button>

          <Button
            to="/"
            variant="outline"
            size="md"
            icon={Home}
            iconPosition="left"
          >
            Return to Homepage
          </Button>
        </div>

        {/* Direct Contact Assistance Strip */}
        <div className="pt-8 border-t border-slate-200 text-xs text-[#64748B]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Phone className="w-3.5 h-3.5 text-[#D71920]" />
            <span className="font-semibold text-[#062A4F]">Need assistance finding an item or BOQ quotation?</span>
          </div>
          <p>
            Call our Kalol sales desk directly at{' '}
            <a
              href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="text-[#062A4F] font-bold hover:text-[#D71920] underline transition-colors"
            >
              {COMPANY_INFO.phonePrimary}
            </a>{' '}
            or visit our{' '}
            <Link to="/contact" className="text-[#D71920] font-bold underline hover:text-[#991B1B]">
              Contact Page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
