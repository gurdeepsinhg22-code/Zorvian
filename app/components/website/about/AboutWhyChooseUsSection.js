'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaChartLine,
  FaCode,
  FaMobileAlt,
  FaRocket,
  FaShieldAlt,
  FaUsersCog,
} from 'react-icons/fa';
import Animate from '../Animate';
import {
  marketingTransition,
  marketingViewport,
  staggerContainer,
  staggerItem,
} from '../../../../lib/marketing/motion';

const REASONS = [
  {
    icon: FaCode,
    title: 'Websites & applications',
    desc: 'Corporate sites, web apps, mobile, e-commerce, and cloud platforms tailored to your goals.',
    bar: 'bg-cyan-500',
    iconTone: 'bg-cyan-50 text-cyan-700',
  },
  {
    icon: FaShieldAlt,
    title: 'Security built in',
    desc: 'Secure architecture, encryption, and best-practice controls on every project.',
    bar: 'bg-sky-500',
    iconTone: 'bg-sky-50 text-sky-700',
  },
  {
    icon: FaUsersCog,
    title: 'End-to-end partnership',
    desc: 'Strategy, design, development, and optimization—from discovery through launch.',
    bar: 'bg-blue-500',
    iconTone: 'bg-blue-50 text-blue-700',
  },
  {
    icon: FaRocket,
    title: 'Faster time to market',
    desc: 'Agile delivery and proven playbooks so you ship on schedule without cutting quality.',
    bar: 'bg-[#0088f0]',
    iconTone: 'bg-sky-50 text-sky-700',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile-ready experiences',
    desc: 'Responsive UI and native-feel apps that work beautifully on every device.',
    bar: 'bg-sky-500',
    iconTone: 'bg-sky-50 text-sky-700',
  },
  {
    icon: FaChartLine,
    title: 'Measurable outcomes',
    desc: 'Performance, conversions, and engagement tracked so progress stays visible.',
    bar: 'bg-sky-500',
    iconTone: 'bg-sky-50 text-sky-700',
  },
];

const STATS = [
  { value: '12+', label: 'Years' },
  { value: '500+', label: 'Projects' },
  { value: '99.9%', label: 'Uptime' },
];

const TRUST_TAGS = [
  'Websites',
  'Web apps',
  'Mobile',
  'E-commerce',
  'Cloud',
  'Performance',
];

function ReasonCard({ item, index }) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;

  return (
    <motion.article
      variants={staggerItem}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_-14px_rgba(15,23,42,0.12)] transition-shadow duration-300 hover:shadow-[0_20px_44px_-16px_rgba(0,82,212,0.15)]"
    >
      <div className={`h-1 w-full ${item.bar} opacity-80 transition-opacity group-hover:opacity-100`} aria-hidden />
      <div className="flex flex-1 gap-4 p-5 sm:p-5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconTone} transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className="text-base" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-bold leading-snug text-[#0a0a0a] sm:text-base">{item.title}</h3>
            <span className="shrink-0 font-mono text-[10px] font-bold text-slate-300">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutWhyChooseUsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
      aria-labelledby="why-choose-us-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(0,180,216,0.07),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(0,82,212,0.06),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Animate variant="left" className="max-w-2xl lg:flex-1">
            <p className="ref-kicker text-sm">
              <span className="ref-kicker-line" aria-hidden />
              Why choose us
            </p>
            <h2
              id="why-choose-us-heading"
              className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.65rem] md:leading-[1.12]"
            >
              Why choose Zorvian Digital Solutions
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
              We build every kind of website and application—with aligned delivery and support after launch.
            </p>
          </Animate>

          <Animate variant="right" delay={0.08} className="lg:shrink-0">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {TRUST_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-slate-200 bg-[#FAFCFE] px-3.5 py-1.5 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Animate>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <Animate variant="left" className="flex flex-col gap-5 lg:col-span-5">
            <motion.div
              className="relative min-h-[280px] flex-1 overflow-hidden rounded-3xl border border-slate-200/90 shadow-[0_24px_56px_-28px_rgba(14,39,64,0.22)] sm:min-h-[340px]"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={marketingViewport}
              transition={marketingTransition}
            >
              <Image
                src="/assets/images/new/5.jpg"
                alt="Team collaborating on a digital product"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-[#0a0a0a]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200/90">
                  Full-stack digital partner
                </p>
                <p className="mt-2 max-w-xs text-lg font-bold leading-snug text-white sm:text-xl">
                  From idea to launch—and everything after.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-[#FAFCFE] px-3 py-4 text-center sm:px-4"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={marketingViewport}
                  transition={{ ...marketingTransition, delay: 0.1 + i * 0.08 }}
                >
                  <p className="text-xl font-bold text-[#0a0a0a] sm:text-2xl">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500 sm:text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Animate>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
          >
            {REASONS.map((item, i) => (
              <ReasonCard key={item.title} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
