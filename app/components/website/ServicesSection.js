'use client';

import Animate from './Animate';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesSection({ services }) {
  return (
    <section id="healthcare-solutions" className="relative overflow-hidden bg-[#F4FAFD]">
      {/* Services: offerings grid */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-100/80 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Animate variant="down">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--brand-primary)]">
                Our Services
              </p>
            </Animate>
            <Animate variant="down" delay={0.12}>
              <h2 className="mt-3 text-2xl font-bold text-[#0a0a0a] sm:text-3xl md:text-4xl">
                End-to-End Digital Healthcare Solutions
              </h2>
            </Animate>
          </div>
          <Animate variant="down" delay={0.24}>
            <p className="max-w-md text-sm text-slate-600 md:text-right">
              Built for modern hospitals and clinics with smarter workflows, secure records, and
              reliable automation.
            </p>
          </Animate>
        </div>

        <div className="relative z-10 mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, idx) => (
            <Animate
              key={service.title}
              variant={idx % 2 === 0 ? 'left' : 'right'}
              delay={[0.2, 0.32, 0.44, 0.56][idx] || 0.2}
            >
              <article
                className={`group hover-lift relative min-h-[280px] overflow-hidden rounded-3xl border border-slate-200/70 bg-white text-[#0a0a0a] shadow-[0_12px_30px_rgba(2,18,34,0.08)] transition hover:border-cyan-200 hover:shadow-[0_20px_45px_rgba(2,105,148,0.16)] ${
                  idx % 2 === 1 ? 'xl:mt-8' : ''
                }`}
              >
                {/* Unique background image per card - optimized via Next.js Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={`${service.title} - Zorvian Digital Solutions healthcare solution`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay for text readability */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95"
                    aria-hidden
                  />
                </div>

                <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[var(--brand-primary)] via-cyan-300 to-transparent" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-100/70 blur-2xl transition group-hover:bg-cyan-200/70" />

                <div className="relative z-10 flex h-full flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[#EAF9FD] text-lg font-bold text-[var(--brand-primary)] shadow-[0_8px_18px_rgba(0,180,216,0.18)] transition group-hover:scale-110">
                    {service.icon}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#111111]">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-slate-600">{service.desc}</p>

                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] transition hover:gap-2"
                  >
                    Learn more <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
