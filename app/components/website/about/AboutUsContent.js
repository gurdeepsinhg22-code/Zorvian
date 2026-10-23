'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import Animate from '../Animate';
import AboutCtaSection from './AboutCtaSection';
import AboutMissionVisionValuesSection from './AboutMissionVisionValuesSection';
import AboutFaqSection from './AboutFaqSection';
import AboutWhyChooseUsSection from './AboutWhyChooseUsSection';
import InnerPageHeroBanner from '../InnerPageHeroBanner';
import SiteFooter from '../SiteFooter';
import {
  marketingTransition,
  marketingViewport,
  staggerContainer,
  staggerItem,
} from '../../../../lib/marketing/motion';

const STATS = [
  { value: 12, suffix: '+', label: 'Years of experience' },
  { value: 500, suffix: '+', label: 'Projects delivered' },
  { value: 99.9, suffix: '%', label: 'Platform uptime', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Expert support' },
];

const MARQUEE_ITEMS = [
  'Website Development',
  'Web Applications',
  'Mobile Apps',
  'E-Commerce',
  'Cloud Applications',
  'UI/UX Design',
  'SEO & Performance',
  'Maintenance & Support',
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
      <div className="process-float-delayed pointer-events-none absolute right-[8%] top-[22%] h-36 w-36 rounded-full bg-sky-400/20 blur-3xl" aria-hidden />
      <div className="process-float-slow pointer-events-none absolute bottom-[18%] left-[20%] h-24 w-24 rounded-full bg-sky-300/20 blur-2xl" aria-hidden />
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
          <div className="h-[420px] w-[420px] rounded-full border border-dashed border-sky-300/50 sm:h-[460px] sm:w-[460px]" />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 h-[360px] w-[360px] overflow-hidden rounded-full border-[10px] border-white bg-slate-100 shadow-[0_28px_65px_-20px_rgba(0,180,216,0.35)] sm:h-[400px] sm:w-[400px]"
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <Image
          src="/assets/images/about-growth-right.png"
          alt="Zorvian Digital Solutions digital solutions team"
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
            { pct: '40%', label: 'Faster launches', color: 'bg-cyan-100 text-cyan-700' },
            { pct: '92%', label: 'Client satisfaction', color: 'bg-lime-100 text-lime-700' },
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
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#0a0a0a] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner
        title="About Us"
        breadcrumbCurrent="About"
        subtitle="We build websites, web applications, and mobile experiences that help businesses grow online."
      />

      <CapabilityMarquee />

      {/* Mission */}
      {/* <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <FloatingOrbs />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(0,180,216,0.08),transparent_45%),radial-gradient(ellipse_at_95%_35%,rgba(0,82,212,0.08),transparent_45%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Animate variant="left">
              <p className="ref-kicker text-sm font-semibold uppercase tracking-[0.08em]">
                <span className="ref-kicker-line" aria-hidden />
                Our story
              </p>
              <h2 className="ref-section-title mt-4 max-w-xl text-4xl leading-[1.08] sm:text-5xl">
                Engineered for growth across every digital channel
              </h2>
            </Animate>
            <Animate variant="left" delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                Zorvian Digital Solutions delivers high-performance websites, web applications, e-commerce stores,
                and mobile apps for startups, SMEs, and enterprises. We combine modern design with clean,
                scalable code so your brand performs online.
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
                  <p className="text-3xl font-bold text-[#0a0a0a] sm:text-4xl">
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
      </section> */}

      <AboutMissionVisionValuesSection />

      <AboutWhyChooseUsSection />

      <AboutFaqSection />

      {/* Team gallery */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-[#f4f5f9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Animate variant="left" className="relative">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { src: '/assets/images/new/2.jpg', alt: 'Team planning a web project', tall: false },
                  { src: '/assets/images/new/3.jpg', alt: 'Developer working on an application', tall: false },
                  { src: '/assets/images/new/4.jpg', alt: 'Analytics dashboard on screen', tall: true },
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
                <span className="text-sm font-semibold text-slate-700">Ship faster, scale smarter</span>
              </motion.div>
            </Animate>

            <div>
              <Animate variant="right">
                <span className="inline-flex items-center rounded-full bg-[#EAF9FD] px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#111111]">
                  For growing brands
                </span>
              </Animate>
              <Animate variant="right" delay={0.08}>
                <h2 className="mt-5 text-3xl font-bold leading-tight text-[#0a0a0a] sm:text-4xl md:text-5xl">
                  Launch faster.
                  <span className="mt-2 block text-[var(--brand-primary)]">Grow online.</span>
                </h2>
              </Animate>
              <Animate variant="right" delay={0.16}>
                <p className="mt-5 text-slate-600 leading-relaxed">
                  From marketing sites and e-commerce to custom web apps and mobile products—we design,
                  build, and optimize experiences that turn visitors into customers.
                </p>
              </Animate>
              <Animate variant="right" delay={0.24}>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Whether you need a new site, a platform rebuild, or ongoing support, we adapt delivery
                  to your timeline and stay with you after launch.
                </p>
              </Animate>
            </div>
          </div>
        </div>
      </section>

      <AboutCtaSection />

      <SiteFooter />
    </main>
  );
}
