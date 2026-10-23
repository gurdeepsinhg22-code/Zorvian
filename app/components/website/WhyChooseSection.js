import { FaShieldAlt, FaRocket, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';
import Animate from './Animate';

const ICON_MAP = {
  'Security First': FaShieldAlt,
  'Fast Adoption': FaRocket,
  'Scalable Foundation': FaChartLine,
};

export default function WhyChooseSection({ highlights }) {
  return (
    <section id="our-process" className="relative overflow-hidden bg-[#FAFCFE]">
      {/* Premium ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full bg-[var(--brand-primary)]/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-[24rem] rounded-full bg-indigo-200/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-slate-300/15 blur-[80px]" />
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(14,39,64,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,39,64,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Animate variant="down">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-[var(--brand-primary)]/30 bg-white/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)] shadow-[0_2px_12px_rgba(0,180,216,0.08)] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-primary)] shadow-[0_0_8px_rgba(0,180,216,0.5)]" />
              Why Choose Zorvian Digital Solutions
            </p>
          </Animate>
          <Animate variant="down" delay={0.12}>
            <h2 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-3xl md:text-5xl md:leading-[1.12]">
              Built for Reliability,<br className="hidden sm:block" /> Designed for Scale
            </h2>
          </Animate>
          <Animate variant="down" delay={0.2}>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[var(--brand-primary)]/50 to-transparent" />
          </Animate>
          <Animate variant="down" delay={0.28}>
            <p className="mt-5 max-w-2xl mx-auto text-base text-slate-600 leading-relaxed">
              A healthcare-first platform that combines performance, security, and usability so teams
              can deliver better outcomes with less operational friction.
            </p>
          </Animate>
        </div>

        <div className="relative z-10 mt-20 grid gap-12 lg:gap-16 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          {/* Premium image frame with gradient border */}
          <Animate variant="left" className="mx-auto w-full max-w-[420px]">
            <div className="group relative overflow-hidden rounded-[2.25rem] p-[2px] shadow-[0_40px_80px_-20px_rgba(14,39,64,0.2),0_0_0_1px_rgba(148,163,184,0.1)] transition-shadow duration-500 hover:shadow-[0_48px_96px_-24px_rgba(14,39,64,0.22),0_0_0_1px_rgba(0,180,216,0.15)]">
              <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-[var(--brand-primary)]/30 via-slate-200/40 to-slate-300/50 opacity-70" />
              <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
              <div className="relative h-[460px] overflow-hidden rounded-[2.1rem] bg-slate-100">
                <Image
                  src="/assets/images/new/5.jpg"
                  alt="Why choose Zorvian Digital Solutions"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
            </div>
          </Animate>

          {/* Premium feature cards */}
          <div className="grid gap-6">
            {highlights.map((item, i) => {
              const Icon = ICON_MAP[item.title];
              return (
                <Animate key={item.title} variant="right" delay={[0.2, 0.32, 0.44][i] || 0.2}>
                <article
                  className="group hover-lift sheen-hover relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.1),0_0_0_1px_rgba(148,163,184,0.06)] transition-all duration-300 hover:border-[var(--brand-primary)]/30 hover:shadow-[0_24px_48px_-12px_rgba(14,39,64,0.14),0_0_0_1px_rgba(0,180,216,0.12)]"
                >
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[var(--brand-primary)]/60 to-[var(--brand-primary)] transition group-hover:from-[var(--brand-primary)] group-hover:to-[var(--brand-primary-dark)]" />
                  <div className="flex gap-5 pl-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8FAFE] via-[#D8F5FA] to-[#C8F0F6] text-[var(--brand-primary)] shadow-[0_8px_24px_-4px_rgba(0,180,216,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-[var(--brand-primary)]/10 transition group-hover:scale-105 group-hover:shadow-[0_12px_28px_-4px_rgba(0,180,216,0.25)]">
                      {Icon && <Icon className="text-xl" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-[#0a0a0a]">{item.title}</h3>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </article>
                </Animate>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
