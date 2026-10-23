'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Animate from '../website/Animate';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { getBlogFeaturedImageSrc, isRemoteImageSrc } from '../../../lib/media';

const PAGE_SIZE = 12;

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function truncate(text, maxLen = 100) {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

export default function BlogListInfiniteScroll({ initialPosts = [], initialHasMore = false, initialPage = 1 }) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs?page=${page + 1}&limit=${PAGE_SIZE}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const newPosts = json.data.filter((b) => b.status === 'published');
        setPosts((prev) => [...prev, ...newPosts]);
        const pagination = json.pagination || {};
        const totalPages = pagination.pages ?? 1;
        setHasMore(page + 1 < totalPages);
        setPage((p) => p + 1);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) loadMore();
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => {
          const imageSrc = getBlogFeaturedImageSrc(post.featured_image);
          return (
          <Animate key={post.id || post.slug || idx} variant="up" delay={Math.min(idx * 0.06, 0.6)}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="hover-lift flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/60 bg-white shadow-[0_4px_24px_-4px_rgba(14,39,64,0.08)] transition-all duration-300 hover:border-cyan-200/60 hover:shadow-[0_24px_48px_-12px_rgba(2,105,148,0.18)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      unoptimized={isRemoteImageSrc(imageSrc)}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-cyan-50"
                      aria-hidden
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-primary)] shadow-sm backdrop-blur">
                    {post.category || 'Blog'}
                  </span>
                </div>
                <div className="flex min-h-[200px] flex-1 flex-col p-6">
                  <h2 className="line-clamp-2 min-h-[2.75rem] text-lg font-bold leading-snug text-[#0a0a0a] transition-colors group-hover:text-[var(--brand-primary)] md:min-h-[3rem] md:text-xl">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {truncate(post.description, 120)}
                    </p>
                  )}
                    <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <FaCalendarAlt className="h-3.5 w-3.5 shrink-0" />
                      <time dateTime={post.createdAt || post.created_at}>{formatDate(post.createdAt || post.created_at)}</time>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] transition-all duration-300 group-hover:gap-3">
                      Read More
                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </Animate>
          );
        })}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-4" aria-hidden />

      {loading && (
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--brand-primary)] border-t-transparent" />
            <span className="text-sm font-medium">Loading more...</span>
          </div>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="py-8 text-center text-sm text-slate-400">You&apos;ve seen all posts</p>
      )}
    </>
  );
}
