import SiteFooter from '../components/website/SiteFooter';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import OurProcessRoadmap from '../components/website/OurProcessRoadmap';
import { WebPageJsonLd } from '../components/website/JsonLd';
import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Our Process | Zorvian Digital Solutions',
  description:
    'A proven working process: discovery, design, development, QA, launch, and ongoing support—so delivery stays predictable and high quality.',
  path: '/our-process',
});

export default function OurProcessPage() {
  return (
    <main className="min-h-screen bg-[var(--marketing-page-bg,#f4f5f9)] pt-[calc(22px+3.5rem)] text-[#0a0a0a] sm:pt-[calc(24px+3.75rem)]">
      <WebPageJsonLd
        name="Our Process | Zorvian Digital Solutions"
        description="Discovery, design, development, QA, launch, and ongoing support for predictable, high-quality delivery."
        url="/our-process"
      />

      <InnerPageHeroBanner
        title="Our Process"
        breadcrumbCurrent="Our Process"
        subtitle="A creative roadmap from discovery to delivery — built for clarity, speed, and quality."
      />

      <OurProcessRoadmap />

      <SiteFooter />
    </main>
  );
}
