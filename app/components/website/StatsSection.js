import Animate from './Animate';
import { FaClock, FaBolt, FaUserCheck, FaChartLine } from 'react-icons/fa';

const statIcons = [FaClock, FaBolt, FaUserCheck, FaChartLine];

export default function StatsSection({ stats }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0F2E4A] to-[#0a0a0a] py-20 sm:py-24">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,180,216,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--brand-primary)]/10 blur-[100px]" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 20 30 30 T60 30' stroke='%2300b4d8' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Animate variant="down">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
              Real Results
            </p>
          </Animate>
          <Animate variant="down" delay={0.12}>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Proven Impact. Real Results.
            </h2>
          </Animate>
          <Animate variant="down" delay={0.2}>
            <p className="mt-3 text-slate-400">
              Zorvian Digital Solutions helps clinics work faster, serve patients better, and save hours daily.
            </p>
          </Animate>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = statIcons[idx] || FaChartLine;
            return (
              <Animate
                key={stat.label}
                variant="up"
                delay={0.24 + idx * 0.08}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition-all duration-300 hover:border-[var(--brand-primary)]/50 hover:bg-white/10">
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--brand-primary)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] transition duration-300 group-hover:scale-110 group-hover:bg-[var(--brand-primary)]/30">
                    <Icon className="text-2xl" />
                  </div>
                  <p className="mt-5 text-4xl font-bold text-white sm:text-5xl">{stat.value}</p>
                  <p className="mt-3 text-sm leading-snug text-slate-400">{stat.label}</p>
                </div>
              </Animate>
            );
          })}
        </div>
      </div>
    </section>
  );
}
