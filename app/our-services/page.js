import { WebPageJsonLd } from '../components/website/JsonLd';
import OurServicesContent from '../components/website/services/OurServicesContent';
import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Our Services | MedHostech Solutions',
  description:
    'Website development, mobile applications, e-commerce, web apps, maintenance, and performance optimization — tailored to your business.',
  path: '/our-services',
});

export default function OurServicesPage() {
  return (
    <>
      <WebPageJsonLd
        name="Our Services | MedHostech Solutions"
        description="Website development, mobile apps, e-commerce, web applications, maintenance, and performance services."
        url="/our-services"
      />
      <OurServicesContent />
    </>
  );
}
