// src/services/auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance with default config
const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('th-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('th-token');
      localStorage.removeItem('th-user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await authAPI.post('/login', credentials);
      const { token, user } = response.data.data;
      
      localStorage.setItem('th-token', token);
      localStorage.setItem('th-user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await authAPI.post('/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('th-token');
    localStorage.removeItem('th-user');
    window.location.href = '/auth/login';
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('th-user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('th-token');
    const user = localStorage.getItem('th-user');
    return !!(token && user);
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await authAPI.get('/verify');
      return response.data;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await authAPI.post('/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset request failed');
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await authAPI.post('/reset-password', { token, password: newPassword });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }
};

export default authService;