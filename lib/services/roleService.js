import { apiClient } from '../api/client';

export const roleService = {
  getRoles: async (params = {}) => {
    const clean = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null && v !== '')
    );
    const queryParams = new URLSearchParams(clean).toString();
    const endpoint = `/api/roles${queryParams ? `?${queryParams}` : ''}`;
    return apiClient.get(endpoint);
  },

  getRole: async (id) => {
    return apiClient.get(`/api/roles/${id}`);
  },

  createRole: async (roleData) => {
    return apiClient.post('/api/roles', roleData);
  },

  updateRole: async (id, roleData) => {
    return apiClient.put(`/api/roles/${id}`, roleData);
  },

  deleteRole: async (id) => {
    return apiClient.delete(`/api/roles/${id}`);
  },

  getRolePermissions: async (id) => {
    return apiClient.get(`/api/roles/${id}/permissions`);
  },

  assignPermissionsToRole: async (id, permissionIds) => {
    return apiClient.post(`/api/roles/${id}/permissions`, { permission_ids: permissionIds });
  },

  getPermissions: async (params = {}) => {
    const clean = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null && v !== '')
    );
    const queryParams = new URLSearchParams(clean).toString();
    const endpoint = `/api/permissions${queryParams ? `?${queryParams}` : ''}`;
    return apiClient.get(endpoint);
  },

  getUserRoles: async (userId) => {
    return apiClient.get(`/api/users/${userId}/roles`);
  },

  assignRoleToUser: async (userId, roleId) => {
    return apiClient.post(`/api/users/${userId}/roles`, { role_id: roleId });
  },

  removeRoleFromUser: async (userId, roleId) => {
    return apiClient.delete(`/api/users/${userId}/roles/${roleId}`);
  },
};
