import DigitalMarketingContent from '../components/website/digital-marketing/DigitalMarketingContent';
import { WebPageJsonLd } from '../components/website/JsonLd';
import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Digital Marketing | Zorvian Digital Solutions',
  description:
    'Creative digital marketing that converts — SEO, paid media, social, email, CRO, and analytics engineered as one growth engine.',
  path: '/digital-marketing',
});

export default function DigitalMarketingPage() {
  return (
    <>
      <WebPageJsonLd
        name="Digital Marketing | Zorvian Digital Solutions"
        description="SEO, paid media, social, email, CRO, and analytics — a creative growth engine for modern brands."
        url="/digital-marketing"
      />
      <DigitalMarketingContent />
    </>
  );
}
