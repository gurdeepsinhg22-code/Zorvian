'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowRight, FaCalendarCheck, FaEnvelope } from 'react-icons/fa';
import Animate from '../Animate';

const HIGHLIGHTS = [
  'Free discovery session',
  'Technical & UX review',
  'Custom project timeline',
];

export default function AboutCtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F6FCFF] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,180,216,0.12),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(0,82,212,0.1),transparent_45%)]"
        aria-hidden
      />
      <div className="process-float-slow pointer-events-none absolute left-[8%] top-[20%] h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />
      <div className="process-float-delayed pointer-events-none absolute right-[10%] bottom-[15%] h-36 w-36 rounded-full bg-sky-400/15 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Animate variant="up">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-32px_rgba(14,34,56,0.18)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              {/* Copy */}
              <div className="border-b border-slate-100 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12 xl:p-14">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0052d4]">
                  <span className="h-[3px] w-[10px] rotate-45 bg-sky-500" aria-hidden />
                  Next steps
                </p>
                <h3 className="ref-section-title mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.65rem]">
                  Let&apos;s plan your next website or application
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                  Tell us about your goals, audience, and timeline—we&apos;ll walk through scope, technology, and a
                  realistic delivery path with no pressure.
                </p>

                <ul className="mt-8 space-y-3">
                  {HIGHLIGHTS.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF9FD] text-[var(--brand-primary)]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a2744] to-[#241b4d] p-8 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3 text-cyan-200/90">
                  <FaCalendarCheck className="text-lg" aria-hidden />
                  <p className="text-sm font-semibold uppercase tracking-[0.12em]">Book a conversation</p>
                </div>

                <p className="mt-4 text-lg font-semibold leading-snug text-white">
                  Most teams hear back within one business day.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/contact-us"
                      className="ref-cta-primary sheen-hover inline-flex w-full items-center justify-center gap-2 sm:w-auto lg:w-full xl:w-auto"
                    >
                      Contact us
                      <FaArrowRight className="text-xs" aria-hidden />
                    </Link>
                  </motion.div>
                  <Link
                    href="/our-services"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15 sm:w-auto lg:w-full xl:w-auto"
                  >
                    View services
                  </Link>
                </div>

                <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
                  <a
                    href="mailto:amiedhiman@gmail.com"
                    className="flex items-center gap-3 text-sm text-sky-100/90 transition hover:text-white"
                  >
                    <FaEnvelope className="shrink-0 text-cyan-300" aria-hidden />
                    amiedhiman@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
}
