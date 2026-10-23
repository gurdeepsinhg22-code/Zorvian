import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Contact Us - Zorvian Digital Solutions | Healthcare IT Solutions & EHR Software India',
  description:
    'Get in touch with Zorvian Digital Solutions. Contact our team for healthcare IT solutions, EHR software, and digital transformation support. Mohali, Punjab.',
  path: '/contact-us',
});

export default function ContactUsLayout({ children }) {
  return children;
}
