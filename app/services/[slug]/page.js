import { notFound } from 'next/navigation';
import InnerPageHeroBanner from '../../components/website/InnerPageHeroBanner';
import SiteFooter from '../../components/website/SiteFooter';
import { buildSeoMetadata } from '../../../lib/seo';
import {
  FaBolt,
  FaBoxes,
  FaBug,
  FaChartLine,
  FaCode,
  FaCreditCard,
  FaFileCode,
  FaImage,
  FaPaintBrush,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaSitemap,
  FaSyncAlt,
  FaTachometerAlt,
} from 'react-icons/fa';

const PROVIDE_ITEM_ICONS = {
  'web-app-core': FaCode,
  'web-backend-api': FaServer,
  'web-architecture': FaSitemap,
  'web-ui-ux': FaPaintBrush,
  'maint-updates': FaSyncAlt,
  'maint-security': FaShieldAlt,
  'maint-bugs': FaBug,
  'maint-performance': FaRocket,
  'speed-monitoring': FaChartLine,
  'speed-pagespeed': FaBolt,
  'speed-code': FaFileCode,
  'speed-image': FaImage,
  'store-performance': FaTachometerAlt,
  'payment-checkout': FaCreditCard,
  'product-order': FaBoxes,
  'security-data': FaShieldAlt,
};

const servicePages = {
  'web-application-development': {
    title: 'Web Application Development',
    sectionTitle: 'Web Application Development',
    description:
      'We design and develop modern web applications that deliver high performance, security, and seamless user experience across all browsers and devices. Our web applications are scalable, reliable, and tailored to meet specific business requirements.',
    intro:
      'We focus on clean architecture, strong backend functionality, and optimized performance to ensure your web application supports business operations and long-term growth.',
    whatWeProvideTitle: 'What We Provide',
    whatWeProvideIntro:
      'We provide end-to-end web application development services including requirement analysis, design, development, testing, and deployment. Our goal is to build secure, user-friendly, and business-focused web applications that deliver real value.',
    provideItems: [
      {
        iconKey: 'web-app-core',
        title: 'Web Application Development',
        text: 'We build secure, scalable, and high-performance web applications tailored to your business processes and operational needs.',
      },
      {
        iconKey: 'web-backend-api',
        title: 'Backend & API Development',
        text: 'We develop robust backend systems and APIs that ensure smooth data flow, system integration, and reliable application performance.',
      },
      {
        iconKey: 'web-architecture',
        title: 'Business Logic & Architecture',
        text: 'We design structured application architecture and business logic that supports scalability, security, and long-term growth.',
      },
      {
        iconKey: 'web-ui-ux',
        title: 'Web App UI / UX Design',
        text: 'We create intuitive and user-friendly interfaces that enhance usability, improve engagement, and deliver a seamless user experience.',
      },
    ],
    challengeTitle: 'The Challange',
    challenge:
      'Businesses need web applications that are secure, scalable, and reliable while handling complex workflows and growing user demands. Ensuring high performance, seamless integrations, data security, and cross-browser compatibility can be challenging without the right architecture, planning, and technical expertise.',
    faqTitle: 'Frequently Asked Question',
    faqs: [
      {
        q: 'Do You Develop Apps for Both Android and iOS?',
        a: 'Yes, we develop mobile applications for both Android and iOS platforms. We also offer cross-platform solutions to ensure wider reach and cost-effective development.',
      },
      {
        q: 'Can You Customize Mobile Apps Based on Business Needs?',
        a: 'Absolutely. We create fully customized mobile applications tailored to your business goals, target audience, and specific functional requirements.',
      },
      {
        q: 'Will My Mobile App Be Secure and Scalable?',
        a: 'Yes, we follow secure development practices and build scalable architectures to ensure your mobile application remains safe, reliable, and ready for future growth.',
      },
      {
        q: 'Do You Help with App Store Deployment?',
        a: 'Yes, we assist with publishing your app on Google Play Store and Apple App Store, following all required guidelines.',
      },
    ],
    secondProvideTitle: 'What We Provide',
    provideBullets: ['Mobile Apps', 'Android Apps', 'iOS Apps', 'App Support', 'Cross-Platform', 'UI / UX Design'],
  },
  'website-development': {
    title: 'Website Development',
    description:
      'We create modern business websites with clean structure, responsive layouts, and strong performance to help your brand stand out online.',
    intro:
      'From planning and design to development and launch, we build websites that are secure, scalable, and easy to manage.',
    whatWeProvideTitle: 'What We Provide',
    provideItems: [
      { title: 'Business Website Design', text: 'Custom layouts built around your goals, brand, and audience.' },
      { title: 'Frontend Development', text: 'Fast, responsive interfaces optimized for all screen sizes.' },
      { title: 'CMS Integration', text: 'Easy content management workflows for your team.' },
      { title: 'SEO-Ready Setup', text: 'Technical foundations that support visibility and ranking.' },
    ],
    challengeTitle: 'The Challange',
    challenge:
      'Many websites look good but fail in speed, UX, and conversion. We solve this with performance-first design and structured development.',
    faqTitle: 'Frequently Asked Question',
    faqs: [
      { q: 'Do you build responsive websites?', a: 'Yes, all websites are fully responsive and tested across devices.' },
      { q: 'Can you redesign an existing site?', a: 'Yes, we can modernize your current site without losing critical content.' },
    ],
  },
  'mobile-applications': {
    title: 'Mobile Applications',
    sectionTitle: 'Mobile Application Development',
    description:
      'We design and develop modern mobile applications that deliver smooth performance and excellent user experience across Android and iOS platforms. Our mobile solutions are secure, scalable, and tailored to meet business objectives.',
    intro:
      'We focus on intuitive design, strong functionality, and optimized performance to ensure your mobile app engages users and supports long-term growth.',
    whatWeProvideTitle: 'What We Provide',
    whatWeProvideIntro:
      'We provide end-to-end mobile application development services including planning, design, development, testing, and deployment. Our goal is to create mobile apps that are reliable, user-friendly, and business-focused.',
    provideItems: [
      {
        title: 'Website Development',
        text: 'We build fast, secure, and scalable websites tailored to your business needs and growth goals.',
      },
      {
        title: 'Digital Marketing Solutions',
        text: 'We help businesses increase visibility, generate leads, and grow online through effective digital marketing strategies.',
      },
      {
        title: 'Business Strategy & Planning',
        text: 'We create data-driven strategies that align technology with your business objectives for long-term success.',
      },
      {
        title: 'UI / UX Design',
        text: 'We design intuitive and engaging user interfaces that enhance usability and improve customer experience.',
      },
    ],
    challengeTitle: 'The Challange',
    challenge:
      'Businesses often need mobile applications that are fast, secure, and easy to use across different devices. Ensuring smooth performance, intuitive user experience, and compatibility with both Android and iOS platforms can be challenging without the right technical expertise and planning.',
    faqTitle: 'Frequently Asked Question',
    faqs: [
      {
        q: 'What Is Mobile Application Development?',
        a: 'Mobile application development involves creating applications for Android and iOS platforms to help businesses connect with users on mobile devices.',
      },
      {
        q: 'What Types of Mobile Apps Do You Develop?',
        a: 'We develop Android apps, iOS apps, and cross-platform mobile applications for various business needs.',
      },
      {
        q: 'Why Choose MedHostech Solutions for Mobile Apps?',
        a: 'We deliver secure, scalable, and user-friendly mobile apps with a focus on performance and business growth.',
      },
      {
        q: 'Do You Provide App Maintenance?',
        a: 'Yes, we offer ongoing maintenance, updates, and technical support after app launch.',
      },
    ],
    secondProvideTitle: 'What We Provide',
    provideBullets: [
      'Mobile App Development',
      'Android App Development',
      'iOS App Development',
      'Cross-Platform Apps',
      'App UI / UX Design',
      'App Maintenance & Support',
    ],
  },
  'e-commerce-solutions': {
    title: 'E-Commerce Solutions',
    sectionTitle: 'E-Commerce Solutions',
    description:
      'We provide complete e-commerce solutions designed to help businesses sell online efficiently and securely. Our approach focuses on creating user-friendly online stores that deliver smooth shopping experiences and drive conversions.',
    intro:
      'We build scalable e-commerce platforms with secure payment integration, optimized product management, and performance-focused architecture to support business growth and long-term success.',
    whatWeProvideTitle: 'What We Provide',
    whatWeProvideIntro:
      'We provide complete e-commerce solutions designed to help businesses sell products and services online efficiently. Our services include custom store development, secure payment integration, product and order management, performance optimization, and ongoing support. Our goal is to create scalable, user-friendly online stores that improve customer experience and drive consistent sales growth.',
    provideItems: [
      {
        iconKey: 'store-performance',
        title: 'Store Performance Monitoring',
        text: 'Continuous monitoring of store performance to ensure smooth browsing, fast checkout, and reliable uptime.',
      },
      {
        iconKey: 'payment-checkout',
        title: 'Payment & Checkout Optimization',
        text: 'Optimizing payment gateways and checkout flow to reduce cart abandonment and improve conversions.',
      },
      {
        iconKey: 'product-order',
        title: 'Product & Order Management',
        text: 'Efficient management of products, inventory, and orders for smooth store operations.',
      },
      {
        iconKey: 'security-data',
        title: 'Security & Data Protection',
        text: 'Implementing security measures to protect customer data, transactions, and store integrity.',
      },
    ],
    challengeTitle: 'The Challange',
    challenge:
      'E-commerce websites must handle high traffic, secure transactions, and smooth checkout experiences to succeed online. Without proper optimization and management, businesses may face slow store performance, cart abandonment, security risks, and poor user experience, leading to lost sales and reduced customer trust.',
    faqTitle: 'Frequently Asked Question',
    faqs: [
      {
        q: 'What Are E-Commerce Solutions?',
        a: 'E-commerce solutions involve designing and developing online stores that allow businesses to sell products or services digitally with secure payment and order management systems.',
      },
      {
        q: 'What Types of E-Commerce Websites Do You Build?',
        a: 'We build custom e-commerce websites, WooCommerce stores, and scalable online platforms tailored to business requirements.',
      },
      {
        q: 'Do You Integrate Secure Payment Gateways?',
        a: 'Yes, we integrate secure and reliable payment gateways to ensure safe online transactions for customers.',
      },
      {
        q: 'Will My E-Commerce Website Be Mobile-Friendly?',
        a: 'Yes, all our e-commerce websites are fully responsive and optimized for mobile, tablet, and desktop devices.',
      },
    ],
    secondProvideTitle: 'What We Provide',
    provideBullets: [
      'Store Optimization',
      'Secure Payments',
      'Checkout Experience',
      'Product Management',
      'Order Processing',
      'Sales Performance',
    ],
  },
  'website-maintenance-support': {
    title: 'Website Maintenance & Support',
    sectionTitle: 'Website Maintenance & Support',
    description:
      'We provide reliable website maintenance and support services to ensure your website remains secure, updated, and fully functional at all times. Our solutions help businesses maintain smooth performance and avoid technical issues.',
    intro:
      'We focus on regular updates, security monitoring, performance optimization, and quick issue resolution to keep your website running efficiently and support long-term business stability.',
    whatWeProvideTitle: 'What We Provide',
    whatWeProvideIntro:
      'We provide complete website maintenance and support services including updates, security checks, backups, performance monitoring, and technical assistance. Our goal is to keep your website stable, secure, and optimized for consistent performance.',
    provideItems: [
      {
        iconKey: 'maint-updates',
        title: 'Regular Updates',
        text: 'Keeping your website updated with the latest features, content, and system improvements.',
      },
      {
        iconKey: 'maint-security',
        title: 'Security Monitoring',
        text: 'Continuous monitoring to protect your website from threats, malware, and vulnerabilities.',
      },
      {
        iconKey: 'maint-bugs',
        title: 'Bug Fixes & Support',
        text: 'Quick identification and resolution of technical issues to ensure smooth website performance.',
      },
      {
        iconKey: 'maint-performance',
        title: 'Performance Monitoring',
        text: 'Tracking site speed and performance to deliver a smooth user experience.',
      },
    ],
    challengeTitle: 'The Challange',
    challenge:
      'Websites require continuous updates, security checks, and performance monitoring to remain stable and secure. Without regular maintenance, businesses may face downtime, security risks, slow loading speeds, and unexpected technical issues that impact user experience and online credibility.',
    faqTitle: 'Frequently Asked Question',
    faqs: [
      {
        q: 'What Is Website Maintenance & Support?',
        a: 'Website maintenance and support includes ongoing updates, monitoring, backups, and technical assistance to keep your site secure, fast, and fully functional.',
      },
      {
        q: 'Why Is Website Maintenance Important?',
        a: 'Regular maintenance helps prevent downtime, security issues, and performance problems while keeping your website aligned with changing technology and business needs.',
      },
      {
        q: 'What Services Are Included in Website Maintenance?',
        a: 'Our services include software updates, security checks, bug fixes, performance monitoring, backups, and ongoing technical support.',
      },
      {
        q: 'Do You Provide Ongoing Support After Launch?',
        a: 'Yes, we provide continuous support after launch to handle updates, resolve issues, and ensure your website remains stable and secure.',
      },
    ],
    secondProvideTitle: 'What We Provide',
    provideBullets: [
      'Website Updates',
      'Security Monitoring',
      'Bug Fixes',
      'Performance Optimization',
      'Backup & Recovery',
      'Technical Support',
    ],
  },
  'speed-optimization-performance': {
    title: 'Speed Optimization & Performance',
    sectionTitle: 'Speed Optimization & Performance',
    description:
      'We provide professional speed optimization and performance enhancement services to ensure your website loads faster and delivers a smooth user experience. Our solutions help improve website efficiency, reduce load times, and enhance overall performance.',
    intro:
      'We focus on optimizing page speed, improving Core Web Vitals, reducing unnecessary scripts, and enhancing server performance to ensure your website runs efficiently and supports better user engagement and conversions.',
    whatWeProvideTitle: 'What We Provide',
    whatWeProvideIntro:
      'We provide complete website speed optimization and performance services including page speed improvements, performance monitoring, image and code optimization, and Core Web Vitals enhancements. Our goal is to deliver fast-loading, high-performing websites that improve user experience and search engine rankings.',
    provideItems: [
      {
        iconKey: 'speed-monitoring',
        title: 'Performance Monitoring',
        text: 'Continuous tracking of website speed and performance to ensure smooth user experience.',
      },
      {
        iconKey: 'speed-pagespeed',
        title: 'Page Speed Optimization',
        text: 'Improving website loading speed by optimizing resources, scripts, and page structure.',
      },
      {
        iconKey: 'speed-code',
        title: 'Code & Script Optimization',
        text: 'Cleaning and optimizing CSS, JavaScript, and backend code to reduce load time.',
      },
      {
        iconKey: 'speed-image',
        title: 'Image Optimization',
        text: 'Compressing and optimizing images to improve performance without losing quality.',
      },
    ],
    challengeTitle: 'The Challange',
    challenge:
      'Websites with slow loading speeds and poor performance often lead to higher bounce rates and reduced user engagement. Without proper optimization, businesses may face longer load times, poor Core Web Vitals scores, and lower search engine rankings, impacting overall user experience and conversions.',
    faqTitle: 'Frequently Asked Question',
    faqs: [
      {
        q: 'What Is Speed Optimization & Performance?',
        a: 'Speed optimization improves website loading time and performance by optimizing code, images, and server resources to enhance user experience.',
      },
      {
        q: 'Why Is Website Speed Important?',
        a: 'Faster websites improve user experience, reduce bounce rates, and help achieve better search engine rankings.',
      },
      {
        q: 'What Areas Do You Optimize for Better Performance?',
        a: 'We optimize page speed, Core Web Vitals, images, scripts, caching, and server performance.',
      },
      {
        q: 'Will Speed Optimization Affect Website Design or Functionality?',
        a: 'No, our optimization process improves performance without affecting your website’s design or functionality.',
      },
    ],
    secondProvideTitle: 'What We Provide',
    provideBullets: [
      'Speed Optimization',
      'Performance Tuning',
      'Web Vitals',
      'Image Compression',
      'Clean Code',
      'Faster Loading',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const page = servicePages[params?.slug];
  if (!page) return { title: 'Service Not Found | MedHostech Solutions' };
  return buildSeoMetadata({
    title: `${page.title} – MedHostech Solutions`,
    description: page.description,
    path: `/services/${params.slug}`,
  });
}

export default function ServiceDetailPage({ params }) {
  const page = servicePages[params?.slug];
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner title={page.title} breadcrumbCurrent={page.title} />

      <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_10%,rgba(129,94,220,0.12),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(85,198,222,0.12),transparent_42%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-violet-200/50 bg-[linear-gradient(125deg,#ffffff_0%,#f4efff_45%,#eaf8ff_100%)] p-7 shadow-[0_28px_65px_-35px_rgba(91,42,191,0.45)] sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-300/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-cyan-300/20 blur-2xl" />
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-violet-700">
              <span className="h-2 w-2 rounded-full bg-violet-500" aria-hidden />
              Service Overview
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0E2238] sm:text-4xl md:text-5xl">
              {page.sectionTitle ?? page.title}
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-700 sm:text-lg">{page.description}</p>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700 sm:text-lg">{page.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contact-us"
                className="inline-flex items-center rounded-full bg-marketing-purple-gradient px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-marketing-purple-icon"
              >
                Start Project
              </a>
              <a
                href="/our-services"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#0E2238] transition hover:border-violet-300 hover:text-violet-700"
              >
                All Services
              </a>
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_18px_48px_-30px_rgba(2,12,27,0.32)] sm:p-8">
            <h3 className="text-2xl font-bold text-[#0E2238] sm:text-3xl">{page.whatWeProvideTitle}</h3>
            {page.whatWeProvideIntro ? (
              <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">{page.whatWeProvideIntro}</p>
            ) : null}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {page.provideItems.map((item) => {
                const Icon = item.iconKey ? PROVIDE_ITEM_ICONS[item.iconKey] : null;
                return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    {Icon ? (
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-50 text-violet-700 ring-1 ring-violet-200/60">
                        <Icon className="text-xl" aria-hidden />
                      </span>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg font-bold text-[#0E2238]">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.text}</p>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>

          {page.secondProvideTitle && page.provideBullets?.length ? (
            <div className="mt-12 rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_18px_48px_-30px_rgba(2,12,27,0.32)] sm:p-8">
              <h3 className="text-2xl font-bold text-[#0E2238] sm:text-3xl">{page.secondProvideTitle}</h3>
              <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                {page.provideBullets.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 rounded-[2rem] border border-violet-200/70 bg-[linear-gradient(135deg,rgba(233,223,255,0.7)_0%,rgba(236,248,255,0.85)_100%)] p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-[#0E2238] sm:text-3xl">{page.challengeTitle}</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">{page.challenge}</p>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-[#0E2238] sm:text-3xl">{page.faqTitle}</h3>
            <div className="mt-6 space-y-4">
              {page.faqs.map((faq, idx) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md open:border-violet-300 open:bg-violet-50/40 sm:p-6"
                  open={idx === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 sm:items-center">
                    <h4 className="min-w-0 flex-1 pt-0.5 text-lg font-bold leading-snug text-[#0E2238] sm:pt-0">{faq.q}</h4>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full border border-slate-300 text-lg font-semibold leading-none text-slate-600 transition group-open:rotate-45 group-open:border-violet-300 group-open:text-violet-700 sm:self-center">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
