import Link from 'next/link';
import Logo from './Logo';

const DIVISIONS = [
  { href: '/divisions#ai', label: 'AI / Vision Africa' },
  { href: '/divisions#advisory', label: 'Advisory' },
  { href: '/divisions#exchange', label: 'Exchange' },
  { href: '/divisions#labs', label: 'Labs' },
  { href: '/divisions#capital', label: 'Capital' },
  { href: '/divisions#partners', label: 'Strategic Partners' },
  { href: '/divisions#foundation', label: 'Foundation' },
];

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/divisions', label: 'Divisions' },
  { href: '/communities', label: 'Communities' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-black text-neutral-300 border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-7 w-auto text-neutral-50" />
              <span className="text-xl font-bold tracking-tight text-neutral-50">Divinus</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-neutral-500 max-w-xs">
              Divinus Investment Group Limited
            </p>
            <p className="mt-6 text-sm text-neutral-400 italic">
              Built for Substance. Structured for Scale.
            </p>
            <p className="mt-8 text-xs text-neutral-600">© 2026 Divinus Investment Group</p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              {NAV.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-neutral-400 hover:text-neutral-50 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">Divisions</p>
            <ul className="space-y-2.5 text-sm">
              {DIVISIONS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-neutral-400 hover:text-neutral-50 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-neutral-400 hover:text-neutral-50 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-neutral-50 transition">Terms of Use</a></li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-neutral-500">
              Divinus Capital is a financial education division. Not regulated financial advice.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-mono text-neutral-600">divinus.com</p>
          <p className="text-xs text-neutral-600">All rights reserved · 2026</p>
        </div>
      </div>
    </footer>
  );
}
