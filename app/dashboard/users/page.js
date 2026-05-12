'use client';

import { useState, useEffect, useCallback } from 'react';
import { userService } from '../../../lib/services/userService';
import { roleService } from '../../../lib/services/roleService';
import PageHeader from '../../components/PageHeader';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardLayout from '../../components/DashboardLayout';
import TableToolbar from '../../components/TableToolbar';
import Pagination from '../../components/Pagination';
import { FiPlus, FiEdit, FiUser, FiTrash2 } from 'react-icons/fi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from '../../components/FormikInputs';
import { ErrorMessage, LoadingSpinner } from '../../components/ErrorMessage';

const createValidationSchema = (isEdit) =>
  Yup.object({
    first_name: Yup.string().required('First name is required').trim(),
    last_name: Yup.string().required('Last name is required').trim(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: isEdit
      ? Yup.string().min(6, 'Min 6 characters').nullable()
      : Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().required('Role is required'),
    is_active: Yup.boolean(),
  });

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 25, pages: 0 });
  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers({
        page,
        limit,
        q: search.trim() || undefined,
        sortBy,
        sortOrder,
      });
      if (response.success) {
        setUsers(response.data || []);
        setPagination(response.pagination || { total: 0, page: 1, limit: 25, pages: 0 });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, sortBy, sortOrder]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const loadRoles = async () => {
    try {
      const response = await roleService.getRoles({ limit: 100 });
      if (response.success) setRoles(response.data || []);
    } catch (err) {
      console.error('Failed to load roles:', err);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      setSuccess('');
      if (editingUser) {
        const payload = {
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role,
          is_active: !!values.is_active,
        };
        if (values.password && values.password.length >= 6) payload.password = values.password;
        const response = await userService.updateUser(editingUser.id, payload);
        if (response.success) {
          setSuccess('User updated');
          setShowForm(false);
          setEditingUser(null);
          loadUsers();
          setTimeout(() => setSuccess(''), 3000);
        } else setError(response.message || 'Failed to update user');
      } else {
        const response = await userService.createUser({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          role: values.role,
          is_active: !!values.is_active,
        });
        if (response.success) {
          setSuccess('User created');
          setShowForm(false);
          setEditingUser(null);
          loadUsers();
          setTimeout(() => setSuccess(''), 3000);
        } else setError(response.message || 'Failed to create user');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (user) => {
    if (typeof window === 'undefined' || !window.confirm(`Are you sure you want to delete "${user.first_name} ${user.last_name}" (${user.email})? This cannot be undone.`)) return;
    try {
      setError('');
      setSuccess('');
      setDeletingId(user.id);
      const response = await userService.deleteUser(user.id);
      if (response?.success) {
        setSuccess('User deleted');
        loadUsers();
        setTimeout(() => setSuccess(''), 3000);
      } else setError(response?.message || 'Failed to delete user');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  const initialValues = editingUser
    ? {
        first_name: editingUser.first_name || '',
        last_name: editingUser.last_name || '',
        email: editingUser.email || '',
        password: '',
        role: editingUser.role || 'admin',
        is_active: editingUser.is_active !== false,
      }
    : {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'admin',
        is_active: true,
      };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader
            title="User Management"
            subtitle="Add and manage admin users"
            actionButton={
              <button
                onClick={() => {
                  setEditingUser(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-dark)]"
              >
                <FiPlus className="mr-2" size={16} />
                Add User
              </button>
            }
          />
          {error && <ErrorMessage message={error} type="error" />}
          {success && <ErrorMessage message={success} type="success" />}

          {showForm && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={createValidationSchema(!!editingUser)}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormikInput name="first_name" label="First Name" placeholder="First name" required />
                      <FormikInput name="last_name" label="Last Name" placeholder="Last name" required />
                    </div>
                    <FormikInput
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="user@example.com"
                      required
                      disabled={!!editingUser}
                    />
                    <FormikInput
                      name="password"
                      type="password"
                      label={editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                      placeholder={editingUser ? 'Optional' : 'Min 6 characters'}
                      required={!editingUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                          name="role"
                          value={values.role}
                          onChange={(e) => setFieldValue('role', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)] sm:text-sm"
                        >
                          {roles.map((r) => (
                            <option key={r.id} value={r.slug}>
                              {r.name}
                            </option>
                          ))}
                          {roles.length === 0 && (
                            <>
                              <option value="admin">Admin</option>
                              <option value="staff">Staff</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 pt-8">
                        <input
                          type="checkbox"
                          id="is_active"
                          checked={!!values.is_active}
                          onChange={(e) => setFieldValue('is_active', e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-[var(--admin-primary)] focus:ring-[var(--admin-primary)]"
                        />
                        <label htmlFor="is_active" className="text-sm text-gray-700">Active</label>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[var(--admin-primary)] text-white px-6 py-2 rounded-md hover:bg-[var(--admin-primary-dark)] disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : editingUser ? 'Update User' : 'Create User'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingUser(null);
                        }}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}

          {!showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50/30">
                <TableToolbar
                  searchPlaceholder="Search by name, email, role..."
                  searchValue={search}
                  onSearchChange={(v) => { setSearch(v); setPage(1); }}
                  pageSize={limit}
                  onPageSizeChange={(n) => { setLimit(n); setPage(1); }}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={(by, order) => { setSortBy(by); setSortOrder(order); setPage(1); }}
                  sortOptions={[
                    { value: 'created_at:DESC', label: 'Newest first' },
                    { value: 'created_at:ASC', label: 'Oldest first' },
                    { value: 'email:ASC', label: 'Email A–Z' },
                    { value: 'email:DESC', label: 'Email Z–A' },
                    { value: 'first_name:ASC', label: 'Name A–Z' },
                    { value: 'first_name:DESC', label: 'Name Z–A' },
                    { value: 'role:ASC', label: 'Role A–Z' },
                    { value: 'role:DESC', label: 'Role Z–A' },
                  ]}
                />
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <LoadingSpinner size={32} />
                  <span className="ml-2 text-slate-600">Loading users...</span>
                </div>
              ) : users.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FiUser className="h-16 w-16 text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900">No users yet</h3>
                  <p className="text-sm text-slate-500 mt-2">{search.trim() ? 'No results match your search.' : 'Add your first user above.'}</p>
                  {!search.trim() && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-dark)]"
                    >
                      <FiPlus className="mr-2" size={16} />
                      Add User
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead>
                        <tr className="bg-slate-50/80">
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-[var(--admin-primary)] flex items-center justify-center text-white text-sm font-medium shrink-0">
                                  {(user.first_name && user.first_name[0]) || (user.email && user.email[0]) || '?'}
                                </div>
                                <div className="text-sm font-medium text-slate-900">
                                  {user.first_name} {user.last_name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800 capitalize">
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${user.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {user.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="text-[var(--admin-primary)] hover:text-[var(--admin-primary-dark)] p-1 rounded"
                                  title="Edit user"
                                >
                                  <FiEdit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(user)}
                                  disabled={deletingId === user.id}
                                  className="text-red-600 hover:text-red-700 p-1 rounded disabled:opacity-50"
                                  title="Delete user"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/30">
                    <Pagination
                      page={pagination.page}
                      pages={pagination.pages}
                      limit={pagination.limit}
                      total={pagination.total}
                      onPageChange={setPage}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
