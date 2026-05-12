'use client';

import Image from 'next/image';


/** Fallback while bg image loads; matches dark navy in artwork */
const BG_FALLBACK = '#0f172a';

const FOOTER_BG_URL = '/assets/images/footer-bg.png';
const FOOTER_LOGO_URL = '/assets/images/medhostech-solutions-logo.png';

const companyLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/our-services', label: 'Our Services' },
  { href: '/our-process', label: 'Our Process' },
  { href: '/contact-us', label: 'Contact Us' },
];

/** Service detail pages (matches /services/[slug] routes) */
const serviceLinks = [
  { href: '/services/website-development', label: 'Web Development' },
  { href: '/services/mobile-applications', label: 'Mobile Applications' },
  { href: '/services/e-commerce-solutions', label: 'E-Commerce Solutions' },
  { href: '/services/web-application-development', label: 'Web Application Development' },
  { href: '/services/website-maintenance-support', label: 'Website Maintenance & Support' },
  { href: '/services/speed-optimization-performance', label: 'Speed Optimization & Performance' },
];

function FooterLinkRow({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center justify-between gap-4 border-b border-white/[0.12] py-[14px] text-[15px] font-normal leading-snug text-white transition hover:bg-white/[0.03] hover:text-white"
      >
        <span>{label}</span>
        <span className="shrink-0 text-[13px] font-light text-white/70" aria-hidden>
          ↗
        </span>
      </a>
    </li>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden text-white" style={{ backgroundColor: BG_FALLBACK }}>
      {/* Footer-only background art (cover + center) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${FOOTER_BG_URL}')` }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-[5.5rem]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left: 3D illustration (transparent PNG, footer-only asset) */}
          <div className="relative mx-auto flex w-full max-w-[400px] justify-center lg:col-span-4 lg:mx-0 lg:max-w-none lg:justify-start">
            <div className="relative aspect-[4/5] w-full max-h-[min(72vw,520px)] lg:aspect-[3/4] lg:max-h-[560px]">
              <Image
                src="/assets/images/footer-left-illustration.png"
                alt="3D illustration of analytics on a mobile phone"
                fill
                className="object-contain object-bottom object-center drop-shadow-[0_12px_40px_rgba(0,0,0,0.15)] lg:object-left lg:object-bottom"
                sizes="(max-width: 1024px) 90vw, 400px"
                priority={false}
              />
            </div>
          </div>

          {/* Right: logo, copy, link columns (~66%) */}
          <div className="flex flex-col gap-10 lg:col-span-8 lg:pl-2 xl:pl-6">
            <div>
              <a href="/" className="relative inline-block h-[52px] w-[min(100%,280px)] sm:h-[58px] sm:max-w-[320px]">
                <Image
                  src={FOOTER_LOGO_URL}
                  alt="MedHostech Solutions"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 85vw, 320px"
                  priority={false}
                />
              </a>
              <p className="mt-6 max-w-[38rem] text-[15px] leading-[1.75] text-white/88">
                We provide professional web development services focused on performance, security, and modern design. Our
                goal is to help businesses build a strong and reliable online presence.
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16 xl:gap-x-20">
              <div>
                <h3 className="mb-[25px] text-[28px] font-bold uppercase tracking-wide text-white">Companies</h3>
                <ul>
                  {companyLinks.map((link) => (
                    <FooterLinkRow key={link.href} href={link.href} label={link.label} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-[25px] text-[28px] font-bold uppercase tracking-wide text-white">Our Services</h3>
                <ul>
                  {serviceLinks.map((link) => (
                    <FooterLinkRow key={link.href} href={link.href} label={link.label} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.1]">
        <div className="mx-auto max-w-[1200px] px-5 py-5 sm:px-6 sm:py-[22px] lg:px-8">
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6 md:pr-14">
            <p className="order-2 text-center text-[13px] leading-relaxed text-white/55 md:order-1 md:text-left">
              © Copyright 2026 By MedHostechSolutions.com
            </p>
            <div className="order-1 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-white/80 md:order-2 md:justify-end">
              <a href="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="transition hover:text-white">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
