import { apiClient } from '../api/client';
import { API_BASE_URL } from '../config/api';

export const blogService = {
  getPublishedBlogs(params = {}) {
    return apiClient.get('/api/blogs', { params });
  },

  getBlogBySlug(slug) {
    return apiClient.get(`/api/blogs/slug/${encodeURIComponent(slug)}`);
  },

  getAdminBlogs(params = {}) {
    return apiClient.get('/api/blogs/admin', { params });
  },

  getBlogById(id) {
    return apiClient.get(`/api/blogs/${id}`);
  },

  createBlog(data) {
    return apiClient.post('/api/blogs', data);
  },

  updateBlog(id, data) {
    return apiClient.put(`/api/blogs/${id}`, data);
  },

  deleteBlog(id) {
    return apiClient.delete(`/api/blogs/${id}`);
  },

  uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return fetch(`${API_BASE_URL}/api/blogs/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Upload failed');
      }
      return data;
    });
  },
};
