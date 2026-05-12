'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FiUsers,
  FiShield,
  FiUserCheck,
  FiArrowRight,
} from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  const actionItems = useMemo(
    () => [
      {
        icon: FiShield,
        title: 'Roles',
        subtitle: 'Manage roles & permissions',
        path: '/dashboard/roles',
        iconBg: 'bg-[var(--admin-primary)]/15 text-[var(--admin-primary)]',
      },
      {
        icon: FiUsers,
        title: 'Users',
        subtitle: 'Add & manage admin users',
        path: '/dashboard/users',
        iconBg: 'bg-[var(--admin-primary)]/15 text-[var(--admin-primary)]',
      },
      {
        icon: FiUserCheck,
        title: 'User Roles',
        subtitle: 'Assign roles to users',
        path: '/dashboard/user-roles',
        iconBg: 'bg-[var(--admin-primary)]/15 text-[var(--admin-primary)]',
      },
    ],
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-[var(--admin-primary)] border-t-transparent mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user?.first_name || user?.name || user?.email?.split('@')[0] || 'Admin';

  return (
    <ProtectedRoute>
      <DashboardLayout>
          {/* Welcome banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[var(--admin-primary)] via-[var(--admin-primary)] to-[var(--admin-primary-dark)] p-6 sm:p-8 mb-8 shadow-xl shadow-[var(--admin-primary)]/25">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Welcome back, {userName}!
                </h1>
                <p className="text-white/90 mt-1 text-sm sm:text-base">
                  Manage users, roles, and website content from this dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            {/* Quick Actions */}
            <div>
              <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="text-lg font-semibold text-slate-800">Quick Actions</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Jump to key admin sections</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {actionItems.map((a, i) => (
                      <Link
                        key={i}
                        href={a.path}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200/80 hover:border-[var(--admin-primary)]/30 hover:bg-[var(--admin-primary-light)]/30 transition-all duration-200"
                      >
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${a.iconBg}`}>
                          <a.icon size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 group-hover:text-[var(--admin-primary-dark)] transition-colors">
                            {a.title}
                          </p>
                          <p className="text-sm text-slate-500 truncate">{a.subtitle}</p>
                        </div>
                        <FiArrowRight className="flex-shrink-0 text-slate-300 group-hover:text-[var(--admin-primary)] group-hover:translate-x-1 transition-all" size={20} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
