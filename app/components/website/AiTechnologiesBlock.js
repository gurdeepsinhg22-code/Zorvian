import Image from 'next/image';
import { aiTechnologies } from '../../../lib/marketing/aiTechnologies';
import Container from '../marketing/ui/Container';

const pageBg = 'var(--marketing-page-bg,#f4f5f9)';

function LogoMarquee() {
  const items = [...aiTechnologies, ...aiTechnologies];
  return (
    <div className="overflow-hidden py-1">
      <div className="marketing-marquee-track gap-8 pr-8 sm:gap-12 sm:pr-12">
        {items.map((tech, i) => (
          <div key={`${tech.id}-${i}`} className="flex shrink-0 items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tech.image} alt="" className="h-8 w-8 object-contain" width={32} height={32} />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AiTechnologiesBlock() {
  return (
    <div className="relative w-full">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <p className="ref-kicker text-sm sm:text-base">
              <span className="ref-kicker-line" aria-hidden />
              AI technologies
            </p>
          </div>
          <h2
            id="ai-technologies-heading"
            className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.5rem] md:leading-tight"
          >
            Platforms We Build With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
            From lifelike video and voice to intelligent assistants and generative creative tools — we integrate
            industry-leading AI so your product ships faster and feels unmistakably modern.
          </p>
        </div>
      </Container>

      {/* Full-bleed logo marquee */}
      <div className="relative mt-10 w-full sm:mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20"
          style={{ background: `linear-gradient(to right, ${pageBg}, transparent)` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20"
          style={{ background: `linear-gradient(to left, ${pageBg}, transparent)` }}
          aria-hidden
        />
        <LogoMarquee />
      </div>

      <Container>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {aiTechnologies.map((tech, index) => (
            <article
              key={tech.id}
              className="flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg sm:p-7"
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-2">
                  <Image
                    src={tech.image}
                    alt={`${tech.name} logo`}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                    unoptimized
                  />
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{ backgroundColor: tech.accent }}
                >
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--marketing-ink,#0c1929)] sm:text-xl">{tech.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--marketing-ink-muted,#5c6677)]">{tech.tagline}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tech.accent }} aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Integrated</span>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500 sm:mt-10">
          Logos represent tools we integrate for clients; all trademarks belong to their respective owners.
        </p>
      </Container>
    </div>
  );
}
