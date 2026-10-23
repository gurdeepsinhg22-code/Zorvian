import { notFound } from 'next/navigation';
import ServiceDetailContent from '../../components/website/services/ServiceDetailContent';
import { buildSeoMetadata } from '../../../lib/seo';
import { enrichServicePage, getRelatedServices } from '../../../lib/marketing/serviceMeta';

const servicePages = {
  'web-application-development': {
    title: 'Cloud Applications',
    sectionTitle: 'Cloud Applications',
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
        title: 'Cloud Applications',
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
        q: 'What types of web applications do you build?',
        a: 'We build dashboards, patient portals, internal tools, SaaS products, and custom business applications tailored to your workflows.',
      },
      {
        q: 'Can you integrate with our existing systems?',
        a: 'Yes. We connect applications with CRMs, EHRs, payment gateways, and third-party APIs through secure integration layers.',
      },
      {
        q: 'How do you ensure application security?',
        a: 'We follow secure coding practices, role-based access, encrypted data paths, and regular testing throughout the build.',
      },
      {
        q: 'Do you provide support after launch?',
        a: 'Yes. We offer maintenance, monitoring, and feature enhancements after go-live.',
      },
    ],
    secondProvideTitle: 'What We Provide',
    provideBullets: ['Custom Web Apps', 'API Development', 'Cloud Deployment', 'UI / UX Design', 'Integrations', 'Ongoing Support'],
  },
  'website-development': {
    title: 'Digital Solutions',
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
      { q: 'How long does a typical website take?', a: 'Timelines depend on scope; most business sites launch within a few weeks to a few months.' },
      { q: 'Will I be able to update content myself?', a: 'Yes. We integrate CMS workflows so your team can publish without coding.' },
    ],
  },
  'mobile-applications': {
    title: 'Mobile Innovation',
    sectionTitle: 'Mobile Innovation',
    description:
      'We design and develop modern mobile applications that deliver smooth performance and excellent user experience across Android and iOS platforms. Our mobile solutions are secure, scalable, and tailored to meet business objectives.',
    intro:
      'We focus on intuitive design, strong functionality, and optimized performance to ensure your mobile app engages users and supports long-term growth.',
    whatWeProvideTitle: 'What We Provide',
    whatWeProvideIntro:
      'We provide end-to-end mobile application development services including planning, design, development, testing, and deployment. Our goal is to create mobile apps that are reliable, user-friendly, and business-focused.',
    provideItems: [
      {
        title: 'Android Development',
        text: 'Native-quality Android experiences optimized for performance and device diversity.',
      },
      {
        title: 'iOS Development',
        text: 'Polished iPhone and iPad apps aligned with Apple guidelines and user expectations.',
      },
      {
        title: 'Cross-Platform Apps',
        text: 'Shared codebases that accelerate delivery without sacrificing UX.',
      },
      {
        title: 'UI / UX Design',
        text: 'Intuitive interfaces that improve engagement and task completion.',
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
        q: 'Why Choose Zorvian Digital Solutions for Mobile Apps?',
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
    title: 'Smart Commerce',
    sectionTitle: 'Smart Commerce',
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
    title: 'Platform Care',
    sectionTitle: 'Platform Care',
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
    title: 'Core Web Vitals',
    sectionTitle: 'Core Web Vitals',
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
  const resolved = await params;
  const page = servicePages[resolved?.slug];
  if (!page) return { title: 'Service Not Found | Zorvian Digital Solutions' };
  return buildSeoMetadata({
    title: `${page.title} – Zorvian Digital Solutions`,
    description: page.description,
    path: `/services/${resolved.slug}`,
  });
}

export default async function ServiceDetailPage({ params }) {
  const resolved = await params;
  const raw = servicePages[resolved?.slug];
  if (!raw) notFound();

  const page = enrichServicePage(resolved.slug, raw);
  const related = getRelatedServices(resolved.slug, servicePages, 3);

  return <ServiceDetailContent page={page} related={related} />;
}
