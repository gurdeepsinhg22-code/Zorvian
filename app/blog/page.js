import { headers } from 'next/headers';
import SiteFooter from '../components/website/SiteFooter';
import Animate from '../components/website/Animate';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import BlogListInfiniteScroll from '../components/blog/BlogListInfiniteScroll';
import { WebPageJsonLd } from '../components/website/JsonLd';
import { buildSeoMetadata } from '../../lib/seo';

async function getApiBase() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (apiUrl) return apiUrl.replace(/\/$/, '');
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    if (host.includes('medhostech.com')) return 'https://api.medhostech.com';
  } catch {
    // headers() not available
  }
  return '';
}

export const metadata = buildSeoMetadata({
  title: 'Blog - Medhostech | Healthcare IT, EHR & HRMS Insights',
  description:
    'Read the latest articles on healthcare IT, patient management, HRMS software, and clinic management systems. Medhostech blog for healthcare professionals.',
  path: '/blog',
});

const PAGE_SIZE = 12;

async function getInitialBlogs() {
  const base = await getApiBase();
  if (!base) return { posts: [], hasMore: false, page: 1 };

  try {
    const res = await fetch(`${base}/api/blogs?page=1&limit=${PAGE_SIZE}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { posts: [], hasMore: false, page: 1 };
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      const posts = json.data.filter((b) => b.status === 'published');
      const pagination = json.pagination || {};
      const totalPages = pagination.pages ?? 1;
      return {
        posts,
        hasMore: 1 < totalPages,
        page: 1,
      };
    }
  } catch {
    // Keep build stable when API is unavailable during prerender.
  }
  return { posts: [], hasMore: false, page: 1 };
}

export default async function BlogPage() {
  const { posts: initialPosts, hasMore: initialHasMore, page: initialPage } = await getInitialBlogs();
  const apiBase = await getApiBase();

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <WebPageJsonLd
        name="Blog - Medhostech | Healthcare IT, EHR & HRMS Insights"
        description="Read the latest articles on healthcare IT, patient management, HRMS software, and clinic management systems."
        url="/blog"
      />

      <InnerPageHeroBanner
        title="Blog"
        breadcrumbCurrent="Blog"
        subtitle="Insights on healthcare IT, patient management, HRMS, and clinic management systems."
      />

      {/* Blog Posts */}
      <section className="relative overflow-hidden bg-[#FAFCFE] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0E2238 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {initialPosts.length > 0 ? (
            <BlogListInfiniteScroll
              initialPosts={initialPosts}
              initialHasMore={initialHasMore}
              initialPage={initialPage}
              apiBase={apiBase}
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-600">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
