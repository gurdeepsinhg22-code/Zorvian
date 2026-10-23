'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  FaArrowRight,
  FaCheck,
  FaClipboardCheck,
  FaCode,
  FaEye,
  FaPaintBrush,
  FaRocket,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';
import { processPrinciples, processSteps } from '../../../lib/marketing/processSteps';
import { marketingTransition, marketingViewport, staggerContainer, staggerItem } from '../../../lib/marketing/motion';

const STEP_ICONS = [FaClipboardCheck, FaPaintBrush, FaCode, FaRocket];
const PRINCIPLE_ICONS = { users: FaUsers, eye: FaEye, shield: FaShieldAlt };

const sectionViewport = { ...marketingViewport, amount: 0.12 };

function Reveal({ children, className = '', delay = 0, variant = 'up' }) {
  const reduceMotion = useReducedMotion();
  const variants = {
    up: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
    left: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={sectionViewport}
      variants={variants[variant] || variants.up}
      transition={{ ...marketingTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrbs() {
  return (
    <>
      <div className="process-float-slow pointer-events-none absolute left-[8%] top-[12%] h-24 w-24 rounded-full bg-sky-400/20 blur-2xl" aria-hidden />
      <div className="process-float-delayed pointer-events-none absolute right-[10%] top-[28%] h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" aria-hidden />
      <div className="process-float-slow pointer-events-none absolute bottom-[20%] left-[15%] h-20 w-20 rounded-full bg-sky-400/15 blur-2xl" aria-hidden />
    </>
  );
}

function RoadmapPath({ progress }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[120px] -translate-x-1/2 lg:block"
      viewBox="0 0 120 1000"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="processGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0052d4" />
          <stop offset="35%" stopColor="#00a8e8" />
          <stop offset="70%" stopColor="#0077dd" />
          <stop offset="100%" stopColor="#00c2ff" />
        </linearGradient>
        <filter id="processGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M60 0 L60 1000"
        fill="none"
        stroke="rgba(148,163,184,0.25)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <motion.path
        d="M60 0 C60 100 20 140 20 250 C20 360 100 400 100 500 C100 600 20 640 20 750 C20 860 60 900 60 1000"
        fill="none"
        stroke="url(#processGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#processGlow)"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        style={{ pathLength: reduceMotion ? 1 : progress }}
      />
    </svg>
  );
}

function JourneyStrip({ activeIndex }) {
  return (
    <div className="mb-12 hidden lg:block">
      <div className="relative flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-lg backdrop-blur-sm">
        <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-100" aria-hidden />
        <motion.div
          className="absolute left-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0052d4] via-[#00a8e8] to-[#00c2ff]"
          initial={{ width: '0%' }}
          animate={{ width: `${(activeIndex / (processSteps.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ maxWidth: 'calc(100% - 2rem)' }}
          aria-hidden
        />
        {processSteps.map((step, i) => {
          const Icon = STEP_ICONS[i];
          const isActive = i <= activeIndex;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 px-2">
              <motion.div
                className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 text-white shadow-md transition-colors ${
                  isActive ? 'border-white' : 'border-slate-200 bg-slate-100 text-slate-400'
                }`}
                style={isActive ? { backgroundColor: step.accent, boxShadow: `0 8px 24px ${step.glow}` } : undefined}
                animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: isActive && i === activeIndex ? Infinity : 0 }}
              >
                <Icon className="text-sm" />
              </motion.div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                {step.step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepNode({ index, isLast, isActive }) {
  const step = processSteps[index];
  const Icon = STEP_ICONS[index] || FaClipboardCheck;
  const isLeft = index % 2 === 0;
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      variants={staggerItem}
      className={`relative grid gap-8 lg:grid-cols-2 lg:gap-14 lg:py-6 ${isActive ? 'process-step-active' : ''}`}
    >
      <div
        className="absolute left-1/2 top-10 z-20 hidden -translate-x-1/2 lg:flex lg:flex-col lg:items-center"
        aria-hidden
      >
        <motion.div
          className="process-roadmap-node relative flex h-16 w-16 items-center justify-center rounded-2xl border-[3px] border-white text-white"
          style={{
            backgroundColor: step.accent,
            boxShadow: `0 0 0 6px ${step.glow}, 0 16px 40px ${step.glow}`,
          }}
          animate={reduceMotion || !isActive ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="text-2xl" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-800 shadow">
            {index + 1}
          </span>
        </motion.div>
        <span className="mt-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 shadow-sm">
          {step.duration}
        </span>
        {!isLast && <div className="process-roadmap-pulse mt-4 h-2 w-2 rounded-full" style={{ backgroundColor: step.accent }} />}
      </div>

      <div className="absolute left-3 top-10 z-10 flex flex-col items-center lg:hidden" aria-hidden>
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-white text-white shadow-lg"
          style={{ backgroundColor: step.accent, boxShadow: `0 8px 24px ${step.glow}` }}
        >
          <Icon className="text-lg" />
        </div>
        {!isLast && (
          <div
            className="mt-2 w-0.5 flex-1 min-h-[5rem] rounded-full opacity-60"
            style={{ background: `linear-gradient(to bottom, ${step.accent}, transparent)` }}
          />
        )}
      </div>

      <div className={[ 'pl-14 lg:pl-0', isLeft ? 'lg:col-start-1 lg:pr-20 lg:text-right' : 'lg:col-start-2 lg:pl-20' ].join(' ')}>
        <article className="process-step-card group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)] sm:p-8 lg:max-w-xl">
          <div
            className="process-shimmer-border pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ '--step-accent': step.accent }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-4 -top-6 select-none text-[7rem] font-black leading-none text-slate-100 sm:text-[8rem]"
            aria-hidden
          >
            {step.step}
          </span>
          <div className="relative">
            <div className={`flex flex-wrap items-center gap-2 ${isLeft ? 'lg:justify-end' : ''}`}>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                style={{ backgroundColor: step.accent }}
              >
                Phase {step.step}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {step.duration}
              </span>
            </div>
            <p className={`mt-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-400 ${isLeft ? 'lg:text-right' : ''}`}>
              {step.tagline}
            </p>
            <h3 className={`mt-2 text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-[1.75rem] ${isLeft ? 'lg:text-right' : ''}`}>
              {step.title}
            </h3>
            <p className={`mt-4 text-base leading-relaxed text-slate-600 ${isLeft ? 'lg:text-right' : ''}`}>{step.description}</p>
            <ul className={`mt-6 flex flex-wrap gap-2 ${isLeft ? 'lg:justify-end' : ''}`}>
              {step.deliverables.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-gradient-to-br from-slate-50 to-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                >
                  <FaCheck className="shrink-0 text-[10px]" style={{ color: step.accent }} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <div className={[ 'pl-14 lg:pl-0', isLeft ? 'lg:col-start-2 lg:pl-20' : 'lg:col-start-1 lg:pr-20' ].join(' ')}>
        <motion.div
          className="process-image-frame relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/10]"
          whileHover={{ scale: 1.02, rotate: isLeft ? 1 : -1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div
            className="absolute inset-0 z-10 rounded-3xl ring-1 ring-inset ring-white/20"
            aria-hidden
          />
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 520px"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/70 via-[#0a0a0a]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Milestone</p>
            <p className="mt-1 text-lg font-bold text-white sm:text-xl">{step.tagline}</p>
          </div>
          <motion.div
            className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-white backdrop-blur-md"
            animate={reduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon className="text-xl" />
          </motion.div>
        </motion.div>
      </div>
    </motion.li>
  );
}

export default function OurProcessRoadmap() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.25'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      const idx = Math.min(processSteps.length - 1, Math.floor(v * processSteps.length));
      setActiveStep(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const titleY = useTransform(smoothProgress, [0, 0.15], [0, -8]);

  return (
    <>
      {/* Intro — rich gradient band */}
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f5f0ff_0%,#eef8ff_40%,#fff8f0_100%)]" aria-hidden />
        <div className="process-roadmap-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <FloatingOrbs />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <p className="ref-kicker">
                <span className="ref-kicker-line" aria-hidden />
                How we work
              </p>
            </div>
            <motion.h2
              style={reduceMotion ? undefined : { y: titleY }}
              className="process-gradient-title mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
            >
              Your creative roadmap to launch
            </motion.h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
              Four connected phases — each with clear deliverables, demos, and checkpoints — so your project never loses
              momentum.
            </p>
          </Reveal>

          <motion.div
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
          >
            {[
              { label: 'Phases', value: '4', sub: 'Structured' },
              { label: 'Visibility', value: '100%', sub: 'Transparent' },
              { label: 'Reviews', value: 'Weekly', sub: 'Check-ins' },
              { label: 'Support', value: '24/7', sub: 'After launch' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="process-stat-card group relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-5 text-center shadow-[0_12px_40px_-12px_rgba(0,82,212,0.2)] backdrop-blur-sm"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 transition group-hover:opacity-100"
                  aria-hidden
                />
                <p className="relative text-2xl font-bold text-[#0052d4] sm:text-3xl">{stat.value}</p>
                <p className="relative mt-1 text-sm font-bold text-slate-800">{stat.label}</p>
                <p className="relative text-[10px] font-semibold uppercase tracking-wider text-slate-400">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-[#0a0a0a] sm:text-3xl">Built on three principles</h3>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">How we keep every engagement predictable and enjoyable.</p>
          </Reveal>
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
          >
            {processPrinciples.map((p, i) => {
              const PIcon = PRINCIPLE_ICONS[p.icon] || FaShieldAlt;
              const accents = ['#0052d4', '#00a8e8', '#00c2ff'];
              return (
                <motion.div
                  key={p.title}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition group-hover:scale-110"
                    style={{ backgroundColor: accents[i] }}
                  >
                    <PIcon className="text-lg" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0a0a0a]">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section
        ref={containerRef}
        className="process-roadmap-section relative overflow-hidden bg-[#0a0a0a] py-16 sm:py-20 md:py-28"
      >
        <div className="process-roadmap-grid pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,82,212,0.25),transparent)]" aria-hidden />
        <FloatingOrbs />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-6 text-center lg:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">The journey</p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-4xl">Scroll the roadmap</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400 sm:text-base">
              Watch the path light up as you move through each phase of your project.
            </p>
          </Reveal>

          <JourneyStrip activeIndex={activeStep} />
          {!reduceMotion && <RoadmapPath progress={smoothProgress} />}

          <motion.ol
            className="relative space-y-20 sm:space-y-24 lg:space-y-32"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
          >
            {processSteps.map((_, index) => (
              <StepNode
                key={processSteps[index].id}
                index={index}
                isLast={index === processSteps.length - 1}
                isActive={index <= activeStep}
              />
            ))}
          </motion.ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-marketing-purple-gradient" aria-hidden />
        <div className="process-cta-pattern pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
              Start your project
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.5rem]">
              Let&apos;s map your roadmap together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              Share your vision — we&apos;ll respond with a tailored plan, timeline, and next steps within one business day.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0052D4] shadow-xl transition hover:scale-[1.02] hover:shadow-2xl"
              >
                Get a free consultation
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
