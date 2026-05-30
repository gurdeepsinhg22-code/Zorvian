'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  FaBullseye,
  FaChartLine,
  FaEye,
  FaHandshake,
  FaPaintBrush,
  FaShieldAlt,
} from 'react-icons/fa';
import Animate from '../Animate';
import { marketingViewport, staggerContainer, staggerItem } from '../../../../lib/marketing/motion';

const MISSION = {
  title: 'Our mission',
  text:
    'To help businesses grow online with high-performance websites, web applications, and custom digital products—delivered with clarity, quality, and care.',
};

const VISION = {
  title: 'Our vision',
  text:
    'To be the go-to technology partner for organizations of every size—where great design, clean code, and scalable platforms drive lasting digital success.',
};

const VALUES = [
  {
    icon: FaPaintBrush,
    title: 'User-centered design',
    desc: 'Every interface we craft starts with real users—clear journeys, accessible layouts, and experiences that convert.',
    tone: 'from-rose-500/15 to-orange-400/10 text-rose-600',
  },
  {
    icon: FaShieldAlt,
    title: 'Security by default',
    desc: 'Secure hosting, encrypted data paths, and modern hardening practices woven into every build from day one.',
    tone: 'from-cyan-500/15 to-sky-400/10 text-cyan-700',
  },
  {
    icon: FaChartLine,
    title: 'Measurable outcomes',
    desc: 'We track speed, engagement, and business KPIs so improvements are visible—not assumed.',
    tone: 'from-violet-500/15 to-purple-400/10 text-violet-700',
  },
  {
    icon: FaHandshake,
    title: 'True partnership',
    desc: 'Implementation, training, and ongoing optimization—we stay engaged long after go-live.',
    tone: 'from-emerald-500/15 to-teal-400/10 text-emerald-700',
  },
];

export default function AboutMissionVisionValuesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#f4f5f9] py-18 sm:py-22" aria-labelledby="mission-vision-values-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,180,216,0.06),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(90,28,203,0.06),transparent_50%)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Animate variant="down">
          <div className="mx-auto max-w-3xl text-center">
            <p className="ref-kicker mx-auto inline-flex text-sm">
              <span className="ref-kicker-line" aria-hidden />
              Who we are
            </p>
            <h2
              id="mission-vision-values-heading"
              className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-5xl"
            >
              Mission, Vision &amp; Values
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
              The principles that guide how we design, build, and support websites and applications every day.
            </p>
          </div>
        </Animate>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Animate variant="left">
            <article className="h-full rounded-3xl bg-white p-7 shadow-[var(--marketing-shadow-card)] ring-1 ring-slate-100 sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/15 to-sky-400/10 text-cyan-700">
                <FaBullseye className="text-lg" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#0E2238] sm:text-2xl">{MISSION.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{MISSION.text}</p>
            </article>
          </Animate>

          <Animate variant="right" delay={0.08}>
            <article className="h-full rounded-3xl bg-white p-7 shadow-[var(--marketing-shadow-card)] ring-1 ring-slate-100 sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-purple-400/10 text-violet-700">
                <FaEye className="text-lg" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#0E2238] sm:text-2xl">{VISION.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{VISION.text}</p>
            </article>
          </Animate>
        </div>

        <Animate variant="up" delay={0.12}>
          <h3 className="mt-14 text-center text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand-primary)] sm:mt-16">
            Our values
          </h3>
        </Animate>

        <motion.div
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
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
                <h4 className="text-lg font-bold text-[#0E2238]">{item.title}</h4>
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
  );
}
