import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PAGE_METADATA = {
  '/': {
    title: 'Indian Safety Solution | Industrial & Fire Safety Solutions',
    description:
      'Indian Safety Solution (ISS) provides complete industrial safety and fire protection equipment, PPE, and project execution across Gujarat and India.',
  },
  '/about': {
    title: 'About Indian Safety Solution | ISS',
    description:
      'Learn about Indian Safety Solution (ISS), based in Kalol, Gujarat, providing dedicated industrial safety products and turnkey fire fighting project work.',
  },
  '/services': {
    title: 'Safety Services | Indian Safety Solution',
    description:
      'Explore the 8 documented industrial safety services offered by ISS, from fire fighting project work and hydrant systems to LOTO and sign board fabrication.',
  },
  '/products': {
    title: 'Product Catalogue | Indian Safety Solution',
    description:
      'Explore the verified industrial safety product catalogue by Indian Safety Solution, covering certified PPE, fire protection systems, fall protection, and facility signs.',
  },
  '/projects': {
    title: 'Projects & Clientele | Indian Safety Solution',
    description:
      'Industrial safety execution capabilities, hydrant piping networks, alarm systems, and facility signage installations by Indian Safety Solution.',
  },
  '/contact': {
    title: 'Contact Indian Safety Solution',
    description:
      'Contact Indian Safety Solution in Kalol, Gandhinagar, Gujarat for industrial safety product quotations and fire fighting project inquiries.',
  },
};

export default function RootLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo(0, 0);
    }

    const meta = PAGE_METADATA[pathname];
    if (meta) {
      document.title = meta.title;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', meta.description);
      }
    } else if (pathname.startsWith('/products/')) {
      // ProductDetail dynamically sets product-specific title and description
    } else {
      // Unknown / 404 routes
      document.title = 'Page Not Found | Indian Safety Solution';
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', 'The requested page could not be found on Indian Safety Solution.');
      }
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#17202A] selection:bg-[#062A4F] selection:text-white">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
