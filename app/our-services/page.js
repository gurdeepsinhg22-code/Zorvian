import SiteFooter from '../components/website/SiteFooter';
import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import { WebPageJsonLd } from '../components/website/JsonLd';
import { buildSeoMetadata } from '../../lib/seo';
import Image from 'next/image';

export const metadata = buildSeoMetadata({
  title: 'Our Services | MedHostech Solutions',
  description:
    'Website development, mobile applications, e-commerce, web apps, maintenance, and performance optimization — tailored to your business.',
  path: '/our-services',
});

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const offerings = [
  {
    slug: 'website-development',
    iconSrc: '/assets/images/services/service-card-icon.png',
    title: 'Website Development',
    body: 'Every pleasure is to be welcomed and every pain avoided.',
    points: ['Diversity Business', 'Risk Management', 'Certificated Company'],
  },
  {
    slug: 'mobile-applications',
    iconSrc: '/assets/images/services/service-card-icon-mobile.png',
    title: 'Mobile Applications',
    body: 'High-performance mobile apps for Android and iOS platforms.',
    points: ['Android & IOS Development', 'Intuitive UI/UX Design', 'Secure & Scalable Solutions'],
  },
  {
    slug: 'e-commerce-solutions',
    iconSrc: '/assets/images/services/service-card-icon.png',
    title: 'E-Commerce Solutions',
    body: 'Secure and scalable online stores built to grow your business.',
    points: ['Secure Payments', 'Easy Checkout', 'Product Management'],
  },
];

const additionalOfferings = [
  {
    slug: 'web-application-development',
    iconSrc: '/assets/images/services/service-card-icon.png',
    title: 'Web App Development',
    body: 'Scalable and secure web applications built for modern businesses.',
    points: ['Custom Applications', 'Secure Systems', 'Scalable Solutions'],
  },
  {
    slug: 'website-maintenance-support',
    iconSrc: '/assets/images/services/service-card-icon-mobile.png',
    title: 'Website Maintenance & Support',
    body: 'Ongoing care to keep your website running smoothly.',
    points: ['Regular Updates', 'Security Monitoring', 'Technical Support'],
  },
  {
    slug: 'speed-optimization-performance',
    iconSrc: '/assets/images/services/service-card-icon.png',
    title: 'Speed Optimization & Performance',
    body: 'Faster websites with improved performance.',
    points: ['Fast Loading', 'Performance Boost', 'Core Web Vitals'],
  },
];

export default function OurServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--marketing-page-bg,#eef2f7)] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <WebPageJsonLd
        name="Our Services | MedHostech Solutions"
        description="Website development, mobile apps, e-commerce, web applications, maintenance, and performance services."
        url="/our-services"
      />

      <InnerPageHeroBanner title="Our Services" breadcrumbCurrent="Our Services" />

      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f6f2ff_100%)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Animate variant="down">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700/90 sm:text-sm">
              <span className="h-[9px] w-[9px] rotate-45 rounded-[1px] bg-violet-500" aria-hidden />
              Consulting Services
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0f172a] sm:text-5xl md:text-6xl">
              Consulting Costing
            </h2>
          </Animate>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f6f2ff_0%,#f7f5ff_100%)] py-10 sm:py-12 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {offerings.map((item, i) => (
              <Animate key={item.title} variant="up" delay={i * 0.06}>
                <article
                  id={slugify(item.title)}
                  className="group relative flex h-[475px] w-full flex-col overflow-hidden rounded-t-[999px] rounded-b-none bg-[#171733] text-white shadow-[0_20px_50px_-28px_rgba(23,23,51,0.9)] [font-family:'Urbanist',sans-serif]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(32deg,_#a249ed_20%,_#6131e8_100%)] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                  />
                  <div className="relative z-10 px-8 pb-5 pt-9 text-center sm:px-9">
                    <span className="mx-auto flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full">
                      <Image
                        src={item.iconSrc}
                        alt=""
                        width={56}
                        height={56}
                        className="h-[56px] w-[56px] object-contain"
                        aria-hidden
                      />
                    </span>
                    <h2 className="mt-5 text-[28px] font-extrabold leading-[1.04] tracking-[-0.015em] text-white">
                      {item.title}
                    </h2>
                    <p className="mx-auto mt-3.5 max-w-[238px] text-[18px] font-medium leading-[1.45] text-[#f1f3fa]">
                      {item.body}
                    </p>
                  </div>

                  <div className="relative z-10 border-t border-white/10 px-8 pb-16 pt-5 sm:px-9">
                    <ul className="space-y-[9px]">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-[20px] font-semibold leading-[1.2] text-white">
                          <span className="inline-block h-0 w-0 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-[#9ca3af] border-t-transparent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`/services/${item.slug}`}
                    aria-label={`Explore ${item.title}`}
                    className="absolute bottom-6 right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 text-2xl text-white transition hover:scale-105 hover:bg-white/10"
                  >
                    ↗
                  </a>
                </article>
              </Animate>
            ))}
          </div>

          <div className="mt-14 grid w-full gap-5 md:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
            {additionalOfferings.map((item, i) => (
              <Animate key={item.title} variant="up" delay={0.08 + i * 0.06}>
                <article
                  id={slugify(item.title)}
                  className="group relative flex h-[475px] w-full flex-col overflow-hidden rounded-t-[999px] rounded-b-none bg-[#171733] text-white shadow-[0_20px_50px_-28px_rgba(23,23,51,0.9)] [font-family:'Urbanist',sans-serif]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(32deg,_#a249ed_20%,_#6131e8_100%)] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                  />
                  <div className="relative z-10 px-8 pb-5 pt-9 text-center sm:px-9">
                    <span className="mx-auto flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full">
                      <Image
                        src={item.iconSrc}
                        alt=""
                        width={56}
                        height={56}
                        className="h-[56px] w-[56px] object-contain"
                        aria-hidden
                      />
                    </span>
                    <h2 className="mt-5 text-[28px] font-extrabold leading-[1.04] tracking-[-0.015em] text-white">
                      {item.title}
                    </h2>
                    <p className="mx-auto mt-3.5 max-w-[238px] text-[18px] font-medium leading-[1.45] text-[#f1f3fa]">
                      {item.body}
                    </p>
                  </div>

                  <div className="relative z-10 border-t border-white/10 px-8 pb-16 pt-5 sm:px-9">
                    <ul className="space-y-[9px]">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-[20px] font-semibold leading-[1.2] text-white">
                          <span className="inline-block h-0 w-0 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-[#9ca3af] border-t-transparent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`/services/${item.slug}`}
                    aria-label={`Explore ${item.title}`}
                    className="absolute bottom-6 right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 text-2xl text-white transition hover:scale-105 hover:bg-white/10"
                  >
                    ↗
                  </a>
                </article>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#f6f2ff] pb-20">
        <div
          className="relative isolate overflow-hidden"
          style={{
            backgroundImage: "url('/assets/images/about-cta-bg.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '600px',
          }}
        >
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white sm:px-6">
            <h3 className="max-w-2xl text-4xl font-bold leading-[1.08] sm:text-5xl">
              We Help Your Business To Become Stronger
            </h3>
          </div>
        </div>

        <div className="pointer-events-none relative z-20 mx-auto -mt-20 max-w-7xl px-4 sm:px-6">
          <div
            className="pointer-events-auto relative mx-auto flex h-[300px] w-full max-w-[1120px] items-stretch overflow-hidden rounded-2xl shadow-[0_26px_56px_-24px_rgba(15,23,42,0.44)] ring-1 ring-slate-100"
            style={{
              backgroundImage: "url('/assets/images/about-cta-card-bg.png')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          >
            <div className="relative z-10 flex w-[62%] flex-col justify-center px-8 py-6 sm:px-12">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#4b3f72]">
                <span className="h-[3px] w-[10px] rotate-45 bg-violet-500" aria-hidden />
                Contact Us
              </p>
              <h4 className="mt-3 max-w-[470px] text-[48px] font-bold leading-[0.95] text-[#111827] [font-family:'Urbanist',sans-serif]">
                Ready To Experience Upstage Yourself?
              </h4>
            </div>
            <a
              href="/contact-us"
              className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-2 rounded-full bg-marketing-purple-gradient px-7 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-marketing-purple-icon sm:inline-flex"
            >
              Get Start
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4a23a] text-[11px] text-[#111827]">➜</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
