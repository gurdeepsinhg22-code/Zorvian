'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Center-aligned carousel with side “peek” (reference-style marketing slider).
 * @param {number} [autoMs=2800] — autoplay interval in ms (disabled when prefers-reduced-motion).
 */
export default function MarketingProjectsCarousel({
  projects,
  ariaLabel = 'Recent projects',
  autoMs = 2800,
}) {
  const plugins = useMemo(
    () => [
      Autoplay({
        delay: autoMs,
        stopOnMouseEnter: true,
        /** Keep advancing after arrows / dots / swipe so the strip stays alive */
        stopOnInteraction: false,
        playOnInit: false,
      }),
    ],
    [autoMs]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      loop: true,
      skipSnaps: false,
      dragFree: false,
    },
    plugins
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncAutoplay = () => {
      if (mq.matches) {
        autoplay.stop();
      } else {
        autoplay.play();
      }
    };

    syncAutoplay();
    mq.addEventListener('change', syncAutoplay);
    return () => mq.removeEventListener('change', syncAutoplay);
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-5 touch-pan-y [-webkit-tap-highlight-color:transparent] sm:-ml-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="min-w-0 shrink-0 grow-0 pl-5 sm:pl-6 flex-[0_0_clamp(260px,82vw,420px)] sm:flex-[0_0_clamp(300px,56vw,480px)] lg:flex-[0_0_clamp(320px,40vw,520px)]"
            >
              <a
                href={p.href}
                aria-label={`Open project: ${p.title}`}
                className="group relative block overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-slate-900 transition-transform duration-300 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:rounded-[2rem]"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    aria-hidden
                    className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 640px) 92vw, 440px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/25 group-focus-within:bg-slate-950/25"
                    aria-hidden
                  >
                    <span className="flex h-14 w-14 translate-y-2 scale-90 items-center justify-center rounded-full bg-marketing-purple-gradient text-white opacity-0 shadow-[0_12px_32px_rgba(90,28,203,0.45)] ring-2 ring-white/35 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity motion-reduce:group-hover:scale-100">
                      <FaArrowRight className="text-base" aria-hidden />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl">{p.title}</h3>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-5 md:px-6 lg:px-10">
        <button
          type="button"
          onClick={scrollPrev}
          className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-800 shadow-md backdrop-blur-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-sm" aria-hidden />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-800 shadow-md backdrop-blur-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-sm" aria-hidden />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label={ariaLabel}>
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`Go to ${p.title}`}
            className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 ${
              i === selectedIndex ? 'w-8 bg-marketing-purple-gradient' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
