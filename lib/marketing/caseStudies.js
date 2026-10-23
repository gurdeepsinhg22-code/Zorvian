/** Published case studies — listing, detail pages, and homepage carousel */

export const caseStudies = [
  {
    slug: 'myclassy-wellness',
    title: 'Myclassy Wellness',
    category: 'Healthcare & Wellness',
    description:
      'End-to-end web presence for a wellness clinic—responsive layouts, SEO-ready structure, and content that highlights treatments and trust signals.',
    image: '/assets/images/projects/myclassy-wellness.png',
    services: ['Web Development', 'SEO', 'Content Structure'],
    hero: {
      eyebrow: 'Case Study',
      headline: 'Myclassy Wellness',
      subheadline:
        'Building a conversion-focused wellness website with clear service storytelling, mobile-first UX, and SEO foundations.',
    },
    overview: {
      client: 'Myclassy Wellness',
      location: 'India',
      industry: 'Healthcare & Wellness',
      deliverables: ['Website Design & Development', 'SEO Setup', 'Content Architecture'],
    },
    quote: {
      text: 'Zorvian Digital Solutions delivered a polished site that reflects our brand and makes it easy for patients to understand our services and get in touch.',
      author: 'Clinic Leadership',
      role: 'Myclassy Wellness',
    },
    aboutClient:
      'Myclassy Wellness is a modern wellness clinic offering aesthetic and therapeutic treatments. They needed a professional digital presence that builds trust, explains services clearly, and supports appointment inquiries from mobile and desktop users.',
    problems: [
      'Outdated website with poor mobile experience and slow load times.',
      'Unclear service hierarchy that made it hard for visitors to choose the right treatment.',
      'Limited SEO structure, reducing visibility for local wellness searches.',
      'No consistent content framework for treatments, FAQs, and trust elements.',
    ],
    solutions: [
      'Responsive, performance-optimized website with a clean visual system aligned to the brand.',
      'Structured service pages and treatment categories for faster decision-making.',
      'On-page SEO foundations: metadata, headings, schema-ready markup, and fast Core Web Vitals.',
      'Reusable content blocks for testimonials, credentials, and call-to-action paths.',
    ],
    approach: [
      { step: 1, title: 'Discovery & Content Audit', description: 'Mapped user journeys, priority services, and conversion goals.' },
      { step: 2, title: 'UX & Visual Design', description: 'Designed layouts that emphasize clarity, trust, and mobile usability.' },
      { step: 3, title: 'Development', description: 'Built modular pages with optimized assets and accessible components.' },
      { step: 4, title: 'SEO & Launch', description: 'Configured metadata, sitemaps, and performance checks before go-live.' },
      { step: 5, title: 'Handover & Support', description: 'Documented updates and provided post-launch refinements.' },
    ],
    highlights: [
      {
        title: 'Mobile-First Experience',
        description: 'Layouts and media tuned for smartphones where most wellness inquiries begin.',
      },
      {
        title: 'Service-Led Information Architecture',
        description: 'Treatment pages organized so visitors find the right offering in fewer clicks.',
      },
      {
        title: 'Performance & SEO Baseline',
        description: 'Fast loads and search-ready structure to support long-term organic growth.',
      },
    ],
    techStack: [
      { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS'] },
      { group: 'CMS & Content', items: ['Structured page templates', 'SEO metadata'] },
      { group: 'Hosting & Delivery', items: ['CDN-friendly assets', 'Image optimization'] },
    ],
    results: [
      { title: 'Stronger Brand Presentation', description: 'A cohesive look that matches the clinic’s premium positioning.' },
      { title: 'Improved Mobile Usability', description: 'Easier browsing and contact paths on small screens.' },
      { title: 'SEO-Ready Foundation', description: 'Structured content and metadata for discoverability.' },
      { title: 'Faster Page Loads', description: 'Optimized assets and lean front-end delivery.' },
    ],
    conclusion:
      'Myclassy Wellness now has a modern, trustworthy website that supports patient education and inquiries. The project demonstrates how healthcare brands can combine design, performance, and SEO from day one.',
    metaDescription:
      'How Zorvian Digital Solutions built a mobile-first, SEO-ready wellness clinic website for Myclassy Wellness with clear service pages and trust-focused content.',
  },
  {
    slug: 'spaderx',
    title: 'Spaderx',
    category: 'Pharmacy & Retail',
    description:
      'Scalable e-commerce style experience for a pharmacy brand with product discovery, mobile-first design, and secure checkout flows.',
    image: '/assets/images/projects/spaderx.png',
    services: ['E-Commerce', 'Web Application', 'Mobile UX'],
    hero: {
      eyebrow: 'Case Study',
      headline: 'Spaderx',
      subheadline:
        'Delivering a scalable pharmacy retail experience with product discovery, responsive UI, and checkout-focused flows.',
    },
    overview: {
      client: 'Spaderx',
      location: 'India',
      industry: 'Pharmacy & Retail',
      deliverables: ['E-Commerce UX', 'Web Application', 'Product Catalog UI'],
    },
    quote: {
      text: 'The new experience helped us present products clearly and guide customers through a smoother purchase journey on every device.',
      author: 'Product Team',
      role: 'Spaderx',
    },
    aboutClient:
      'Spaderx is a pharmacy and wellness retail brand offering health, beauty, and vitality products online. They required a scalable storefront experience that supports catalog browsing, promotions, and secure checkout on mobile and desktop.',
    problems: [
      'Product catalog difficult to browse on mobile with slow category navigation.',
      'Inconsistent UI patterns across listing, detail, and cart flows.',
      'Checkout friction and unclear trust signals for online pharmacy shoppers.',
      'Performance issues when loading product imagery and promotional banners.',
    ],
    solutions: [
      'E-commerce UX with clear category filters, search-friendly layouts, and product cards.',
      'Unified design system for listing, product detail, cart, and checkout screens.',
      'Mobile-first flows with prominent CTAs, trust badges, and simplified forms.',
      'Optimized media delivery and component-based front-end for maintainability.',
    ],
    approach: [
      { step: 1, title: 'Requirements & User Flows', description: 'Defined catalog, cart, and checkout journeys for retail shoppers.' },
      { step: 2, title: 'UI System', description: 'Created reusable components for products, promos, and navigation.' },
      { step: 3, title: 'Application Build', description: 'Implemented responsive pages with performance-focused assets.' },
      { step: 4, title: 'Checkout Optimization', description: 'Reduced steps and improved clarity in payment and delivery UI.' },
      { step: 5, title: 'QA & Launch', description: 'Cross-device testing and launch support for production traffic.' },
    ],
    highlights: [
      {
        title: 'Product Discovery',
        description: 'Category and filter patterns that help shoppers find products quickly.',
      },
      {
        title: 'Retail-Grade Checkout',
        description: 'Streamlined cart and checkout with trust and policy visibility.',
      },
      {
        title: 'Scalable Front-End',
        description: 'Component architecture prepared for catalog growth and campaigns.',
      },
    ],
    techStack: [
      { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS'] },
      { group: 'Commerce UX', items: ['Product catalog UI', 'Cart & checkout flows'] },
      { group: 'Performance', items: ['Image optimization', 'Lazy loading'] },
    ],
    results: [
      { title: 'Clearer Product Browsing', description: 'Improved navigation across categories and promotions.' },
      { title: 'Better Mobile Conversion Paths', description: 'Touch-friendly UI with focused purchase CTAs.' },
      { title: 'Consistent Brand Experience', description: 'Unified visuals across the full shopping journey.' },
      { title: 'Maintainable Codebase', description: 'Reusable components for faster future updates.' },
    ],
    conclusion:
      'Spaderx gained a modern retail web experience built for discovery and conversion. The engagement shows how pharmacy and wellness brands can scale online with thoughtful UX and solid engineering.',
    metaDescription:
      'Case study: Zorvian Digital Solutions built a mobile-first e-commerce style pharmacy experience for Spaderx with product discovery and optimized checkout flows.',
  },
  {
    slug: 'mhc',
    title: 'MHC',
    category: 'Healthcare Platform',
    description:
      'A healthcare operations dashboard experience for managing GFE requests, patients, billing, and analytics in one streamlined interface.',
    image: '/assets/images/projects/mhc-dashboard.png',
    services: ['Dashboard UI/UX', 'Web Application', 'Analytics Visualization'],
    hero: {
      eyebrow: 'Case Study',
      headline: 'MHC',
      subheadline:
        'Designing a healthcare management dashboard focused on clarity, speed, and day-to-day operational control.',
    },
    overview: {
      client: 'Medical Health Covers (MHC)',
      location: 'USA',
      industry: 'Healthcare Operations',
      deliverables: ['Dashboard Design', 'Patient Management UX', 'Billing & Trends Interface'],
    },
    quote: {
      text: 'The new dashboard helped our team monitor requests, patient activity, and billing from one clean interface with less manual effort.',
      author: 'Operations Team',
      role: 'MHC',
    },
    aboutClient:
      'MHC is a healthcare-focused organization managing patient workflows, request handling, and billing operations. They needed a modern dashboard to replace fragmented tools and improve speed, visibility, and day-to-day usability.',
    problems: [
      'Operational data was spread across multiple views with inconsistent UI patterns.',
      'Tracking monthly trends and request status required manual effort.',
      'Billing and patient workflows were not centralized for quick action.',
      'The previous experience lacked clarity on KPIs and real-time status indicators.',
    ],
    solutions: [
      'Designed a unified dashboard layout with KPI cards, trend charting, and quick actions.',
      'Introduced clear information hierarchy for requests, patients, and billing modules.',
      'Built interaction flows optimized for frequent operational tasks and support workflows.',
      'Improved visual consistency using a reusable component system across dashboard sections.',
    ],
    approach: [
      { step: 1, title: 'Workflow Discovery', description: 'Mapped daily admin tasks, user roles, and critical decision points.' },
      { step: 2, title: 'Data Prioritization', description: 'Defined top KPIs, trend signals, and statuses for quick scanning.' },
      { step: 3, title: 'Dashboard UX Design', description: 'Created card-based layouts and chart sections for rapid comprehension.' },
      { step: 4, title: 'Module Integration', description: 'Connected requests, patients, billing, and settings into one navigation flow.' },
      { step: 5, title: 'Refinement & QA', description: 'Validated responsiveness, accessibility, and interaction clarity across devices.' },
    ],
    highlights: [
      {
        title: 'Unified Operations View',
        description: 'All key metrics and actions centralized in a single dashboard experience.',
      },
      {
        title: 'Action-Oriented UX',
        description: 'Quick links and contextual modules reduce friction for routine admin tasks.',
      },
      {
        title: 'Trend Visibility',
        description: 'Monthly activity visualization improves monitoring and planning decisions.',
      },
    ],
    techStack: [
      { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS'] },
      { group: 'Data UI', items: ['Dashboard cards', 'Line charts', 'Status modules'] },
      { group: 'Experience', items: ['Responsive layout', 'Role-oriented navigation'] },
    ],
    results: [
      { title: 'Faster Daily Operations', description: 'Teams access key metrics and actions without switching tools.' },
      { title: 'Improved Data Clarity', description: 'KPI cards and trend visuals make status easier to understand.' },
      { title: 'Better Workflow Consistency', description: 'Unified UI patterns across requests, patients, and billing.' },
      { title: 'Scalable Dashboard Foundation', description: 'Component-based structure supports future module expansion.' },
    ],
    conclusion:
      'MHC now has a cleaner and more actionable dashboard experience that supports operational efficiency and better visibility across core healthcare workflows.',
    metaDescription:
      'Case study: Zorvian Digital Solutions designed an MHC healthcare dashboard with KPI cards, trend analytics, and streamlined workflows for requests, patients, and billing.',
  },
  {
    slug: 'aria-assistant',
    title: 'Aria Assistant',
    category: 'AI Healthcare Assistant',
    description:
      'An AI-powered health assistant interface for guided patient screening, real-time chat, and secure voice-driven intake workflows.',
    image: '/assets/images/projects/aria-assistant.png',
    services: ['AI Assistant UX', 'Healthcare Workflow Design', 'Real-Time Interaction'],
    hero: {
      eyebrow: 'Case Study',
      headline: 'Aria Assistant',
      subheadline:
        'Creating a conversational healthcare assistant experience that combines voice, chat, and guided screening in one patient-friendly interface.',
    },
    overview: {
      client: 'Aria Health Assistant',
      location: 'USA',
      industry: 'Digital Health',
      deliverables: ['Assistant Dashboard UI', 'Conversation Design', 'Screening Flow Experience'],
    },
    quote: {
      text: 'Aria Assistant gave our team a clear and modern way to run patient conversations and screening while keeping the experience calm and intuitive.',
      author: 'Product Team',
      role: 'Aria Health Assistant',
    },
    aboutClient:
      'Aria is a digital health assistant concept focused on helping patients complete intake and screening through conversational AI. The platform needed a trustworthy, minimal interface that supports real-time communication and clear task progress.',
    problems: [
      'Traditional intake flows felt long and intimidating for first-time patients.',
      'Voice and chat interactions were disconnected across previous prototypes.',
      'Lack of clear state indicators for connection, mic status, and progress.',
      'Needed a healthcare-friendly interface that feels private and reassuring.',
    ],
    solutions: [
      'Designed a unified assistant dashboard with voice panel, patient feed, and conversation timeline.',
      'Built guided health screening UI with clear prompts and low-friction responses.',
      'Added live status indicators (connection/mic/live state) to improve user confidence.',
      'Applied a clean medical visual system with soft color cues and secure-data messaging.',
    ],
    approach: [
      { step: 1, title: 'Conversation Mapping', description: 'Defined assistant prompts, user responses, and branching health-question flows.' },
      { step: 2, title: 'Interaction Design', description: 'Designed synchronized voice + chat states for smooth multi-modal interaction.' },
      { step: 3, title: 'UI System', description: 'Created reusable cards, timeline blocks, and status chips for healthcare context.' },
      { step: 4, title: 'Prototype Validation', description: 'Tested readability, response speed, and user confidence in guided screening.' },
      { step: 5, title: 'Refinement', description: 'Polished spacing, contrast, and feedback states for production-ready usability.' },
    ],
    highlights: [
      {
        title: 'Voice + Chat Together',
        description: 'Patients can interact naturally while still seeing clear written context.',
      },
      {
        title: 'Guided Screening UX',
        description: 'Question flow is structured to reduce confusion and improve completion.',
      },
      {
        title: 'Trust-Focused Design',
        description: 'Connection and privacy cues reinforce safety throughout the experience.',
      },
    ],
    techStack: [
      { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS'] },
      { group: 'Assistant UX', items: ['Conversation timeline UI', 'Voice interaction states', 'Guided forms'] },
      { group: 'Healthcare UX', items: ['Status indicators', 'Privacy-focused messaging'] },
    ],
    results: [
      { title: 'Improved Screening Clarity', description: 'Users can follow health questions with less friction and better context.' },
      { title: 'Higher Interaction Confidence', description: 'Live/mic/connected indicators make system behavior easier to trust.' },
      { title: 'Unified Experience', description: 'Voice and chat now work as one coherent workflow.' },
      { title: 'Scalable Assistant Foundation', description: 'Design system supports adding future screening modules and specialties.' },
    ],
    conclusion:
      'Aria Assistant demonstrates how conversational AI can feel approachable in healthcare when UX prioritizes trust, clarity, and guided progression.',
    metaDescription:
      'Case study: Zorvian Digital Solutions designed Aria Assistant, an AI healthcare assistant UI with voice/chat workflows and guided patient screening.',
  },
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}

export function getCaseStudySlugs() {
  return caseStudies.map((study) => study.slug);
}
