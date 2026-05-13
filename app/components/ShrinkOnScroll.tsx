'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps an image (or any block) that should start full-bleed (edge to edge
 * with the viewport) when it enters the viewport and contract back into the
 * parent container's width as the user scrolls through the section.
 *
 * Uses negative margin to break out of any constrained ancestor; GSAP +
 * ScrollTrigger scrubs the margin from the breakout value back to 0.
 */
export default function ShrinkOnScroll({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          borderRadius: '0px',
        },
        {
          marginLeft: 0,
          marginRight: 0,
          borderRadius: '6px',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.5,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
