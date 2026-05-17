'use client';

import { useEffect, useState } from 'react';

export const ROUTES = [
  { id: 'ai',         label: 'AI · Vision Africa',        helper: 'AI strategy, capability building, applied engineering, research.' },
  { id: 'advisory',   label: 'Divinus Advisory',          helper: 'Strategy, organisation design, transformation, capital strategy.' },
  { id: 'exchange',   label: 'Divinus Exchange',          helper: 'The community platform — Men of Substance and Genesis Woman.' },
  { id: 'labs',       label: 'Divinus Labs',              helper: 'Software products, operator platforms, AI-native applications.' },
  { id: 'capital',    label: 'Divinus Capital',           helper: 'Financial education — markets, foundations, personal capital design.' },
  { id: 'partners',   label: 'Strategic Partners',        helper: 'Institutional, capability, distribution, and programme partnerships.' },
  { id: 'foundation', label: 'The Divinus Foundation',    helper: 'Education, economic dignity, health, and continental leadership.' },
  { id: 'press',      label: 'Press & Media',             helper: 'Interviews, statements, and editorial enquiries.' },
  { id: 'investors',  label: 'Investor Relations',        helper: 'Long-horizon investor and shareholder enquiries.' },
  { id: 'general',    label: 'General enquiry',           helper: 'Anything that doesn’t fit above. We’ll route it.' },
] as const;

export type RouteId = (typeof ROUTES)[number]['id'];

const COMMUNITY_ALIASES: Record<string, RouteId> = {
  'men-of-substance': 'exchange',
  'genesis-woman': 'exchange',
};

type Props = { initialRoute?: string };

const TOUCH_POINTS = [
  {
    id: 'email',
    label: 'Email',
    content: <a href="mailto:hello@divinus.com" className="text-lg font-semibold text-neutral-100 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 transition">hello@divinus.com</a>,
  },
  {
    id: 'press',
    label: 'Press & media',
    content: <a href="mailto:press@divinus.com" className="text-base font-semibold text-neutral-200 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 transition">press@divinus.com</a>,
  },
  {
    id: 'partners',
    label: 'Partnerships',
    content: <a href="mailto:partners@divinus.com" className="text-base font-semibold text-neutral-200 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 transition">partners@divinus.com</a>,
  },
  {
    id: 'response',
    label: 'Response time',
    content: <span className="text-base text-neutral-300 leading-[1.6]">We will follow up within two working days.</span>,
  },
  {
    id: 'office',
    label: 'Office',
    content: <span className="text-base text-neutral-300 leading-[1.6]">Headquartered with global ambition and African conviction.</span>,
  },
];

export default function ContactForm({ initialRoute }: Props) {
  const [route, setRoute] = useState<RouteId>('general');
  const [submitted, setSubmitted] = useState(false);
  const [openTouchPoint, setOpenTouchPoint] = useState<string | null>(null);

  useEffect(() => {
    const r = initialRoute as RouteId | undefined;
    if (!r) return;
    if ((ROUTES as readonly { id: string }[]).some(x => x.id === r)) {
      setRoute(r as RouteId);
    } else if (COMMUNITY_ALIASES[r]) {
      setRoute(COMMUNITY_ALIASES[r]);
    }
  }, [initialRoute]);

  const subjectPrefix = ROUTES.find(r => r.id === route)?.label ?? '';
  const showCommunityHint =
    initialRoute === 'men-of-substance' || initialRoute === 'genesis-woman';
  const communityName = initialRoute === 'genesis-woman' ? 'Genesis Woman' : 'Men of Substance';

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div id="routing" className="mx-auto max-w-7xl px-6 lg:px-8">
      {/* ROUTING TABLE */}
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 mb-10">
        <div className="lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">What do you want to talk about?</p>
          <h2 className="mt-6 text-[clamp(28px,4vw,48px)] font-bold display-tight text-neutral-50 text-balance">
            Pick the room.<br/>
            <span className="text-neutral-500">We’ll meet you there.</span>
          </h2>
        </div>
        <div className="lg:col-span-7 lg:pl-6 lg:pt-2">
          <p className="text-base leading-[1.65] text-neutral-400 text-pretty">
            Selecting a row pre-fills the message form below so your enquiry reaches the
            right division.
          </p>
        </div>
      </div>

      <ul className="border-t border-neutral-800 mb-20">
        {ROUTES.map((r, i) => {
          const selected = r.id === route;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => {
                  setRoute(r.id);
                  document.getElementById('message-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                aria-pressed={selected}
                className={`group grid grid-cols-12 gap-x-6 items-center w-full text-left py-6 border-b border-neutral-800 transition ${
                  selected ? 'bg-neutral-900/60' : 'hover:bg-neutral-900/30'
                }`}
              >
                <div className="col-span-1 hidden sm:block">
                  <span className="text-xs font-mono text-neutral-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <p className={`text-lg sm:text-xl font-semibold tracking-tight ${selected ? 'text-neutral-50' : 'text-neutral-100'}`}>
                    {r.label}
                  </p>
                </div>
                <div className="col-span-9 sm:col-span-6">
                  <p className="text-sm leading-[1.55] text-neutral-400">{r.helper}</p>
                </div>
                <div className="col-span-3 sm:col-span-1 flex items-center justify-end gap-2 text-sm">
                  <span className={`font-semibold transition ${selected ? 'text-neutral-50' : 'text-neutral-500 group-hover:text-neutral-200'}`}>
                    {selected ? 'Selected' : 'Pick'}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* CONTACT MAIN — info + form */}
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 border-t border-neutral-800 pt-16 sm:pt-20">
        {/* Info column */}
        <aside className="lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Direct lines</p>
          <h2 className="mt-6 text-[clamp(28px,4vw,48px)] font-bold display-tight text-neutral-50 text-balance">
            We will follow up<br/>
            <span className="text-neutral-500">within two working days.</span>
          </h2>

          <dl className="mt-10 border-t border-neutral-800">
            {TOUCH_POINTS.map(tp => {
              const open = openTouchPoint === tp.id;
              return (
                <div
                  key={tp.id}
                  className="border-b border-neutral-800"
                  onMouseEnter={() => setOpenTouchPoint(tp.id)}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`touch-point-${tp.id}`}
                    onClick={() => setOpenTouchPoint(open ? null : tp.id)}
                    className="flex w-full items-center justify-between py-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-sm"
                  >
                    <dt className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 group-hover:text-neutral-300 transition">
                      {tp.label}
                    </dt>
                    <svg
                      className={`h-4 w-4 text-neutral-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {open && (
                    <dd id={`touch-point-${tp.id}`} className="pb-5 text-sm">
                      {tp.content}
                    </dd>
                  )}
                </div>
              );
            })}
          </dl>
        </aside>

        {/* Form */}
        <form
          id="message-form"
          onSubmit={onSubmit}
          className="lg:col-span-7 lg:pl-6 scroll-mt-32"
          aria-labelledby="form-heading"
        >
          <p id="form-heading" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-6">
            Send a message · routed to {subjectPrefix}
          </p>

          {showCommunityHint && !submitted && (
            <p className="mb-6 rounded-md border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-300">
              You’re applying to <span className="font-semibold text-neutral-50">{communityName}</span>.
              We’ll route this to the Exchange team.
            </p>
          )}

          {submitted ? (
            <div className="rounded-md border border-neutral-800 bg-neutral-900/60 px-6 py-10 text-center">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Received</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-neutral-50">Thank you. We have your message.</h3>
              <p className="mt-3 text-sm text-neutral-400">
                We will follow up within two working days.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Name</span>
                  <input
                    type="text" name="name" required autoComplete="name"
                    className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                    placeholder="Your full name"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Email</span>
                  <input
                    type="email" name="email" required autoComplete="email"
                    className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Organisation (optional)</span>
                <input
                  type="text" name="organisation" autoComplete="organization"
                  className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                  placeholder="Company or institution"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Subject</span>
                <input
                  type="text" name="subject" required
                  value={`[${subjectPrefix}] ${showCommunityHint ? communityName + ' — ' : ''}`}
                  onChange={() => {}}
                  className="w-full bg-neutral-900/60 border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-200 focus:outline-none focus:border-neutral-500 transition"
                />
                <span className="block mt-2 text-xs text-neutral-600">
                  Pre-filled from the routing table above. Edit if needed.
                </span>
              </label>

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Message</span>
                <textarea
                  name="message" required rows={6}
                  className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition resize-y"
                  placeholder="What would you like us to know? Context, timeline, and what a useful response looks like."
                />
              </label>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-neutral-500 max-w-xs">
                  By sending you accept that Divinus may contact you about this enquiry.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Send message
                  <svg className="cta-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
