import SiteFooter from '../components/website/SiteFooter';
import InnerPageHeroBanner from '../components/website/InnerPageHeroBanner';
import BlogListInfiniteScroll from '../components/blog/BlogListInfiniteScroll';
import BlogLoadError from '../components/blog/BlogLoadError';
import { WebPageJsonLd } from '../components/website/JsonLd';
import { buildSeoMetadata } from '../../lib/seo';
import { fetchPublishedBlogs } from '../../lib/blogPublicApi';

export const metadata = buildSeoMetadata({
  title: 'Blog - Medhostech | Healthcare IT, EHR & HRMS Insights',
  description:
    'Read the latest articles on healthcare IT, patient management, HRMS software, and clinic management systems. Medhostech blog for healthcare professionals.',
  path: '/blog',
});

const PAGE_SIZE = 12;

export default async function BlogPage() {
  const { posts: initialPosts, hasMore: initialHasMore, page: initialPage, error } = await fetchPublishedBlogs({
    page: 1,
    limit: PAGE_SIZE,
  });

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

      <section className="relative overflow-hidden bg-[#FAFCFE] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0E2238 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {error ? (
            <BlogLoadError message={error} />
          ) : initialPosts.length > 0 ? (
            <BlogListInfiniteScroll
              initialPosts={initialPosts}
              initialHasMore={initialHasMore}
              initialPage={initialPage}
            />
          ) : (
            <div className="py-16 text-center">
              <p className="text-slate-600">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
