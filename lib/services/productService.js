import { apiClient } from '../api/client';
import { API_BASE_URL } from '../config/api';

export const productService = {
  getProducts() {
    return apiClient.get('/api/products');
  },

  getProductBySlug(slug) {
    return apiClient.get(`/api/products/slug/${encodeURIComponent(slug)}`);
  },

  getAdminProducts(params = {}) {
    return apiClient.get('/api/products/admin', { params });
  },

  getProductById(id) {
    return apiClient.get(`/api/products/${id}`);
  },

  createProduct(data) {
    return apiClient.post('/api/products', data);
  },

  updateProduct(id, data) {
    return apiClient.put(`/api/products/${id}`, data);
  },

  deleteProduct(id) {
    return apiClient.delete(`/api/products/${id}`);
  },

  uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return fetch(`${API_BASE_URL}/api/products/upload`, {
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
