import Image from 'next/image';
import SiteFooter from '../components/website/SiteFooter';
import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import { WebPageJsonLd } from '../components/website/JsonLd';
import { buildSeoMetadata } from '../../lib/seo';
import { caseStudies } from '../../lib/marketing/caseStudies';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

export const metadata = buildSeoMetadata({
  title: 'Case Studies | MedHostech Solutions',
  description:
    'Explore real client projects: healthcare, wellness, and e-commerce websites built with modern design, performance, and scalable development.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <WebPageJsonLd
        name="Case Studies | MedHostech Solutions"
        description="Real client projects showcasing web development, performance, and modern design for healthcare and business."
        url="/case-studies"
      />

      <InnerPageHeroBanner
        title="Case Studies"
        breadcrumbCurrent="Case Studies"
        subtitle="Real projects we have delivered—modern websites built for performance, clarity, and business growth."
      />

      <section className="relative overflow-hidden bg-[#FAFCFE] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0E2238 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <Animate variant="down">
            <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg">
              From healthcare and wellness to e-commerce, each engagement pairs strategy, design, and engineering so
              clients get a reliable digital presence that converts.
            </p>
          </Animate>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {caseStudies.map((study, idx) => (
              <Animate key={study.slug} variant="up" delay={Math.min(idx * 0.08, 0.4)}>
                <a
                  href={study.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <article className="hover-lift flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/60 bg-white shadow-[0_4px_24px_-4px_rgba(14,39,64,0.08)] transition-all duration-300 hover:border-cyan-200/60 hover:shadow-[0_24px_48px_-12px_rgba(2,105,148,0.18)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-primary)] shadow-sm backdrop-blur">
                        {study.category}
                      </span>
                    </div>
                    <div className="flex min-h-[220px] flex-1 flex-col p-6 sm:p-8">
                      <h2 className="text-xl font-bold leading-snug text-[#0E2238] transition-colors group-hover:text-[var(--brand-primary)] sm:text-2xl">
                        {study.title}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {study.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {study.services.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] transition-all duration-300 group-hover:gap-3">
                        View live site
                        <FaExternalLinkAlt className="text-xs" aria-hidden />
                      </span>
                    </div>
                  </article>
                </a>
              </Animate>
            ))}
          </div>

          <Animate variant="up" delay={0.2}>
            <div className="mt-16 rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-6 py-10 text-center sm:px-10 sm:py-12">
              <h2 className="text-2xl font-bold text-[#0E2238] sm:text-3xl">Ready to start your project?</h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                Tell us about your goals—we will help you plan, design, and launch a solution tailored to your business.
              </p>
              <a
                href="/contact-us"
                className="ref-cta-primary mt-8 inline-flex items-center gap-2"
              >
                Contact Us
                <FaArrowRight className="text-sm" aria-hidden />
              </a>
            </div>
          </Animate>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
