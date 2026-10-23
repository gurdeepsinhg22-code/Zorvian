import {
  FaArrowRight,
  FaBullhorn,
  FaDesktop,
  FaMobileAlt,
  FaShoppingCart,
  FaLaptopCode,
  FaTools,
  FaTachometerAlt,
} from 'react-icons/fa';
import Link from 'next/link';
import Animate from './Animate';

const ring = (gradient) =>
  `inline-flex rounded-full bg-gradient-to-br ${gradient} p-[3px] shadow-sm transition-transform duration-300 ease-out group-hover/service:scale-105 group-hover/service:shadow-md`;

/** Default hover surface for service cells */
const defaultCellHover =
  'hover:bg-sky-400 focus-within:bg-sky-400 hover:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.35)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.35)]';

/** Electric blue hover — Digital Marketing (first) */
const digitalMarketingCellHover =
  'hover:bg-[linear-gradient(90deg,#0052D4_-2.17%,#00C2FF_100%)] focus-within:bg-[linear-gradient(90deg,#0052D4_-2.17%,#00C2FF_100%)] hover:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.45)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.45)]';

/** Deep blue hover — Website Development */
const websiteDevCellHover =
  'hover:bg-[linear-gradient(90deg,#0052D4_-2.17%,#00C2FF_100%)] focus-within:bg-[linear-gradient(90deg,#0052D4_-2.17%,#00C2FF_100%)] hover:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.42)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.42)]';

/** Bright cyan hover — Mobile Applications */
const mobileAppsCellHover =
  'hover:bg-[linear-gradient(90deg,#0077DD_-2.17%,#00D4FF_100%)] focus-within:bg-[linear-gradient(90deg,#0077DD_-2.17%,#00D4FF_100%)] hover:shadow-[0_20px_45px_-10px_rgba(0,119,221,0.38)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,119,221,0.38)]';

/** Cyan/teal hover — E-Commerce Solutions */
const ecommerceCellHover =
  'hover:bg-[linear-gradient(90deg,#0088F0_-2.17%,#00C2FF_100%)] focus-within:bg-[linear-gradient(90deg,#0088F0_-2.17%,#00C2FF_100%)] hover:shadow-[0_20px_45px_-10px_rgba(0,136,240,0.4)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,136,240,0.4)]';

/** Mid blue hover — Web Application Development */
const webAppCellHover =
  'hover:bg-[linear-gradient(90deg,#003DB8_-2.17%,#00A8FF_100%)] focus-within:bg-[linear-gradient(90deg,#003DB8_-2.17%,#00A8FF_100%)] hover:shadow-[0_20px_45px_-10px_rgba(0,61,184,0.38)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,61,184,0.38)]';

/** Blue → aqua hover — Website Maintenance & Support */
const maintenanceCellHover =
  'hover:bg-[linear-gradient(85deg,#0052D4_-0.78%,#00C2FF_97.77%)] focus-within:bg-[linear-gradient(85deg,#0052D4_-0.78%,#00C2FF_97.77%)] hover:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.38)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.38)]';

/** Electric blue hover — Speed Optimization & Performance */
const speedOptCellHover =
  'hover:bg-[linear-gradient(90deg,#0052D4_-2.17%,#00C2FF_100%)] focus-within:bg-[linear-gradient(90deg,#0052D4_-2.17%,#00C2FF_100%)] hover:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.42)] focus-within:shadow-[0_20px_45px_-10px_rgba(0,82,212,0.42)]';

const items = [
  {
    href: '/digital-marketing',
    title: 'Digital Marketing',
    desc: 'SEO, paid media, social, email, and CRO — a creative growth engine built to convert.',
    icon: FaBullhorn,
    ring: 'from-[#0052d4] to-[#00c2ff]',
    iconClass: 'text-[#0052d4]',
    cellHover: digitalMarketingCellHover,
  },
  {
    href: '/services/website-development',
    title: 'Digital Solutions',
    desc: 'Custom business websites, corporate sites, and landing pages built with modern technologies.',
    icon: FaDesktop,
    ring: 'from-sky-500 to-cyan-500',
    iconClass: 'text-sky-600',
    cellHover: websiteDevCellHover,
  },
  {
    href: '/services/mobile-applications',
    title: 'Mobile Innovation',
    desc: 'Scalable mobile applications built with modern frameworks to deliver seamless performance across devices.',
    icon: FaMobileAlt,
    ring: 'from-blue-500 to-sky-400',
    iconClass: 'text-blue-600',
    cellHover: mobileAppsCellHover,
  },
  {
    href: '/services/e-commerce-solutions',
    title: 'Smart Commerce',
    desc: 'WooCommerce and custom e-commerce websites with secure payment integration.',
    icon: FaShoppingCart,
    ring: 'from-cyan-400 to-sky-500',
    iconClass: 'text-cyan-600',
    cellHover: ecommerceCellHover,
  },
  {
    href: '/services/web-application-development',
    title: 'Cloud Applications',
    desc: 'Scalable web apps using modern frameworks tailored to your business needs.',
    icon: FaLaptopCode,
    ring: 'from-blue-600 to-cyan-400',
    iconClass: 'text-blue-700',
    cellHover: webAppCellHover,
  },
  {
    href: '/services/website-maintenance-support',
    title: 'Platform Care',
    desc: 'Ongoing updates, bug fixes, backups, and performance monitoring.',
    icon: FaTools,
    ring: 'from-cyan-400 to-blue-500',
    iconClass: 'text-blue-600',
    cellHover: maintenanceCellHover,
  },
  {
    href: '/services/speed-optimization-performance',
    title: 'Core Web Vitals',
    desc: 'Improve website loading speed, Core Web Vitals, and overall performance for better user experience and SEO rankings.',
    icon: FaTachometerAlt,
    ring: 'from-blue-500 to-sky-600',
    iconClass: 'text-sky-600',
    cellHover: speedOptCellHover,
  },
];

function cellBorderClass(index) {
  const parts = [];
  if (index < items.length - 1) parts.push('border-b border-slate-200');
  if (index % 3 !== 2) parts.push('md:border-r md:border-slate-200');
  if (index < 3) parts.push('md:border-b md:border-slate-200');
  return parts.join(' ');
}

export default function ServicesGridSection() {
  return (
    <section id="services" className="relative bg-white py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Animate variant="down">
            <div className="flex justify-center">
              <p className="ref-kicker text-sm sm:text-base">
                <span className="ref-kicker-line" aria-hidden />
                Our best services
              </p>
            </div>
          </Animate>
          <Animate variant="down" delay={0.1}>
            <h2 className="ref-section-title mt-4 text-3xl sm:text-4xl md:text-[2.5rem] md:leading-tight">
              We Provide Best Services
            </h2>
          </Animate>
        </div>

        <div className="mt-12 rounded-sm border border-slate-200 md:mt-14">
          <div className="relative grid grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group/service relative bg-white p-8 sm:p-10 ${cellBorderClass(
                    index,
                  )} cursor-default transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 focus-within:z-10 focus-within:-translate-y-1 ${item.cellHover ?? defaultCellHover} motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0`}
                >
                  <Animate variant="up" delay={index * 0.06}>
                    <div className={ring(item.ring)}>
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover/service:bg-white/25 group-focus-within/service:bg-white/25 sm:h-16 sm:w-16">
                        <Icon
                          className={`text-xl transition-all duration-300 group-hover/service:scale-110 group-hover/service:text-white group-focus-within/service:scale-110 group-focus-within/service:text-white sm:text-2xl ${item.iconClass}`}
                          aria-hidden
                        />
                      </span>
                    </div>
                    <h3 className="ref-section-title mt-5 text-left text-lg text-[var(--marketing-ink)] transition-colors duration-300 group-hover/service:text-white group-focus-within/service:text-white sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-left text-sm leading-relaxed text-[var(--marketing-ink-muted,#5c6677)] transition-colors duration-300 group-hover/service:text-white/95 group-focus-within/service:text-white/95 sm:text-base">
                      {item.desc}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#0052d4] transition-colors duration-300 group-hover/service:text-white group-focus-within/service:text-white motion-reduce:transition-none"
                    >
                      <span>Read more</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[#0052d4] ring-1 ring-sky-200/80 transition-colors duration-300 group-hover/service:bg-white/25 group-hover/service:text-white group-hover/service:ring-white/40 group-focus-within/service:bg-white/25 group-focus-within/service:text-white group-focus-within/service:ring-white/40">
                        <FaArrowRight className="text-xs" aria-hidden />
                      </span>
                    </Link>
                  </Animate>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center md:mt-12">
          <a
            href="/our-services"
            className="inline-flex flex-wrap items-center justify-center gap-1 text-sm font-semibold text-sky-600 underline-offset-4 transition hover:text-blue-700 hover:underline sm:text-base"
          >
            Want to see our professional services.
            <span className="whitespace-nowrap">Click here to View More</span>
          </a>
        </div>
      </div>
    </section>
  );
}
