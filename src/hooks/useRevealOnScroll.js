import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lightweight, accessible scroll-reveal using native IntersectionObserver.
 * - Triggers once when ~15% of element enters viewport.
 * - Respects prefers-reduced-motion immediately.
 * - Includes failure-safety fallback timer so content is never stuck hidden.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - Viewport intersection ratio
 * @param {string} [options.rootMargin='0px 0px -40px 0px'] - Viewport margin offset
 * @param {boolean} [options.triggerOnce=true] - Only animate on first reveal
 * @returns {[React.RefObject, boolean]} [ref, isRevealed]
 */
export function useRevealOnScroll({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    // Immediate fallback for SSR, missing IntersectionObserver, or reduced motion
    if (typeof window === 'undefined') return true;
    if (!('IntersectionObserver' in window)) return true;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    } catch {
      // Ignore media query error and proceed
    }
    return false;
  });

  useEffect(() => {
    if (isRevealed && triggerOnce) return;

    const element = ref.current;
    if (!element) return;

    // Safety fallback: guarantee visibility after 2.5s if intersection didn't fire
    let safetyTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 2500);

    let observer = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsRevealed(true);
              clearTimeout(safetyTimer);
              if (triggerOnce && observer && element) {
                observer.unobserve(element);
                observer.disconnect();
              }
            } else if (!triggerOnce) {
              setIsRevealed(false);
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
    } catch {
      // In case IntersectionObserver throws, trigger async fallback reveal
      clearTimeout(safetyTimer);
      safetyTimer = setTimeout(() => {
        setIsRevealed(true);
      }, 0);
    }

    return () => {
      clearTimeout(safetyTimer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, isRevealed]);

  return [ref, isRevealed];
}

export default useRevealOnScroll;
