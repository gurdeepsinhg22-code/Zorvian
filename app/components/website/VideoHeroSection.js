'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import Animate from './Animate';

const VIDEO_LOCAL = '/assets/videos/home-hero.mp4';
const VIDEO_REMOTE = [
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://download.samplelib.com/mp4/sample-5s.mp4',
];

export default function VideoHeroSection() {
  const videoRef = useRef(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const sources = [VIDEO_LOCAL, ...VIDEO_REMOTE];
  const currentSrc = sources[srcIndex] ?? VIDEO_LOCAL;

  const playVideo = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const p = el.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    playVideo();
  }, [currentSrc, reduceMotion, playVideo]);

  const handleCanPlay = () => {
    setVideoReady(true);
    playVideo();
  };

  const handleError = () => {
    setVideoReady(false);
    if (srcIndex < sources.length - 1) setSrcIndex((i) => i + 1);
  };

  return (
    <section
      id="video-hero"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[var(--marketing-page-bg,#f4f5f9)]"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        {!reduceMotion ? (
          <video
            ref={videoRef}
            key={currentSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={handleCanPlay}
            onLoadedData={handleCanPlay}
            onError={handleError}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={currentSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: [
            'linear-gradient(to right, rgba(10,22,40,0.58) 0%, rgba(10,22,40,0.28) 42%, transparent 72%)',
            'linear-gradient(to bottom, rgba(10,22,40,0.28) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-[calc(5rem+1.5rem)] sm:px-6 sm:pb-20 lg:px-8">
        <div className="max-w-3xl">
          <Animate variant="down">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              Navigate your{' '}
              <span className="text-cyan-300">digital</span>{' '}
              <span className="text-violet-300">next</span>
            </h1>
          </Animate>

          <Animate variant="up" delay={0.08}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:mt-6 sm:text-lg md:max-w-2xl">
              High-performance websites, cloud applications, and digital solutions
              built to help your business grow.
            </p>
          </Animate>

          <Animate variant="up" delay={0.16}>
            <Link
              href="/contact-us"
              className="ref-cta-primary sheen-hover mt-8 inline-flex items-center gap-2"
            >
              Get started
              <FaArrowRight className="text-xs" aria-hidden />
            </Link>
          </Animate>
        </div>

        <motion.a
          href="#main-hero"
          className="absolute bottom-6 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/80 backdrop-blur-sm transition hover:text-white sm:bottom-8 lg:right-8"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll to next section"
        >
          <FaArrowDown className="text-sm" aria-hidden />
        </motion.a>
      </div>

    </section>
  );
}
