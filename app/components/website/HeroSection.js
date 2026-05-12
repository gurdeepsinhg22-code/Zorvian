import Image from 'next/image';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import Animate from './Animate';

const HERO_BG_URL = '/assets/images/hero-home-card-bg.png';

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-none px-4 pb-0 pt-[calc(22px+3.5rem)] sm:px-6 sm:pt-[calc(24px+3.75rem)] lg:px-8">
      <div className="relative mt-[30px] w-full max-w-none overflow-hidden rounded-[2.75rem] border border-slate-100/90 bg-white shadow-[0_24px_80px_rgba(12,25,41,0.08)] sm:rounded-[3rem] md:rounded-[3.25rem]">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-[#faf9ff] to-[#f7f4ff]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[#f3f0ff] opacity-25 mix-blend-multiply" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55]"
          style={{ backgroundImage: `url('${HERO_BG_URL}')` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/85 via-transparent to-violet-50/20"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 pt-[80px] pb-[80px] sm:gap-10 sm:px-8 sm:pt-[80px] sm:pb-[80px] md:grid-cols-[1.05fr_0.95fr] md:items-stretch md:gap-10 md:pb-0 lg:px-10 xl:px-12 2xl:px-16">
          <div className="relative z-10 md:self-center md:pb-[80px]">
            <Animate variant="left">
              <p className="ref-kicker text-[11px] sm:text-sm">
                <span className="ref-kicker-line" aria-hidden />
                <span>Welcome to MedHostech Solutions</span>
              </p>
            </Animate>
            <Animate variant="left" delay={0.1}>
              <h1 className="ref-section-title mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.05rem] lg:leading-[1.12]">
                Transforming Ideas Into High-Performance Websites for Growth
              </h1>
            </Animate>
            <Animate variant="left" delay={0.2}>
              <p className="mt-5 max-w-xl text-base leading-[1.75] text-[var(--marketing-ink-muted,#5c6677)] md:text-lg">
                We are a professional web development company delivering high-performance websites, web applications, and
                custom digital solutions. With years of experience, we help businesses grow online through clean code,
                modern design, and scalable technology.
              </p>
            </Animate>
            <Animate variant="left" delay={0.28}>
              <a href="#services" className="ref-cta-primary ref-cta-primary--flat group mt-8">
                discover more
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#5A1CCB] transition group-hover:translate-x-0.5">
                  <FaArrowRight className="text-xs" aria-hidden />
                </span>
              </a>
            </Animate>
          </div>

          <div className="relative mx-auto flex min-h-[280px] w-full max-w-xl items-end justify-center md:mx-0 md:h-full md:max-w-none md:min-h-[380px] md:justify-end">
            <div className="relative z-10 mx-auto flex w-full max-w-[400px] items-end justify-center md:mx-0 md:max-w-none md:justify-end">
              <div className="relative aspect-[4/5] w-full max-w-[380px] md:max-w-[480px]">
                <Image
                  src="/assets/images/hero-right-transparent.png"
                  alt="Healthcare technology professional representing MedHostech Solutions"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 90vw, 480px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>

        <a
          href="#services"
          className="float-soft float-delay-3 absolute bottom-8 right-3 z-20 hidden flex-col items-center gap-3 sm:bottom-12 sm:right-5 md:flex lg:right-8 xl:right-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 [writing-mode:vertical-rl] md:text-sm lg:text-base">
            scroll down
          </span>
          <span className="bg-marketing-purple-gradient shadow-marketing-purple-icon flex h-10 w-10 items-center justify-center rounded-full text-white md:h-11 md:w-11">
            <FaArrowDown className="text-sm" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}
