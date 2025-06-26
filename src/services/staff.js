// src/services/staff.js - Complete staff service
import api from './api';

export const staffService = {
  // Get all staff with optional filters
  getStaff: async (params = {}) => {
    try {
      const response = await api.get('/staff', { params });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch staff');
    }
  },

  // Get staff member by ID
  getStaffById: async (id) => {
    try {
      const response = await api.get(`/staff/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch staff member');
    }
  },

  // Update staff member
  updateStaff: async (id, updates) => {
    try {
      const response = await api.patch(`/staff/${id}`, updates);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update staff member');
    }
  },

  // Deactivate staff member
  deactivateStaff: async (id) => {
    try {
      const response = await api.delete(`/staff/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to deactivate staff member');
    }
  },

  // Get staff statistics
  getStaffStats: async () => {
    try {
      const response = await api.get('/staff/stats');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch staff statistics');
    }
  },

  // Update staff permissions (admin only)
  updateStaffPermissions: async (id, permissionData) => {
    try {
      const response = await api.patch(`/staff/${id}/permissions`, permissionData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update permissions');
    }
  }
};

export default staffService;