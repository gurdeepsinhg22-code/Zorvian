'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiLock, FiClock, FiBarChart, FiShield, FiVideo } from 'react-icons/fi';
import { FormikInput } from '../components/FormikInputs';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAppName, useAppDescription } from '../hooks/useAppConfig';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const initialValues = { email: '', password: '' };

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const appName = useAppName();
  const appDescription = useAppDescription();
  const initialAuthDone = useRef(false);

  useEffect(() => {
    if (!loading) initialAuthDone.current = true;
  }, [loading]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    try {
      const result = await login({ email: values.email, password: values.password });
      if (!result.success) {
        setError(result.error || 'Login failed. Please check your credentials.');
        setSubmitting(false);
      }
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred.');
      setSubmitting(false);
    }
  };

  if (loading && !initialAuthDone.current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--admin-sidebar)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-2 border-[var(--admin-primary)] border-t-transparent mx-auto mb-4" />
          <p className="text-slate-300 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] flex">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden bg-[var(--admin-sidebar)]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[var(--admin-primary)]/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[var(--admin-primary)]/10 blur-[80px]" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-16">
          <div className="mb-10">
            <div className="h-14 w-44 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center overflow-hidden mb-6 px-2">
              <img src="/assets/images/zorvian-digital-logo.png" alt={`${appName} Logo`} className="h-16 w-full object-contain" />
            </div>
            <h1 className="text-2xl xl:text-3xl font-bold text-white tracking-tight">
              {appName}
            </h1>
            <p className="mt-2 text-slate-400 text-sm max-w-sm">{appDescription}</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
            <Image src="/dash.png" width={420} height={260} alt="Dashboard preview" className="w-full h-auto" />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--admin-primary)]/20 text-[var(--admin-primary)]">
                <FiShield size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Secure Access</p>
                <p className="text-xs text-slate-400">Role-based permissions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--admin-primary)]/20 text-[var(--admin-primary)]">
                <FiBarChart size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Insights</p>
                <p className="text-xs text-slate-400">Real-time analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--admin-primary)]/20 text-[var(--admin-primary)]">
                <FiClock size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Fast Workflows</p>
                <p className="text-xs text-slate-400">Streamlined management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--admin-primary)]/20 text-[var(--admin-primary)]">
                <FiVideo size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Management</p>
                <p className="text-xs text-slate-400">Centralized control</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-12 bg-[#F6FCFF]">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <div className="h-12 w-40 rounded-xl bg-white flex items-center justify-center overflow-hidden px-2 shadow-sm">
              <img src="/assets/images/zorvian-digital-logo.png" alt={`${appName} Logo`} className="h-10 w-full object-contain" />
            </div>
            <p className="mt-3 text-lg font-semibold text-slate-900">{appName}</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_4px_24px_-4px_rgba(14,34,56,0.08)]">
            <h2 className="text-xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-500">Sign in to access the admin dashboard</p>

            {error && (
              <div className="mt-6">
                <ErrorMessage message={error} type="error" />
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnChange
              validateOnBlur
            >
              {({ isSubmitting: formikSubmitting }) => (
                <Form className="mt-6 space-y-5">
                  <FormikInput
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    icon={<FiUser className="text-slate-400" size={18} />}
                  />
                  <FormikInput
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    icon={<FiLock className="text-slate-400" size={18} />}
                  />
                  <div className="flex items-center justify-end">
                    <a
                      href="/admin/forgot-password"
                      className="text-sm font-medium text-[var(--admin-primary)] hover:text-[var(--admin-primary-dark)] transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || formikSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--admin-primary)] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--admin-primary)]/25 hover:bg-[var(--admin-primary-dark)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {loading || formikSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <span className="inline-block">→</span>
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Protected by secure authentication
          </p>
        </div>
      </div>
    </div>
  );
}
