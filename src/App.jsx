import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import IntroVideo from './components/IntroVideo';
import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  // Single intro stage flow: "video" -> "welcome" -> "completed"
  const [introStage, setIntroStage] = useState('video');
  const [isRevealingWebsite, setIsRevealingWebsite] = useState(false);

  // Lock scrolling on document.body during all intro stages
  useEffect(() => {
    if (introStage !== 'completed') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [introStage]);

  // Transition from Welcome Screen to Main Website
  const handleEnterWebsite = () => {
    setIsRevealingWebsite(true);
    setTimeout(() => {
      setIntroStage('completed');
    }, 750);
  };

  return (
    <BrowserRouter>
      {/* Fullscreen Master Fixed Overlay: Prevents ANY visual flash of the main website */}
      {introStage !== 'completed' && (
        <div
          id="intro-master-container"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            backgroundColor: '#05070A',
          }}
          className={`transition-opacity duration-750 ease-out select-none ${
            isRevealingWebsite ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {introStage === 'video' && (
            <IntroVideo onComplete={() => setIntroStage('welcome')} />
          )}

          {introStage === 'welcome' && (
            <WelcomeScreen onEnter={handleEnterWebsite} />
          )}
        </div>
      )}

      {/* Main Website: Permanently mounted underneath, revealed only when ENTER is clicked */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:category/:slug" element={<ProductDetail />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          {/* Dedicated 404 handler for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
