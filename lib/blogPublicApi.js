const PRODUCTION_API = 'https://api.medhostech.com';

/** Origins to try for /api/blogs (newest strategy: same-origin proxy, direct API, production fallback). */
export function getBlogApiBases() {
  const bases = [];
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const api = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');

  if (site) bases.push(site);
  if (api && !bases.includes(api)) bases.push(api);

  if (process.env.NODE_ENV === 'development') {
    for (const origin of ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001']) {
      if (!bases.includes(origin)) bases.push(origin);
    }
  }

  if (!bases.includes(PRODUCTION_API)) bases.push(PRODUCTION_API);

  return bases;
}

function parsePublishedList(json, page) {
  if (!json?.success || !Array.isArray(json.data)) return null;
  const posts = json.data.filter((b) => !b.status || b.status === 'published');
  const pagination = json.pagination || {};
  const totalPages = pagination.pages ?? 1;
  return {
    posts,
    hasMore: page < totalPages,
    page,
  };
}

/**
 * @param {{ page?: number, limit?: number }} options
 * @returns {Promise<{ posts: object[], hasMore: boolean, page: number, error?: string }>}
 */
export async function fetchPublishedBlogs({ page = 1, limit = 12 } = {}) {
  const bases = getBlogApiBases();
  let lastError = 'Could not reach the blog API';

  for (const base of bases) {
    const url = `${base}/api/blogs?page=${page}&limit=${limit}`;
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) {
        lastError = `Blog API returned ${res.status} (${base})`;
        continue;
      }
      const json = await res.json();
      const parsed = parsePublishedList(json, page);
      if (parsed) return parsed;
    } catch (err) {
      lastError = err?.message || lastError;
    }
  }

  return { posts: [], hasMore: false, page: 1, error: lastError };
}

/**
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function fetchBlogBySlug(slug) {
  if (!slug) return null;
  const bases = getBlogApiBases();

  for (const base of bases) {
    const url = `${base}/api/blogs/slug/${encodeURIComponent(slug)}`;
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) continue;
      const json = await res.json();
      if (json.success && json.data) return json.data;
    } catch {
      // try next base
    }
  }

  return null;
}
