import { API_BASE_URL } from '../config/api';

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(method, endpoint, data = null, headers = {}, responseType = 'json') {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const isFormData = data instanceof FormData;
    const config = {
      method,
      credentials: 'include',
      mode: 'cors',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(responseType === 'blob' ? {} : { Accept: 'application/json' }),
        ...authHeader,
        ...headers,
      },
    };
    if (data) config.body = isFormData ? data : JSON.stringify(data);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      let responseData;
      const contentType = response.headers.get('content-type');
      try {
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          const textResponse = await response.text().catch(() => '');
          responseData = { message: textResponse || 'Unknown response format' };
        }
      } catch (parseError) {
        responseData = { message: 'Failed to parse response' };
      }

      const isErrorInBody = responseData && (responseData.success === false || (responseData.error && !responseData.success));
      if (!response.ok || isErrorInBody) {
        const errorMessage = responseData?.message || `HTTP error! status: ${response.status}`;
        const error = new Error(errorMessage);
        error.response = { status: response.status, statusText: response.statusText, data: responseData };
        error.statusCode = response.status;
        throw error;
      }
      return responseData;
    } catch (error) {
      if (error.response || error.statusCode) throw error;
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        const networkError = new Error(`Failed to connect to backend at ${this.baseURL}. Ensure the backend is running.`);
        networkError.code = 'NETWORK_ERROR';
        throw networkError;
      }
      throw error;
    }
  }

  get(endpoint, options = {}) {
    let url = endpoint;
    if (options.params) {
      const params = new URLSearchParams();
      Object.keys(options.params).forEach((key) => {
        if (options.params[key] != null) params.append(key, options.params[key]);
      });
      const qs = params.toString();
      if (qs) url += (url.includes('?') ? '&' : '?') + qs;
    }
    return this.request('GET', url, null, options.headers || {}, options.responseType || 'json');
  }

  post(endpoint, data, headers) {
    return this.request('POST', endpoint, data, headers);
  }
  put(endpoint, data, headers) {
    return this.request('PUT', endpoint, data, headers);
  }
  patch(endpoint, data, headers) {
    return this.request('PATCH', endpoint, data, headers);
  }
  delete(endpoint, headers) {
    return this.request('DELETE', endpoint, null, headers);
  }
}

export const apiClient = new ApiClient();
