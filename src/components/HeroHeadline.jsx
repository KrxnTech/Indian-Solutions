import React, { useState, useEffect } from 'react';

/**
 * Structured tokens for the headline:
 * "Complete Industrial & Fire Safety Solutions"
 * Preserves exact spans, yellow emphasis on "Fire Safety",
 * natural word wrapping without layout shifts, and responsive typing reveal.
 */
const HEADLINE_DATA = [
  {
    type: 'white',
    className: 'text-white',
    words: ['Complete', 'Industrial', '&'],
  },
  {
    type: 'yellow',
    className: 'text-[#FFC400]',
    words: ['Fire', 'Safety'],
  },
  {
    type: 'white',
    className: 'text-white',
    words: ['Solutions'],
  },
];

// Pre-compute indexed characters with word-level grouping
let charCounter = 0;
const PROCESSED_SEGMENTS = HEADLINE_DATA.map((segment) => ({
  ...segment,
  words: segment.words.map((word) => {
    const chars = word.split('').map((char) => ({
      char,
      index: charCounter++,
    }));
    return { word, chars };
  }),
}));
const TOTAL_CHARS = charCounter; // 43 characters

export default function HeroHeadline() {
  const [revealedCount, setRevealedCount] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return TOTAL_CHARS;
        }
      } catch {
        // Continue to default
      }
    }
    return 0;
  });

  const [showCursor, setShowCursor] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return false;
        }
      } catch {
        // Continue to default
      }
    }
    return true;
  });

  useEffect(() => {
    // If reduced motion is requested, state is already initialized to full reveal
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
    } catch {
      // Continue
    }

    // Typing interval: ~48ms per character (total ~2.1s for 43 characters)
    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= TOTAL_CHARS) {
          clearInterval(interval);
          // Keep subtle cursor for 400ms after typing finishes, then dismiss
          setTimeout(() => {
            setShowCursor(false);
          }, 400);
          return TOTAL_CHARS;
        }
        return prev + 1;
      });
    }, 48);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <h1
      className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight select-none"
      aria-label="Complete Industrial & Fire Safety Solutions"
    >
      <span aria-hidden="true">
        {PROCESSED_SEGMENTS.map((segment, segIdx) => (
          <span key={segIdx} className={segment.className}>
            {segment.words.map((wordObj, wordIdx) => {
              // Need a leading space before segment words if not the very first word
              const isAbsoluteFirstWord = segIdx === 0 && wordIdx === 0;

              return (
                <React.Fragment key={wordIdx}>
                  {!isAbsoluteFirstWord && (
                    <span className="inline"> </span>
                  )}
                  <span className="inline-block whitespace-nowrap">
                    {wordObj.chars.map(({ char, index }) => {
                      const isRevealed = index < revealedCount;
                      const isCurrentChar = index === revealedCount - 1;
                      const isFirstCharBeforeTyping = index === 0 && revealedCount === 0;

                      return (
                        <span
                          key={index}
                          className="relative inline-block transition-opacity duration-150"
                          style={{ opacity: isRevealed ? 1 : 0 }}
                        >
                          {/* Cursor before typing begins */}
                          {isFirstCharBeforeTyping && showCursor && (
                            <span
                              className="absolute right-full top-[12%] bottom-[12%] w-[2px] sm:w-[2.5px] bg-[#FFC400] animate-hero-caret pointer-events-none rounded-xs"
                              aria-hidden="true"
                            />
                          )}

                          {char}

                          {/* Cursor following the actively revealed character */}
                          {isCurrentChar && showCursor && (
                            <span
                              className="absolute left-full top-[12%] bottom-[12%] w-[2px] sm:w-[2.5px] bg-[#FFC400] animate-hero-caret pointer-events-none rounded-xs"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      );
                    })}
                  </span>
                </React.Fragment>
              );
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}
