import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import SiteFooter from '../components/website/SiteFooter';
import { buildSeoMetadata } from '../../lib/seo';
import TermsAndConditionsBody from './TermsAndConditionsBody';

export const metadata = buildSeoMetadata({
  title: 'Terms & Conditions - Medhostech | Healthcare IT Solutions',
  description:
    'Terms and Conditions for Medhostechsolutions: use of our website and services, liability, governing law, and related policies.',
  path: '/terms-and-conditions',
});

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner title="Terms & Conditions" breadcrumbCurrent="Terms & Conditions" />

      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Animate variant="up">
            <TermsAndConditionsBody />
          </Animate>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
