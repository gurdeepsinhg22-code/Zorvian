'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput, FormikTextarea } from './FormikInputs';
import RichTextEditor from './RichTextEditor';

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const BLOG_CATEGORIES = [
  'Employee Management',
  'Medhostech',
  'Patient Management Software',
  'HRMS Software',
  'Clinic Management',
  'Healthcare IT',
  'EHR',
  'Other',
];

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').trim(),
  slug: Yup.string()
    .nullable()
    .matches(/^[a-z0-9-]*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: Yup.string().nullable(),
  category: Yup.string().nullable(),
  tags: Yup.string().nullable(),
  status: Yup.string().oneOf(['draft', 'published']).required('Status is required'),
});

export default function BlogForm({ initialValues, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, handleChange, isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikInput name="title" label="Title" placeholder="Blog post title" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (auto-generated from title)</label>
              <input
                type="text"
                name="slug"
                value={values.slug}
                onChange={(e) => setFieldValue('slug', e.target.value)}
                onBlur={() => {
                  if (!values.slug?.trim() && values.title) setFieldValue('slug', slugify(values.title));
                }}
                placeholder="url-friendly-slug"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-xs text-slate-500">Used in URL: /blog/[slug]</p>
            </div>
          </div>

          <FormikTextarea name="description" label="Description" placeholder="Short excerpt for listing" rows={3} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
            <div className="flex items-center gap-4">
              {values.featured_image && (
                <img
                  src={values.featured_image}
                  alt="Featured"
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
                      const { blogService } = await import('../../lib/services/blogService');
                      const res = await blogService.uploadImage(file);
                      if (res?.data?.url) setFieldValue('featured_image', res.data.url);
                    } catch (err) {
                      console.error('Upload failed:', err);
                      alert(err.message || 'Image upload failed');
                    }
                    e.target.value = '';
                  }}
                  className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--admin-primary-light)] file:text-[var(--admin-primary-dark)] hover:file:bg-[var(--admin-primary)]/20"
                />
                {values.featured_image && (
                  <button
                    type="button"
                    onClick={() => setFieldValue('featured_image', '')}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={values.category || ''}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select category</option>
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <FormikInput name="tags" label="Tags (comma-separated)" placeholder="healthcare, ehr, hrms" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <RichTextEditor
              value={values.content || ''}
              onChange={(html) => setFieldValue('content', html)}
              minHeight="300px"
            />
          </div>

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
              {isSubmitting ? 'Saving...' : 'Save Blog'}
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
