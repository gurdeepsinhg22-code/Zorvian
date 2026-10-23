import { buildSeoMetadata } from '../../lib/seo';
import AboutUsContent from '../components/website/about/AboutUsContent';

export const metadata = buildSeoMetadata({
  title: 'About Us | Zorvian Digital Solutions – Web Development & Digital Products',
  description:
    'Learn about Zorvian Digital Solutions—websites, web applications, mobile apps, and e-commerce built for performance, security, and business growth.',
  path: '/about-us',
});

export default function AboutUsPage() {
  return <AboutUsContent />;
}
