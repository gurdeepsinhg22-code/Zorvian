'use client';

import Link from 'next/link';

export default function BlogLoadError({ message }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center">
      <p className="text-lg font-semibold text-slate-800">Unable to load blog posts</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
        {message ||
          'The blog service is temporarily unavailable. Make sure the backend API is running, then refresh this page.'}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-dark)]"
        >
          Try again
        </button>
        <Link href="/contact-us" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
          Contact support
        </Link>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Local dev: run the backend on port 3001 (<code className="rounded bg-white px-1">npm run dev</code> in{' '}
        <code className="rounded bg-white px-1">backend</code>).
      </p>
    </div>
  );
}
