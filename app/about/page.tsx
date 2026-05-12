import Link from 'next/link';
import ParticleField from '../components/ParticleField';
import PageHeadlines from '../components/PageHeadlines';

export const metadata = {
  title: 'About — Divinus Investment Group',
  description:
    'Divinus Investment Group is a multi-division group company building the infrastructure of growth — in organisations, in markets, and in people.',
};

const ARCHITECTURE = [
  { num: '01', name: 'Divinus AI · Vision Africa', mandate: 'Build, teach, and deploy African AI capability — for the institutions, businesses, and governments shaping the continent.' },
  { num: '02', name: 'Divinus Advisory',           mandate: 'Where Strategy Meets Substance. We diagnose before we prescribe — and stay until the work has taken root.' },
  { num: '03', name: 'Divinus Exchange',           mandate: 'The platform where substance meets community. Home of Men of Substance and Genesis Woman.' },
  { num: '04', name: 'Divinus Labs',               mandate: 'Software products and digital systems engineered for African markets, built to be owned, not rented.' },
  { num: '05', name: 'Divinus Capital',            mandate: 'Education Before Action. A financial education division — not a signals group, not advisory, a school.' },
  { num: '06', name: 'Strategic Partners',         mandate: 'Long-horizon partnerships with the institutions building the continent — public, private, and philanthropic.' },
  { num: '07', name: 'The Divinus Foundation',     mandate: 'The philanthropic arm of the group — where conviction meets contribution.' },
];

const VALUES = [
  { name: 'Precision', body: 'Every standard we set is a promise. We refuse to round down.' },
  { name: 'Integrity', body: 'What we say privately and what we ship publicly are the same thing.' },
  { name: 'Ambition',  body: 'The scale of the work matches the scale of the continent we serve.' },
  { name: 'Impact',    body: 'Outcomes outlive the engagement. Substance over spectacle.' },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeadlines />

      {/* PAGE HEADER */}
      <section data-fx="gsap" data-section="about-header" data-above-fold className="relative overflow-hidden" aria-labelledby="about-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">About</p>
          <h1 id="about-title" className="mt-8 max-w-[18ch] text-[clamp(44px,7vw,108px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">About Divinus</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">Investment Group.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-400 text-pretty">
            A multi-division group company building the infrastructure of growth —
            in organisations, in markets, and in people. Headquartered with global
            ambition and African conviction.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section data-fx="gsap" data-section="who" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="who-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Who we are</p>
              <h2 id="who-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">One organism.</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Not a holding company.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <p className="text-lg leading-[1.65] text-neutral-300 text-pretty">
                Divinus exists at the intersection of capital, intelligence, and community.
                Seven divisions, one direction — each accountable to the same standard,
                each contributing to the same architecture of growth.
              </p>
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                We work with organisations, governments, and individuals that take
                seriously the next decade of African enterprise. We do not chase
                trends. We build infrastructure.
              </p>
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                Divinus is led by a team with experience across strategy, technology,
                finance, and community development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION — single hero-statement block */}
      <section data-fx="gsap" data-section="mission" data-pin-reveal className="border-t border-neutral-800 bg-neutral-900/40 py-32 sm:py-44" aria-labelledby="mission-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Mission</p>
          <h2 id="mission-title" className="mt-8 max-w-[20ch] text-[clamp(40px,6.4vw,104px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Build organisations.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Develop people.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">Create value that lasts.</span></span>
          </h2>
        </div>
      </section>

      {/* ARCHITECTURE — 7 rows */}
      <section data-fx="gsap" data-section="arch" className="py-24 sm:py-32" aria-labelledby="arch-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 mb-14 sm:mb-16">
            <div className="lg:col-span-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The architecture</p>
              <h2 id="arch-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Seven divisions.</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">One mandate each.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-6 lg:pt-3">
              <p className="text-lg leading-[1.65] text-neutral-400 text-pretty">
                The seven divisions are not subsidiaries — they are limbs of a single body.
                Each carries one mandate. Together they form the infrastructure of growth.
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800">
            {ARCHITECTURE.map((d) => (
              <article key={d.num} className="grid grid-cols-12 gap-x-6 gap-y-3 py-10 sm:py-12 border-b border-neutral-800">
                <div className="col-span-12 sm:col-span-1">
                  <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">{d.num}</span>
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50">{d.name}</h3>
                </div>
                <div className="col-span-12 sm:col-span-7">
                  <p className="text-lg leading-[1.6] text-neutral-400 text-pretty max-w-xl">{d.mandate}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/divisions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
            >
              Explore each division in full →
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section data-fx="gsap" data-section="values" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="values-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Values</p>
            <h2 id="values-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
              <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Precision · Integrity ·</span></span>
              <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Ambition · Impact.</span></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
            {VALUES.map((v, i) => (
              <article key={v.name} className="bg-neutral-950 p-8 sm:p-10 transition-colors duration-300 hover:bg-neutral-900/60">
                <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-50">{v.name}</h3>
                <p className="mt-4 text-sm leading-[1.7] text-neutral-400 text-pretty">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY — Why We Were Built */}
      <section data-fx="gsap" data-section="story" className="py-24 sm:py-32" aria-labelledby="story-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Our story</p>
              <h2 id="story-title" className="mt-6 text-[clamp(34px,5vw,56px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Why we</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">were built.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pl-6 space-y-7 text-lg leading-[1.7] text-neutral-300 text-pretty">
              <p>
                Africa is not short on talent, ambition, or opportunity. It is short
                on infrastructure — the kind that compounds, the kind that survives
                a generation, the kind that converts capability into outcomes.
              </p>
              <p className="text-neutral-400">
                Divinus was built to be that infrastructure. Not a fund, not a
                consultancy, not a community — but the architecture that ties capital,
                intelligence, and community into a single system. Seven divisions
                designed to reinforce one another, each running to a standard the
                next can rely on.
              </p>
              <p className="text-neutral-400">
                We are early. Most of what Divinus will become is still ahead of us.
                What is settled is the standard, the direction, and the kind of
                organisation we refuse to be.
              </p>
              <p className="text-neutral-200 italic">
                Premium. Purposeful. Precise. Never performative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section data-fx="gsap" data-section="leadership" className="border-t border-neutral-800 py-24 sm:py-32" aria-labelledby="leadership-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Leadership</p>
              <h2 id="leadership-title" className="mt-6 text-[clamp(34px,5vw,64px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">The team</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">behind the standard.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-6 space-y-6">
              <p className="text-lg leading-[1.65] text-neutral-300 text-pretty">
                Divinus is led by a team with experience across strategy, technology,
                finance, and community development.
              </p>
              <p className="text-base leading-[1.65] text-neutral-500 text-pretty">
                Full leadership profiles will be published with the next site release.
              </p>
            </div>
          </div>

          {/* Placeholder leadership grid — neutral tiles, no fabricated names */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-neutral-950 aspect-[3/4] flex flex-col justify-end p-6">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-700">0{i} · Leadership</p>
                <p className="mt-3 text-base font-semibold tracking-tight text-neutral-600">To be announced</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ParticleField data-fx="gsap" data-section="cta" className="bg-black text-neutral-50" aria-labelledby="cta-title">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-44">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">The next step</p>
              <h2 id="cta-title" className="mt-6 text-[clamp(36px,5.5vw,80px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">If our standard</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">matches your ambition.</span></span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-lg text-neutral-400 text-pretty">
                Partnerships, programmes, and conversations begin in the same place.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
                >
                  Get in Touch
                  <svg className="cta-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
                <Link
                  href="/divisions"
                  className="text-sm font-semibold text-neutral-300 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
                >
                  Explore the Divisions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ParticleField>
    </main>
  );
}
