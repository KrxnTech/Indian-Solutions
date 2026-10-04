import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function IntroVideo({ onComplete }) {
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

  // Controls delay for cinematic immersion
  useEffect(() => {
    const controlsTimer = setTimeout(() => {
      setHasControlsFadedIn(true);
    }, 400);

    return () => {
      clearTimeout(controlsTimer);
    };
  }, []);

  // Automatic video playback with audio enabled by default
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Autoplay with audio was restricted by browser policy:', err);
      }
    };

    startPlayback();

    // Fallback: if browser policy completely blocks autoplay (stuck at 0s while paused),
    // proceed to welcome screen after a short wait so intro flow is not broken
    const safetyTimeout = setTimeout(() => {
      if (video.paused && video.currentTime === 0 && !completedRef.current) {
        console.info('Autoplay restricted by browser policy, continuing to welcome screen.');
        finishVideo();
      }
    }, 4000);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [finishVideo]);

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
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
      }}
      className="w-full h-full select-none overflow-hidden cursor-default"
      onClick={() => {
        if (videoRef.current && videoRef.current.paused && !completedRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
    >
      {/* HTML5 Video Element - Fullscreen, Cover, Centered, Autoplay with Audio */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
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

      {/* Cinematic Top Controls Bar: No Sound Toggle UI */}
      <div
        style={{
          paddingTop: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))',
          paddingLeft: 'max(1.5rem, env(safe-area-inset-left, 1.5rem))',
          paddingRight: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
        }}
        className={`absolute top-0 left-0 right-0 flex items-center justify-end z-20 pointer-events-auto transition-opacity duration-500 ease-in-out ${
          hasControlsFadedIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Subtle Skip Video → Button */}
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
