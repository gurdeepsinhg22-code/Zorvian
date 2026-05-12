import Image from 'next/image';
import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import SiteFooter from '../components/website/SiteFooter';
import { buildSeoMetadata } from '../../lib/seo';
import { FaBullhorn, FaSearch, FaCode, FaFlask, FaPlay } from 'react-icons/fa';

export const metadata = buildSeoMetadata({
  title: 'About Us - Medhostech | Leading Healthcare IT Solutions & EHR Software India',
  description:
    'Medhostech – Built for better care. Engineered to support healthcare professionals with faster, smarter workflows. Learn about our mission, values, and scale.',
  path: '/about-us',
});

const consultingServices = [
  {
    icon: FaBullhorn,
    title: 'Digital Marketing',
    desc: 'We help brands reach the right audience through data-driven strategies, content planning, and performance-focused campaigns that increase visibility and engagement.',
    image: '/assets/images/projects/digital-marketing-replacement.png',
    iconTone: 'text-[#f4a23a]',
  },
  {
    icon: FaSearch,
    title: 'SEO Optimization',
    desc: 'Our SEO solutions improve search rankings, website traffic, and online credibility through technical optimization, keyword strategy, and content enhancements.',
    image: '/assets/images/projects/seo-optimization-replacement.png',
    iconTone: 'text-[#45d5ff]',
  },
  {
    icon: FaFlask,
    title: 'Product Research',
    desc: 'We analyze market trends, user behavior, and competitor insights to help you make informed decisions and build products that truly meet customer needs.',
    image: '/assets/images/projects/product-research-replacement.png',
    iconTone: 'text-[#5dd3ff]',
  },
  {
    icon: FaCode,
    title: 'Web Development',
    desc: 'We design and develop fast, secure, and scalable websites tailored to your business goals, ensuring a seamless user experience across all devices.',
    image: '/assets/images/projects/web-development-replacement.png',
    iconTone: 'text-[#86c4ff]',
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">

      <InnerPageHeroBanner title="About" breadcrumbCurrent="About" />

      {/* Growth storytelling section (reference-matched layout) */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(129,94,220,0.09),transparent_45%),radial-gradient(ellipse_at_95%_35%,rgba(255,184,79,0.1),transparent_45%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Animate variant="left">
              <p className="ref-kicker text-sm font-semibold uppercase tracking-[0.08em]">
                <span className="ref-kicker-line" aria-hidden />
                About Medhostechsolutions
              </p>
              <h2 className="ref-section-title mt-4 max-w-xl text-4xl leading-[1.08] sm:text-5xl">
                Skillset To Power Your Digital Growth
              </h2>
            </Animate>
            <Animate variant="left" delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-lg">
                At Medhostech Solutions, we help businesses build strong digital foundations that drive growth,
                visibility, and long-term success. From web development to digital solutions, our focus is simple
                - deliver results that actually matter.
              </p>
            </Animate>

            <Animate variant="left" delay={0.2}>
              <div className="mt-8 flex w-fit items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.3)] ring-1 ring-slate-100">
                <div className="relative h-14 w-20 overflow-hidden rounded-xl">
                  <Image
                    src="/assets/images/new/2.jpg"
                    alt="Team growth insight"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-2">
                  <p className="text-3xl font-bold text-[#1f2937]">
                    $468 <span className="text-sm font-semibold text-emerald-500">+4.2%</span>
                  </p>
                  <p className="text-xs font-medium text-slate-500">You improved this week compared to last week</p>
                </div>
              </div>
            </Animate>

            <Animate variant="left" delay={0.28}>
              <a href="/contact-us" className="ref-cta-primary mt-8 inline-flex">
                Contact Us
              </a>
            </Animate>
          </div>

          <Animate variant="right" delay={0.1}>
            <div className="relative mx-auto flex w-full max-w-[520px] justify-center lg:justify-end">
              <div className="relative h-[360px] w-[360px] overflow-hidden rounded-full border-[10px] border-white bg-slate-100 shadow-[0_28px_65px_-20px_rgba(90,28,203,0.35)] sm:h-[400px] sm:w-[400px]">
                <Image
                  src="/assets/images/about-growth-right.png"
                  alt="Digital growth specialist"
                  fill
                  sizes="400px"
                  className="object-cover object-top"
                />
              </div>

              <div className="absolute bottom-5 left-0 w-[250px] rounded-3xl bg-white p-5 shadow-[0_18px_48px_-20px_rgba(2,12,27,0.35)] ring-1 ring-slate-100 sm:bottom-7 sm:left-3">
                <p className="text-lg font-bold text-[#111827]">Goals</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                      ✦
                    </span>
                    <div>
                      <p className="text-3xl font-extrabold leading-none text-[#111827]">64%</p>
                      <p className="text-sm text-slate-500">Cover Marketing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-100 text-lime-700">
                      ✦
                    </span>
                    <div>
                      <p className="text-3xl font-extrabold leading-none text-[#111827]">94%</p>
                      <p className="text-sm text-slate-500">Sms Marketing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Consulting services (reference-matched dark section) */}
      <section className="relative overflow-hidden bg-[#241b4d] py-18 text-white sm:py-22">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(167,139,250,0.2),transparent_55%),radial-gradient(ellipse_at_10%_0%,rgba(129,94,220,0.2),transparent_45%),radial-gradient(ellipse_at_90%_0%,rgba(124,58,237,0.14),transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200/95">
                <span className="h-[3px] w-[10px] rotate-45 bg-violet-300" aria-hidden />
                Consulting Services
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Solutions That Drive Digital Success
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-violet-100/90 sm:text-base">
                We deliver practical, result-focused digital services designed to strengthen your online presence,
                improve performance, and support long-term business growth.
              </p>
            </div>
          </Animate>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {consultingServices.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Animate key={item.title} variant="up" delay={0.12 + idx * 0.07}>
                  <article className="text-center">
                    <div className="relative mx-auto h-[170px] w-[170px]">
                      <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/30">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="170px"
                          className="object-cover"
                        />
                      </div>
                      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-100">
                        <Icon className={`text-sm ${item.iconTone}`} aria-hidden />
                      </span>
                    </div>
                    <h3 className="mt-5 text-[22px] font-bold leading-none text-white">{item.title}</h3>
                    <p className="mx-auto mt-3 max-w-[260px] text-sm leading-relaxed text-violet-100/90 sm:text-[15px]">
                      {item.desc}
                    </p>
                  </article>
                </Animate>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video CTA strip (reference-matched dark hero with floating card) */}
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
            <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-marketing-purple-gradient shadow-marketing-purple-icon ring-4 ring-white/15">
              <FaPlay className="translate-x-[1px] text-sm" aria-hidden />
            </span>
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
