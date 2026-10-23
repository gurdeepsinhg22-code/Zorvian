'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  FaArrowRight,
  FaBullhorn,
  FaChartLine,
  FaEnvelope,
  FaHashtag,
  FaLightbulb,
  FaMousePointer,
  FaRocket,
  FaSearch,
  FaShareAlt,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import SiteFooter from '../SiteFooter';
import {
  marketingTransition,
  marketingViewport,
  staggerContainer,
  staggerItem,
} from '../../../../lib/marketing/motion';

const CHANNELS = [
  {
    icon: FaSearch,
    title: 'SEO Growth',
    desc: 'Technical SEO, content clusters, and authority building that compound over time.',
    accent: 'from-[#0052d4] to-[#00c2ff]',
  },
  {
    icon: FaBullhorn,
    title: 'Paid Media',
    desc: 'High-intent Google & Meta campaigns tuned for CAC, ROAS, and clean attribution.',
    accent: 'from-[#0077dd] to-[#00a8e8]',
  },
  {
    icon: FaShareAlt,
    title: 'Social Brand',
    desc: 'Creative systems, posting cadence, and community loops that keep your brand alive.',
    accent: 'from-[#0088f0] to-[#00c2ff]',
  },
  {
    icon: FaEnvelope,
    title: 'Lifecycle Email',
    desc: 'Nurture sequences, retention flows, and conversion emails that feel personal.',
    accent: 'from-[#003db8] to-[#0088f0]',
  },
  {
    icon: FaMousePointer,
    title: 'Conversion UX',
    desc: 'Landing pages, CRO tests, and funnel friction removal that turn traffic into leads.',
    accent: 'from-[#0052d4] to-[#00a8e8]',
  },
  {
    icon: FaChartLine,
    title: 'Analytics & Insights',
    desc: 'Dashboards, event tracking, and weekly insights so every rupee has a reason.',
    accent: 'from-[#0077dd] to-[#00c2ff]',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Audit & Ambition',
    text: 'We map your funnel, competitors, and brand voice — then lock a measurable growth thesis.',
  },
  {
    step: '02',
    title: 'Creative System',
    text: 'Hooks, offers, and visual language designed as a reusable kit — not one-off posts.',
  },
  {
    step: '03',
    title: 'Launch & Learn',
    text: 'Campaigns go live with tracking, A/B tests, and rapid creative iteration.',
  },
  {
    step: '04',
    title: 'Scale What Wins',
    text: 'Budget shifts to winners. Content compounds. Reporting stays crystal clear.',
  },
];

const STATS = [
  { value: 240, suffix: '%', label: 'Avg. organic lift in 6 months' },
  { value: 3.8, suffix: 'x', label: 'Typical ROAS on paid media' },
  { value: 92, suffix: '%', label: 'Clients renew after quarter one' },
  { value: 48, suffix: 'h', label: 'Creative turnaround window' },
];

const MARQUEE = [
  'SEO',
  'PPC',
  'Content',
  'Social',
  'Email',
  'CRO',
  'Branding',
  'Analytics',
  'Funnel Design',
  'Lead Gen',
];

function CountUp({ value, suffix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  const text = isDecimal ? display.toFixed(1) : Math.round(display).toString();

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

function FloatingOrb({ className, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={className}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 10, 0],
              scale: [1, 1.08, 1],
            }
      }
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function DigitalMarketingContent() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const springProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8fc] pt-[calc(22px+3.5rem)] text-[#0a0a0a]">
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#0052d4] via-[#0088f0] to-[#00c2ff]"
        style={{ scaleX: springProgress }}
        aria-hidden
      />

      {/* HERO */}
      <section ref={heroRef} className="relative isolate min-h-[min(92vh,820px)] overflow-hidden text-white">
        <div className="absolute inset-0 bg-[#05070d]" aria-hidden />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 15% 20%, rgba(0,82,212,0.45), transparent 55%), radial-gradient(ellipse 70% 50% at 85% 10%, rgba(0,194,255,0.28), transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,136,240,0.2), transparent 55%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          }}
          aria-hidden
        />

        <FloatingOrb className="absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-[#0088f0]/25 blur-3xl" delay={0} />
        <FloatingOrb className="absolute right-[12%] top-[30%] h-52 w-52 rounded-full bg-[#00c2ff]/20 blur-3xl" delay={1.2} />
        <FloatingOrb className="absolute bottom-[18%] left-[35%] h-36 w-36 rounded-full bg-[#0052d4]/30 blur-3xl" delay={0.6} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto flex min-h-[min(92vh,820px)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...marketingTransition, delay: 0.05 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7dd3fc] backdrop-blur"
          >
            <FaRocket className="text-[#00c2ff]" aria-hidden />
            Digital Marketing
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...marketingTransition, delay: 0.12 }}
            className="mt-6 max-w-4xl text-balance text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[1.05] tracking-tight"
          >
            Marketing that moves{' '}
            <span className="bg-gradient-to-r from-[#00c2ff] via-[#66d9ff] to-[#0088f0] bg-clip-text text-transparent">
              like your brand
            </span>{' '}
            should.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...marketingTransition, delay: 0.22 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            Strategy, creative, and performance — woven into one growth engine. From SEO and paid media to content
            and conversion, we design campaigns that feel bold and measure clean.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...marketingTransition, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/contact-us" className="ref-cta-primary group">
              Start a growth plan
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0052d4] transition group-hover:translate-x-0.5">
                <FaArrowRight className="text-xs" aria-hidden />
              </span>
            </Link>
            <a
              href="#channels"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Explore channels
            </a>
          </motion.div>

          {/* Floating keyword pills */}
          <div className="pointer-events-none absolute right-4 top-1/2 hidden w-[220px] -translate-y-1/2 flex-col gap-3 lg:flex xl:right-8">
            {['Brand lift', 'Pipeline', 'Retention'].map((label, i) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...marketingTransition, delay: 0.45 + i * 0.12 }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 shadow-[0_12px_40px_-16px_rgba(0,194,255,0.35)] backdrop-blur"
              >
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                  className="mr-2 inline-block h-2 w-2 rounded-full bg-[#00c2ff]"
                />
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/30 backdrop-blur-md">
          <div className="overflow-hidden py-4">
            <div
              className={`marketing-marquee-track gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-[0.22em] text-white/55 ${
                reduceMotion ? '!animate-none' : ''
              }`}
            >
              {[...MARQUEE, ...MARQUEE].map((item, i) => (
                <span key={`${item}-${i}`} className="inline-flex items-center gap-10">
                  {item}
                  <span className="text-[#00c2ff]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 -mt-2 border-b border-slate-200/80 bg-white py-14 sm:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={marketingViewport}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-4 lg:px-8"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center lg:text-left">
              <p className="bg-gradient-to-r from-[#0052d4] to-[#00c2ff] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CHANNELS */}
      <section id="channels" className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(0,136,240,0.08),transparent_45%),radial-gradient(ellipse_at_100%_80%,rgba(0,82,212,0.07),transparent_50%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={staggerItem}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#0052d4]"
            >
              Full-funnel channels
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="ref-section-title mt-3 text-3xl sm:text-4xl lg:text-[2.75rem]"
            >
              Every lever. One creative rhythm.
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              We don&apos;t bolt channels together — we choreograph them so awareness, demand, and retention reinforce
              each other.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {CHANNELS.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.article
                  key={channel.title}
                  variants={staggerItem}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -8, transition: { type: 'spring', stiffness: 320, damping: 22 } }
                  }
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_16px_40px_-24px_rgba(0,82,212,0.2)]"
                >
                  <div
                    className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${channel.accent} opacity-0 blur-2xl transition duration-500 group-hover:opacity-40`}
                    aria-hidden
                  />
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${channel.accent} text-white shadow-lg shadow-sky-500/25`}
                  >
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : { rotate: [0, 6, -6, 0], scale: [1, 1.05, 1] }
                      }
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <Icon className="text-xl" aria-hidden />
                    </motion.span>
                  </div>
                  <h3 className="relative mt-5 text-xl font-bold tracking-tight text-[#0a0a0a]">{channel.title}</h3>
                  <p className="relative mt-2 text-[15px] leading-relaxed text-slate-600">{channel.desc}</p>
                  <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0052d4] transition group-hover:gap-3">
                    Learn more
                    <FaArrowRight className="text-xs" aria-hidden />
                  </span>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CREATIVE STRIP */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white sm:py-24">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#0052d4]/40 blur-[100px]"
          animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#00c2ff]/30 blur-[90px]"
          animate={reduceMotion ? undefined : { scale: [1.1, 0.95, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={marketingViewport}
            transition={marketingTransition}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7dd3fc]">Creative that converts</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
              Scroll-stopping ideas.
              <br />
              <span className="bg-gradient-to-r from-[#00c2ff] to-[#66d9ff] bg-clip-text text-transparent">
                Pipeline-building results.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Hooks, stories, and offers engineered for today&apos;s feeds — then stress-tested against real click,
              lead, and revenue data.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: FaLightbulb, text: 'Concept sprints & offer architecture' },
                { icon: FaHashtag, text: 'Always-on content systems' },
                { icon: FaUsers, text: 'Audience messaging matrices' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-center gap-3 text-[15px] font-medium text-white/90">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#00c2ff]">
                      <Icon aria-hidden />
                    </span>
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={marketingViewport}
            transition={marketingTransition}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-[12%] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur" />
            <motion.div
              className="absolute inset-[22%] flex items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#0052d4] to-[#00c2ff] shadow-[0_30px_80px_-20px_rgba(0,194,255,0.55)]"
              animate={reduceMotion ? undefined : { rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-center">
                <FaStar className="mx-auto text-3xl text-white/90" aria-hidden />
                <p className="mt-3 text-2xl font-bold">Growth Lab</p>
                <p className="mt-1 text-sm text-white/80">Test → Learn → Scale</p>
              </div>
            </motion.div>
            {[
              { label: 'CTR ↑', top: '8%', left: '8%' },
              { label: 'CPL ↓', top: '12%', right: '6%' },
              { label: 'SQL ↑', bottom: '14%', left: '10%' },
              { label: 'LTV ↑', bottom: '10%', right: '8%' },
            ].map((chip, i) => (
              <motion.span
                key={chip.label}
                className="absolute rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-bold tracking-wide text-[#7dd3fc] backdrop-blur"
                style={{ top: chip.top, left: chip.left, right: chip.right, bottom: chip.bottom }}
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 3.2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {chip.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0052d4]">How we work</p>
            <h2 className="ref-section-title mt-3 text-3xl sm:text-4xl">A process with momentum</h2>
            <p className="mt-4 text-slate-600">
              Clear stages, fast feedback loops, and weekly reporting you can actually act on.
            </p>
          </div>

          <div className="relative mt-16">
            <div
              className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[#0052d4] via-[#0088f0] to-[#00c2ff] md:left-1/2 md:block"
              aria-hidden
            />
            <div className="space-y-8 md:space-y-0">
              {STEPS.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={marketingViewport}
                    transition={{ ...marketingTransition, delay: i * 0.06 }}
                    className={`relative md:flex md:items-center md:gap-10 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } md:mb-14`}
                  >
                    <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_18px_44px_-24px_rgba(0,82,212,0.22)] sm:p-8">
                        <p className="text-sm font-bold tracking-[0.16em] text-[#0088f0]">{step.step}</p>
                        <h3 className="mt-2 text-xl font-bold sm:text-2xl">{step.title}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{step.text}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-[#0088f0] shadow-[0_0_0_6px_rgba(0,136,240,0.2)] md:left-1/2 md:block" />
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={marketingViewport}
            transition={marketingTransition}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0052d4] via-[#0077dd] to-[#00c2ff] p-8 text-white shadow-[0_32px_80px_-28px_rgba(0,82,212,0.55)] sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-14"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl"
              animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, 12, 0] }}
              transition={{ duration: 9, repeat: Infinity }}
            />
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Let&apos;s grow</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Ready for a marketing engine that feels this sharp?
              </h2>
              <p className="mt-4 text-base text-white/85">
                Book a discovery call — we&apos;ll audit your funnel and sketch a 90-day growth blueprint.
              </p>
            </div>
            <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col xl:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#0052d4] shadow-lg transition hover:bg-white/95"
              >
                Talk to us
                <FaArrowRight className="text-xs" aria-hidden />
              </Link>
              <a
                href="mailto:amiedhiman@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <FaEnvelope aria-hidden />
                amiedhiman@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
