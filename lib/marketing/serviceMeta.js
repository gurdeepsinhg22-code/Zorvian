export const DEFAULT_DELIVERY_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We align on goals, users, timelines, and success metrics before any build begins.',
  },
  {
    step: '02',
    title: 'Strategy',
    desc: 'Architecture, UX flows, and a clear delivery roadmap tailored to your stack.',
  },
  {
    step: '03',
    title: 'Build & QA',
    desc: 'Iterative development with reviews, testing, and performance checks at each milestone.',
  },
  {
    step: '04',
    title: 'Launch & grow',
    desc: 'Go-live support, handoff, and ongoing optimization so value keeps compounding.',
  },
];

const SERVICE_META = {
  'website-development': {
    subtitle: 'Modern websites engineered for speed, clarity, and conversion.',
    accent: 'violet',
    idealFor: ['Healthcare practices', 'Corporate brands', 'Startups', 'Local businesses'],
    techStack: ['Next.js', 'React', 'WordPress', 'Headless CMS', 'SEO'],
    outcomes: [
      { title: 'Stronger brand presence', desc: 'Polished design that builds trust from the first visit.' },
      { title: 'Mobile-first experience', desc: 'Flawless layouts across phones, tablets, and desktops.' },
      { title: 'SEO-ready foundation', desc: 'Technical structure that supports long-term visibility.' },
      { title: 'Easy content control', desc: 'CMS workflows your team can manage without developers.' },
    ],
  },
  'mobile-applications': {
    subtitle: 'Android & iOS apps built for engagement, security, and scale.',
    accent: 'orange',
    idealFor: ['Patient apps', 'Field teams', 'On-demand services', 'Membership platforms'],
    techStack: ['React Native', 'Flutter', 'REST APIs', 'Push notifications', 'App Store CI'],
    outcomes: [
      { title: 'Cross-platform reach', desc: 'One roadmap serving both major mobile ecosystems.' },
      { title: 'Intuitive UX', desc: 'Flows designed around real user tasks—not feature bloat.' },
      { title: 'Secure data paths', desc: 'Authentication and APIs built with safety in mind.' },
      { title: 'Store-ready releases', desc: 'Support through submission and post-launch updates.' },
    ],
  },
  'e-commerce-solutions': {
    subtitle: 'Online stores optimized for checkout speed and customer trust.',
    accent: 'cyan',
    idealFor: ['Retail brands', 'B2B catalogs', 'Subscription products', 'Healthcare supplies'],
    techStack: ['WooCommerce', 'Stripe', 'Inventory APIs', 'CDN', 'Analytics'],
    outcomes: [
      { title: 'Higher conversions', desc: 'Checkout flows tuned to reduce abandonment.' },
      { title: 'Secure payments', desc: 'Trusted gateways and compliance-aware integrations.' },
      { title: 'Inventory clarity', desc: 'Products, variants, and orders in one control panel.' },
      { title: 'Performance at scale', desc: 'Fast storefronts during traffic spikes and campaigns.' },
    ],
  },
  'web-application-development': {
    subtitle: 'Custom cloud apps for dashboards, portals, and complex workflows.',
    accent: 'pink',
    idealFor: ['SaaS products', 'Internal tools', 'Patient portals', 'Multi-tenant platforms'],
    techStack: ['Node.js', 'PostgreSQL', 'React', 'GraphQL', 'AWS / Azure'],
    outcomes: [
      { title: 'Workflow automation', desc: 'Replace spreadsheets with reliable digital processes.' },
      { title: 'Role-based access', desc: 'Permissions that match how teams actually operate.' },
      { title: 'API integrations', desc: 'Connect CRMs, EHRs, payment, and third-party tools.' },
      { title: 'Scalable architecture', desc: 'Systems ready for more users, data, and features.' },
    ],
  },
  'website-maintenance-support': {
    subtitle: 'Proactive care that keeps your platform secure, fast, and online.',
    accent: 'blue',
    idealFor: ['Mission-critical sites', 'E-commerce stores', 'Healthcare portals', 'High-traffic apps'],
    techStack: ['Monitoring', 'Backups', 'SSL', 'Patch management', 'Uptime alerts'],
    outcomes: [
      { title: 'Less downtime', desc: 'Issues caught early before users are affected.' },
      { title: 'Stronger security', desc: 'Updates and monitoring against emerging threats.' },
      { title: 'Peace of mind', desc: 'A partner on call when something needs attention.' },
      { title: 'Stable performance', desc: 'Speed and reliability maintained over time.' },
    ],
  },
  'speed-optimization-performance': {
    subtitle: 'Measurable speed gains across Core Web Vitals and real-user metrics.',
    accent: 'purple',
    idealFor: ['High-traffic sites', 'SEO-focused brands', 'E-commerce', 'Content publishers'],
    techStack: ['Lighthouse', 'CDN', 'Caching', 'Image CDNs', 'Code splitting'],
    outcomes: [
      { title: 'Faster load times', desc: 'Snappier pages that keep visitors engaged.' },
      { title: 'Better Web Vitals', desc: 'LCP, INP, and CLS tuned for search and UX.' },
      { title: 'Leaner assets', desc: 'Optimized images, scripts, and server responses.' },
      { title: 'SEO uplift', desc: 'Performance signals that support ranking potential.' },
    ],
  },
};

const ACCENT_STYLES = {
  violet: {
    bar: 'bg-[#0052d4]',
    pill: 'bg-sky-50 text-sky-700 border-sky-200',
    glow: 'from-sky-400/20 to-cyan-400/10',
    gradient: 'from-sky-500 to-cyan-500',
  },
  orange: {
    bar: 'bg-[#0088f0]',
    pill: 'bg-sky-50 text-sky-700 border-sky-200',
    glow: 'from-blue-400/20 to-sky-400/10',
    gradient: 'from-blue-500 to-sky-400',
  },
  cyan: {
    bar: 'bg-cyan-500',
    pill: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    glow: 'from-cyan-400/20 to-sky-400/10',
    gradient: 'from-cyan-400 to-sky-500',
  },
  pink: {
    bar: 'bg-[#0077dd]',
    pill: 'bg-blue-50 text-blue-700 border-blue-200',
    glow: 'from-blue-400/20 to-cyan-400/10',
    gradient: 'from-blue-600 to-cyan-400',
  },
  blue: {
    bar: 'bg-blue-500',
    pill: 'bg-blue-50 text-blue-700 border-blue-200',
    glow: 'from-blue-400/20 to-cyan-400/10',
    gradient: 'from-cyan-400 to-blue-500',
  },
  purple: {
    bar: 'bg-[#0052d4]',
    pill: 'bg-sky-50 text-sky-700 border-sky-200',
    glow: 'from-sky-400/20 to-blue-400/10',
    gradient: 'from-blue-500 to-sky-600',
  },
};

export function enrichServicePage(slug, page) {
  const meta = SERVICE_META[slug] ?? {};
  const accentKey = meta.accent ?? 'violet';
  const outcomes =
    meta.outcomes ??
    (page.provideBullets?.slice(0, 4).map((title) => ({
      title,
      desc: 'Delivered as part of our structured engagement model.',
    })) ??
      []);

  return {
    ...page,
    slug,
    subtitle: meta.subtitle ?? page.description,
    steps: meta.steps ?? DEFAULT_DELIVERY_STEPS,
    outcomes,
    idealFor: meta.idealFor ?? ['Growing businesses', 'Healthcare', 'Enterprise teams'],
    techStack: meta.techStack ?? ['Modern frameworks', 'Cloud hosting', 'CI/CD'],
    accent: ACCENT_STYLES[accentKey] ?? ACCENT_STYLES.violet,
  };
}

export function getRelatedServices(currentSlug, servicePages, limit = 3) {
  return Object.keys(servicePages)
    .filter((slug) => slug !== currentSlug)
    .slice(0, limit)
    .map((slug) => ({
      slug,
      title: servicePages[slug].title,
      description: servicePages[slug].description,
    }));
}
