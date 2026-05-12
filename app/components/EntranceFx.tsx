'use client';

import { useEffect } from 'react';

const FX = {
  ioMargin: '0px 0px -15% 0px',
  selector: 'p, h1, h2, h3, h4, h5, h6, article, dl > div, ul > li, form, .flex.flex-wrap > a, .flex.flex-wrap > span',
};

function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }

function parseCounter(text: string) {
  const match = text.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const cleaned = numStr.replace(/,/g, '');
  return {
    prefix, suffix,
    value: parseFloat(cleaned),
    decimals: (cleaned.split('.')[1] || '').length,
    hasComma: numStr.includes(','),
  };
}
function formatCounter(current: number, t: ReturnType<typeof parseCounter>) {
  if (!t) return '';
  if (t.decimals > 0) return t.prefix + current.toFixed(t.decimals) + t.suffix;
  const v = Math.round(current);
  return t.prefix + (t.hasComma ? v.toLocaleString() : v) + t.suffix;
}
function animateCounter(el: HTMLElement) {
  if ((el as HTMLElement & { __done?: boolean }).__done) return;
  (el as HTMLElement & { __done?: boolean }).__done = true;
  const template = parseCounter(el.textContent?.trim() || '');
  if (!template) return;
  const start = performance.now();
  el.textContent = formatCounter(0, template);
  function step() {
    const t = Math.min((performance.now() - start) / 1400, 1);
    const v = template!.value * easeOutQuart(t);
    el.textContent = formatCounter(v, template);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = formatCounter(template!.value, template);
  }
  requestAnimationFrame(step);
}

export default function EntranceFx() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section, footer')) as HTMLElement[];
    sections.forEach((section) => {
      if (section.matches('header')) return;
      // Skip sections that have explicitly opted out (e.g. GSAP-owned).
      if (section.dataset.fx === 'gsap') return;
      const all = Array.from(section.querySelectorAll(FX.selector))
        .filter(el => !(el.closest('[data-fx="gsap"]')));
      const targets = all.filter(el => !all.some(a => a !== el && a.contains(el)));
      targets.forEach((el, i) => {
        el.classList.add('fx');
        (el as HTMLElement).style.setProperty('--fx-i', String(i));
      });
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const t = entry.target as HTMLElement;
          if (!t.classList.contains('fx-on')) {
            t.classList.add('fx-on');
            t.querySelectorAll<HTMLElement>('[data-counter]').forEach(animateCounter);
          }
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: FX.ioMargin, threshold: 0 });
    sections.forEach(s => {
      if (s.dataset.fx === 'gsap') return;
      io.observe(s);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
