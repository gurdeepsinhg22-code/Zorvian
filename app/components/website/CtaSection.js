import Image from 'next/image';
import Animate from './Animate';

export default function CtaSection() {
  return (
    <section className="bg-[#F8FBFD] py-6">
      {/* CTA: conversion banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Animate variant="scale">
        <div className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/50 bg-gradient-to-r from-[#55C6DE] via-[#44BEDA] to-[#1EB4D7] text-white shadow-[0_24px_55px_rgba(5,88,112,0.22)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_95%_80%,rgba(255,255,255,0.14),transparent_50%)]" />

          <div className="relative z-10 grid gap-8 px-8 py-9 md:grid-cols-[1fr_0.9fr] md:items-center md:px-12">
            <Animate variant="left">
            <div>
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">
                Thousands of Renowned
                <span className="block">Patients &amp; families trusted Us</span>
              </h2>
              <p className="mt-4 max-w-2xl text-cyan-50/95">
                Dedicated professionals committed to providing you with accurate and reliable
                medical diagnostic services.
              </p>

              <a
                href="/make-appointment"
                className="sheen-hover mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0F2E4A] shadow-[0_10px_24px_rgba(2,18,34,0.16)] transition hover:-translate-y-0.5"
              >
                Book An Appointment
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
                  →
                </span>
              </a>
            </div>
            </Animate>

            <Animate variant="right" delay={0.24}>
            <div className="relative ml-auto hidden h-[280px] w-full max-w-[360px] md:block">
              <Image
                src="/assets/images/new/6.jpg"
                alt="Healthcare support specialist"
                fill
                sizes="360px"
                className="rounded-2xl object-cover object-top shadow-[0_18px_36px_rgba(3,20,38,0.24)]"
              />
            </div>
            </Animate>
          </div>
        </div>
        </Animate>
      </div>
    </section>
  );
}
