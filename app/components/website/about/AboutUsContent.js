'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  FaChartLine,
  FaHeartbeat,
  FaShieldAlt,
  FaClock,
  FaHandshake,
} from 'react-icons/fa';
import Animate from '../Animate';
import AboutCtaSection from './AboutCtaSection';
import AboutDeliverSection from './AboutDeliverSection';
import InnerPageHeroBanner from '../InnerPageHeroBanner';
import SiteFooter from '../SiteFooter';
import {
  marketingTransition,
  marketingViewport,
  staggerContainer,
  staggerItem,
} from '../../../../lib/marketing/motion';

const STATS = [
  { value: 12, suffix: '+', label: 'Years in healthcare IT' },
  { value: 500, suffix: '+', label: 'Care teams supported' },
  { value: 99.9, suffix: '%', label: 'Platform uptime', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Clinical support' },
];

const VALUES = [
  {
    icon: FaHeartbeat,
    title: 'Patient-first design',
    desc: 'Every workflow we build starts with how it affects the person receiving care—not just the screen clinicians see.',
    tone: 'from-rose-500/15 to-orange-400/10 text-rose-600',
  },
  {
    icon: FaShieldAlt,
    title: 'Security by default',
    desc: 'HIPAA-aware architecture, encrypted data paths, and audit-ready controls woven into the product from day one.',
    tone: 'from-cyan-500/15 to-sky-400/10 text-cyan-700',
  },
  {
    icon: FaChartLine,
    title: 'Measurable outcomes',
    desc: 'We track adoption, documentation time, and operational KPIs so improvements are visible—not assumed.',
    tone: 'from-violet-500/15 to-purple-400/10 text-violet-700',
  },
  {
    icon: FaHandshake,
    title: 'True partnership',
    desc: 'Implementation, training, and ongoing optimization—we stay engaged long after go-live.',
    tone: 'from-emerald-500/15 to-teal-400/10 text-emerald-700',
  },
];

const MILESTONES = [
  { year: '2013', title: 'Founded with a clinical focus', desc: 'Started building tools that reduce admin burden for busy practices.' },
  { year: '2017', title: 'First multi-site deployment', desc: 'Scaled EHR workflows across departments with unified patient records.' },
  { year: '2020', title: 'Telehealth & remote care', desc: 'Launched virtual visit flows and patient portals during peak demand.' },
  { year: '2024', title: 'AI-assisted documentation', desc: 'Smart templates and insights that help clinicians finish charts faster.' },
];

const MARQUEE_ITEMS = [
  'Electronic Health Records',
  'Patient Portals',
  'Practice Management',
  'Telehealth',
  'Clinical Analytics',
  'HIPAA-Ready Hosting',
  'Smart Scheduling',
  'Revenue Cycle',
];

function AnimatedCounter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let frame;
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setDisplay(decimals ? Number(current.toFixed(decimals)) : Math.round(current));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, suffix, decimals, reduceMotion]);

  const formatted =
    decimals > 0 && typeof display === 'number'
      ? display.toFixed(decimals)
      : display;

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

function FloatingOrbs() {
  return (
    <>
      <div className="process-float-slow pointer-events-none absolute left-[6%] top-[10%] h-28 w-28 rounded-full bg-cyan-400/25 blur-3xl" aria-hidden />
      <div className="process-float-delayed pointer-events-none absolute right-[8%] top-[22%] h-36 w-36 rounded-full bg-violet-400/20 blur-3xl" aria-hidden />
      <div className="process-float-slow pointer-events-none absolute bottom-[18%] left-[20%] h-24 w-24 rounded-full bg-rose-300/20 blur-2xl" aria-hidden />
    </>
  );
}

function CapabilityMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-slate-200/80 bg-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" aria-hidden />
      <div className="marketing-marquee-track gap-10 px-4">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--brand-primary)]" aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function MissionVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex w-full max-w-[520px] justify-center lg:justify-end">
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        >
          <div className="h-[420px] w-[420px] rounded-full border border-dashed border-violet-300/50 sm:h-[460px] sm:w-[460px]" />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 h-[360px] w-[360px] overflow-hidden rounded-full border-[10px] border-white bg-slate-100 shadow-[0_28px_65px_-20px_rgba(0,180,216,0.35)] sm:h-[400px] sm:w-[400px]"
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <Image
          src="/assets/images/about-growth-right.png"
          alt="Healthcare technology team"
          fill
          sizes="400px"
          className="object-cover object-top"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-5 left-0 z-20 w-[250px] rounded-3xl bg-white p-5 shadow-[0_18px_48px_-20px_rgba(2,12,42,0.35)] ring-1 ring-slate-100 sm:bottom-7 sm:left-3"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={marketingViewport}
        transition={{ ...marketingTransition, delay: 0.35 }}
      >
        <p className="text-lg font-bold text-[#111827]">Impact</p>
        <div className="mt-4 space-y-3">
          {[
            { pct: '38%', label: 'Less charting time', color: 'bg-cyan-100 text-cyan-700' },
            { pct: '92%', label: 'Staff satisfaction', color: 'bg-lime-100 text-lime-700' },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${row.color}`}>
                ✦
              </span>
              <div>
                <p className="text-3xl font-extrabold leading-none text-[#111827]">{row.pct}</p>
                <p className="text-sm text-slate-500">{row.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="float-soft float-delay-2 absolute -right-2 top-8 z-20 hidden rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-100 sm:block"
        aria-hidden
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live systems</p>
        <p className="text-xl font-bold text-[var(--brand-primary)]">Always on</p>
      </motion.div>
    </div>
  );
}

export default function AboutUsContent() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner
        title="About Us"
        breadcrumbCurrent="About"
        subtitle="Built for better care—technology that gives clinicians time back and patients a smoother journey."
      />

      <CapabilityMarquee />

      {/* Mission */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <FloatingOrbs />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(0,180,216,0.08),transparent_45%),radial-gradient(ellipse_at_95%_35%,rgba(90,28,203,0.08),transparent_45%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Animate variant="left">
              <p className="ref-kicker text-sm font-semibold uppercase tracking-[0.08em]">
                <span className="ref-kicker-line" aria-hidden />
                Our story
              </p>
              <h2 className="ref-section-title mt-4 max-w-xl text-4xl leading-[1.08] sm:text-5xl">
                Engineered for the people who deliver care
              </h2>
            </Animate>
            <Animate variant="left" delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                Medhostech Solutions exists to simplify healthcare operations—so physicians, nurses, and
                administrators spend less time on screens and more time with patients. We combine deep
                clinical understanding with modern software craft.
              </p>
            </Animate>

            <motion.ul
              className="mt-10 grid grid-cols-2 gap-4 sm:gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={marketingViewport}
            >
              {STATS.map((stat) => (
                <motion.li
                  key={stat.label}
                  variants={staggerItem}
                  className="hover-lift rounded-2xl bg-gradient-to-br from-slate-50 to-white p-5 ring-1 ring-slate-100"
                >
                  <p className="text-3xl font-bold text-[#0E2238] sm:text-4xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
                </motion.li>
              ))}
            </motion.ul>

            <Animate variant="left" delay={0.28}>
              <Link href="/contact-us" className="ref-cta-primary sheen-hover btn-glow mt-8 inline-flex">
                Talk to our team
              </Link>
            </Animate>
          </div>

          <Animate variant="right" delay={0.1}>
            <MissionVisual />
          </Animate>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-[#f4f5f9] py-18 sm:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <div className="mx-auto max-w-3xl text-center">
              <p className="ref-kicker mx-auto inline-flex text-sm">
                <span className="ref-kicker-line" aria-hidden />
                What guides us
              </p>
              <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-5xl">
                Principles behind every release
              </h2>
            </div>
          </Animate>

          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
          >
            {VALUES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={staggerItem}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[var(--marketing-shadow-card)] ring-1 ring-slate-100"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone}`}
                  >
                    <Icon className="text-lg" aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-[#0E2238]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <div
                    className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[var(--brand-primary)]/5 transition-transform duration-500 group-hover:scale-150"
                    aria-hidden
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <div className="max-w-2xl">
              <p className="ref-kicker text-sm">
                <span className="ref-kicker-line" aria-hidden />
                Our journey
              </p>
              <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl">
                Milestones that shaped our platform
              </h2>
            </div>
          </Animate>

          <ol className="relative mt-14 space-y-0">
            <div
              className="pointer-events-none absolute left-[1.15rem] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[var(--brand-primary)] via-violet-400 to-rose-400 sm:left-1/2 sm:block sm:-translate-x-px"
              aria-hidden
            />
            {MILESTONES.map((m, idx) => (
              <Animate key={m.year} variant={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.08}>
                <li className="relative grid gap-6 pb-12 sm:grid-cols-2 sm:gap-12 sm:pb-16">
                  <div className={`${idx % 2 === 1 ? 'sm:order-2 sm:text-left' : 'sm:text-right'}`}>
                    <span className="inline-block rounded-full bg-[#EAF9FD] px-4 py-1 text-sm font-bold text-[var(--brand-primary)]">
                      {m.year}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-[#0E2238] sm:text-2xl">{m.title}</h3>
                    <p className="mt-2 max-w-md text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className={`hidden sm:block ${idx % 2 === 1 ? 'sm:order-1' : ''}`} />
                  <span
                    className="absolute left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-marketing-purple-gradient text-[10px] font-bold text-white shadow-marketing-purple-icon sm:left-1/2 sm:-translate-x-1/2"
                    aria-hidden
                  >
                    {idx + 1}
                  </span>
                </li>
              </Animate>
            ))}
          </ol>
        </div>
      </section>

      {/* Team gallery */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-[#f4f5f9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Animate variant="left" className="relative">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { src: '/assets/images/new/2.jpg', alt: 'Healthcare team collaboration', tall: false },
                  { src: '/assets/images/new/3.jpg', alt: 'Clinical digital workflow', tall: false },
                  { src: '/assets/images/new/4.jpg', alt: 'Medical analytics dashboard', tall: true },
                ].map((img, i) => (
                  <motion.div
                    key={img.src}
                    className={`overflow-hidden rounded-3xl border border-cyan-100 bg-white p-2 shadow-lg ${img.tall ? 'col-span-2' : ''}`}
                    whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <div className={`relative w-full overflow-hidden rounded-2xl ${img.tall ? 'h-64' : 'h-52'}`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={img.tall ? '800px' : '400px'}
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="float-soft absolute -bottom-4 -right-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-100 sm:right-4"
                aria-hidden
              >
                <FaClock className="text-[var(--brand-primary)]" />
                <span className="text-sm font-semibold text-slate-700">Faster rounds, clearer charts</span>
              </motion.div>
            </Animate>

            <div>
              <Animate variant="right">
                <span className="inline-flex items-center rounded-full bg-[#EAF9FD] px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#1B3045]">
                  For care teams
                </span>
              </Animate>
              <Animate variant="right" delay={0.08}>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-[#0E2238] sm:text-4xl md:text-5xl">
                  Less admin.
                  <span className="mt-2 block text-[var(--brand-primary)]">More medicine.</span>
                </h2>
              </Animate>
              <Animate variant="right" delay={0.16}>
                <p className="mt-5 text-slate-600 leading-relaxed">
                  Scheduling, documentation, follow-ups, and cross-department coordination live in one
                  place—so the right patient context is always a click away.
                </p>
              </Animate>
              <Animate variant="right" delay={0.24}>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Whether you run a single practice or a growing hospital network, we adapt implementation
                  to your pace and train staff until workflows feel natural.
                </p>
              </Animate>
            </div>
          </div>
        </div>
      </section>

      <AboutDeliverSection />

      <AboutCtaSection />

      <SiteFooter />
    </main>
  );
}
