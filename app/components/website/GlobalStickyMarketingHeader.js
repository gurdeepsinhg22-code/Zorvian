'use client';

import { usePathname } from 'next/navigation';
import StickyHeroHeader from './StickyHeroHeader';

/** Routes that use their own chrome (no floating marketing header). */
const HIDE_PREFIXES = ['/dashboard', '/admin'];

export default function GlobalStickyMarketingHeader() {
  const pathname = usePathname() || '/';
  const hide = HIDE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (hide) return null;
  return <StickyHeroHeader />;
}
