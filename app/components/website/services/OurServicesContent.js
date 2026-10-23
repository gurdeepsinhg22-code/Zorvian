'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  FaArrowRight,
  FaBullhorn,
  FaCheck,
  FaDesktop,
  FaLaptopCode,
  FaMobileAlt,
  FaShoppingCart,
  FaTachometerAlt,
  FaTools,
} from 'react-icons/fa';
import Animate from '../Animate';
import InnerPageHeroBanner from '../InnerPageHeroBanner';
import SiteFooter from '../SiteFooter';
import { marketingViewport, staggerContainer, staggerItem } from '../../../../lib/marketing/motion';

const MARQUEE = [
  'Digital Marketing',
  'Digital Solutions',
  'Mobile Innovation',
  'Smart Commerce',
  'Cloud Applications',
  'Platform Care',
  'Core Web Vitals',
  'Custom Software',
];

const SERVICES = [
  {
    slug: 'digital-marketing',
    href: '/digital-marketing',
    title: 'Digital Marketing',
    desc: 'SEO, paid media, social, email, and CRO — creative campaigns engineered to grow pipeline.',
    points: ['Full-funnel strategy', 'Creative systems', 'Performance tracking'],
    icon: FaBullhorn,
    accent: 'from-[#0052d4] to-[#00c2ff]',
    iconClass: 'text-[#0052d4]',
    tag: 'Growth',
  },
  {
    slug: 'website-development',
    title: 'Digital Solutions',
    desc: 'Custom business websites and landing pages built with modern, performance-first stacks.',
    points: ['Responsive design', 'SEO-ready structure', 'CMS integration'],
    icon: FaDesktop,
    accent: 'from-sky-500 to-cyan-500',
    iconClass: 'text-sky-600',
    tag: 'Web',
  },
  {
    slug: 'mobile-applications',
    title: 'Mobile Innovation',
    desc: 'Native-feel Android and iOS experiences with intuitive UI and secure backends.',
    points: ['Cross-platform builds', 'App store ready', 'Offline-friendly flows'],
    icon: FaMobileAlt,
    accent: 'from-blue-500 to-sky-400',
    iconClass: 'text-blue-600',
    tag: 'Mobile',
  },
  {
    slug: 'e-commerce-solutions',
    title: 'Smart Commerce',
    desc: 'Online stores with secure checkout, inventory tools, and conversion-focused UX.',
    points: ['Payment gateways', 'Product catalogs', 'Order management'],
    icon: FaShoppingCart,
    accent: 'from-cyan-400 to-sky-500',
    iconClass: 'text-cyan-600',
    tag: 'Commerce',
  },
  {
    slug: 'web-application-development',
    title: 'Cloud Applications',
    desc: 'Scalable dashboards, portals, and internal tools tailored to your workflows.',
    points: ['API integrations', 'Role-based access', 'Cloud deployment'],
    icon: FaLaptopCode,
    accent: 'from-blue-600 to-cyan-400',
    iconClass: 'text-blue-700',
    tag: 'Apps',
  },
  {
    slug: 'website-maintenance-support',
    title: 'Platform Care',
    desc: 'Proactive updates, monitoring, and fixes so your site stays secure and online.',
    points: ['Security patches', 'Backups', 'Priority support'],
    icon: FaTools,
    accent: 'from-cyan-400 to-blue-500',
    iconClass: 'text-blue-600',
    tag: 'Care',
  },
  {
    slug: 'speed-optimization-performance',
    title: 'Core Web Vitals',
    desc: 'Faster load times, better Core Web Vitals, and improved search visibility.',
    points: ['Caching strategy', 'Image optimization', 'Performance audits'],
    icon: FaTachometerAlt,
    accent: 'from-blue-500 to-sky-600',
    iconClass: 'text-sky-600',
    tag: 'Speed',
  },
];

const WHY_US = [
  'Dedicated project lead from day one',
  'Transparent timelines and milestones',
  'Healthcare & enterprise-ready practices',
  'Post-launch support and optimization',
];

function AnimatedCounter({ value, suffix = '' }) {
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
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function ServiceMarquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-slate-200/80 bg-white py-4">
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

function ServiceCard({ service }) {
  const Icon = service.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[var(--marketing-shadow-card)]"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${service.accent}`} aria-hidden />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className={`inline-flex rounded-full bg-gradient-to-br ${service.accent} p-[2px]`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
              <Icon className={`text-lg ${service.iconClass}`} aria-hidden />
            </span>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">
            {service.tag}
          </span>
        </div>
        <h3 className="ref-section-title mt-5 text-lg leading-snug sm:text-xl">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--marketing-ink-muted,#5c6677)]">
          {service.desc}
        </p>
        <ul className="mt-4 space-y-1.5">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <FaCheck className="shrink-0 text-[10px] text-[var(--brand-primary)]" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        <Link
          href={service.href || `/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0052d4] transition group-hover:gap-3"
        >
          Explore service
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-[#0052d4] transition group-hover:bg-marketing-purple-gradient group-hover:text-white">
            <FaArrowRight className="text-[10px]" aria-hidden />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

export default function OurServicesContent() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#0a0a0a] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner
        title="Our Services"
        breadcrumbCurrent="Our Services"
        subtitle="From websites to web apps—creative, secure, and scalable digital solutions for healthcare and business."
      />

      <ServiceMarquee />

      {/* Intro + stats */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,82,212,0.06),transparent_50%),radial-gradient(ellipse_at_0%_80%,rgba(0,180,216,0.08),transparent_45%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Animate variant="left">
              <p className="ref-kicker text-sm">
                <span className="ref-kicker-line" aria-hidden />
                What we offer
              </p>
              <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
                Professional services that scale with you
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                Whether you need a marketing site, a patient portal, or performance tuning—we deliver with clear
                milestones and measurable outcomes.
              </p>
            </Animate>

            <motion.ul
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={marketingViewport}
            >
              {[
                { value: 6, suffix: '', label: 'Core service lines' },
                { value: 150, suffix: '+', label: 'Projects delivered' },
                { value: 98, suffix: '%', label: 'Client satisfaction' },
                { value: 24, suffix: '/7', label: 'Support available' },
              ].map((stat) => (
                <motion.li
                  key={stat.label}
                  variants={staggerItem}
                  className="hover-lift rounded-2xl border border-slate-100 bg-slate-50/80 p-5"
                >
                  <p className="text-3xl font-bold text-[#0a0a0a]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Services — one row on 2xl, scroll on smaller */}
      <section className="relative bg-[#f4f5f9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <div className="mx-auto max-w-3xl text-center">
              <p className="ref-kicker justify-center text-sm">
                <span className="ref-kicker-line" aria-hidden />
                Our expertise
              </p>
              <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl">
                Six ways we help you grow online
              </h2>
            </div>
          </Animate>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
          >
            {SERVICES.map((service, idx) => (
              <motion.div key={service.slug} variants={staggerItem}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <Animate variant="left">
              <p className="ref-kicker text-sm">
                <span className="ref-kicker-line" aria-hidden />
                Why Zorvian Digital Solutions
              </p>
              <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl">
                Built for clarity, speed, and long-term partnership
              </h2>
            </Animate>
            <motion.ul
              className="grid gap-4 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={marketingViewport}
            >
              {WHY_US.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerItem}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#F6FCFF] p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF9FD] text-[var(--brand-primary)]">
                    <FaCheck className="text-[10px]" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-slate-700">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Animate variant="up" delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <Link href="/our-process" className="ref-cta-primary sheen-hover inline-flex items-center gap-2">
                See our process
                <FaArrowRight className="text-xs" aria-hidden />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] transition hover:border-sky-200 hover:bg-sky-50"
              >
                Get a quote
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#F6FCFF] py-20 sm:py-24">
        <Animate variant="up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] bg-marketing-purple-gradient p-8 text-white shadow-[0_28px_70px_-24px_rgba(0,82,212,0.5)] sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Start a project</p>
                <h3 className="mt-3 max-w-xl text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Ready to build something that performs?
                </h3>
                <p className="mt-4 max-w-lg text-base text-white/85">
                  Tell us your goals—we&apos;ll recommend the right mix of design, development, and ongoing support.
                </p>
              </div>
              <motion.div whileHover={reduceMotion ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0052d4] shadow-lg lg:mt-0"
                >
                  Contact us today
                  <FaArrowRight className="text-xs" aria-hidden />
                </Link>
              </motion.div>
            </div>
          </div>
        </Animate>
      </section>

      <SiteFooter />
    </main>
  );
}
