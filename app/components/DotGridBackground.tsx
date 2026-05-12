'use client';

import { useEffect, useRef } from 'react';
import {
  CFG, computeIntensity, isOverText, rebuildGradientStops, sampleGradient, type Mouse,
} from '../lib/dotgrid-shared';

export default function DotGridBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0;
    let dots: { ox: number; oy: number; x: number; y: number; vx: number; vy: number; sf: number; af: number; }[] = [];
    const mouse: Mouse = { x: -9999, y: -9999, active: false, lastMove: 0, overText: false };
    let intensity = 0;
    let textFactor = 0;
    let running = false;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      draw(true);
    }
    function buildDots() {
      dots = [];
      const SP = CFG.spacing;
      const cols = Math.floor(w / SP) + 1;
      const rows = Math.floor(h / SP) + 1;
      const offX = (w - (cols - 1) * SP) / 2;
      const offY = (h - (rows - 1) * SP) / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = offX + i * SP;
          const y = offY + j * SP;
          dots.push({
            ox: x, oy: y, x, y, vx: 0, vy: 0,
            sf: 1 - Math.random() * CFG.sizeRange,
            af: 1 - Math.random() * CFG.alphaRange,
          });
        }
      }
    }
    function step() {
      const R = CFG.radius;
      const r2 = R * R;
      const I = intensity;
      for (const d of dots) {
        if (I > 0) {
          const dx = d.ox - mouse.x;
          const dy = d.oy - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2 && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const falloff = 1 - dist / R;
            const force = falloff * falloff * CFG.push * I;
            d.vx += (dx / dist) * force * CFG.impulse;
            d.vy += (dy / dist) * force * CFG.impulse;
          }
        }
        d.vx += (d.ox - d.x) * CFG.spring;
        d.vy += (d.oy - d.y) * CFG.spring;
        d.vx *= CFG.friction;
        d.vy *= CFG.friction;
        d.x += d.vx;
        d.y += d.vy;
      }
    }
    function isSettled() {
      for (const d of dots) {
        if (Math.abs(d.vx) > 0.05 || Math.abs(d.vy) > 0.05) return false;
        if (Math.abs(d.x - d.ox) > 0.1 || Math.abs(d.y - d.oy) > 0.1) return false;
      }
      return true;
    }
    function draw(rest: boolean) {
      ctx!.clearRect(0, 0, w, h);
      if (!CFG.bgEnabled) return;
      const R = CFG.radius;
      const r2 = R * R;
      const baseAlpha = CFG.dotAlpha;
      const glowMax = Math.min(1, CFG.glowAlpha);
      const I = rest ? 0 : intensity;
      const GR = CFG.radius * CFG.gradientSize;
      const useGradient = CFG.gradientEnabled && I > 0;
      if (useGradient) rebuildGradientStops();
      const targetTF = mouse.overText ? 1 : 0;
      textFactor += (targetTF - textFactor) * 0.18;
      if (Math.abs(targetTF - textFactor) < 0.005) textFactor = targetTF;
      const TF = textFactor;
      for (const d of dots) {
        let radius = CFG.dotSize;
        let alpha = baseAlpha;
        if (I > 0) {
          const dx = d.ox - mouse.x;
          const dy = d.oy - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2) {
            const t = 1 - Math.sqrt(dist2) / R;
            radius = CFG.dotSize + t * CFG.hoverGrowth * I;
            alpha = baseAlpha + (glowMax - baseAlpha) * t * I;
          }
        }
        let r = 245, g = 245, b = 245;
        if (useGradient) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GR) {
            const t = dist / GR;
            const sample = sampleGradient(t);
            if (sample) {
              const tR = sample[0] + (10 - sample[0]) * TF;
              const tG = sample[1] + (10 - sample[1]) * TF;
              const tB = sample[2] + (10 - sample[2]) * TF;
              const fade = 1 - t;
              const blend = Math.min(1, fade * I * CFG.gradientAlpha * 2);
              r = 245 + (tR - 245) * blend;
              g = 245 + (tG - 245) * blend;
              b = 245 + (tB - 245) * blend;
              alpha = Math.min(1, alpha + blend * 0.7);
            }
          }
        }
        const fr = radius * d.sf;
        const fa = alpha * d.af;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${fa})`;
        ctx!.arc(d.x, d.y, fr, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    function loop() {
      intensity = computeIntensity(mouse, CFG.idleMs);
      step();
      draw(false);
      const settled = isSettled();
      const targetTF = mouse.overText ? 1 : 0;
      const tfSettled = Math.abs(textFactor - targetTF) < 0.005;
      if (settled && intensity === 0 && tfSettled) {
        running = false;
        draw(true);
        return;
      }
      requestAnimationFrame(loop);
    }
    function start() {
      if (running || reduceMotion) {
        if (reduceMotion) draw(true);
        return;
      }
      if (!CFG.bgEnabled) return;
      running = true;
      requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.lastMove = performance.now();
      mouse.overText = isOverText(e.target, e.clientX, e.clientY);
      start();
    };
    const onLeave = () => { mouse.active = false; };
    const onBlur = () => { mouse.active = false; };
    const onResize = () => resize();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onBlur);
    window.addEventListener('resize', onResize);
    resize();

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas id="bg-dotgrid" ref={ref} aria-hidden="true" />;
}
