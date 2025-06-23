import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ChildrenList from './pages/children/ChildrenList';
import ChildProfile from './pages/children/ChildProfile';
import AddChild from './pages/children/AddChild';
import StaffList from './pages/staff/StaffList';
import Reports from './pages/reports/Reports';

// Components
import ProtectedRoute from './components/Common/ProtectedRoute';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Styles
import './styles/globals.css';
import './styles/luxury.css';
import './styles/components.css';
import './styles/responsive.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <div className="th-app">
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/auth/*" element={
                    <AuthLayout>
                      <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/auth/login" replace />} />
                      </Routes>
                    </AuthLayout>
                  } />

                  {/* Protected Routes */}
                  <Route path="/*" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          
                          {/* Children Routes */}
                          <Route path="/children" element={<ChildrenList />} />
                          <Route path="/children/:id" element={<ChildProfile />} />
                          <Route path="/children/add" element={<AddChild />} />
                          
                          {/* Staff Routes */}
                          <Route path="/staff" element={<StaffList />} />
                          
                          {/* Reports Routes */}
                          <Route path="/reports" element={<Reports />} />
                          
                          <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                </Routes>

                {/* Global Toast Notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--th-white)',
                      color: 'var(--th-gray-800)',
                      borderRadius: '12px',
                      boxShadow: 'var(--th-shadow-lg)',
                      border: '1px solid rgba(230, 126, 34, 0.1)',
                    },
                    success: {
                      iconTheme: {
                        primary: 'var(--th-secondary-solid)',
                        secondary: 'white',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: 'var(--th-warm)',
                        secondary: 'white',
                      },
                    },
                  }}
                />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;