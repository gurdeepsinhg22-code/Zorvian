'use client';

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogService } from '../../../../lib/services/blogService';
import PageHeader from '../../../components/PageHeader';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';
import BlogForm from '../../../components/BlogForm';
import { ErrorMessage, LoadingSpinner } from '../../../components/ErrorMessage';

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    blogService
      .getBlogById(id)
      .then((res) => {
        if (res.success && res.data) setBlog(res.data);
        else setError('Blog not found');
      })
      .catch((err) => setError(err.response?.data?.message || err.message || 'Failed to load blog'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setError('');
      const slug = values.slug?.trim() ? slugify(values.slug) : slugify(values.title);
      const response = await blogService.updateBlog(id, {
        title: values.title.trim(),
        slug,
        description: values.description?.trim() || null,
        content: values.content || null,
        featured_image: values.featured_image || null,
        category: values.category?.trim() || null,
        tags: values.tags?.trim() || null,
        status: values.status,
        meta_title: values.meta_title?.trim() || null,
        meta_description: values.meta_description?.trim() || null,
      });
      if (response.success) {
        router.push('/dashboard/blogs');
      } else {
        setError(response.message || 'Failed to update blog');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update blog');
      throw err;
    }
  };

  const initialValues = blog
    ? {
        title: blog.title || '',
        slug: blog.slug || '',
        description: blog.description || '',
        content: blog.content || '',
        featured_image: blog.featured_image || '',
        category: blog.category || '',
        tags: blog.tags || '',
        status: blog.status || 'draft',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
      }
    : null;

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoadingSpinner size={32} />
          <span className="ml-2 text-slate-600">Loading blog...</span>
        </div>
      </ProtectedRoute>
    );
  }

  if (!blog || !initialValues) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <p className="text-slate-600">{error || 'Blog not found'}</p>
          <Link href="/dashboard/blogs" className="mt-4 text-[var(--admin-primary)] hover:text-[var(--admin-primary-dark)]">
            Back to Blogs
          </Link>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader
            title="Edit Blog"
            subtitle={`Editing: ${blog.title}`}
            actionButton={
              <Link
                href="/dashboard/blogs"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-slate-700 bg-slate-200 hover:bg-slate-300"
              >
                Back to Blogs
              </Link>
            }
          />
          {error && <ErrorMessage message={error} type="error" />}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <BlogForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onCancel={() => router.push('/dashboard/blogs')}
            />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
