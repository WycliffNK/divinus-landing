// Shared math + config for the page-wide dot grid and the particle fields.
// Ported from divinus-home.html. Module-scoped so DotGridBackground and
// ParticleField share the same CFG / gradient cache.

export const CFG = {
  spacing: 17,
  radius: 66,
  push: 0.5,
  impulse: 0.11,
  spring: 0.01,
  friction: 0.73,
  dotSize: 1.1,
  hoverGrowth: 2.4,
  dotAlpha: 0.17,
  glowAlpha: 0.55,
  bgOpacity: 1,
  bgEnabled: true,
  idleMs: 500,
  gradientEnabled: true,
  gradientAlpha: 0.65,
  gradientSize: 1.4,
  gradientHue: 151,
  sizeRange: 0.26,
  alphaRange: 1.0,
};

export const FADE_EXP = 0.7;

export function easedFadeOut(t: number) {
  if (t <= 0) return 1;
  if (t >= 1) return 0;
  const cosFade = 0.5 * (1 + Math.cos(Math.PI * t));
  return Math.pow(cosFade, FADE_EXP);
}

export interface Mouse {
  x: number; y: number; active: boolean; lastMove: number; overText: boolean;
}
export function computeIntensity(mouse: Mouse, idleMs: number) {
  if (!mouse.active) return 0;
  const elapsed = performance.now() - mouse.lastMove;
  return easedFadeOut(elapsed / idleMs);
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)  { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

const GRADIENT_BASE_HSL: [number, number, number, number][] = [
  [0.00, ...rgbToHsl( 80, 200, 255)] as [number, number, number, number],
  [0.30, ...rgbToHsl(168,  85, 247)] as [number, number, number, number],
  [0.60, ...rgbToHsl(236,  72, 153)] as [number, number, number, number],
  [0.85, ...rgbToHsl(249, 115,  22)] as [number, number, number, number],
  [1.00, ...rgbToHsl(249, 115,  22)] as [number, number, number, number],
];

let GRADIENT_STOPS: [number, number, number, number][] = [];
let _lastHue = NaN;
export function rebuildGradientStops() {
  const shift = CFG.gradientHue || 0;
  if (shift === _lastHue && GRADIENT_STOPS.length) return;
  _lastHue = shift;
  GRADIENT_STOPS = GRADIENT_BASE_HSL.map(([t, h, s, l]) => {
    const [r, g, b] = hslToRgb(h + shift, s, l);
    return [t, r, g, b];
  });
}

export function sampleGradient(t: number): [number, number, number] | null {
  if (t < 0 || t > 1) return null;
  for (let i = 0; i < GRADIENT_STOPS.length - 1; i++) {
    const a = GRADIENT_STOPS[i];
    const b = GRADIENT_STOPS[i + 1];
    if (t <= b[0]) {
      const k = b[0] === a[0] ? 0 : (t - a[0]) / (b[0] - a[0]);
      return [
        a[1] + (b[1] - a[1]) * k,
        a[2] + (b[2] - a[2]) * k,
        a[3] + (b[3] - a[3]) * k,
      ];
    }
  }
  return null;
}

const TEXT_LEGIBILITY_SELECTOR = [
  'h1','h2','h3','h4','h5','h6','p','li','dl','dt','dd','label',
  'a','button','span','em','strong','blockquote','code','pre','time',
  'figcaption','input','textarea',
].join(',');

export function isOverText(target: EventTarget | null, x: number, y: number): boolean {
  const t = target as Element | null;
  if (!t || !t.closest) return false;
  const el = t.closest(TEXT_LEGIBILITY_SELECTOR);
  if (!el) return false;
  if ((el as Element).matches('input, textarea, [contenteditable="true"]')) return true;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      return n.nodeValue && n.nodeValue.trim().length
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });
  const range = document.createRange();
  let node: Node | null;
  while ((node = walker.nextNode())) {
    range.selectNodeContents(node);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
    }
  }
  return false;
}
