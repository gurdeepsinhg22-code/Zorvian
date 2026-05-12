'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../../lib/services/authService';
import PageHeader from '../../components/PageHeader';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardLayout from '../../components/DashboardLayout';
import { FiUser, FiLock, FiSave } from 'react-icons/fi';
import { ErrorMessage, LoadingSpinner } from '../../components/ErrorMessage';

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();

  const [profile, setProfile] = useState({ first_name: '', last_name: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setProfile({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setProfileSaving(true);
    try {
      const res = await authService.updateProfile({
        first_name: profile.first_name.trim(),
        last_name: profile.last_name.trim(),
      });
      if (res.success) {
        setProfileSuccess('Profile updated successfully.');
        await refreshUser();
        setTimeout(() => setProfileSuccess(''), 3000);
      } else {
        setProfileError(res.message || 'Failed to update profile');
      }
    } catch (err) {
      setProfileError(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    setPasswordSaving(true);
    try {
      const res = await authService.changePassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordSuccess('Password updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSuccess(''), 3000);
      } else {
        setPasswordError(res.message || 'Failed to update password');
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || err.message || 'Failed to update password');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader title="My account" subtitle="Edit your profile and change your password" />

          {profileError && <ErrorMessage message={profileError} type="error" />}
          {profileSuccess && <ErrorMessage message={profileSuccess} type="success" />}
          {passwordError && <ErrorMessage message={passwordError} type="error" />}
          {passwordSuccess && <ErrorMessage message={passwordSuccess} type="success" />}

          <div className="mx-auto max-w-2xl space-y-6">
            {/* Profile card */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <FiUser className="h-5 w-5 text-[var(--admin-primary)]" />
                  Profile
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">Update your name. Email cannot be changed here.</p>
              </div>
              <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Contact an administrator to change your email.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First name *</label>
                    <input
                      type="text"
                      value={profile.first_name}
                      onChange={(e) => setProfile((p) => ({ ...p, first_name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last name *</label>
                    <input
                      type="text"
                      value={profile.last_name}
                      onChange={(e) => setProfile((p) => ({ ...p, last_name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--admin-primary-dark)] focus:ring-2 focus:ring-[var(--admin-primary)] focus:ring-offset-2 disabled:opacity-50"
                  >
                    {profileSaving ? (
                      <>
                        <LoadingSpinner size={16} className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="h-4 w-4 mr-2" />
                        Save profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Password card */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <FiLock className="h-5 w-5 text-[var(--admin-primary)]" />
                  Change password
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">Enter your current password and choose a new one.</p>
              </div>
              <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current password *</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">New password *</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                    placeholder="At least 6 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm new password *</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                    placeholder="••••••••"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={passwordSaving}
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--admin-primary-dark)] focus:ring-2 focus:ring-[var(--admin-primary)] focus:ring-offset-2 disabled:opacity-50"
                  >
                    {passwordSaving ? (
                      <>
                        <LoadingSpinner size={16} className="mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FiLock className="h-4 w-4 mr-2" />
                        Update password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
