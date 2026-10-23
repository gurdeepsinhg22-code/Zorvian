import { getCaseStudySlugs } from '../lib/marketing/caseStudies';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medhostech.com';

async function getProductSlugs() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    const res = await fetch(`${base}/api/products`, { next: { revalidate: 3600 } });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map((p) => p.slug);
    }
  } catch {
    // API unreachable during build (e.g. CI) - return empty
  }
  return [];
}

/** @type {import('next').MetadataRoute.Sitemap} */
export default async function sitemap() {
  const productSlugs = await getProductSlugs();

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/our-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/digital-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/our-process`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/make-appointment`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const productPages = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const caseStudyPages = getCaseStudySlugs().map((slug) => ({
    url: `${BASE_URL}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...caseStudyPages];
}
