import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Contact Us - Medhostech | Healthcare IT Solutions & EHR Software India',
  description:
    'Get in touch with Medhostech. Contact our team for healthcare IT solutions, EHR software, and digital transformation support. Mohali, Punjab.',
  path: '/contact-us',
});

export default function ContactUsLayout({ children }) {
  return children;
}
