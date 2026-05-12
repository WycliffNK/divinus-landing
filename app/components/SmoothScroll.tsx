'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide smooth scroll via Lenis, wired to drive GSAP's ScrollTrigger so
 * pinned and scrub animations stay in sync with the eased scroll position.
 *
 * Lenis is bypassed when the user prefers reduced motion — native scroll
 * remains, and GSAP ticker keeps ScrollTrigger updating on the rAF the
 * browser fires naturally.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
    });

    // Bridge: Lenis fires after each tick → tell ScrollTrigger to recompute.
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP drives Lenis' rAF so pinned scrubs stay perfectly in lockstep.
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return null;
}
