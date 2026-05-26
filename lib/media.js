/**
 * Resolves upload paths (/uploads/...) and legacy full URLs for next/image and <img>.
 * Production uses same-origin /uploads (proxied to the API in next.config).
 */
const PRODUCTION_UPLOADS_ORIGIN = (
  process.env.NEXT_PUBLIC_UPLOADS_ORIGIN || 'https://api.medhostech.com'
).replace(/\/$/, '');

function toUploadPath(value) {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (/localhost|127\.0\.0\.1/i.test(trimmed)) {
      return trimmed.replace(/^https?:\/\/[^/]+/i, '') || null;
    }
    return trimmed;
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/**
 * @param {string|null|undefined} uploadPathOrUrl
 * @param {{ fallback?: string|null }} [options]
 * @returns {string|null}
 */
export function getUploadSrc(uploadPathOrUrl, options = {}) {
  const { fallback = null } = options;
  const path = toUploadPath(uploadPathOrUrl);
  if (!path) return fallback;

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (path.startsWith('/uploads')) {
    if (process.env.NODE_ENV === 'development') {
      return `${PRODUCTION_UPLOADS_ORIGIN}${path}`;
    }
    return path;
  }

  return path;
}

/** Blog cards / detail featured images */
export function getBlogFeaturedImageSrc(featuredImage) {
  if (!featuredImage) return null;
  return getUploadSrc(featuredImage);
}

export function isRemoteImageSrc(src) {
  return typeof src === 'string' && /^https?:\/\//i.test(src);
}
