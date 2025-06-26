// src/services/auth.js
import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store with consistent key names
      localStorage.setItem('th_token', token);
      localStorage.setItem('th_user', JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register user (admin only)
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Get current user (API call to verify token)
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  },

  // Get user from localStorage (no API call)
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('th_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('th_token');
      localStorage.removeItem('th_user');
    }
  },

  // Update user profile
  updateProfile: async (updates) => {
    try {
      const response = await api.patch('/auth/updateMe', updates);
      const updatedUser = response.data.user;
      
      // Update localStorage
      localStorage.setItem('th_user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  },

  // Update password
  updatePassword: async (passwordData) => {
    try {
      const response = await api.patch('/auth/updatePassword', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password update failed');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('th_token');
    const user = localStorage.getItem('th_user');
    return !!(token && user);
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('th_token');
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset request failed');
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        token, 
        password: newPassword 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }
};

export default authService;