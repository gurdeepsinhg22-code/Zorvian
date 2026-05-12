'use client';

import { useState, useEffect } from 'react';
import { roleService } from '../../../lib/services/roleService';
import { userService } from '../../../lib/services/userService';
import PageHeader from '../../components/PageHeader';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardLayout from '../../components/DashboardLayout';
import { FiUser, FiShield, FiCheck, FiX, FiPlus } from 'react-icons/fi';
import { ErrorMessage, LoadingSpinner } from '../../components/ErrorMessage';

export default function UserRolesPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getUsers({ page: 1, limit: 100 });
      if (response.success) setUsers(response.data || []);
      else setError(response.message || 'Failed to load users');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const response = await roleService.getRoles({ limit: 100 });
      if (response.success) setRoles(response.data || []);
    } catch (err) {
      console.error('Failed to load roles:', err);
    }
  };

  const loadUserRoles = async (userId) => {
    try {
      const response = await roleService.getUserRoles(userId);
      if (response.success) setUserRoles(response.data?.roles || []);
    } catch (err) {
      console.error('Failed to load user roles:', err);
      setUserRoles([]);
    }
  };

  const isDefaultRole = (role) =>
    selectedUser && role && role.slug && String(selectedUser.role) === String(role.slug);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setError('');
    setSuccess('');
    await loadUserRoles(user.id);
  };

  const handleAssignRole = async (roleId) => {
    if (!selectedUser) return;
    try {
      setAssigning(true);
      setError('');
      const response = await roleService.assignRoleToUser(selectedUser.id, roleId);
      if (response.success) {
        setSuccess('Role assigned');
        await loadUserRoles(selectedUser.id);
        setTimeout(() => setSuccess(''), 3000);
      } else setError(response.message || 'Failed to assign role');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to assign role');
    } finally {
      setAssigning(false);
    }
  };

  const handleRemoveRole = async (roleId) => {
    if (!selectedUser) return;
    if (!confirm('Remove this role from the user?')) return;
    try {
      setAssigning(true);
      setError('');
      const response = await roleService.removeRoleFromUser(selectedUser.id, roleId);
      if (response.success) {
        setSuccess('Role removed');
        await loadUserRoles(selectedUser.id);
        setTimeout(() => setSuccess(''), 3000);
      } else setError(response.message || 'Failed to remove role');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove role');
    } finally {
      setAssigning(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      (u.email && u.email.toLowerCase().includes(term)) ||
      (u.first_name && u.first_name.toLowerCase().includes(term)) ||
      (u.last_name && u.last_name.toLowerCase().includes(term))
    );
  });

  const availableRoles = roles.filter((r) => !userRoles.some((ur) => ur.id === r.id));

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader title="User Roles" subtitle="Assign roles to users" />
          {error && <ErrorMessage message={error} type="error" />}
          {success && <ErrorMessage message={success} type="success" />}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User list */}
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
                <h3 className="text-lg font-semibold text-slate-800">Users</h3>
                <p className="text-sm text-slate-500 mt-0.5">Search and select a user to manage their roles</p>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]"
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <LoadingSpinner size={32} />
                    <span className="ml-2 text-slate-600">Loading users...</span>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-sm">No users found</div>
                ) : (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleSelectUser(user)}
                      className={`w-full flex items-center gap-3 px-6 py-3 text-left border-b border-slate-100 last:border-b-0 transition-colors ${
                        selectedUser?.id === user.id
                          ? 'bg-[var(--admin-primary-light)]/40 border-l-4 border-l-[var(--admin-primary)]'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="h-10 w-10 rounded-full bg-[var(--admin-primary)] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {(user.first_name && user.first_name[0]) || (user.email && user.email[0]) || '?'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Assigned roles */}
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
                <h3 className="text-lg font-semibold text-slate-800">Assigned Roles</h3>
                {selectedUser ? (
                  <p className="text-sm text-slate-500 mt-0.5">
                    {selectedUser.first_name} {selectedUser.last_name} — {selectedUser.email}
                  </p>
                ) : (
                  <p className="text-sm text-slate-500 mt-0.5">Select a user from the list to manage their roles</p>
                )}
              </div>
              <div className="p-6 space-y-6">
                {!selectedUser ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                      <FiUser className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">Select a user from the list.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Current roles</h4>
                      {userRoles.length === 0 ? (
                        <p className="text-sm text-slate-500 py-2">No roles assigned.</p>
                      ) : (
                        <ul className="space-y-2">
                          {userRoles.map((role) => {
                            const isDefault = isDefaultRole(role);
                            return (
                              <li
                                key={role.id}
                                className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-100"
                              >
                                <span className="text-sm font-medium text-slate-800">
                                  {role.name}
                                  {isDefault && (
                                    <span className="ml-2 text-xs font-normal text-slate-500">(default)</span>
                                  )}
                                </span>
                                {isDefault ? (
                                  <span
                                    className="text-xs text-slate-400 cursor-not-allowed"
                                    title="Default role cannot be removed. Change the user's default role in Users first."
                                  >
                                    Cannot remove
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveRole(role.id)}
                                    disabled={assigning}
                                    className="text-sm text-red-600 hover:text-red-700 hover:underline disabled:opacity-50 transition-colors"
                                  >
                                    Remove
                                  </button>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Assign role</h4>
                      {availableRoles.length === 0 ? (
                        <p className="text-sm text-slate-500 py-2">User has all available roles.</p>
                      ) : (
                        <ul className="space-y-2">
                          {availableRoles.map((role) => (
                            <li
                              key={role.id}
                              className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                            >
                              <span className="text-sm font-medium text-slate-800">{role.name}</span>
                              <button
                                type="button"
                                onClick={() => handleAssignRole(role.id)}
                                disabled={assigning}
                                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--admin-primary)] hover:text-[var(--admin-primary-dark)] disabled:opacity-50 transition-colors"
                              >
                                <FiPlus size={14} />
                                Assign
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
