import { apiClient } from '../api/client';

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response;
  },
  getCurrentUser: async () => {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      return { success: false, message: 'No token found' };
    }
    const response = await apiClient.get('/api/auth/me');
    return response;
  },
  updateProfile: async (data) => {
    const response = await apiClient.patch('/api/auth/me', data);
    return response;
  },
  changePassword: async (current_password, new_password) => {
    const response = await apiClient.post('/api/auth/me/change-password', {
      current_password,
      new_password,
    });
    return response;
  },
  logout: async () => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (e) {
      // ignore
    }
  },
  forgotPassword: async (email) => {
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    return response;
  },
};
