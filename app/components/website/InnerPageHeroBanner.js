'use client';

import Animate from './Animate';

const DEFAULT_BG = '/assets/images/about-hero-bg.png';

/**
 * Shared inner-page hero: background image, dark overlay, centered title, pill breadcrumb (Home ↔ current).
 */
export default function InnerPageHeroBanner({
  title,
  breadcrumbCurrent,
  backgroundImage = DEFAULT_BG,
  subtitle,
}) {
  const current = breadcrumbCurrent ?? title;

  return (
    <section className="relative isolate overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-slate-900/58" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[450px] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <Animate variant="down">
          <h1 className="max-w-[min(100%,56rem)] text-balance text-[68px] font-bold leading-[1.1] max-[420px]:text-[2rem] max-[420px]:leading-[1.15]">
            {title}
          </h1>
        </Animate>
        <Animate variant="up" delay={0.1}>
          <nav className="mt-5 inline-flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-2 rounded-full border border-sky-300/40 bg-[#0a0a0a]/75 px-5 py-2 text-sm font-semibold text-white/95 shadow-[0_8px_28px_rgba(14,34,56,0.28)] backdrop-blur-sm">
            <a href="/" className="shrink-0 transition hover:text-white">
              Home
            </a>
            <span className="shrink-0 text-sky-300/90">↔</span>
            <span className="max-w-[min(100vw-8rem,28rem)] text-center text-[#ffb84f] break-words">{current}</span>
          </nav>
        </Animate>
        {subtitle ? (
          <Animate variant="up" delay={0.18}>
            <p className="mt-6 max-w-2xl text-pretty text-base text-white/85 sm:text-lg">{subtitle}</p>
          </Animate>
        ) : null}
      </div>
    </section>
  );
}
