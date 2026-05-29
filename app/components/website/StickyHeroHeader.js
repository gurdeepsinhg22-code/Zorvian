'use client';

import { useEffect, useState } from 'react';
import SiteHeader from './SiteHeader';

/**
 * Fixed marketing header for the home hero — always visible on the page.
 * After a little scroll, the bar uses a slightly stronger surface (shadow / border).
 */
export default function StickyHeroHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[100] px-3 pt-0 sm:px-6 lg:px-8">
      <div
        className={[
          'rounded-t-none rounded-b-[20px] px-3 py-2 transition-[background-color,box-shadow,border-color] duration-300 ease-out sm:px-4 sm:py-2.5',
          scrolled
            ? 'border border-slate-200/70 bg-white shadow-[0_10px_36px_rgba(15,23,42,0.1)]'
            : 'border border-white/70 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.07)] lg:bg-white/92 lg:shadow-[0_8px_28px_rgba(15,23,42,0.07)] lg:backdrop-blur-md lg:supports-[backdrop-filter]:lg:bg-white/88',
        ].join(' ')}
      >
        <SiteHeader variant="heroCard" />
      </div>
    </div>
  );
}
