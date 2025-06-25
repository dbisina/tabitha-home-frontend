import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  FaChild, 
  FaUsers, 
  FaGraduationCap, 
  FaHeart,
  FaPlus,
  FaArrowUp,
  FaCalendarAlt,
  FaBell,
  FaArrowDown
} from 'react-icons/fa';
import Button from '../components/UI/Button/Button';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import QuickActions from '../components/Dashboard/QuickActions';
import DashboardCharts from '../components/Dashboard/DashboardCharts';
import UpcomingEvents from '../components/Dashboard/UpcomingEvents';
import AlertsWidget from '../components/Dashboard/AlertsWidget';
import WelcomeWidget from '../components/Dashboard/WelcomeWidget';
import { dashboardService } from '../services/dashboard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/UI/Loading/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('30'); // days

  // Fetch dashboard data
  const { 
    data: dashboardData, 
    isLoading, 
    error,
    refetch 
  } = useQuery(
    ['dashboard', dateRange],
    () => dashboardService.getDashboardData(dateRange),
    {
      refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
      staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
    }
  );

  // Mock data for development (remove when API is ready)
  const mockData = {
    stats: {
      totalChildren: 127,
      totalChildrenChange: 5.2,
      activeStaff: 24,
      activeStaffChange: -2.1,
      schoolAttendance: 89.5,
      schoolAttendanceChange: 3.7,
      healthScore: 92.3,
      healthScoreChange: 1.8
    },
    recentActivities: [
      {
        id: 1,
        type: 'admission',
        title: 'New child admitted',
        description: 'Sarah Adebayo (Age 8) has been admitted to Tabitha Home',
        time: '2 hours ago',
        user: 'Dr. Amina Hassan',
        priority: 'high'
      },
      {
        id: 2,
        type: 'health',
        title: 'Health checkup completed',
        description: '15 children completed their monthly health checkups',
        time: '4 hours ago',
        user: 'Nurse Joy Okeke',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'education',
        title: 'School enrollment',
        description: '3 children enrolled in new secondary school program',
        time: '6 hours ago',
        user: 'Mr. Chinedu Obi',
        priority: 'medium'
      },
      {
        id: 4,
        type: 'achievement',
        title: 'Academic achievement',
        description: 'Kemi Adebayo scored 95% in Mathematics exam',
        time: '1 day ago',
        user: 'Mrs. Fatima Yusuf',
        priority: 'low'
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Medical checkup day',
        date: '2024-06-25',
        time: '09:00 AM',
        type: 'health',
        participants: 25
      },
      {
        id: 2,
        title: 'Parent visit day',
        date: '2024-06-27',
        time: '02:00 PM',
        type: 'family',
        participants: 12
      },
      {
        id: 3,
        title: 'Educational workshop',
        date: '2024-06-28',
        time: '10:00 AM',
        type: 'education',
        participants: 40
      }
    ],
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Medical attention needed',
        message: '3 children need immediate medical attention',
        priority: 'high',
        actionRequired: true
      },
      {
        id: 2,
        type: 'info',
        title: 'Documentation due',
        message: '5 quarterly reports are due this week',
        priority: 'medium',
        actionRequired: true
      },
      {
        id: 3,
        type: 'success',
        title: 'Adoption process',
        message: '2 adoption processes completed successfully',
        priority: 'low',
        actionRequired: false
      }
    ]
  };

  const data = dashboardData || mockData;

  if (isLoading) {
    return (
      <div className="th-dashboard-loading">
        <LoadingSpinner size="xl" text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="th-dashboard-error">
        <h2>Error loading dashboard</h2>
        <p>Please try refreshing the page</p>
        <Button onClick={refetch} variant="primary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="th-dashboard th-fade-in">
      {/* Welcome Section */}
      <WelcomeWidget user={user} />

      {/* Stats Cards Grid */}
      <div className="th-stats-grid th-grid th-grid-cols-4">
        <StatsCard
          title="Total Children"
          value={data.stats.totalChildren}
          change={data.stats.totalChildrenChange}
          icon={FaChild}
          color="primary"
          trend={data.stats.totalChildrenChange > 0 ? 'up' : 'down'}
        />
        <StatsCard
          title="Active Staff"
          value={data.stats.activeStaff}
          change={data.stats.activeStaffChange}
          icon={FaUsers}
          color="secondary"
          trend={data.stats.activeStaffChange > 0 ? 'up' : 'down'}
        />
        <StatsCard
          title="School Attendance"
          value={`${data.stats.schoolAttendance}%`}
          change={data.stats.schoolAttendanceChange}
          icon={FaGraduationCap}
          color="accent"
          trend={data.stats.schoolAttendanceChange > 0 ? 'up' : 'down'}
        />
        <StatsCard
          title="Health Score"
          value={`${data.stats.healthScore}%`}
          change={data.stats.healthScoreChange}
          icon={FaHeart}
          color="success"
          trend={data.stats.healthScoreChange > 0 ? 'up' : 'down'}
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="th-dashboard-content th-grid th-grid-cols-3">
        {/* Left Column - Charts and Analytics */}
        <div className="th-dashboard-main">
          <DashboardCharts data={data} dateRange={dateRange} onDateRangeChange={setDateRange} />
          <RecentActivity activities={data.recentActivities} />
        </div>

        {/* Right Column - Widgets and Quick Actions */}
        <div className="th-dashboard-sidebar">
          <QuickActions />
          <AlertsWidget alerts={data.alerts} />
          <UpcomingEvents events={data.upcomingEvents} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;