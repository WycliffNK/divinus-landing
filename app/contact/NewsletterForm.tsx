'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-neutral-800 bg-neutral-900/60 px-6 py-8 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Subscribed</p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-50">You're in.</h3>
        <p className="mt-2 text-sm text-neutral-400">Expect substance, not noise.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="your@email.com"
        className="flex-1 bg-transparent border border-neutral-800 rounded-full px-5 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition whitespace-nowrap"
      >
        Subscribe
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </form>
  );
}
