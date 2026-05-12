'use client';

import { useState, useEffect, useCallback } from 'react';
import { roleService } from '../../../lib/services/roleService';
import PageHeader from '../../components/PageHeader';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardLayout from '../../components/DashboardLayout';
import TableToolbar from '../../components/TableToolbar';
import Pagination from '../../components/Pagination';
import { FiPlus, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput, FormikTextarea } from '../../components/FormikInputs';
import { ErrorMessage, LoadingSpinner } from '../../components/ErrorMessage';

const validationSchema = Yup.object({
  name: Yup.string().required('Role name is required'),
  slug: Yup.string()
    .required('Slug is required')
    .matches(/^[a-z0-9_-]+$/, 'Slug: lowercase letters, numbers, hyphens and underscores only'),
  description: Yup.string(),
  is_active: Yup.boolean(),
});

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 25, pages: 0 });

  const loadRoles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await roleService.getRoles({
        page,
        limit,
        q: search.trim() || undefined,
        sortBy,
        sortOrder,
      });
      if (response.success) {
        setRoles(response.data || []);
        setPagination(response.pagination || { total: 0, page: 1, limit: 25, pages: 0 });
      }
    } catch (err) {
      setError('Failed to load roles');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, sortBy, sortOrder]);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);
  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const response = await roleService.getPermissions({ limit: 200 });
      if (response.success) {
        const data = response.data || [];
        setPermissions(data);
        const grouped = {};
        data.forEach((perm) => {
          if (!grouped[perm.resource]) grouped[perm.resource] = [];
          grouped[perm.resource].push(perm);
        });
        setGroupedPermissions(grouped);
      }
    } catch (err) {
      console.error('Failed to load permissions:', err);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      setSuccess('');
      const roleData = {
        name: values.name,
        slug: values.slug,
        description: values.description || '',
        is_active: values.is_active !== undefined ? values.is_active : true,
        permission_ids: selectedPermissions,
      };
      const response = editingRole
        ? await roleService.updateRole(editingRole.id, roleData)
        : await roleService.createRole(roleData);
      if (response.success) {
        setSuccess(editingRole ? 'Role updated' : 'Role created');
        setShowForm(false);
        setEditingRole(null);
        setSelectedPermissions([]);
        loadRoles();
        setTimeout(() => setSuccess(''), 3000);
      } else setError(response.message || 'Failed to save role');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save role');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setSelectedPermissions(role.permissions?.map((p) => p.id) || []);
    setShowForm(true);
  };

  const handleDelete = async (role) => {
    if (!confirm(`Delete role "${role.name}"?`)) return;
    try {
      const response = await roleService.deleteRole(role.id);
      if (response.success) {
        setSuccess('Role deleted');
        loadRoles();
        setTimeout(() => setSuccess(''), 3000);
      } else setError(response.message || 'Failed to delete');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  const togglePermission = (id) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAllForResource = (resourcePermissions) => {
    const ids = resourcePermissions.map((p) => p.id);
    const allSelected = ids.every((id) => selectedPermissions.includes(id));
    setSelectedPermissions((prev) =>
      allSelected ? prev.filter((x) => !ids.includes(x)) : [...new Set([...prev, ...ids])]
    );
  };

  const initialValues = editingRole
    ? {
        name: editingRole.name,
        slug: editingRole.slug,
        description: editingRole.description || '',
        is_active: editingRole.is_active,
      }
    : { name: '', slug: '', description: '', is_active: true };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <PageHeader
            title="Role Management"
            subtitle="Create and manage user roles and permissions"
            actionButton={
              <button
                onClick={() => {
                  setEditingRole(null);
                  setSelectedPermissions([]);
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-dark)]"
              >
                <FiPlus className="mr-2" size={16} />
                Create Role
              </button>
            }
          />
          {error && <ErrorMessage message={error} type="error" />}
          {success && <ErrorMessage message={success} type="success" />}

          {showForm && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormikInput name="name" label="Role Name" placeholder="e.g. Lab Manager" required />
                      <FormikInput name="slug" label="Slug" placeholder="e.g. lab_manager" required />
                    </div>
                    <FormikTextarea name="description" label="Description" placeholder="Role description" rows={3} />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={!!values.is_active}
                        onChange={(e) => setFieldValue('is_active', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[var(--admin-primary)] focus:ring-[var(--admin-primary)]"
                      />
                      <label htmlFor="is_active" className="text-sm text-gray-700">Active</label>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Permissions</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin border border-gray-200 rounded-lg p-4 bg-gray-50">
                        {Object.entries(groupedPermissions).map(([resource, perms]) => {
                          const ids = perms.map((p) => p.id);
                          const allSelected = ids.every((id) => selectedPermissions.includes(id));
                          return (
                            <div key={resource} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-700 capitalize">{resource.replace(/-/g, ' ')}</h4>
                                <button
                                  type="button"
                                  onClick={() => toggleAllForResource(perms)}
                                  className="text-sm text-[var(--admin-primary)] hover:underline"
                                >
                                  {allSelected ? 'Deselect All' : 'Select All'}
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {perms.map((perm) => (
                                  <label key={perm.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={selectedPermissions.includes(perm.id)}
                                      onChange={() => togglePermission(perm.id)}
                                      className="h-4 w-4 rounded border-gray-300 text-[var(--admin-primary)] focus:ring-[var(--admin-primary)]"
                                    />
                                    <span className="text-sm text-gray-700">{perm.name}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[var(--admin-primary)] text-white px-6 py-2 rounded-md hover:bg-[var(--admin-primary-dark)] disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : editingRole ? 'Update Role' : 'Create Role'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingRole(null);
                          setSelectedPermissions([]);
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
                  searchPlaceholder="Search by name, slug, description..."
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
                    { value: 'name:ASC', label: 'Name A–Z' },
                    { value: 'name:DESC', label: 'Name Z–A' },
                    { value: 'slug:ASC', label: 'Slug A–Z' },
                    { value: 'slug:DESC', label: 'Slug Z–A' },
                  ]}
                />
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <LoadingSpinner size={32} />
                  <span className="ml-2 text-slate-600">Loading roles...</span>
                </div>
              ) : roles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <h3 className="text-lg font-medium text-slate-900">No roles yet</h3>
                  <p className="text-sm text-slate-500 mt-2">{search.trim() ? 'No results match your search.' : 'Create your first role above.'}</p>
                  {!search.trim() && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-dark)]"
                    >
                      <FiPlus className="mr-2" size={16} />
                      Create Role
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead>
                        <tr className="bg-slate-50/80">
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Permissions</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Assigned</th>
                          <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {roles.map((role) => (
                          <tr key={role.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-slate-900">{role.name}</div>
                                <div className="text-sm text-slate-500">{role.slug}</div>
                                {role.description && <div className="text-xs text-slate-400 mt-1">{role.description}</div>}
                              </div>
                            </td>
                            <td className="px-6 py-4"><div className="text-sm text-slate-800">{role.permissions?.length || 0} permissions</div></td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${role.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {role.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${role.is_assigned ? 'bg-[var(--admin-primary-light)] text-[var(--admin-primary-dark)]' : 'bg-slate-100 text-slate-600'}`}>
                                {role.is_assigned ? <><FiCheck className="mr-1" size={12} /> Yes</> : <><FiX className="mr-1" size={12} /> No</>}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleEdit(role)} className="text-[var(--admin-primary)] hover:text-[var(--admin-primary-dark)]" title="Edit"><FiEdit size={18} /></button>
                                <button
                                  onClick={() => handleDelete(role)}
                                  disabled={['admin', 'super_admin', 'doctor', 'staff', 'patient'].includes(role.slug)}
                                  className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title={['admin', 'super_admin', 'doctor', 'staff', 'patient'].includes(role.slug) ? 'Cannot delete default role' : 'Delete'}
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
