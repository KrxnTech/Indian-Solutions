import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function IntroVideo({ onComplete }) {
  // Default sound to ON (unmuted)
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasControlsFadedIn, setHasControlsFadedIn] = useState(false);

  const videoRef = useRef(null);
  const completedRef = useRef(false);

  // Transition handler when video completes or is skipped
  const finishVideo = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Immediately pause and clean up video resources
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      } catch {
        // ignore cleanup errors on tear down
      }
    }

    // Immediately notify parent to switch to welcome stage without exposing background
    if (typeof onComplete === 'function') {
      onComplete();
    }
  }, [onComplete]);

  // Force sound unmuted helper
  const activateSound = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  }, []);

  // Controls delay for cinematic immersion
  useEffect(() => {
    const controlsTimer = setTimeout(() => {
      setHasControlsFadedIn(true);
    }, 400);

    return () => {
      clearTimeout(controlsTimer);
    };
  }, []);

  // Automatic video playback with SOUND ALWAYS ON
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cleanupListeners = null;

    const startPlayWithSound = async () => {
      try {
        // ALWAYS try unmuted at full volume first
        video.muted = false;
        video.volume = 1.0;
        await video.play();
        setIsMuted(false);
      } catch (err) {
        console.warn('Autoplay policy required gesture for sound:', err);
        // If unmuted autoplay blocked by browser policy on cold start, play muted temporarily
        try {
          video.muted = true;
          setIsMuted(true);
          await video.play();
        } catch (silentErr) {
          console.warn('Muted autoplay also blocked:', silentErr);
        }

        // Arm listeners so ANY first user gesture instantly activates sound
        const handleFirstInteraction = () => {
          activateSound();
          removeListeners();
        };

        const removeListeners = () => {
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
          window.removeEventListener('pointerdown', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
        };

        cleanupListeners = removeListeners;

        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('touchstart', handleFirstInteraction, { once: true });
        window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });
      }
    };

    startPlayWithSound();

    // Safety fallback: if video stalls or takes abnormally long, don't trap the user
    const safetyTimeout = setTimeout(() => {
      if (video.paused && video.currentTime === 0 && !completedRef.current) {
        console.info('Intro video fallback triggered to proceed.');
        finishVideo();
      }
    }, 12000);

    return () => {
      clearTimeout(safetyTimeout);
      if (cleanupListeners) cleanupListeners();
    };
  }, [finishVideo, activateSound]);

  // Clicking anywhere on the video overlay activates sound if muted
  const handleOverlayClick = (e) => {
    if (e.target.closest('#skip-video-btn')) return;
    activateSound();
  };

  // Video time update for progress indicator
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  // When video completes naturally -> advance to Stage 2
  const handleVideoEnded = () => {
    finishVideo();
  };

  // Video error fallback
  const handleVideoError = () => {
    console.warn('Intro video error, advancing to welcome screen.');
    finishVideo();
  };

  return (
    <div
      id="cinematic-intro-overlay"
      aria-label="Cinematic Intro Video"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
      }}
      className="w-full h-full select-none cursor-pointer overflow-hidden"
    >
      {/* HTML5 Video Element - Fullscreen, Cover, Centered */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        preload="auto"
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        className="w-full h-full object-cover pointer-events-none"
      >
        <source src="/assets/video/intro-video.mp4" type="video/mp4" />
        <source src="/gemini_generated_video_96a3aea0.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Top Controls Bar */}
      <div
        style={{
          paddingTop: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))',
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left, 1.5rem))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
        }}
        className={`absolute top-0 left-0 right-0 flex items-center justify-between z-20 pointer-events-auto transition-opacity duration-500 ease-in-out ${
          hasControlsFadedIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Sound Status Badge / Prompt */}
        {isMuted ? (
          <button
            type="button"
            id="intro-unmute-btn"
            onClick={(e) => {
              e.stopPropagation();
              activateSound();
            }}
            title="Click to turn sound on"
            aria-label="Click to turn sound on"
            className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-red-600/90 hover:bg-red-600 active:scale-95 text-white transition-all duration-300 shadow-xl shadow-red-950/50 cursor-pointer animate-pulse"
          >
            <VolumeX className="w-4 h-4 text-white" />
            <span>Click for Sound 🔊</span>
          </button>
        ) : (
          <div
            id="intro-sound-active-badge"
            className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-black/50 backdrop-blur-md border border-emerald-500/40 text-emerald-400 shadow-xl pointer-events-none"
          >
            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-semibold">Sound ON</span>
          </div>
        )}

        {/* Skip Video → Button */}
        <button
          type="button"
          id="skip-video-btn"
          onClick={(e) => {
            e.stopPropagation();
            finishVideo();
          }}
          title="Skip video and proceed"
          aria-label="Skip Video"
          className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-black/40 hover:bg-black/70 active:scale-95 backdrop-blur-md border border-white/20 hover:border-white/50 text-white/90 hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
        >
          <span>Skip Video</span>
          <span
            className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </div>

      {/* Subtle Bottom Progress Bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20 pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 transition-all duration-150 ease-linear shadow-[0_0_8px_rgba(215,25,32,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
