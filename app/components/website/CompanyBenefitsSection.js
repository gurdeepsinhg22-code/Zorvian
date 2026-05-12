import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import Animate from './Animate';

const benefits = [
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'First Working Process' },
  { label: 'Dedicated Team' },
  { label: '24/7 Hours Support' },
  { label: 'Handle by Expert' },
];

const chartHeights = [40, 55, 35, 62, 48, 58];

export default function CompanyBenefitsSection() {
  return (
    <section id="company-benefits" className="relative bg-white py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div>
            <Animate variant="left">
              <p className="ref-kicker text-xs sm:text-sm">
                <span className="ref-kicker-line" aria-hidden />
                Company benefits
              </p>
            </Animate>
            <Animate variant="left" delay={0.08}>
              <h2 className="ref-section-title mt-5 text-3xl sm:text-4xl md:text-[2.35rem] md:leading-[1.15]">
                Why Choose MedHostech Solutions
              </h2>
            </Animate>
            <Animate variant="left" delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                MedHostech Solutions is committed to delivering high-quality web development services that help businesses
                grow online. We focus on performance, security, and user experience to ensure every project meets modern
                digital standards and delivers real value.
              </p>
            </Animate>
            <Animate variant="left" delay={0.24}>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
                {benefits.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-rose-500 bg-white">
                      <FaCheck className="text-[11px] text-rose-600" aria-hidden />
                    </span>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-medium leading-snug text-slate-800 underline-offset-2 hover:text-rose-600 hover:underline sm:text-[15px]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium leading-snug text-slate-700 sm:text-[15px]">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Animate>
            <Animate variant="left" delay={0.32}>
              <Link href="/about-us" className="ref-cta-primary group mt-8">
                learn more
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#5A1CCB] transition group-hover:translate-x-0.5">
                  <FaArrowRight className="text-xs" aria-hidden />
                </span>
              </Link>
            </Animate>
          </div>

          <Animate variant="right" className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl rounded-l-[1.75rem] border border-slate-200/80 shadow-xl sm:rounded-l-[2rem]">
              <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
                <Image
                  src="/assets/images/company-benefits-meeting.png"
                  alt="Marketing strategy presentation in a modern office meeting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 z-10 w-[min(100%,240px)] rounded-xl border border-slate-100 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.12)] sm:bottom-6 sm:left-6 sm:p-5">
              <p className="text-xs font-semibold text-slate-500">Earnings report</p>
              <div className="mt-1 flex items-end justify-between gap-3">
                <p className="text-2xl font-bold tracking-tight text-[#0f2744]">$821.04</p>
                <div className="flex h-10 items-end gap-0.5" aria-hidden>
                  {[40, 52, 36, 48, 44, 56].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-sm ${i % 2 === 0 ? 'bg-neutral-800' : 'bg-orange-200'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between gap-1 border-t border-slate-100 pt-3">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
                  <div key={m} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                    <span
                      className={`w-full max-w-[14px] rounded-sm sm:max-w-[18px] ${i % 2 === 0 ? 'bg-neutral-800' : 'bg-orange-200'}`}
                      style={{ height: `${chartHeights[i]}px` }}
                    />
                    <span className="text-[9px] font-medium text-slate-400">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}
