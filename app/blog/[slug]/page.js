import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '../../components/website/SiteFooter';
import InnerPageHeroBanner from '../../components/website/InnerPageHeroBanner';
import { buildSeoMetadata } from '../../../lib/seo';
import { getBlogFeaturedImageSrc, isRemoteImageSrc } from '../../../lib/media';
import { fetchBlogBySlug } from '../../../lib/blogPublicApi';
import { FaCalendarAlt, FaArrowLeft, FaUser, FaClock, FaShareAlt } from 'react-icons/fa';

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function estimateReadingTime(html) {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return { title: 'Blog Not Found' };
  const title = blog.meta_title || blog.title;
  const description = blog.meta_description || blog.description || `Read ${blog.title} on Medhostech blog.`;
  const ogImage = getBlogFeaturedImageSrc(blog.featured_image) || undefined;
  return buildSeoMetadata({
    title: `${title} | Medhostech Blog`,
    description,
    path: `/blog/${blog.slug}`,
    ogImage,
    type: 'article',
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  if (!slug) notFound();

  const blog = await fetchBlogBySlug(slug);
  if (!blog || (blog.status && blog.status !== 'published')) notFound();

  const readingTime = estimateReadingTime(blog.content);
  const breadcrumbCrumb =
    blog.title.length > 48 ? `${blog.title.slice(0, 48).trim()}…` : blog.title;
  const featuredImageSrc = blog.featured_image ? getBlogFeaturedImageSrc(blog.featured_image) : null;

  return (
    <main className="min-h-screen bg-[#F6FCFF] pt-[calc(22px+3.5rem)] text-[#000137] sm:pt-[calc(24px+3.75rem)]">
      <InnerPageHeroBanner title={blog.title} breadcrumbCurrent={breadcrumbCrumb} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <Link
            href="/blog"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-600 transition-all hover:gap-3 hover:text-[var(--brand-primary)]"
          >
            <FaArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>
          <span className="inline-flex w-fit rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-violet-800">
            {blog.category || 'Article'}
          </span>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="h-4 w-4 text-[var(--brand-primary)]" />
              <time dateTime={blog.createdAt || blog.created_at}>{formatDate(blog.createdAt || blog.created_at)}</time>
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="h-4 w-4 text-[var(--brand-primary)]" />
              {readingTime} min read
            </span>
            <span className="flex items-center gap-2">
              <FaUser className="h-4 w-4 text-[var(--brand-primary)]" />
              Medhostech Editorial
            </span>
          </div>
        </div>
      </section>

      <article className="relative">
        <div className="relative z-20 mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
            {featuredImageSrc && (
              <div className="group relative aspect-[21/9] overflow-hidden sm:aspect-[2/1]">
                <Image
                  src={featuredImageSrc}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  unoptimized={isRemoteImageSrc(featuredImageSrc)}
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>
            )}

            <div className="px-6 py-10 sm:px-10 sm:py-14">
              {blog.description && (
                <p className="-ml-10 mb-10 border-l-4 border-[var(--brand-primary)] pl-6 text-base font-medium leading-[1.7] text-slate-600 sm:-ml-14 sm:pl-10 sm:text-lg">
                  {blog.description}
                </p>
              )}

              <div className="mb-12 flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-dark)] text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
                  M
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Medhostech Editorial</p>
                  <p className="text-sm text-slate-500">Healthcare IT & software insights</p>
                </div>
                <div className="ml-auto hidden items-center gap-2 text-sm text-slate-400 sm:flex">
                  <FaShareAlt className="h-4 w-4" />
                  <span>Share</span>
                </div>
              </div>

              <div
                className="
                  prose prose-slate max-w-none
                  prose-p:text-base prose-p:text-slate-600 prose-p:leading-[1.7] prose-p:mb-5
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#0E2238]
                  prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
                  prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:mb-2
                  prose-a:text-[var(--brand-primary)] prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:transition-all
                  prose-ul:my-5 prose-ul:text-base prose-li:text-slate-600 prose-li:leading-[1.7]
                  prose-strong:text-slate-800 prose-strong:font-semibold
                  prose-img:rounded-xl prose-img:shadow-md
                "
                dangerouslySetInnerHTML={{ __html: blog.content || '' }}
              />
            </div>
          </div>

          <div className="mb-8 mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-[var(--brand-primary-dark)] hover:gap-3 hover:shadow-cyan-500/30"
            >
              <FaArrowLeft size={14} />
              Back to all blogs
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
