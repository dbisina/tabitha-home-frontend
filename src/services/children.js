// src/services/children.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const childrenAPI = axios.create({
  baseURL: `${API_URL}/children`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
childrenAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('th-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const childrenService = {
  // Get all children with optional filters
  getChildren: async (params = {}) => {
    try {
      const response = await childrenAPI.get('/', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch children');
    }
  },

  // Get child by ID
  getChild: async (id) => {
    try {
      const response = await childrenAPI.get(`/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch child');
    }
  },

  // Create new child
  createChild: async (childData) => {
    try {
      const response = await childrenAPI.post('/', childData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create child record');
    }
  },

  // Update child
  updateChild: async (id, updates) => {
    try {
      const response = await childrenAPI.put(`/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update child');
    }
  },

  // Delete child
  deleteChild: async (id) => {
    try {
      const response = await childrenAPI.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete child');
    }
  },

  // Search children
  searchChildren: async (query) => {
    try {
      const response = await childrenAPI.get('/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  },

  // Get child statistics
  getChildStats: async () => {
    try {
      const response = await childrenAPI.get('/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
    }
  },

  // Upload child photo
  uploadPhoto: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await childrenAPI.post(`/${id}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Photo upload failed');
    }
  },

  // Get child documents
  getChildDocuments: async (id) => {
    try {
      const response = await childrenAPI.get(`/${id}/documents`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch documents');
    }
  },

  // Upload child document
  uploadDocument: async (id, file, metadata) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('metadata', JSON.stringify(metadata));
      
      const response = await childrenAPI.post(`/${id}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Document upload failed');
    }
  },

  // Get medical history
  getMedicalHistory: async (id) => {
    try {
      const response = await childrenAPI.get(`/${id}/medical`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch medical history');
    }
  },

  // Add medical record
  addMedicalRecord: async (id, record) => {
    try {
      const response = await childrenAPI.post(`/${id}/medical`, record);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add medical record');
    }
  }
};

export default childrenService;