import React from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

/**
 * Reusable RevealOnScroll Component
 * Wraps sections or cards with subtle, accessible opacity + translateY reveal.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {number} [props.delay=0] - Delay in ms before transition starts
 * @param {number} [props.y=18] - Vertical translation in px (16-24px recommended)
 * @param {string|React.ElementType} [props.as='div'] - Element tag to render
 * @param {number} [props.threshold=0.15] - Viewport threshold
 */
export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  y = 18,
  as: Component = 'div',
  threshold = 0.15,
  style = {},
  ...props
}) {
  const [ref, isRevealed] = useRevealOnScroll({ threshold });

  const dynamicStyle = {
    ...style,
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
    ...(y !== 18 && !isRevealed ? { transform: `translateY(${y}px)` } : {}),
  };

  return (
    <Component
      ref={ref}
      className={`reveal-base ${isRevealed ? 'reveal-visible' : ''} ${className}`.trim()}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
