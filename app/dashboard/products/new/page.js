'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { productService } from '../../../../lib/services/productService';
import PageHeader from '../../../components/PageHeader';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';
import ProductForm from '../../../components/ProductForm';
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

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const initialValues = {
    title: '',
    slug: '',
    subtitle: '',
    tagline: '',
    description: '',
    image: '',
    featuresText: '',
    benefitsText: '',
    status: 'draft',
    sort_order: 0,
    meta_title: '',
    meta_description: '',
  };

  const handleSubmit = async (values) => {
    try {
      setError('');
      const slug = values.slug?.trim() ? slugify(values.slug) : slugify(values.title);
      const response = await productService.createProduct({
        title: values.title.trim(),
        slug,
        subtitle: values.subtitle?.trim() || null,
        tagline: values.tagline?.trim() || null,
        description: values.description?.trim() || null,
        image: values.image || null,
        features: values.features || [],
        benefits: values.benefits || [],
        status: values.status,
        sort_order: Number(values.sort_order) || 0,
        meta_title: values.meta_title?.trim() || null,
        meta_description: values.meta_description?.trim() || null,
      });
      if (response?.success) {
        router.push('/dashboard/products');
      } else {
        setError(response?.message || 'Failed to create product');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create product');
      throw err;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader
            title="Add Product"
            subtitle="Create a new product"
            actionButton={
              <Link
                href="/dashboard/products"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-slate-700 bg-slate-200 hover:bg-slate-300"
              >
                Back to Products
              </Link>
            }
          />
          {error && <ErrorMessage message={error} type="error" />}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <ProductForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onCancel={() => router.push('/dashboard/products')}
            />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
