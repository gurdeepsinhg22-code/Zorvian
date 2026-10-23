'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaExclamationTriangle,
  FaLightbulb,
  FaQuoteLeft,
} from 'react-icons/fa';
import { caseStudies } from '../../../lib/marketing/caseStudies';
import {
  marketingTransition,
  marketingViewport,
  staggerContainer,
  staggerItem,
} from '../../../lib/marketing/motion';

const sectionViewport = { ...marketingViewport, amount: 0.12 };

function Reveal({ children, className = '', delay = 0, variant = 'up' }) {
  const reduceMotion = useReducedMotion();
  const variants = {
    up: { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  };
  const v = variants[variant] || variants.up;

  return (
    <motion.div
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={sectionViewport}
      variants={v}
      transition={{ ...marketingTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ kicker, title, light = false }) {
  return (
    <div className="mb-10 sm:mb-12">
      {kicker ? (
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={sectionViewport}
          transition={marketingTransition}
          className={`text-xs font-bold uppercase tracking-[0.28em] ${
            light ? 'text-cyan-300' : 'text-[var(--brand-primary)]'
          }`}
        >
          {kicker}
        </motion.p>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={{ ...marketingTransition, delay: 0.06 }}
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1] ${
          light ? 'text-white' : 'text-[#0a0a0a]'
        }`}
      >
        {title}
      </motion.h2>
    </div>
  );
}

function FloatingOrb({ className, delay = 0, motionClass = 'cs-orb' }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 0.55, scale: 1 }}
      transition={{ duration: 1.2, delay }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className} ${
        reduceMotion ? '' : motionClass
      }`}
    />
  );
}

export default function CaseStudyDetailContent({ study }) {
  const others = caseStudies.filter((s) => s.slug !== study.slug);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]), {
    stiffness: 90,
    damping: 22,
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const allTech = study.techStack.flatMap((g) => g.items);

  return (
    <div className="overflow-x-hidden">
      {/* ——— Immersive hero ——— */}
      <section
        ref={heroRef}
        className="relative min-h-[min(100vh,920px)] overflow-hidden bg-[#060d18] text-white"
      >
        <FloatingOrb className="left-[5%] top-[12%] h-64 w-64 bg-sky-600/40" />
        <FloatingOrb
          className="right-[8%] top-[28%] h-80 w-80 bg-cyan-500/25"
          motionClass="cs-orb-delayed"
          delay={0.3}
        />
        <FloatingOrb className="bottom-[10%] left-[35%] h-56 w-56 bg-[#00b4d8]/20" delay={0.5} />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:pb-28 lg:pt-12">
          <motion.div style={{ opacity: heroOpacity }}>
            <Link
              href="/case-studies"
              className="group mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Case Studies
            </Link>

            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, ...marketingTransition }}
              className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200"
            >
              {study.category}
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, ...marketingTransition }}
              className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-sky-300/90"
            >
              {study.hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]"
            >
              <span className="bg-gradient-to-r from-white via-white to-cyan-200 bg-clip-text text-transparent cs-title-shimmer">
                {study.hero.headline}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ...marketingTransition }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            >
              {study.hero.subheadline}
            </motion.p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="mt-8 flex flex-wrap gap-2"
            >
              {study.services.map((tag) => (
                <motion.li
                  key={tag}
                  variants={staggerItem}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
                >
                  {tag}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.94, rotateY: -6 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-500/40 via-cyan-400/20 to-transparent opacity-80 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)] sm:rounded-[2rem]">
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d18]/50 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-10 w-[2px] rounded-full bg-gradient-to-b from-cyan-400/80 to-transparent"
          />
        </motion.div>
      </section>

      {/* ——— Overview bento ——— */}
      <section className="relative bg-[#F6FCFF] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle kicker="Project" title="Overview" />
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { label: 'Client', value: study.overview.client },
              { label: 'Location', value: study.overview.location },
              { label: 'Industry', value: study.overview.industry },
              { label: 'Deliverables', value: study.overview.deliverables.join(' · ') },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                whileHover={reduceMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_32px_-12px_rgba(14,39,64,0.1)]"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--brand-primary)]/10 transition-transform duration-500 group-hover:scale-150" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-[#0a0a0a] sm:text-base">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {study.quote ? (
            <Reveal delay={0.15} className="mt-12">
              <motion.blockquote
                whileInView={{ scale: [0.98, 1] }}
                viewport={sectionViewport}
                transition={marketingTransition}
                className="relative overflow-hidden rounded-3xl border border-sky-200/50 bg-white p-8 shadow-[0_24px_60px_-24px_rgba(0,82,212,0.2)] sm:p-12"
              >
                <FaQuoteLeft
                  className="absolute left-6 top-6 text-5xl text-sky-200/80 sm:left-10 sm:top-8 sm:text-6xl"
                  aria-hidden
                />
                <p className="relative z-10 pl-4 text-xl font-medium italic leading-relaxed text-slate-700 sm:pl-8 sm:text-2xl">
                  {study.quote.text}
                </p>
                <footer className="relative z-10 mt-8 flex items-center gap-4 pl-4 sm:pl-8">
                  <div className="h-12 w-1 rounded-full bg-marketing-purple-gradient" />
                  <div>
                    <p className="font-bold text-[#0a0a0a]">{study.quote.author}</p>
                    {study.quote.role ? (
                      <p className="text-sm text-slate-500">{study.quote.role}</p>
                    ) : null}
                  </div>
                </footer>
              </motion.blockquote>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ——— About — dark band ——— */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,180,216,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal variant="left">
            <SectionTitle kicker="About" title="Client" light />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-lg leading-[1.75] text-white/80 sm:text-xl">{study.aboutClient}</p>
          </Reveal>
        </div>
      </section>

      {/* ——— Problems vs Solutions ——— */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle kicker="Project" title="Execution" />
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal variant="left">
              <div className="h-full rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50/90 to-white p-8 sm:p-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <FaExclamationTriangle aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-[#0a0a0a]">Business Problems</h3>
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={sectionViewport}
                  variants={staggerContainer}
                  className="mt-6 space-y-4"
                >
                  {study.problems.map((item) => (
                    <motion.li key={item} variants={staggerItem} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                      <span className="text-sm leading-relaxed text-slate-600 sm:text-base">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.08}>
              <div className="h-full rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50/90 to-white p-8 sm:p-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <FaLightbulb aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-[#0a0a0a]">Our Solutions</h3>
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={sectionViewport}
                  variants={staggerContainer}
                  className="mt-6 space-y-4"
                >
                  {study.solutions.map((item) => (
                    <motion.li key={item} variants={staggerItem} className="flex gap-3">
                      <FaCheck className="mt-1 shrink-0 text-cyan-600" aria-hidden />
                      <span className="text-sm leading-relaxed text-slate-600 sm:text-base">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Timeline approach ——— */}
      <section className="bg-[#FAFCFE] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle kicker="Our" title="Approach" />
          </Reveal>
          <div className="relative">
            <div
              className="absolute bottom-0 left-[1.65rem] top-4 hidden w-px bg-gradient-to-b from-[var(--brand-primary)] via-sky-400/50 to-transparent lg:block"
              aria-hidden
            />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={sectionViewport}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-[1.65rem] top-4 hidden w-px origin-top bg-marketing-purple-gradient lg:block"
            />
            <ol className="space-y-6">
              {study.approach.map((step, idx) => (
                <Reveal key={step.step} delay={idx * 0.06} variant={idx % 2 === 0 ? 'left' : 'right'}>
                  <li className="relative flex gap-6 lg:gap-8">
                    <motion.span
                      whileInView={{ scale: [0.5, 1.15, 1] }}
                      viewport={sectionViewport}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-marketing-purple-gradient text-lg font-bold text-white shadow-lg shadow-sky-500/30"
                    >
                      {step.step}
                    </motion.span>
                    <motion.div
                      whileHover={reduceMotion ? {} : { x: 6 }}
                      className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <h3 className="text-lg font-bold text-[#0a0a0a]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {step.description}
                      </p>
                    </motion.div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ——— Highlights bento ——— */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle title="How We Made It Work" />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {study.highlights.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.08} variant="scale">
                <motion.div
                  whileHover={
                    reduceMotion
                      ? {}
                      : {
                          y: -8,
                          boxShadow: '0 28px 56px -16px rgba(2,105,148,0.22)',
                        }
                  }
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-8 ${
                    idx === 0 ? 'md:col-span-1' : ''
                  }`}
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="text-4xl font-bold text-slate-100">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="relative mt-4 text-lg font-bold text-[#0a0a0a]">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Tech marquee ——— */}
      <section className="overflow-hidden border-y border-slate-200/80 bg-[#0a0a0a] py-14">
        <Reveal className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Technology Stack</p>
        </Reveal>
        <div className="relative mt-8 flex overflow-hidden">
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
          <div className={`flex shrink-0 gap-4 ${reduceMotion ? '' : 'cs-marquee-track'}`}>
            {[...allTech, ...allTech].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:grid-cols-3 sm:px-6"
        >
          {study.techStack.map((group) => (
            <motion.div
              key={group.group}
              variants={staggerItem}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">{group.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li key={tech} className="text-sm text-white/75">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ——— Results ——— */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTitle kicker="Results &" title="Achievements" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {study.results.map((result, idx) => (
              <Reveal key={result.title} delay={idx * 0.07} variant={idx % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  whileHover={reduceMotion ? {} : { scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#162d4a] p-8 text-white"
                >
                  <span className="text-5xl font-bold text-white/10">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-xl font-bold">{result.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{result.description}</p>
                  <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[var(--brand-primary)]/20 blur-2xl" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Conclusion CTA ——— */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/80 via-[#F6FCFF] to-cyan-100/60" />
        <FloatingOrb className="left-[10%] top-[20%] h-48 w-48 bg-sky-400/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal variant="scale">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-10 text-center shadow-xl backdrop-blur-md sm:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl">Conclusion</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{study.conclusion}</p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact-us" className="ref-cta-primary mt-10 inline-flex items-center gap-2">
                  Discuss your project
                  <FaArrowRight className="text-sm" aria-hidden />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— More case studies ——— */}
      {others.length > 0 ? (
        <section className="border-t border-slate-200 bg-[#FAFCFE] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <SectionTitle kicker="More" title="Case Studies" />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((other, idx) => (
                <Reveal key={other.slug} delay={idx * 0.1}>
                  <Link href={`/case-studies/${other.slug}`} className="group block">
                    <motion.article
                      whileHover={reduceMotion ? {} : { y: -6 }}
                      className="flex gap-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                    >
                      <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={other.image}
                          alt=""
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          sizes="144px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 py-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                          {other.category}
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-[#0a0a0a] transition-colors group-hover:text-[var(--brand-primary)]">
                          {other.title}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
                          Discover case
                          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </motion.article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
