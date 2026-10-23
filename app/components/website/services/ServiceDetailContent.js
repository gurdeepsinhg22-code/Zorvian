'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaArrowRight,
  FaCheck,
  FaChevronDown,
  FaLightbulb,
  FaRocket,
  FaTools,
  FaUsers,
} from 'react-icons/fa';
import Animate from '../Animate';
import InnerPageHeroBanner from '../InnerPageHeroBanner';
import SiteFooter from '../SiteFooter';
import { PROVIDE_ITEM_ICONS } from '../../../../lib/marketing/serviceProvideIcons';
import { marketingViewport, staggerContainer, staggerItem } from '../../../../lib/marketing/motion';

function FaqList({ faqs, accent }) {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={faq.q}
            layout={reduceMotion ? false : 'position'}
            className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
              isOpen ? 'border-sky-300 shadow-md' : 'border-slate-200 shadow-sm'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              aria-expanded={isOpen}
            >
              <span className="text-base font-bold leading-snug text-[#0a0a0a] sm:text-lg">{faq.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${accent.pill}`}
              >
                <FaChevronDown className="text-sm" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="border-t border-slate-100 px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-base">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ServiceDetailContent({ page, related }) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#0a0a0a] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner
        title={page.title}
        breadcrumbCurrent={page.title}
        subtitle={page.subtitle}
      />

      {/* Overview */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${page.accent.glow} to-transparent`}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Animate variant="left">
              <p className="ref-kicker text-sm">
                <span className="ref-kicker-line" aria-hidden />
                Service overview
              </p>
              <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
                {page.sectionTitle ?? page.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                {page.description}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)]">
                {page.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact-us" className="ref-cta-primary sheen-hover inline-flex items-center gap-2">
                  Start project
                  <FaArrowRight className="text-xs" aria-hidden />
                </Link>
                <Link
                  href="/our-services"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:border-sky-200 hover:bg-sky-50"
                >
                  All services
                </Link>
              </div>
            </Animate>

            <Animate variant="right" delay={0.1}>
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[var(--marketing-shadow-card)] sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0052d4]">At a glance</p>
                <ul className="mt-5 space-y-4">
                  {page.outcomes.slice(0, 3).map((item) => (
                    <li key={item.title} className="flex items-stretch gap-3">
                      <span className={`w-1 shrink-0 rounded-full ${page.accent.bar}`} aria-hidden />
                      <div className="min-w-0 flex-1 py-0.5">
                        <p className="font-semibold leading-snug text-[#0a0a0a]">{item.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* What we provide */}
      <section className="relative bg-[#f4f5f9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <p className="ref-kicker text-sm">
              <span className="ref-kicker-line" aria-hidden />
              Capabilities
            </p>
            <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl">{page.whatWeProvideTitle}</h2>
            {page.whatWeProvideIntro ? (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                {page.whatWeProvideIntro}
              </p>
            ) : null}
          </Animate>

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
          >
            {page.provideItems.map((item) => {
              const Icon = item.iconKey ? PROVIDE_ITEM_ICONS[item.iconKey] : FaTools;
              return (
                <motion.article
                  key={item.title}
                  variants={staggerItem}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_20px_45px_-18px_rgba(0,82,212,0.15)]"
                >
                  <div className={`inline-flex rounded-2xl bg-gradient-to-br ${page.accent.gradient} p-[2px]`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white text-sky-700">
                      <Icon className="text-lg" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0a0a0a]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.text}</p>
                </motion.article>
              );
            })}
          </motion.div>

          {page.secondProvideTitle && page.provideBullets?.length ? (
            <Animate variant="up" delay={0.1}>
              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h3 className="text-xl font-bold text-[#0a0a0a]">{page.secondProvideTitle}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {page.provideBullets.map((line) => (
                    <li key={line} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <FaCheck className="shrink-0 text-[var(--brand-primary)]" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          ) : null}
        </div>
      </section>

      {/* NEW: Delivery process */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="process-roadmap-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <div className="mx-auto max-w-2xl text-center">
              <p className="ref-kicker justify-center text-sm">
                <span className="ref-kicker-line" aria-hidden />
                How we deliver
              </p>
              <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl">A clear path from idea to launch</h2>
            </div>
          </Animate>

          <motion.ol
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
          >
            {page.steps.map((step) => (
              <motion.li
                key={step.step}
                variants={staggerItem}
                className="relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm"
              >
                <span className={`font-mono text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${page.accent.gradient}`}>
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[#0a0a0a]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* NEW: Outcomes */}
      <section className="relative bg-[#0a0a0a] py-16 text-white sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 20% 0%, rgba(0,180,216,0.25), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(0,82,212,0.3), transparent 45%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <div className="flex items-center gap-3">
              <FaRocket className="text-cyan-300" aria-hidden />
              <h2 className="text-3xl font-bold sm:text-4xl">Outcomes you can measure</h2>
            </div>
          </Animate>
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={marketingViewport}
          >
            {page.outcomes.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <FaCheck className="text-cyan-300" aria-hidden />
                <h3 className="mt-3 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sky-100/85">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEW: Ideal for + Tech stack */}
      <section className="relative bg-[#f4f5f9] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Animate variant="left">
              <div className="flex items-center gap-2">
                <FaUsers className="text-[#0052d4]" aria-hidden />
                <h2 className="text-2xl font-bold text-[#0a0a0a] sm:text-3xl">Ideal for</h2>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {page.idealFor.map((label) => (
                  <li
                    key={label}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold ${page.accent.pill}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </Animate>
            <Animate variant="right" delay={0.08}>
              <div className="flex items-center gap-2">
                <FaLightbulb className="text-[var(--brand-primary)]" aria-hidden />
                <h2 className="text-2xl font-bold text-[#0a0a0a] sm:text-3xl">Tools & stack</h2>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {page.techStack.map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </Animate>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="relative bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="scale">
            <div className="overflow-hidden rounded-3xl border border-sky-200/60 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[#0a0a0a] sm:text-3xl">{page.challengeTitle}</h2>
              <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700 sm:text-lg">{page.challenge}</p>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-[#f4f5f9] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <h2 className="ref-section-title text-center text-3xl sm:text-4xl">{page.faqTitle}</h2>
          </Animate>
          <div className="mt-10">
            <FaqList faqs={page.faqs} accent={page.accent} />
          </div>
        </div>
      </section>

      {/* NEW: Related services */}
      {related.length > 0 ? (
        <section className="relative bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Animate variant="down">
              <h2 className="ref-section-title text-2xl sm:text-3xl">Explore more services</h2>
              <p className="mt-2 text-slate-600">Other ways we help teams grow digitally.</p>
            </Animate>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((item, idx) => (
                <Animate key={item.slug} variant="up" delay={idx * 0.08}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md"
                  >
                    <h3 className="text-lg font-bold text-[#0a0a0a] group-hover:text-[#0052d4]">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0052d4]">
                      View service
                      <FaArrowRight className="text-xs transition group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#F6FCFF] py-16 sm:py-20">
        <Animate variant="up">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] bg-marketing-purple-gradient p-8 text-white shadow-[0_28px_70px_-24px_rgba(0,82,212,0.5)] sm:flex sm:items-center sm:justify-between sm:gap-10 sm:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Let&apos;s build</p>
                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Ready to start {page.title}?</h3>
                <p className="mt-3 max-w-lg text-white/85">Share your goals—we&apos;ll reply with a tailored plan and timeline.</p>
              </div>
              <Link
                href="/contact-us"
                className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0052d4] shadow-lg sm:mt-0"
              >
                Contact us
                <FaArrowRight className="text-xs" aria-hidden />
              </Link>
            </div>
          </div>
        </Animate>
      </section>

      <SiteFooter />
    </main>
  );
}
