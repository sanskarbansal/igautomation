import axios from 'axios';

const axiosServices = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Request interceptor: attach Authorization header when token exists in localStorage
axiosServices.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = config.headers || {};
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: normalize errors
axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || error.message || 'Wrong Services'),
);

// Helper to set/clear token programmatically
export function setAuthToken(token) {
  try {
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  } catch (e) {
    // ignore storage errors
  }
}

export default axiosServices;
