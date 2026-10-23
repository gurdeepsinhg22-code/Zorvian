'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { FormikInput } from '../../components/FormikInputs';
import { ErrorMessage, SuccessMessage } from '../../components/ErrorMessage';
import { authService } from '../../../lib/services/authService';
import { useAppName } from '../../hooks/useAppConfig';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

export default function AdminForgotPasswordPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const appName = useAppName();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      const result = await authService.forgotPassword(values.email);
      if (result.success) setSuccess(true);
      else setError(result.message || 'Failed to send reset email.');
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] bg-slate-50">
      <div className="flex items-center justify-center px-6 py-10 sm:px-10 min-h-screen">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center gap-2">
            <div className="h-14 w-48 rounded-2xl bg-white shadow-md grid place-items-center overflow-hidden px-2">
              <img src="/assets/images/zorvian-digital-logo.png" alt={`${appName} Logo`} className="h-16 w-full object-contain" />
            </div>
            <p className="text-xl font-semibold text-[#111827]">{appName}</p>
          </div>
          <button
            onClick={() => router.push('/admin')}
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[var(--admin-primary)] transition-colors"
          >
            <FiArrowLeft /> Back to Login
          </button>
          <h1 className="mb-1 text-2xl font-bold tracking-tight text-[#111827]">Forgot Password?</h1>
          <p className="mb-6 text-sm text-[#6b7280]">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
          {error && <ErrorMessage message={error} type="error" />}
          {success && (
            <SuccessMessage
              message="If an account with that email exists, a password reset link has been sent."
              type="success"
            />
          )}
          {!success && (
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnChange
              validateOnBlur
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <FormikInput
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    icon={<FiMail className="text-gray-400" />}
                  />
                  <button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--admin-primary)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--admin-primary)]/25 hover:bg-[var(--admin-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading || isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Sending...
                      </>
                    ) : (
                      <>Send Reset Link →</>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
