'use client';

import { FiSearch } from 'react-icons/fi';

const PAGE_SIZES = [10, 25, 50, 100];

export default function TableToolbar({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  pageSize = 25,
  onPageSizeChange,
  sortBy = '',
  sortOrder = 'DESC',
  onSortChange,
  sortOptions = [],
  total = 0,
  showPageSize = true,
  showSort = true,
  className = '',
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className}`}>
      <div className="relative flex-1 max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)] text-sm"
          aria-label="Search"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {showSort && sortOptions.length > 0 && onSortChange && (
          <div className="flex items-center gap-2">
            <label htmlFor="table-sort" className="text-sm text-slate-600 whitespace-nowrap">Sort by</label>
            <select
              id="table-sort"
              value={sortBy ? `${sortBy}:${sortOrder}` : ''}
              onChange={(e) => {
                const v = e.target.value;
                if (v) {
                  const [by, order] = v.split(':');
                  onSortChange(by, order || 'DESC');
                }
              }}
              className="py-2 pl-3 pr-8 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label htmlFor="table-page-size" className="text-sm text-slate-600 whitespace-nowrap">Show</label>
            <select
              id="table-page-size"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="py-2 pl-3 pr-8 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="text-sm text-slate-500">per page</span>
          </div>
        )}
      </div>
    </div>
  );
}
