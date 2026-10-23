'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';
import ClientPortal from './ClientPortal';

/** Shared marketing logo (transparent PNG) — header + footer */
const MARKETING_LOGO_URL = '/assets/images/zorvian-digital-logo.png';
const MARKETING_LOGO_ALT = 'Zorvian Digital Solutions';

const barNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-services', label: 'Services' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/about-us', label: 'About Us' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact-us', label: 'Contact Us' },
];

const heroNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-services', label: 'Services' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/about-us', label: 'About' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact-us', label: 'Contact Us' },
];

function isNavActive(pathname, href) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  if (href === '/about-us') return pathname === '/about-us' || pathname.startsWith('/about-us/');
  if (href === '/contact-us') return pathname === '/contact-us';
  if (href === '/case-studies') return pathname === '/case-studies' || pathname.startsWith('/case-studies/');
  if (href === '/our-services') return pathname === '/our-services' || pathname.startsWith('/our-services/') || pathname.startsWith('/digital-marketing') || pathname.startsWith('/services/');
  if (href === '/our-process') return pathname === '/our-process' || pathname.startsWith('/our-process/');
  return pathname === href;
}

export default function SiteHeader({ variant = 'bar' }) {
  const pathname = usePathname() || '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHero = variant === 'heroCard';

  const mobileLinks = isHero ? heroNavLinks : barNavLinks;

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const pillLinkClass = (href) => {
    const active = isNavActive(pathname, href);
    return [
      'relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors after:absolute after:bottom-[6px] after:left-4 after:h-[2px] after:w-0 after:rounded-full after:bg-[#0088f0] after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] sm:text-[16px]',
      active ? 'text-[#0088f0] after:w-[calc(100%-2rem)]' : 'text-neutral-700 hover:text-[#0088f0]',
    ].join(' ');
  };

  if (isHero) {
    return (
      <>
        <header className="relative z-30 grid min-h-[3.25rem] w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:min-h-[3.5rem] lg:grid-cols-[auto_1fr_auto] lg:items-stretch lg:gap-0">
            <a
              href="/"
              className="relative flex min-w-0 items-center self-center py-0.5 lg:w-[320px] lg:shrink-0 lg:pl-3"
            >
              <span className="relative block h-[68px] w-[min(100%,280px)] sm:h-[76px] sm:w-[min(100%,320px)] lg:h-[84px] lg:w-full">
                <Image
                  src={MARKETING_LOGO_URL}
                  alt={MARKETING_LOGO_ALT}
                  fill
                  className="object-contain object-left"
                  sizes="320px"
                  priority={false}
                />
              </span>
            </a>

            <nav
              className="hidden items-center justify-center justify-self-center rounded-full bg-white px-1.5 py-1 lg:flex lg:w-auto lg:self-center"
              aria-label="Primary"
            >
              {heroNavLinks.map((link) => (
                <a key={link.label} href={link.href} className={pillLinkClass(link.href)}>
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="mailto:amiedhiman@gmail.com"
              className="hidden items-center gap-3 border-slate-200/90 bg-white px-4 py-2 sm:px-6 lg:flex lg:min-h-0 lg:self-stretch lg:items-center lg:rounded-none lg:border-0 lg:border-l lg:border-slate-200/90 lg:py-0 lg:pl-6 lg:pr-8 lg:shadow-none"
            >
              <span className="bg-marketing-purple-gradient shadow-marketing-purple-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
                <FaEnvelope className="text-sm" aria-hidden />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">Email Us</span>
                <span className="block text-sm font-bold text-neutral-900 sm:text-base">amiedhiman@gmail.com</span>
              </span>
            </a>

            <div className="flex shrink-0 items-center justify-end lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white text-[#0a0a0a] shadow-sm transition hover:border-sky-200 hover:bg-sky-50/80"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <FaBars
                    className={`absolute text-lg transition-all duration-300 ${
                      mobileOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                    }`}
                  />
                  <FaTimes
                    className={`absolute text-lg transition-all duration-300 ${
                      mobileOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                    }`}
                  />
                </span>
              </button>
            </div>
        </header>

        <ClientPortal>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            aria-hidden={!mobileOpen}
            className={`fixed inset-0 z-[300] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            <div
              className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
                mobileOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={closeMobile}
              aria-hidden
            />
            <div
              className={`absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-[min(100%,380px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
                mobileOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4">
                <span className="text-sm font-bold text-[#0a0a0a]">Menu</span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {mobileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-[#0a0a0a] hover:bg-sky-50 hover:text-sky-700"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="mailto:amiedhiman@gmail.com"
                  onClick={closeMobile}
                  className="bg-marketing-purple-gradient mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-semibold text-white shadow-[0_12px_32px_rgba(0,82,212,0.3)]"
                >
                  <FaEnvelope className="text-sm" />
                  amiedhiman@gmail.com
                </a>
              </nav>
            </div>
          </div>
        </ClientPortal>
      </>
    );
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(2,8,24,0.06)] md:bg-white/95 md:backdrop-blur px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a
          href="/"
          className="relative flex w-[320px] max-w-[calc(100vw-3rem)] shrink-0 items-center"
        >
          <span className="relative block h-[72px] w-full sm:h-[84px]">
            <Image
              src={MARKETING_LOGO_URL}
              alt={MARKETING_LOGO_ALT}
              fill
              sizes="320px"
              className="object-contain object-left"
              priority={false}
            />
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-[15px] font-semibold text-[#111111] md:flex md:gap-8">
          {barNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
                isNavActive(pathname, link.href) ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="mailto:amiedhiman@gmail.com"
            className="sheen-hover hover-lift hidden items-center gap-2 rounded-full border border-[#102942] bg-[#102942] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,41,66,0.35)] transition hover:bg-[#0c2136] sm:flex md:px-5 md:py-2.5"
          >
            <span className="hidden lg:inline">Have Any Questions? </span>amiedhiman@gmail.com
            <span className="text-xs">→</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-[#111111] transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <FaBars
                className={`absolute text-lg transition-all duration-300 ${
                  mobileOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
              />
              <FaTimes
                className={`absolute text-lg transition-all duration-300 ${
                  mobileOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 top-[60px] z-40 flex flex-col md:hidden ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobile}
          aria-hidden
        />
        <div
          className={`relative flex flex-1 flex-col bg-white shadow-xl transition-all duration-300 ease-out ${
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav className="mx-auto w-full max-w-7xl flex-1 space-y-1 overflow-y-auto px-4 py-6">
            {barNavLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-[#111111] transition hover:bg-slate-100 hover:text-[var(--brand-primary)]"
                style={{
                  transitionDelay: mobileOpen ? `${80 + idx * 50}ms` : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
                  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:amiedhiman@gmail.com"
              onClick={closeMobile}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#102942] bg-[#102942] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#0c2136]"
              style={{
                transitionDelay: mobileOpen ? '380ms' : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              }}
            >
              Email amiedhiman@gmail.com
              <span className="text-xs">→</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
