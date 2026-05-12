'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { blogService } from '../../../lib/services/blogService';
import PageHeader from '../../components/PageHeader';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardLayout from '../../components/DashboardLayout';
import Pagination from '../../components/Pagination';
import { FiPlus, FiEdit, FiTrash2, FiFileText, FiSearch } from 'react-icons/fi';
import { ErrorMessage, LoadingSpinner } from '../../components/ErrorMessage';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 25, pages: 0 });
  const [deletingId, setDeletingId] = useState(null);

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page, limit, sortBy, sortOrder };
      if (search.trim()) params.q = search.trim();
      if (statusFilter) params.status = statusFilter;
      const response = await blogService.getAdminBlogs(params);
      if (response.success) {
        setBlogs(response.data || []);
        setPagination(response.pagination || { total: 0, page: 1, limit: 25, pages: 0 });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const handleDelete = async (blog) => {
    if (typeof window === 'undefined' || !window.confirm(`Are you sure you want to delete "${blog.title}"? This cannot be undone.`)) return;
    try {
      setError('');
      setSuccess('');
      setDeletingId(blog.id);
      const response = await blogService.deleteBlog(blog.id);
      if (response?.success) {
        setSuccess('Blog deleted');
        loadBlogs();
        setTimeout(() => setSuccess(''), 3000);
      } else setError(response?.message || 'Failed to delete blog');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (d) => {
    if (!d) return '-';
    const date = new Date(d);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader
            title="Blog Management"
            subtitle="Create and manage blog posts"
            actionButton={
              <Link
                href="/dashboard/blogs/new"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-dark)]"
              >
                <FiPlus className="mr-2" size={16} />
                Add Blog
              </Link>
            }
          />
          {error && <ErrorMessage message={error} type="error" />}
          {success && <ErrorMessage message={success} type="success" />}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="search"
                    placeholder="Search by title, description, category..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)] text-sm"
                    aria-label="Search blogs"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    className="py-2 pl-3 pr-8 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                  >
                    <option value="">All statuses</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <label htmlFor="blog-sort" className="text-sm text-slate-600 whitespace-nowrap">Sort by</label>
                    <select
                      id="blog-sort"
                      value={`${sortBy}:${sortOrder}`}
                      onChange={(e) => {
                        const [by, order] = e.target.value.split(':');
                        setSortBy(by); setSortOrder(order || 'DESC'); setPage(1);
                      }}
                      className="py-2 pl-3 pr-8 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                    >
                      <option value="created_at:DESC">Newest first</option>
                      <option value="created_at:ASC">Oldest first</option>
                      <option value="title:ASC">Title A–Z</option>
                      <option value="title:DESC">Title Z–A</option>
                      <option value="updated_at:DESC">Recently updated</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="blog-page-size" className="text-sm text-slate-600 whitespace-nowrap">Show</label>
                    <select
                      id="blog-page-size"
                      value={limit}
                      onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                      className="py-2 pl-3 pr-8 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                    >
                      {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span className="text-sm text-slate-500">per page</span>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size={32} />
                <span className="ml-2 text-slate-600">Loading blogs...</span>
              </div>
            ) : blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FiFileText className="h-16 w-16 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No blogs yet</h3>
                <p className="text-sm text-slate-500 mt-2">{search.trim() || statusFilter ? 'No results match your filters.' : 'Add your first blog post.'}</p>
                {!search.trim() && !statusFilter && (
                  <Link
                    href="/dashboard/blogs/new"
                      className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-dark)]"
                  >
                    <FiPlus className="mr-2" size={16} />
                    Add Blog
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr className="bg-slate-50/80">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-900">{blog.title}</div>
                            {blog.slug && <div className="text-xs text-slate-500 mt-0.5">/{blog.slug}</div>}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{blog.category || '-'}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${blog.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{formatDate(blog.created_at)}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                href={`/dashboard/blogs/${blog.id}`}
                                className="text-[var(--admin-primary)] hover:text-[var(--admin-primary-dark)] p-1 rounded"
                                title="Edit blog"
                              >
                                <FiEdit size={18} />
                              </Link>
                              <button
                                onClick={() => handleDelete(blog)}
                                disabled={deletingId === blog.id}
                                className="text-red-600 hover:text-red-700 p-1 rounded disabled:opacity-50"
                                title="Delete blog"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/30">
                  <Pagination
                    page={pagination.page}
                    pages={pagination.pages}
                    limit={pagination.limit}
                    total={pagination.total}
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
