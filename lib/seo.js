const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medhostech.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/images/new/1.jpg`;

/**
 * Build full SEO metadata with Open Graph, Twitter Cards, and canonical URL
 * @param {Object} options
 * @param {string} options.title - Page title
 * @param {string} options.description - Meta description
 * @param {string} [options.path] - URL path (e.g. '/about-us')
 * @param {string} [options.ogImage] - Open Graph image URL
 * @param {'website'|'article'} [options.type] - Open Graph type
 */
export function buildSeoMetadata({ title, description, path = '', ogImage = DEFAULT_OG_IMAGE, type = 'website' }) {
  const url = path ? `${BASE_URL}${path}`.replace(/\/$/, '') + '/' : `${BASE_URL}/`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Zorvian Digital Solutions',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
