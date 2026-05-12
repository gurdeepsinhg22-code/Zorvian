'use client';

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { productService } from '../../../../lib/services/productService';
import PageHeader from '../../../components/PageHeader';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';
import ProductForm from '../../../components/ProductForm';
import { ErrorMessage, LoadingSpinner } from '../../../components/ErrorMessage';

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    productService
      .getProductById(id)
      .then((res) => {
        if (res?.success && res?.data) setProduct(res.data);
        else if (res?.id) setProduct(res);
        else setError('Product not found');
      })
      .catch((err) => setError(err.response?.data?.message || err.message || 'Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setError('');
      const slug = values.slug?.trim() ? slugify(values.slug) : slugify(values.title);
      const response = await productService.updateProduct(id, {
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
        setError(response?.message || 'Failed to update product');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update product');
      throw err;
    }
  };

  const initialValues = product
    ? {
        title: product.title || '',
        slug: product.slug || '',
        subtitle: product.subtitle || '',
        tagline: product.tagline || '',
        description: product.description || '',
        image: product.image || '',
        featuresText: Array.isArray(product.features)
          ? product.features
              .map((f) =>
                typeof f === 'string' ? f : (f?.title ? `${f.title}${f?.desc ? ': ' + f.desc : ''}` : '')
              )
              .join('\n')
          : '',
        benefitsText: Array.isArray(product.benefits)
          ? product.benefits.map((b) => (typeof b === 'string' ? b : b?.title || b?.desc || '')).join('\n')
          : '',
        status: product.status || 'draft',
        sort_order: product.sort_order ?? 0,
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
      }
    : null;

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoadingSpinner size={32} />
          <span className="ml-2 text-slate-600">Loading product...</span>
        </div>
      </ProtectedRoute>
    );
  }

  if (!product || !initialValues) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <p className="text-slate-600">{error || 'Product not found'}</p>
          <Link href="/dashboard/products" className="mt-4 text-[var(--admin-primary)] hover:text-[var(--admin-primary-dark)]">
            Back to Products
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
            title="Edit Product"
            subtitle={`Editing: ${product.title}`}
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
