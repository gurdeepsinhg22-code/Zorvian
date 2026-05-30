import { buildSeoMetadata } from '../../lib/seo';
import AboutUsContent from '../components/website/about/AboutUsContent';

export const metadata = buildSeoMetadata({
  title: 'About Us - Medhostech | Leading Healthcare IT Solutions & EHR Software India',
  description:
    'Medhostech – Built for better care. Engineered to support healthcare professionals with faster, smarter workflows. Learn about our mission, values, and scale.',
  path: '/about-us',
});

export default function AboutUsPage() {
  return <AboutUsContent />;
}
