import Image from 'next/image';
import ContactForm from './ContactForm';
import PageHeadlines from '../components/PageHeadlines';

export const metadata = {
  title: 'Contact — Divinus Investment Group',
  description: 'Get in touch with Divinus Investment Group. We will follow up within two working days.',
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ route?: string }>;
}) {
  const { route } = await searchParams;

  return (
    <main>
      <PageHeadlines />

      {/* PAGE HEADER — full-bleed cinematic */}
      <section data-fx="gsap" data-section="contact-header" data-above-fold className="group relative overflow-hidden min-h-[88vh] flex items-end" aria-labelledby="contact-title">
        <Image
          src="https://picsum.photos/seed/divinus-contact-hero-full/2400/1600"
          alt=""
          fill
          sizes="100vw"
          priority
          className="duotone object-cover"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 sm:pb-28 w-full">
          <p data-anim="eyebrow" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-300">Contact</p>
          <h1 id="contact-title" className="mt-8 max-w-[14ch] text-[clamp(44px,7vw,108px)] font-bold display-tight text-neutral-50 text-balance">
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">Get in touch.</span></span>
            <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-400">One reply, no rounds.</span></span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-[1.55] text-neutral-200 text-pretty">
            Tell us what you’re trying to do. We will follow up within two working days —
            from the right division, with the right person.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            <a
              href="#routing"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
            >
              Pick a division
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"/>
              </svg>
            </a>
            <a
              href="mailto:hello@divinus.com"
              className="text-sm font-semibold text-neutral-200 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 hover:text-neutral-50 transition"
            >
              Or email hello@divinus.com →
            </a>
          </div>
        </div>
      </section>

      {/* ROUTING + FORM */}
      <section className="border-t border-neutral-800 py-20 sm:py-28" aria-label="Contact form">
        <ContactForm initialRoute={route} />
      </section>

      {/* SLA NOTE — locked verbatim */}
      <section data-fx="gsap" data-section="sla" className="group relative overflow-hidden border-t border-neutral-800 py-20 sm:py-28" aria-labelledby="sla-title">
        <Image
          src="https://picsum.photos/seed/divinus-contact-sla/2400/1000"
          alt=""
          fill
          sizes="100vw"
          className="duotone object-cover opacity-40"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Response time</p>
              <h2 id="sla-title" className="mt-6 text-[clamp(34px,5vw,72px)] font-bold display-tight text-neutral-50 text-balance">
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block">We will follow up</span></span>
                <span className="block overflow-hidden pb-[0.05em]"><span data-anim-line className="block text-neutral-500">within two working days.</span></span>
              </h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
