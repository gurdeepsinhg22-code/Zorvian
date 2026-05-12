import { apiClient } from '../api/client';

export const userService = {
  getUsers: async (params = {}) => {
    const clean = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null && v !== '')
    );
    const queryParams = new URLSearchParams(clean).toString();
    const endpoint = `/api/users${queryParams ? `?${queryParams}` : ''}`;
    return apiClient.get(endpoint);
  },

  createUser: async (data) => {
    return apiClient.post('/api/users', data);
  },

  updateUser: async (id, data) => {
    return apiClient.put(`/api/users/${id}`, data);
  },

  deleteUser: async (id) => {
    return apiClient.delete(`/api/users/${id}`);
  },
};
