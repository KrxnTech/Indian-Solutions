import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Shield } from 'lucide-react';

const LINE_1_TEXT = 'INDIAN SAFETY SOLUTION';
const LINE_2_TEXT = 'Protecting People Protecting Industry';
const LINE_3_TEXT = 'Fire & Industrial Safety Solution';

// Generate 24 embers with randomized positions and animation characteristics
const GENERATED_EMBERS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: Math.floor(Math.random() * 96) + 2,
  size: Math.floor(Math.random() * 3) + 2,
  duration: Math.floor(Math.random() * 5) + 5,
  delay: parseFloat((Math.random() * 4).toFixed(1)),
  color: i % 3 === 0 ? '#D71920' : i % 3 === 1 ? '#FFC400' : '#FF7043',
  opacity: parseFloat((Math.random() * 0.5 + 0.3).toFixed(2)),
}));

export default function WelcomeScreen({ onEnter }) {
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [displayedLine3, setDisplayedLine3] = useState('');

  const [isLine1Done, setIsLine1Done] = useState(false);
  const [isLine2Done, setIsLine2Done] = useState(false);
  const [isLine3Done, setIsLine3Done] = useState(false);

  const audioCtxRef = useRef(null);
  const exitTriggeredRef = useRef(false);

  // Initialize Web Audio API for soft tactile typing clicks
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => { });
    }
    return audioCtxRef.current;
  }, []);

  // Soft mechanical keyboard click sound via Web Audio API
  const playTypingClick = useCallback(
    (char = '') => {
      if (char === ' ') return; // silent on spacebar for realistic cadence

      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.value = 1200 + Math.random() * 400;
        filter.Q.value = 2.5;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450 + Math.random() * 350, ctx.currentTime);

        gain.gain.setValueAtTime(0.045, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.038);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } catch {
        // Safe fallback
      }
    },
    [getAudioContext]
  );

  // Trigger exit to reveal existing website
  const handleExit = useCallback(() => {
    if (exitTriggeredRef.current) return;
    exitTriggeredRef.current = true;

    if (typeof onEnter === 'function') {
      onEnter();
    }
  }, [onEnter]);

  // Optional keyboard / click listener: user can skip wait if desired
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleExit]);

  // Typing Sequence Logic
  useEffect(() => {
    let timer;

    // STEP 1: Type LINE 1 ("INDIAN SAFETY SOLUTION")
    if (displayedLine1.length < LINE_1_TEXT.length) {
      timer = setTimeout(() => {
        const nextChar = LINE_1_TEXT[displayedLine1.length];
        setDisplayedLine1((prev) => prev + nextChar);
        playTypingClick(nextChar);
      }, 70);
      return () => clearTimeout(timer);
    } else if (!isLine1Done) {
      timer = setTimeout(() => {
        setIsLine1Done(true);
      }, 350);
      return () => clearTimeout(timer);
    }

    // STEP 2: Type LINE 2 ("Protecting People Protecting Industry")
    if (isLine1Done && displayedLine2.length < LINE_2_TEXT.length) {
      timer = setTimeout(() => {
        const nextChar = LINE_2_TEXT[displayedLine2.length];
        setDisplayedLine2((prev) => prev + nextChar);
        playTypingClick(nextChar);
      }, 45);
      return () => clearTimeout(timer);
    } else if (isLine1Done && !isLine2Done) {
      timer = setTimeout(() => {
        setIsLine2Done(true);
      }, 300);
      return () => clearTimeout(timer);
    }

    // STEP 3: Type LINE 3 ("Fire & Industrial Safety Solution")
    if (isLine2Done && displayedLine3.length < LINE_3_TEXT.length) {
      timer = setTimeout(() => {
        const nextChar = LINE_3_TEXT[displayedLine3.length];
        setDisplayedLine3((prev) => prev + nextChar);
        playTypingClick(nextChar);
      }, 40);
      return () => clearTimeout(timer);
    } else if (isLine2Done && !isLine3Done) {
      timer = setTimeout(() => {
        setIsLine3Done(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [
    displayedLine1,
    isLine1Done,
    displayedLine2,
    isLine2Done,
    displayedLine3,
    isLine3Done,
    playTypingClick,
  ]);

  // AUTOMATIC TRANSITION:
  // Starts ONLY after typing and branding animations complete
  // Waits 3.5 seconds, then automatically triggers smooth reveal of the main website
  useEffect(() => {
    if (!isLine3Done) return;

    const autoProceedTimer = setTimeout(() => {
      handleExit();
    }, 3500);

    return () => clearTimeout(autoProceedTimer);
  }, [isLine3Done, handleExit]);

  return (
    <div
      id="cinematic-welcome-screen"
      role="dialog"
      aria-label="Welcome to Indian Safety Solution"
      aria-modal="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#05070A',
      }}
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Inline styles for keyframe animations */}
      <style>{`
        @keyframes emberRise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-90vh) translateX(25px);
            opacity: 0;
          }
        }
        @keyframes smokeLeftBillow {
          0%, 100% {
            transform: translateX(-5%) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translateX(6%) scale(1.1);
            opacity: 0.55;
          }
        }
        @keyframes smokeRightBillow {
          0%, 100% {
            transform: translateX(5%) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translateX(-6%) scale(1.1);
            opacity: 0.55;
          }
        }
        @keyframes subtlePulseGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: cursorBlink 750ms infinite;
        }
      `}</style>

      {/* Atmospheric Radial Gradient Core */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(215, 25, 32, 0.16) 0%, rgba(255, 196, 0, 0.05) 35%, rgba(6, 42, 79, 0.25) 65%, #05070A 100%)',
        }}
      />

      {/* Subtle Industrial Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Cinematic Smoke Effect - Left Side */}
      <div
        aria-hidden="true"
        className="absolute -left-20 top-0 bottom-0 w-2/3 pointer-events-none mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at 15% 50%, rgba(255, 255, 255, 0.09) 0%, rgba(215, 25, 32, 0.06) 40%, transparent 70%)',
          filter: 'blur(35px)',
          animation: 'smokeLeftBillow 12s ease-in-out infinite',
        }}
      />

      {/* Cinematic Smoke Effect - Right Side */}
      <div
        aria-hidden="true"
        className="absolute -right-20 top-0 bottom-0 w-2/3 pointer-events-none mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at 85% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 196, 0, 0.05) 40%, transparent 70%)',
          filter: 'blur(35px)',
          animation: 'smokeRightBillow 14s ease-in-out infinite',
        }}
      />

      {/* Tiny Rising Embers */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {GENERATED_EMBERS.map((ember) => (
          <div
            key={ember.id}
            className="absolute rounded-full"
            style={{
              left: `${ember.left}%`,
              bottom: '-10px',
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              backgroundColor: ember.color,
              boxShadow: `0 0 ${ember.size * 3}px ${ember.color}`,
              animation: `emberRise ${ember.duration}s infinite linear ${ember.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Top Header: Unobtrusive Skip Intro */}
      <header
        style={{
          paddingTop: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))',
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left, 1.5rem))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
        }}
        className="absolute top-0 left-0 right-0 flex items-center justify-end z-20 pointer-events-auto"
      >
        {/* Subtle Skip Intro button */}
        <button
          type="button"
          id="skip-welcome-btn"
          onClick={handleExit}
          title="Skip intro and view website"
          aria-label="Skip Intro"
          className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-black/40 hover:bg-black/70 active:scale-95 backdrop-blur-md border border-white/20 hover:border-white/50 text-white/90 hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
        >
          <span>Skip Intro</span>
          <span
            className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </header>

      {/* Purely Cinematic Content: No Buttons, No CTAs */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        {/* Safety Crest Emblem */}
        <div
          className="mb-6 relative flex items-center justify-center"
          style={{ animation: 'subtlePulseGlow 4s ease-in-out infinite' }}
        >
          <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl scale-150" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#062A4F] to-[#031B33] border border-red-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(215,25,32,0.35)]">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
          </div>
        </div>

        {/* LINE 1: INDIAN SAFETY SOLUTION */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider sm:tracking-widest uppercase text-white min-h-[1.3em] flex items-center justify-center flex-wrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          <span className="bg-gradient-to-r from-white via-slate-100 to-white/90 bg-clip-text text-transparent">
            {displayedLine1}
          </span>
          {!isLine1Done && (
            <span
              className="inline-block w-1 sm:w-1.5 h-8 sm:h-12 ml-2 bg-red-600 cursor-blink align-middle"
              aria-hidden="true"
            />
          )}
        </h1>

        {/* LINE 2: Protecting People Protecting Industry */}
        <div className="mt-4 sm:mt-5 min-h-[1.5em] flex items-center justify-center">
          <p className="text-base sm:text-xl md:text-2xl font-medium tracking-wide text-slate-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {displayedLine2}
            {isLine1Done && !isLine2Done && (
              <span
                className="inline-block w-1 h-5 sm:h-6 ml-1.5 bg-amber-400 cursor-blink align-middle"
                aria-hidden="true"
              />
            )}
          </p>
        </div>

        {/* LINE 3: Fire & Industrial Safety Solution */}
        <div className="mt-3 sm:mt-4 min-h-[1.5em] flex flex-col items-center">
          {displayedLine3 && (
            <div className="flex items-center gap-3">
              <span className="h-px w-6 sm:w-10 bg-red-500/60" />
              <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-red-500">
                {displayedLine3}
                {isLine2Done && !isLine3Done && (
                  <span
                    className="inline-block w-1 h-4 ml-1 bg-red-500 cursor-blink align-middle"
                    aria-hidden="true"
                  />
                )}
              </p>
              <span className="h-px w-6 sm:w-10 bg-red-500/60" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
