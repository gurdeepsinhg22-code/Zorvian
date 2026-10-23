'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import Animate from '../Animate';

const FAQS = [
  {
    q: 'What services does Zorvian Digital Solutions provide?',
    a: 'We design and build websites, web applications, mobile apps, e-commerce stores, and cloud-based platforms. We also offer maintenance, performance optimization, and ongoing support after launch.',
  },
  {
    q: 'Do you work with startups, SMEs, and large enterprises?',
    a: 'Yes. We tailor scope, team size, and delivery pace to your business—whether you need a marketing site, a product MVP, or a full platform rebuild.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timelines depend on complexity. A focused website may take a few weeks; custom web or mobile applications often run several weeks to a few months. We share a clear roadmap after discovery.',
  },
  {
    q: 'What is your development process?',
    a: 'We follow a structured flow: discovery, strategy, design, development, QA, launch, and post-launch support. You get regular check-ins and visibility at every stage.',
  },
  {
    q: 'Can you redesign or rebuild an existing website or app?',
    a: 'Absolutely. We audit your current product, improve UX and performance, migrate content where needed, and modernize the stack without unnecessary downtime.',
  },
  {
    q: 'Do you offer maintenance and support after launch?',
    a: 'Yes. Our Platform Care offering covers updates, security patches, bug fixes, monitoring, and performance improvements so your product stays reliable as you grow.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a free discovery call or contact us with your goals, timeline, and budget range. We will recommend the right approach and next steps with no obligation.',
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-3">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={faq.q}
            layout={reduceMotion ? false : 'position'}
            className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
              isOpen
                ? 'border-[var(--brand-primary)]/40 shadow-[0_12px_36px_-16px_rgba(0,180,216,0.25)]'
                : 'border-slate-200/90 shadow-sm'
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
                transition={{ duration: 0.25 }}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                  isOpen
                    ? 'border-[var(--brand-primary)]/30 bg-[#EAF9FD] text-[var(--brand-primary)]'
                    : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
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

export default function AboutFaqSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-[#f4f5f9] py-20 sm:py-24" aria-labelledby="about-faq-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,82,212,0.05),transparent_55%)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-12 xl:gap-16">
          <div>
            <Animate variant="down">
              <p className="ref-kicker text-sm">
                <span className="ref-kicker-line" aria-hidden />
                FAQ
              </p>
              <h2 id="about-faq-heading" className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.65rem]">
                Frequently asked questions
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                Quick answers about how we work, what we build, and how to start your next website or application
                project.
              </p>
            </Animate>

            <div className="mt-10">
              <FaqAccordion />
            </div>
          </div>

          <Animate variant="right" delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-3xl bg-marketing-purple-gradient p-8 text-white shadow-[0_24px_56px_-20px_rgba(0,82,212,0.45)] sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">Need more detail?</p>
                <h3 className="mt-3 text-xl font-bold leading-snug sm:text-2xl">
                  Talk to our team about your project
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                  Share your goals and timeline—we will respond with a practical plan and honest estimate.
                </p>
                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0052d4] shadow-lg transition hover:bg-white/95 sm:w-auto"
                >
                  Contact us
                  <FaArrowRight className="text-xs" aria-hidden />
                </Link>
                <Link
                  href="/our-services"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 sm:w-auto"
                >
                  View services
                </Link>
              </div>
            </aside>
          </Animate>
        </div>
      </div>
    </section>
  );
}
