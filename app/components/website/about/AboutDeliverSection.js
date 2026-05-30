'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaHospital, FaShieldAlt, FaUserMd, FaUsers } from 'react-icons/fa';
import Animate from '../Animate';

const DELIVER_ITEMS = [
  {
    icon: FaHospital,
    title: 'EHR & Practice Suite',
    desc: 'Scheduling, charting, billing, and reporting in one platform.',
    image: '/assets/images/projects/web-development-replacement.png',
    tag: 'Core platform',
    accent: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  },
  {
    icon: FaUserMd,
    title: 'Clinical Workflows',
    desc: 'Order sets, care plans, and handoffs for your teams.',
    image: '/assets/images/projects/product-research-replacement.png',
    tag: 'Care pathways',
    accent: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  {
    icon: FaUsers,
    title: 'Patient Engagement',
    desc: 'Portals, reminders, and secure patient messaging.',
    image: '/assets/images/projects/digital-marketing-replacement.png',
    tag: 'Experience',
    accent: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  {
    icon: FaShieldAlt,
    title: 'Compliance & Hosting',
    desc: 'Infrastructure, backups, and healthcare policies.',
    image: '/assets/images/projects/seo-optimization-replacement.png',
    tag: 'Trust & scale',
    accent: 'border-sky-200 bg-sky-50 text-sky-700',
  },
];

function DeliverCard({ item, index }) {
  const Icon = item.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[var(--marketing-shadow-card)] transition-shadow hover:shadow-[0_22px_50px_-18px_rgba(90,28,203,0.18)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 280px"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          priority={index === 0}
        />
        <span
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ${item.accent}`}
        >
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="font-mono text-xs font-bold text-slate-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div
          className={`mt-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${item.accent}`}
        >
          <Icon className="text-base" aria-hidden />
        </div>
        <h3 className="mt-3 text-base font-bold leading-snug text-[#0E2238] sm:text-lg">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--marketing-ink-muted,#5c6677)]">
          {item.desc}
        </p>
      </div>
    </article>
  );
}

export default function AboutDeliverSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,180,216,0.06),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgba(90,28,203,0.05),transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Animate variant="down">
          <div className="mx-auto max-w-3xl text-center">
            <p className="ref-kicker justify-center text-sm">
              <span className="ref-kicker-line" aria-hidden />
              What we deliver
            </p>
            <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
              End-to-end healthcare technology
            </h2>
            <p className="mx-auto mt-4 text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
              From discovery to post-launch optimization—we own the stack so your team can focus on patient
              outcomes.
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {['EHR', 'Telehealth', 'HIPAA-ready', '24/7 support'].map((label) => (
                <li
                  key={label}
                  className="rounded-full bg-[#EAF9FD] px-3.5 py-1.5 text-xs font-semibold text-[#0E2238]"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Animate>

        {/* Single row: scroll on small screens, 4 columns on lg+ */}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-thin sm:mt-14 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
          {DELIVER_ITEMS.map((item, idx) => (
            <Animate
              key={item.title}
              variant="up"
              delay={0.08 + idx * 0.06}
              className="w-[min(85vw,280px)] shrink-0 snap-start sm:w-[300px] lg:w-auto lg:shrink"
            >
              <DeliverCard item={item} index={idx} />
            </Animate>
          ))}
        </div>

        <Animate variant="up" delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-3xl bg-marketing-purple-gradient p-8 text-white shadow-[0_24px_56px_-20px_rgba(90,28,203,0.45)] sm:mt-16 sm:flex sm:items-center sm:justify-between sm:gap-10 sm:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Get started</p>
              <p className="mt-2 max-w-lg text-lg font-semibold leading-snug sm:text-xl">
                Not sure where to begin? We&apos;ll map your stack in one discovery session.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#5a1ccb] shadow-lg transition hover:bg-white/95 sm:mt-0"
            >
              Book a discovery call
              <FaArrowRight className="text-xs" aria-hidden />
            </Link>
          </div>
        </Animate>
      </div>
    </section>
  );
}
