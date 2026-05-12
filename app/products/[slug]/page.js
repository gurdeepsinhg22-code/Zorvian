import { notFound } from 'next/navigation';
import ProductDetailPage from '../../components/website/ProductDetailPage';
import { buildSeoMetadata } from '../../../lib/seo';

// Always fetch fresh product data from API (no build-time static generation)
export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

function getImageSrc(image) {
  if (!image) return null;
  if (image.startsWith('http')) return image;
  if (image.startsWith('/uploads')) return `${API_BASE.replace(/\/$/, '')}${image}`;
  return image;
}

async function getProductBySlug(slug) {
  const res = await fetch(`${API_BASE}/api/products/slug/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  const json = await res.json();
  if (json.success && json.data) return json.data;
  return null;
}

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  if (!slug) return {};
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  const title = product.meta_title || product.title;
  const description = product.meta_description || product.description || product.subtitle;
  const imgUrl = getImageSrc(product.image) || product.image;
  const ogImage = imgUrl ? (imgUrl.startsWith('http') ? imgUrl : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://medhostech.com'}${imgUrl}`) : undefined;
  return buildSeoMetadata({
    title: `${title} - Medhostech | Healthcare Solutions`,
    description,
    path: `/products/${product.slug}`,
    ogImage,
  });
}

export async function generateStaticParams() {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    const res = await fetch(`${base}/api/products`, { next: { revalidate: 3600 } });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map((p) => ({ slug: p.slug }));
    }
  } catch {
    // Dynamic generation when API unavailable at build time
  }
  return [];
}

export default async function ProductDetailRoute({ params }) {
  const slug = params?.slug;
  if (!slug) notFound();

  const product = await getProductBySlug(slug);
  if (!product || (product.status && product.status !== 'published')) notFound();

  return (
    <ProductDetailPage
      title={product.title}
      subtitle={product.subtitle}
      tagline={product.tagline}
      description={product.description}
      breadcrumb={product.title}
      image={getImageSrc(product.image) || product.image}
      features={product.features || []}
      benefits={product.benefits || []}
      productSlug={product.slug}
    />
  );
}
