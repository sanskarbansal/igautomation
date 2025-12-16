/**
 * Auth API functions - single source of truth for auth-related HTTP calls
 * Adjust endpoints to match your backend API.
 */
import axios from '../utils/axios';

export async function loginApi(credentials) {
  // credentials: { email, password } or similar
  const res = await axios.post('/auth/login', credentials);
  return res.data;
}

export async function registerApi(payload) {
  const res = await axios.post('/auth/register', payload);
  return res.data;
}

export async function meApi(token) {
  // token optional — axios instance will add token header when available
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await axios.get('/auth/me', config);
  return res.data;
}

export async function refreshApi() {
  const res = await axios.post('/auth/refresh');
  return res.data;
}

export default {
  login: loginApi,
  register: registerApi,
  me: meApi,
  refresh: refreshApi,
};
