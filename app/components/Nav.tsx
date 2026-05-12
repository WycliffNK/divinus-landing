'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/divisions', label: 'Divisions' },
  { href: '/communities', label: 'Communities' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-neutral-950/85 backdrop-blur border-b border-neutral-800/70">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Primary">
          <div className="flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2.5 mr-auto">
              <Logo />
              <span className="text-xl font-bold tracking-tight">Divinus</span>
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                Investment Group
              </span>
            </Link>
            <ul className="hidden md:flex items-center gap-7 text-sm text-neutral-400">
              {LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-neutral-50 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="hidden md:inline-flex ml-7 items-center gap-2 rounded-full bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-200 transition"
            >
              Get in Touch
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
              </svg>
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-neutral-50"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div
        className="md:hidden fixed inset-0 z-[60] bg-neutral-950 flex flex-col"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 220ms ease' }}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-16 items-center px-6 border-b border-neutral-800">
          <span className="flex items-center gap-2.5 mr-auto">
            <Logo />
            <span className="text-xl font-bold tracking-tight text-neutral-50">Divinus</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-neutral-50"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-6 py-10" aria-label="Mobile primary">
          <ul className="space-y-6 text-3xl font-bold tracking-tight text-neutral-50">
            {LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="hover:text-neutral-400 transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 pb-10 pt-8 border-t border-neutral-800">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
          >
            Get in Touch
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
