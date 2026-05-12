import Image from 'next/image';
import SiteFooter from '../components/website/SiteFooter';
import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import { WebPageJsonLd } from '../components/website/JsonLd';
import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Our Process | MedHostech Solutions',
  description:
    'A proven working process: discovery, design, development, QA, launch, and ongoing support—so delivery stays predictable and high quality.',
  path: '/our-process',
});

export default function OurProcessPage() {
  return (
    <main className="min-h-screen bg-[var(--marketing-page-bg,#eef2f7)] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <WebPageJsonLd
        name="Our Process | MedHostech Solutions"
        description="Discovery, design, development, QA, launch, and ongoing support for predictable, high-quality delivery."
        url="/our-process"
      />

      <InnerPageHeroBanner title="Our Process" breadcrumbCurrent="Our Process" />

      {/* Work Process — reference: lavender→peach gradient, centered headers, image left + card overlapping (~50%), card text left */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(92deg,#ece6ff_0%,#f3f0ff_35%,#faf7ff_55%,#fff4e8_82%,#fff1dc_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_120%_at_50%_0%,rgba(255,255,255,0.55)_0%,transparent_55%)] opacity-90"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Animate variant="down">
            <p className="flex items-center justify-center gap-2.5 text-[11px] font-normal uppercase tracking-[0.32em] text-slate-600 sm:text-xs">
              <span
                className="inline-block h-0 w-0 border-b-[7px] border-l-[5px] border-r-[5px] border-b-[#5a1ccb] border-l-transparent border-r-transparent"
                aria-hidden
              />
              Our Process
            </p>
            <h2 className="mt-4 text-center text-[2.125rem] font-bold leading-tight tracking-tight text-black sm:text-4xl md:text-[2.75rem]">
              Work Process
            </h2>
          </Animate>

          {/* Desktop: image ~52% width, shorter row; card bottom-right over image */}
          <div className="relative mx-auto mt-14 w-full max-w-[1180px] sm:mt-16 lg:mt-[4.5rem] lg:h-[360px]">
            <div className="relative h-[220px] w-full overflow-hidden rounded-[22px] shadow-[0_14px_44px_-10px_rgba(0,0,0,0.14)] sm:h-[260px] sm:rounded-[24px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[52%] lg:rounded-[24px]">
              <Image
                src="/assets/images/new/need-assessment-replacement.png"
                alt="Hand writing on a project document with a pen"
                fill
                className="object-cover object-[center_55%] sm:object-[center_50%]"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="relative z-10 -mt-4 px-0 sm:-mt-6 lg:absolute lg:-bottom-12 lg:left-[38%] lg:top-auto lg:flex lg:w-[54%] lg:max-w-[640px] lg:min-w-[320px] lg:items-end lg:px-0">
              <Animate variant="up" delay={0.06} className="w-full">
                <div className="flex w-full max-w-[640px] min-h-[230px] flex-col justify-center rounded-[30px] border border-slate-200/70 bg-white p-[40px] text-left shadow-[0_18px_50px_-14px_rgba(15,23,42,0.12)] sm:rounded-[32px] lg:min-h-[280px] lg:max-w-none lg:shadow-[0_20px_56px_-16px_rgba(15,23,42,0.14)]">
                  <h3 className="text-left text-xl font-bold leading-snug tracking-tight text-black sm:text-2xl">
                    Need Assessment
                  </h3>
                  <p className="mt-4 text-left text-[18px] font-normal leading-[1.7] text-slate-600">
                    We start by understanding your business goals and target audience. Our team analyzes your
                    requirements, challenges, and expectations. We define the right strategy, features, and technology
                    stack. This ensures a strong foundation for a successful web solution.
                  </p>
                </div>
              </Animate>
            </div>
          </div>
          <div className="relative mx-auto mt-24 w-full max-w-[1180px] sm:mt-28 lg:mt-32 lg:h-[360px]">
            <div className="relative h-[220px] w-full overflow-hidden rounded-[22px] shadow-[0_14px_44px_-10px_rgba(0,0,0,0.14)] sm:h-[260px] sm:rounded-[24px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[52%] lg:rounded-[24px]">
              <Image
                src="/assets/images/new/analysis-design-replacement.png"
                alt="Team discussing product strategy and design"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="relative z-10 -mt-4 px-0 sm:-mt-6 lg:absolute lg:-bottom-12 lg:right-[38%] lg:top-auto lg:flex lg:w-[54%] lg:max-w-[640px] lg:min-w-[320px] lg:items-end lg:px-0">
              <Animate variant="up" delay={0.08} className="w-full">
                <div className="flex w-full max-w-[640px] min-h-[230px] flex-col justify-center rounded-[30px] border border-slate-200/70 bg-white p-[40px] text-left shadow-[0_18px_50px_-14px_rgba(15,23,42,0.12)] sm:rounded-[32px] lg:min-h-[280px] lg:max-w-none lg:shadow-[0_20px_56px_-16px_rgba(15,23,42,0.14)]">
                  <h3 className="text-left text-xl font-bold leading-snug tracking-tight text-black sm:text-2xl">
                    Analysis & Design
                  </h3>
                  <p className="mt-4 text-left text-[18px] font-normal leading-[1.7] text-slate-600">
                    We analyze project requirements and user expectations in detail. Our team creates intuitive UI/UX
                    designs and clear wireframes. We focus on usability, performance, and visual consistency. This
                    ensures strong and user-friendly design foundation.
                  </p>
                </div>
              </Animate>
            </div>
          </div>

          <div className="relative mx-auto mt-24 w-full max-w-[1180px] sm:mt-28 lg:mt-32 lg:h-[360px]">
            <div className="relative h-[220px] w-full overflow-hidden rounded-[22px] shadow-[0_14px_44px_-10px_rgba(0,0,0,0.14)] sm:h-[260px] sm:rounded-[24px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[52%] lg:rounded-[24px]">
              <Image
                src="/assets/images/new/solution-development-replacement.png"
                alt="Team collaborating on solution development"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="relative z-10 -mt-4 px-0 sm:-mt-6 lg:absolute lg:-bottom-12 lg:left-[38%] lg:top-auto lg:flex lg:w-[54%] lg:max-w-[640px] lg:min-w-[320px] lg:items-end lg:px-0">
              <Animate variant="up" delay={0.1} className="w-full">
                <div className="flex w-full max-w-[640px] min-h-[230px] flex-col justify-center rounded-[30px] border border-slate-200/70 bg-white p-[40px] text-left shadow-[0_18px_50px_-14px_rgba(15,23,42,0.12)] sm:rounded-[32px] lg:min-h-[280px] lg:max-w-none lg:shadow-[0_20px_56px_-16px_rgba(15,23,42,0.14)]">
                  <h3 className="text-left text-xl font-bold leading-snug tracking-tight text-black sm:text-2xl">
                    Solution Development
                  </h3>
                  <p className="mt-4 text-left text-[18px] font-normal leading-[1.7] text-slate-600">
                    Our developers turn approved designs into functional solutions. We use modern technologies and clean
                    coding practices. Each feature is built for performance, security, and scalability. This ensures a
                    reliable and high-quality web solution.
                  </p>
                </div>
              </Animate>
            </div>
          </div>

          <div className="relative mx-auto mt-24 w-full max-w-[1180px] sm:mt-28 lg:mt-32 lg:h-[360px]">
            <div className="relative h-[220px] w-full overflow-hidden rounded-[22px] shadow-[0_14px_44px_-10px_rgba(0,0,0,0.14)] sm:h-[260px] sm:rounded-[24px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[52%] lg:rounded-[24px]">
              <Image
                src="/assets/images/new/execution-delivery-replacement.png"
                alt="Execution and delivery with quality assurance"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="relative z-10 -mt-4 px-0 sm:-mt-6 lg:absolute lg:-bottom-12 lg:right-[38%] lg:top-auto lg:flex lg:w-[54%] lg:max-w-[640px] lg:min-w-[320px] lg:items-end lg:px-0">
              <Animate variant="up" delay={0.12} className="w-full">
                <div className="flex w-full max-w-[640px] min-h-[230px] flex-col justify-center rounded-[30px] border border-slate-200/70 bg-white p-[40px] text-left shadow-[0_18px_50px_-14px_rgba(15,23,42,0.12)] sm:rounded-[32px] lg:min-h-[280px] lg:max-w-none lg:shadow-[0_20px_56px_-16px_rgba(15,23,42,0.14)]">
                  <h3 className="text-left text-xl font-bold leading-snug tracking-tight text-black sm:text-2xl">
                    Exution & Delivery
                  </h3>
                  <p className="mt-4 text-left text-[18px] font-normal leading-[1.7] text-slate-600">
                    We execute the project according to the approved plan. Our team ensures thorough testing and quality
                    checks. We deliver the solution on time with full functionality. Post-launch support ensures smooth
                    performance and stability.
                  </p>
                </div>
              </Animate>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
