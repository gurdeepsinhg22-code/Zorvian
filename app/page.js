import AboutIntroSection from './components/website/AboutIntroSection';
import FeaturesHighlightSection from './components/website/FeaturesHighlightSection';
import ServicesGridSection from './components/website/ServicesGridSection';
import CompanyBenefitsSection from './components/website/CompanyBenefitsSection';
import HeroSection from './components/website/HeroSection';
import SiteFooter from './components/website/SiteFooter';
import KeywordMarqueeSection from './components/website/KeywordMarqueeSection';
import MarketingProjectsGridSection from './components/website/MarketingProjectsGridSection';
import { WebPageJsonLd } from './components/website/JsonLd';
import { buildSeoMetadata } from '../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'MedHostech Solutions | Web Development, Apps & Digital Solutions',
  description:
    'Professional web development company delivering high-performance websites, web applications, and custom digital solutions. Modern design, clean code, scalable technology.',
  path: '/',
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--marketing-page-bg,#f4f5f9)] text-[var(--marketing-ink,#0c1929)]">
      <WebPageJsonLd
        name="MedHostech Solutions | Web Development & Digital Solutions"
        description="Professional web development, web applications, and custom digital solutions for business growth."
        url="/"
      />
      <HeroSection />

      <AboutIntroSection />
      <FeaturesHighlightSection />
      <ServicesGridSection />

      <CompanyBenefitsSection />

      <KeywordMarqueeSection />
      <MarketingProjectsGridSection />

      <SiteFooter />
    </main>
  );
}
