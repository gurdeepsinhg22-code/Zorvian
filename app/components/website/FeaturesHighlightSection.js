import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaAward, FaCode, FaHeadset, FaEnvelope } from 'react-icons/fa';
import Animate from './Animate';

const iconWrap =
  'bg-marketing-purple-gradient shadow-marketing-purple-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-t-2xl rounded-bl-2xl rounded-br-none text-2xl text-white';

const features = [
  {
    icon: FaAward,
    title: 'Guaranteed Results',
    desc: 'We follow a proven development process to ensure high-quality results. Our websites are optimized for performance, security, and user experience, helping businesses achieve measurable growth online.',
  },
  {
    icon: FaCode,
    title: 'Quality Services',
    desc: 'Our team delivers clean, scalable, and well-structured code using modern technologies. Every project is carefully tested to ensure reliability, speed, and long-term performance.',
  },
  {
    icon: FaHeadset,
    title: 'Dedicated Support',
    desc: 'We provide continuous support and maintenance even after project delivery. Our team is always available to assist with updates, fixes, and improvements whenever you need them.',
  },
];

export default function FeaturesHighlightSection() {
  return (
    <section className="relative bg-white pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-10 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          {/* Image + offset lavender panel */}
          <Animate variant="left" className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <div
              className="absolute -left-3 -top-3 h-[88%] w-[88%] rounded-2xl bg-gradient-to-br from-sky-50/90 to-blue-50/80 sm:-left-4 sm:-top-4"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg">
              <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                <Image
                  src="/assets/images/features-highlight-meeting.png"
                  alt="Business team collaborating in a modern office meeting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Animate>

          <div>
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <Animate key={item.title} variant="right" delay={index * 0.08}>
                  <div className="flex gap-5 pb-8 sm:gap-6 sm:pb-10">
                    <div className={iconWrap}>
                      <Icon className="text-xl" aria-hidden />
                    </div>
                    <div
                      className={`min-w-0 flex-1 pt-0.5 ${
                        index < features.length - 1 ? 'border-b border-slate-200 pb-8 sm:pb-10' : ''
                      }`}
                    >
                      <h3 className="ref-section-title text-lg sm:text-xl">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] sm:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Animate>
              );
            })}

            <Animate variant="right" delay={0.28}>
              <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
                <Link href="/about-us" className="ref-cta-primary group w-fit">
                  learn more
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0052D4] transition group-hover:translate-x-0.5">
                    <FaArrowRight className="text-xs" aria-hidden />
                  </span>
                </Link>
                <a
                  href="mailto:amiedhiman@gmail.com"
                  className="flex items-center gap-3 text-[#0f2744]"
                >
                  <span className="bg-marketing-purple-gradient shadow-marketing-purple-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white">
                    <FaEnvelope className="text-sm" aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs font-bold uppercase tracking-wide text-slate-500">Email Us</span>
                    <span className="block text-base font-bold sm:text-lg">amiedhiman@gmail.com</span>
                  </span>
                </a>
              </div>
            </Animate>
          </div>
        </div>
      </div>
    </section>
  );
}
