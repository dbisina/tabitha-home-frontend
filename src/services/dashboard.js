// src/services/dashboard.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const dashboardAPI = axios.create({
  baseURL: `${API_URL}/dashboard`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
dashboardAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('th-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await dashboardAPI.get('/stats');
      return response.data;
    } catch (error) {
      // Return mock data for development
      return {
        data: {
          totalChildren: 147,
          totalStaff: 32,
          activeAdmissions: 8,
          pendingCases: 12,
          thisMonthAdmissions: 8,
          thisMonthExits: 3,
          averageStayDuration: 18,
          occupancyRate: 85.2
        }
      };
    }
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    try {
      const response = await dashboardAPI.get('/activities', { params: { limit } });
      return response.data;
    } catch (error) {
      // Return mock data for development
      return {
        data: [
          {
            id: 1,
            type: 'admission',
            title: 'New child admission',
            description: 'Sarah Adebayo was admitted to the home',
            timestamp: new Date().toISOString(),
            user: 'John Doe',
            priority: 'normal'
          },
          {
            id: 2,
            type: 'medical',
            title: 'Medical checkup completed',
            description: 'Annual medical examination for 15 children',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user: 'Dr. Smith',
            priority: 'high'
          }
        ]
      };
    }
  },

  // Get upcoming events
  getUpcomingEvents: async () => {
    try {
      const response = await dashboardAPI.get('/events');
      return response.data;
    } catch (error) {
      // Return mock data for development
      return {
        data: [
          {
            id: 1,
            title: 'Medical Check-ups',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            type: 'medical',
            participants: 12,
            location: 'Medical Center'
          },
          {
            id: 2,
            title: 'Educational Workshop',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'education',
            participants: 25,
            location: 'Main Hall'
          }
        ]
      };
    }
  },

  // Get alerts and notifications
  getAlerts: async () => {
    try {
      const response = await dashboardAPI.get('/alerts');
      return response.data;
    } catch (error) {
      // Return mock data for development
      return {
        data: [
          {
            id: 1,
            type: 'warning',
            title: 'Documents Expiring Soon',
            message: '5 identity documents will expire within 30 days',
            timestamp: new Date().toISOString(),
            actionRequired: true
          },
          {
            id: 2,
            type: 'info',
            title: 'Monthly Report Due',
            message: 'Monthly report submission deadline is approaching',
            timestamp: new Date().toISOString(),
            actionRequired: false
          }
        ]
      };
    }
  },

  // Get chart data
  getChartData: async (chartType, period = '6months') => {
    try {
      const response = await dashboardAPI.get('/charts', { 
        params: { type: chartType, period } 
      });
      return response.data;
    } catch (error) {
      // Return mock data for development
      const mockData = {
        admissions: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Admissions',
            data: [12, 8, 15, 10, 9, 8],
            borderColor: '#E67E22',
            backgroundColor: 'rgba(230, 126, 34, 0.1)'
          }]
        },
        demographics: {
          labels: ['Under 5', '5-10', '11-15', '16-18'],
          datasets: [{
            data: [23, 45, 52, 27],
            backgroundColor: ['#3498DB', '#27AE60', '#F39C12', '#E74C3C']
          }]
        }
      };
      return { data: mockData[chartType] || mockData.admissions };
    }
  }
};

export default dashboardService;