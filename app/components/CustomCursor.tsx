'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let tx = -100, ty = -100, cx = -100, cy = -100;
    const LERP = 0.55;
    let raf = 0;

    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const onDown = () => cursor.classList.add('is-down');
    const onUp = () => cursor.classList.remove('is-down');
    const onMouseLeave = () => { cursor.style.opacity = '0'; };
    const onMouseEnter = () => { cursor.style.opacity = '1'; };

    const HOVER_SEL = 'a, button, [role="button"], summary, label, .toggle, input[type="range"], input[type="checkbox"]';
    const TEXT_SEL = 'input:not([type="range"]):not([type="checkbox"]), textarea, [contenteditable="true"]';

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(TEXT_SEL)) cursor.classList.add('is-text');
      else if (t?.closest?.(HOVER_SEL)) cursor.classList.add('is-hover');
    };
    const onOut = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(TEXT_SEL)) cursor.classList.remove('is-text');
      if (t?.closest?.(HOVER_SEL)) cursor.classList.remove('is-hover');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('blur', onUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    function tick() {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;
      cursor!.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <div id="cursor" aria-hidden="true">
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </div>
  );
}
