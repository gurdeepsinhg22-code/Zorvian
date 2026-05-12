'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { blogService } from '../../../../lib/services/blogService';
import PageHeader from '../../../components/PageHeader';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';
import BlogForm from '../../../components/BlogForm';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { useState } from 'react';

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function NewBlogPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const initialValues = {
    title: '',
    slug: '',
    description: '',
    content: '',
    featured_image: '',
    category: '',
    tags: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
  };

  const handleSubmit = async (values) => {
    try {
      setError('');
      const slug = values.slug?.trim() ? slugify(values.slug) : slugify(values.title);
      const response = await blogService.createBlog({
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
        setError(response.message || 'Failed to create blog');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create blog');
      throw err;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader
            title="Add Blog"
            subtitle="Create a new blog post"
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
