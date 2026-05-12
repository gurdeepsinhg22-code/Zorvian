'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ page = 1, pages = 1, limit = 10, total = 0, onPageChange, className = '' }) {
  if (pages <= 1 && total <= 0) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= pages;

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 ${className}`}>
      <p className="text-sm text-slate-600">
        Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of <span className="font-medium">{total}</span> results
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange?.(page - 1)}
          disabled={prevDisabled}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronLeft size={18} />
          Previous
        </button>
        <span className="px-3 py-2 text-sm text-slate-600">
          Page <span className="font-medium">{page}</span> of <span className="font-medium">{pages || 1}</span>
        </span>
        <button
          type="button"
          onClick={() => onPageChange?.(page + 1)}
          disabled={nextDisabled}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
