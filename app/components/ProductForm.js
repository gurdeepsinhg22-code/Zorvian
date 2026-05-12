'use client';

import { Formik, Form, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormikInput, FormikTextarea } from './FormikInputs';
import { FiAlertCircle } from 'react-icons/fi';

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function linesToArray(text) {
  if (!text || !String(text).trim()) return [];
  return String(text)
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Convert feature lines to objects { title, desc } for ProductDetailPage */
function linesToFeatureObjects(text) {
  const lines = linesToArray(text);
  return lines.map((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      return {
        title: line.slice(0, colonIdx).trim(),
        desc: line.slice(colonIdx + 1).trim() || null,
      };
    }
    return { title: line, desc: null };
  });
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').trim(),
  slug: Yup.string()
    .nullable()
    .matches(/^[a-z0-9-]*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  subtitle: Yup.string().nullable(),
  tagline: Yup.string().nullable(),
  description: Yup.string().nullable(),
  status: Yup.string().oneOf(['draft', 'published']).required('Status is required'),
  sort_order: Yup.number().nullable(),
});

export default function ProductForm({ initialValues, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const payload = {
          ...values,
          features: linesToFeatureObjects(values.featuresText),
          benefits: linesToArray(values.benefitsText),
        };
        delete payload.featuresText;
        delete payload.benefitsText;
        onSubmit(payload);
      }}
      enableReinitialize
    >
      {({ values, setFieldValue, handleChange, handleBlur, isSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikInput name="title" label="Title" placeholder="Product title" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (auto-generated from title)</label>
              <input
                type="text"
                name="slug"
                value={values.slug}
                onChange={(e) => setFieldValue('slug', e.target.value)}
                onBlur={(e) => {
                  handleBlur(e);
                  if (!values.slug?.trim() && values.title) setFieldValue('slug', slugify(values.title));
                }}
                placeholder="url-friendly-slug"
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)] sm:text-sm ${
                  errors.slug && touched.slug ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <FormikErrorMessage name="slug">
                {(msg) => (
                  <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <FiAlertCircle size={12} />
                    <span>{msg}</span>
                  </div>
                )}
              </FormikErrorMessage>
              <p className="mt-1 text-xs text-slate-500">Used in URL: /products/[slug]</p>
            </div>
          </div>

          <FormikInput name="subtitle" label="Subtitle" placeholder="Short subtitle" />
          <FormikInput name="tagline" label="Tagline" placeholder="Product tagline" />

          <FormikTextarea name="description" label="Description" placeholder="Product description" rows={4} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <div className="flex items-center gap-4">
              {values.image && (
                <img
                  src={values.image}
                  alt="Product"
                  className="h-24 w-40 object-cover rounded border border-slate-200"
                />
              )}
              <div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const { productService } = await import('../../lib/services/productService');
                      const res = await productService.uploadImage(file);
                      if (res?.data?.url) setFieldValue('image', res.data.url);
                    } catch (err) {
                      console.error('Upload failed:', err);
                      alert(err.message || 'Image upload failed');
                    }
                    e.target.value = '';
                  }}
                  className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--admin-primary-light)] file:text-[var(--admin-primary-dark)] hover:file:bg-[var(--admin-primary)]/20"
                />
                {values.image && (
                  <button
                    type="button"
                    onClick={() => setFieldValue('image', '')}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
            <textarea
              name="featuresText"
              value={values.featuresText || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
            <textarea
              name="benefitsText"
              value={values.benefitsText || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={values.status}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm max-w-xs"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <FormikInput name="sort_order" label="Sort Order" type="number" placeholder="0" />
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-700">SEO (optional)</h3>
            <FormikInput name="meta_title" label="Meta Title" placeholder="SEO title" />
            <FormikTextarea name="meta_description" label="Meta Description" placeholder="SEO description" rows={2} />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--admin-primary)] text-white px-6 py-2 rounded-md hover:bg-[var(--admin-primary-dark)] disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
            {onCancel && (
              <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
