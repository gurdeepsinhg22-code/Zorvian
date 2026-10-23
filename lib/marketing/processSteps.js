/** Our Process page — roadmap steps (order matters). */
export const processSteps = [
  {
    id: 'need-assessment',
    step: '01',
    title: 'Need Assessment',
    tagline: 'Discovery & goals',
    description:
      'We understand your business goals, audience, and constraints. Together we define scope, features, and the right technology stack so every decision starts from clarity.',
    image: '/assets/images/new/need-assessment-replacement.png',
    imageAlt: 'Hand writing on a project document with a pen',
    accent: '#0052d4',
    glow: 'rgba(0, 82, 212, 0.45)',
    duration: 'Week 1',
    deliverables: ['Requirements brief', 'Scope & milestones', 'Tech recommendations'],
  },
  {
    id: 'analysis-design',
    step: '02',
    title: 'Analysis & Design',
    tagline: 'UX & architecture',
    description:
      'We translate requirements into wireframes and polished UI/UX. Usability, performance, and brand consistency are baked in before a single line of production code.',
    image: '/assets/images/new/analysis-design-replacement.png',
    imageAlt: 'Team discussing product strategy and design',
    accent: '#00a8e8',
    glow: 'rgba(0, 168, 232, 0.4)',
    duration: 'Week 2–3',
    deliverables: ['Wireframes', 'UI mockups', 'Design system'],
  },
  {
    id: 'development',
    step: '03',
    title: 'Solution Development',
    tagline: 'Build & integrate',
    description:
      'Our engineers ship clean, scalable code with modern frameworks. Every feature is built for speed, security, and long-term maintainability.',
    image: '/assets/images/new/solution-development-replacement.png',
    imageAlt: 'Team collaborating on solution development',
    accent: '#0077dd',
    glow: 'rgba(0, 119, 221, 0.4)',
    duration: 'Week 4–8',
    deliverables: ['Sprint demos', 'Staging builds', 'API integrations'],
  },
  {
    id: 'delivery',
    step: '04',
    title: 'Execution & Delivery',
    tagline: 'Launch & support',
    description:
      'Rigorous QA, on-time delivery, and a smooth go-live. We stay with you post-launch for monitoring, fixes, and iterations as you grow.',
    image: '/assets/images/new/execution-delivery-replacement.png',
    imageAlt: 'Execution and delivery with quality assurance',
    accent: '#00c2ff',
    glow: 'rgba(0, 194, 255, 0.4)',
    duration: 'Launch +',
    deliverables: ['QA sign-off', 'Production deploy', 'Ongoing support'],
  },
];

export const processPrinciples = [
  {
    title: 'Collaborative',
    description: 'Weekly check-ins, shared boards, and clear owners so you always know what’s happening.',
    icon: 'users',
  },
  {
    title: 'Transparent',
    description: 'No black boxes — timelines, blockers, and progress visible in real time.',
    icon: 'eye',
  },
  {
    title: 'Quality-first',
    description: 'Code reviews, automated tests, and performance checks before anything ships.',
    icon: 'shield',
  },
];
