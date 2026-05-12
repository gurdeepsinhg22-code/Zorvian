import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import SiteFooter from '../components/website/SiteFooter';
import { buildSeoMetadata } from '../../lib/seo';
import PrivacyPolicyBody from './PrivacyPolicyBody';

export const metadata = buildSeoMetadata({
  title: 'Privacy Policy - Medhostech | Healthcare IT Solutions',
  description:
    'Privacy Policy for Medhostechsolutions: collection, use, and disclosure of information when you use our website and services.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner title="Privacy Policy" breadcrumbCurrent="Privacy Policy" />

      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Animate variant="up">
            <PrivacyPolicyBody />
          </Animate>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
