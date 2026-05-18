'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaChevronDown, FaBars, FaTimes, FaPhone } from 'react-icons/fa';

const API_BASE =
  typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001' : '';

/** Shared marketing logo (transparent PNG) — header + footer */
const MARKETING_LOGO_URL = '/assets/images/medhostech-solutions-logo.png';

const barNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-services', label: 'Services' },
  { href: '/products', label: 'Product', hasDropdown: true },
  { href: '/our-process', label: 'Our Process' },
  { href: '/about-us', label: 'About Us' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact-us', label: 'Contact Us' },
];

const heroNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-services', label: 'Services' },
  { href: '/products', label: 'Product', hasDropdown: true },
  { href: '/our-process', label: 'Our Process' },
  { href: '/about-us', label: 'About' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact-us', label: 'Contact Us' },
];

/** Matches reference site: Product → Medhostech first, then API products (deduped). */
const REFERENCE_PRODUCT_FIRST = { slug: 'medhostech', title: 'Medhostech', href: 'https://medhostech.com/' };

function externalLinkProps(href) {
  if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return {};
  return { target: '_blank', rel: 'noopener noreferrer' };
}

function isNavActive(pathname, href) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  if (href === '/about-us') return pathname === '/about-us' || pathname.startsWith('/about-us/');
  if (href === '/contact-us') return pathname === '/contact-us';
  if (href === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
  if (href === '/case-studies') return pathname === '/case-studies' || pathname.startsWith('/case-studies/');
  if (href === '/products') return pathname === '/products' || pathname.startsWith('/products/');
  if (href === '/our-services') return pathname === '/our-services' || pathname.startsWith('/our-services/');
  if (href === '/our-process') return pathname === '/our-process' || pathname.startsWith('/our-process/');
  return pathname === href;
}

export default function SiteHeader({ variant = 'bar' }) {
  const pathname = usePathname() || '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const isHero = variant === 'heroCard';

  const mobileLinks = isHero ? heroNavLinks : barNavLinks;

  const heroDropdownProducts = useMemo(() => {
    const rest = products.filter((p) => p.slug !== 'medhostech');
    return [REFERENCE_PRODUCT_FIRST, ...rest];
  }, [products]);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data.map((p) => ({ slug: p.slug, title: p.title, href: `/products/${p.slug}` })));
        }
      })
      .catch(() => {});
  }, []);

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
      'relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors after:absolute after:bottom-[6px] after:left-4 after:h-[2px] after:w-0 after:rounded-full after:bg-[#8549df] after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] sm:text-[16px]',
      active ? 'text-[#8549df] after:w-[calc(100%-2rem)]' : 'text-neutral-700 hover:text-[#8549df]',
    ].join(' ');
  };

  if (isHero) {
    return (
      <>
        <header className="relative z-30 grid min-h-[3.25rem] w-full grid-cols-[1fr_auto] items-center gap-2 sm:min-h-[3.5rem] lg:grid-cols-[auto_1fr_auto] lg:items-stretch lg:gap-0">
            <a
              href="/"
              className="relative flex min-w-0 w-[230px] max-w-[calc(100vw-4.5rem)] shrink-0 items-center self-center py-0.5 pl-1 sm:pl-2 lg:pl-3"
            >
              <span className="relative block h-[48px] w-full sm:h-[52px]">
                <Image
                  src={MARKETING_LOGO_URL}
                  alt="MedHostech Solutions"
                  fill
                  className="object-contain object-left"
                  sizes="230px"
                  priority={false}
                />
              </span>
            </a>

            <nav
              className="hidden items-center justify-center justify-self-center rounded-full bg-white px-1.5 py-1 lg:flex lg:w-auto lg:self-center"
              aria-label="Primary"
            >
              {heroNavLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="group relative">
                    <button
                      type="button"
                      className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium transition-colors after:absolute after:bottom-[6px] after:left-4 after:h-[2px] after:w-0 after:rounded-full after:bg-[#8549df] after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] sm:text-[16px] ${
                        isNavActive(pathname, link.href)
                          ? 'text-[#8549df] after:w-[calc(100%-2rem)]'
                          : 'text-neutral-700 hover:text-[#8549df]'
                      }`}
                    >
                      {link.label}
                      <FaChevronDown className="text-[10px] opacity-70" />
                    </button>
                    <div className="invisible absolute left-1/2 top-full z-40 w-max min-w-[220px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="rounded-xl border border-[#caa9ef] bg-[#f3e9ff] py-2 shadow-xl">
                        {heroDropdownProducts.map((p) => (
                          <a
                            key={p.slug}
                            href={p.href}
                            {...externalLinkProps(p.href)}
                            className="block px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#ead8ff] hover:text-black"
                          >
                            {p.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a key={link.label} href={link.href} className={pillLinkClass(link.href)}>
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <a
              href="tel:+917018347459"
              className="hidden items-center gap-3 border-slate-200/90 bg-white px-4 py-2 sm:px-6 lg:flex lg:min-h-0 lg:self-stretch lg:items-center lg:rounded-none lg:border-0 lg:border-l lg:border-slate-200/90 lg:py-0 lg:pl-6 lg:pr-8 lg:shadow-none"
            >
              <span className="bg-marketing-purple-gradient shadow-marketing-purple-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
                <FaPhone className="text-sm" aria-hidden />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">Call Us Now</span>
                <span className="block text-sm font-bold text-neutral-900 sm:text-base">+91 7018347459</span>
              </span>
            </a>

            <div className="flex justify-end pr-1 sm:pr-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-[#0c1f3a] shadow-sm transition hover:border-rose-200 hover:bg-rose-50/80"
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

        <div
          aria-hidden={!mobileOpen}
          className={`fixed inset-0 z-[200] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div
            className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
              mobileOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobile}
            aria-hidden
          />
          <div
            className={`absolute right-0 top-0 flex h-full w-[min(100%,380px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
              mobileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <span className="text-sm font-bold text-[#0c1f3a]">Menu</span>
              <button
                type="button"
                onClick={closeMobile}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {mobileLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      type="button"
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-[#0c1f3a] hover:bg-slate-50"
                    >
                      {link.label}
                      <FaChevronDown className={`text-sm text-slate-500 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        productsOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-1 border-l-2 border-violet-200 py-2 pl-4">
                        {heroDropdownProducts.map((p) => (
                          <a
                            key={p.slug}
                            href={p.href}
                            {...externalLinkProps(p.href)}
                            onClick={closeMobile}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-700"
                          >
                            {p.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-[#0c1f3a] hover:bg-rose-50 hover:text-rose-700"
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="tel:+917018347459"
                onClick={closeMobile}
                className="bg-marketing-purple-gradient mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-semibold text-white shadow-[0_12px_32px_rgba(90,28,203,0.3)]"
              >
                <FaPhone className="text-sm" />
                +91 7018347459
              </a>
            </nav>
          </div>
        </div>
      </>
    );
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(2,8,24,0.06)] md:bg-white/95 md:backdrop-blur px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a
          href="/"
          className="relative flex w-[230px] max-w-[calc(100vw-3rem)] shrink-0 items-center"
        >
          <span className="relative block h-[48px] w-full sm:h-[52px]">
            <Image
              src={MARKETING_LOGO_URL}
              alt="MedHostech Solutions"
              fill
              sizes="230px"
              className="object-contain object-left"
              priority={false}
            />
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-[15px] font-semibold text-[#1B3045] md:flex md:gap-8">
          <a
            href="/"
            className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
              pathname === '/' ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
            }`}
          >
            Home
          </a>
          <a
            href="/our-services"
            className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
              pathname.startsWith('/our-services') ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
            }`}
          >
            Services
          </a>
          <div className="group relative">
            <button
              type="button"
              className={`relative inline-flex items-center gap-1 py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 group-hover:after:w-full ${
                pathname.startsWith('/products') ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
              }`}
            >
              Product
              <FaChevronDown className="text-xs opacity-80" />
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="min-w-[240px] rounded-lg border border-[#caa9ef] bg-[#f3e9ff] py-4 shadow-xl">
                <div className="space-y-1">
                  {heroDropdownProducts.map((p) => (
                    <a
                      key={p.slug}
                      href={p.href}
                      {...externalLinkProps(p.href)}
                      className="group/link flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-black transition hover:text-black"
                    >
                      <span className="h-px w-0 bg-[#9153da] transition-all duration-300 group-hover/link:w-3" />
                      {p.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <a
            href="/our-process"
            className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
              pathname.startsWith('/our-process') ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
            }`}
          >
            Our Process
          </a>
          <a
            href="/about-us"
            className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
              pathname.startsWith('/about-us') ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
            }`}
          >
            About Us
          </a>
          <a
            href="/case-studies"
            className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
              pathname.startsWith('/case-studies') ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
            }`}
          >
            Case Studies
          </a>
          <a
            href="/blog"
            className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
              pathname.startsWith('/blog') ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
            }`}
          >
            Blog
          </a>
          <a
            href="/contact-us"
            className={`relative py-2 transition hover:text-[var(--brand-primary)] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:bg-[var(--brand-primary)] after:transition-all after:duration-300 hover:after:w-full ${
              pathname.startsWith('/contact-us') ? 'text-[var(--brand-primary)] after:w-full' : 'after:w-0'
            }`}
          >
            Contact Us
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="tel:+917018347459"
            className="sheen-hover hover-lift hidden items-center gap-2 rounded-full border border-[#102942] bg-[#102942] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,41,66,0.35)] transition hover:bg-[#0c2136] sm:flex md:px-5 md:py-2.5"
          >
            <span className="hidden lg:inline">Have Any Questions? </span>+91 7018347459
            <span className="text-xs">→</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-[#1B3045] transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 md:hidden"
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
            {barNavLinks.map((link, idx) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  style={{
                    transitionDelay: mobileOpen ? `${80 + idx * 50}ms` : '0ms',
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setProductsOpen(!productsOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-semibold text-[#1B3045] transition hover:bg-slate-100"
                  >
                    {link.label}
                    <FaChevronDown
                      className={`text-sm text-slate-500 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      productsOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1 border-l-2 border-[var(--brand-primary)]/30 bg-slate-50/80 py-2 pl-6 pr-4">
                      {heroDropdownProducts.map((p) => (
                        <a
                          key={p.slug}
                          href={p.href}
                          {...externalLinkProps(p.href)}
                          onClick={closeMobile}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-[var(--brand-primary)]"
                        >
                          {p.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="block rounded-lg px-4 py-3 text-base font-semibold text-[#1B3045] transition hover:bg-slate-100 hover:text-[var(--brand-primary)]"
                  style={{
                    transitionDelay: mobileOpen ? `${80 + idx * 50}ms` : '0ms',
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                  }}
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="tel:+917018347459"
              onClick={closeMobile}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#102942] bg-[#102942] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#0c2136]"
              style={{
                transitionDelay: mobileOpen ? '380ms' : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              }}
            >
              Call +91 7018347459
              <span className="text-xs">→</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
