import React from 'react';
import { FaClock, FaMapMarkerAlt, FaThermometerHalf } from 'react-icons/fa';
import './WelcomeWidget.css';

const WelcomeWidget = ({ user }) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="th-welcome-widget th-slide-up">
      <div className="th-welcome-background">
        <div className="th-welcome-gradient"></div>
        <div className="th-welcome-pattern"></div>
      </div>
      
      <div className="th-welcome-content">
        <div className="th-welcome-main">
          <div className="th-welcome-greeting">
            <h1 className="th-welcome-title">
              {getGreeting()}, {user?.first_name}! 👋
            </h1>
            <p className="th-welcome-subtitle">
              Ready to make a difference in children's lives today?
            </p>
          </div>
          
          <div className="th-welcome-stats">
            <div className="th-welcome-stat">
              <span className="th-stat-label">Your Role</span>
              <span className="th-stat-value">{user?.position}</span>
            </div>
            <div className="th-welcome-stat">
              <span className="th-stat-label">Department</span>
              <span className="th-stat-value">{user?.department || 'General'}</span>
            </div>
          </div>
        </div>
        
        <div className="th-welcome-sidebar">
          <div className="th-welcome-info">
            <div className="th-info-item">
              <FaClock className="th-info-icon" />
              <div className="th-info-content">
                <span className="th-info-label">Current Time</span>
                <span className="th-info-value">{formatTime(currentTime)}</span>
              </div>
            </div>
            
            <div className="th-info-item">
              <FaMapMarkerAlt className="th-info-icon" />
              <div className="th-info-content">
                <span className="th-info-label">Location</span>
                <span className="th-info-value">Lagos, Nigeria</span>
              </div>
            </div>
            
            <div className="th-info-item">
              <FaThermometerHalf className="th-info-icon" />
              <div className="th-info-content">
                <span className="th-info-label">Today</span>
                <span className="th-info-value">{formatDate(currentTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWidget;