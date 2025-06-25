// src/pages/staff/StaffProfile.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaEdit,
  FaPrint,
  FaDownload,
  FaUserCheck,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCalendarAlt,
  FaIdCard,
  FaGraduationCap,
  FaCertificate,
  FaAward,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaHistory,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaUserTie,
  FaUserMd,
  FaChild,
  FaFolder,
  FaComments,
  FaPlus,
  FaStar,
  FaTrophy,
  FaBook,
  FaHeartbeat,
  FaFileAlt,
  FaUserFriends,
  FaEye,
  FaMoneyBillAlt
} from 'react-icons/fa';
import { format, differenceInYears, differenceInDays } from 'date-fns';
import Button from '../../components/UI/Button/Button';
import { NIGERIAN_STATES, STAFF_ROLES } from '../../utils/nigerianStaffData';
import './StaffProfile.css';

const StaffProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock staff data - replace with API call
  const mockStaffData = {
    id: 1,
    employee_id: 'EMP-2024-001',
    first_name: 'Kemi',
    last_name: 'Adebayo',
    middle_name: 'Folake',
    email: 'kemi.adebayo@tabithahome.org',
    phone: '+234-803-456-7890',
    position: 'Director',
    department: 'Administration',
    hire_date: '2020-01-15',
    employment_status: 'Active',
    role: 'admin',
    photo_url: null,
    date_of_birth: '1985-05-20',
    gender: 'Female',
    marital_status: 'Married',
    religion: 'Christianity',
    state_of_origin: 'Lagos',
    nin: '12345678901',
    address: {
      street: '15 Victoria Island Road',
      city: 'Lagos',
      state: 'Lagos',
      lga: 'Victoria Island',
      postal_code: '101001',
      country: 'Nigeria'
    },
    emergency_contact: {
      name: 'Tunde Adebayo',
      relationship: 'Spouse',
      phone: '+234-803-456-7891',
      address: '15 Victoria Island Road, Lagos'
    },
    education: [
      {
        id: 1,
        institution: 'University of Lagos',
        qualification: 'Master of Social Work',
        field_of_study: 'Child and Family Services',
        year_completed: '2010',
        grade: 'Distinction'
      },
      {
        id: 2,
        institution: 'University of Lagos',
        qualification: 'Bachelor of Social Work',
        field_of_study: 'Social Work',
        year_completed: '2008',
        grade: 'Second Class Upper'
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'Licensed Social Worker',
        issuing_organization: 'Association of Social Workers of Nigeria',
        issue_date: '2010-06-15',
        expiry_date: '2025-06-15',
        certificate_number: 'LSW-2010-0245'
      },
      {
        id: 2,
        name: 'Child Protection Specialist',
        issuing_organization: 'UNICEF Nigeria',
        issue_date: '2021-03-20',
        expiry_date: '2024-03-20',
        certificate_number: 'CPS-2021-0089'
      },
      {
        id: 3,
        name: 'First Aid & CPR Certified',
        issuing_organization: 'Nigerian Red Cross',
        issue_date: '2023-07-10',
        expiry_date: '2025-07-10',
        certificate_number: 'FA-2023-1234'
      }
    ],
    salary: 450000, // Monthly in Naira
    bank_details: {
      bank_name: 'First Bank of Nigeria',
      account_number: '3012345678',
      account_name: 'Kemi Folake Adebayo'
    },
    permissions: ['all'],
    last_login: '2024-06-23T14:30:00',
    performance_ratings: [
      {
        year: 2024,
        rating: 'Excellent',
        score: 95,
        reviewer: 'Board of Directors',
        comments: 'Outstanding leadership and dedication to child welfare'
      },
      {
        year: 2023,
        rating: 'Excellent',
        score: 92,
        reviewer: 'Board of Directors',
        comments: 'Exceptional performance in organizational management'
      },
      {
        year: 2022,
        rating: 'Very Good',
        score: 88,
        reviewer: 'Board of Directors',
        comments: 'Consistent high performance with room for growth'
      }
    ],
    children_assigned: [
      {
        id: 1,
        name: 'Sarah Adebayo',
        age: 9,
        admission_date: '2024-01-15',
        status: 'Active',
        case_complexity: 'Medium'
      },
      {
        id: 2,
        name: 'Ibrahim Yusuf',
        age: 12,
        admission_date: '2023-11-20',
        status: 'Active',
        case_complexity: 'High'
      },
      {
        id: 3,
        name: 'Fatima Okafor',
        age: 7,
        admission_date: '2024-03-10',
        status: 'Active',
        case_complexity: 'Low'
      }
    ],
    case_history: [
      {
        id: 1,
        child_name: 'Sarah Adebayo',
        action: 'Initial Assessment Completed',
        date: '2024-01-20',
        category: 'Assessment',
        priority: 'High',
        outcome: 'Comprehensive care plan developed'
      },
      {
        id: 2,
        child_name: 'Ibrahim Yusuf',
        action: 'Family Reunification Meeting',
        date: '2024-06-15',
        category: 'Family Services',
        priority: 'High',
        outcome: 'Progress made with biological family'
      },
      {
        id: 3,
        child_name: 'Fatima Okafor',
        action: 'Educational Assessment',
        date: '2024-05-30',
        category: 'Education',
        priority: 'Medium',
        outcome: 'Enrolled in appropriate grade level'
      }
    ],
    training_records: [
      {
        id: 1,
        course_name: 'Advanced Child Protection Techniques',
        provider: 'UNICEF Nigeria',
        start_date: '2024-04-01',
        end_date: '2024-04-05',
        status: 'Completed',
        certificate_awarded: true,
        score: 95
      },
      {
        id: 2,
        course_name: 'Leadership in Child Welfare Organizations',
        provider: 'Save the Children International',
        start_date: '2024-02-15',
        end_date: '2024-02-20',
        status: 'Completed',
        certificate_awarded: true,
        score: 88
      },
      {
        id: 3,
        course_name: 'Trauma-Informed Care for Children',
        provider: 'WHO Nigeria',
        start_date: '2024-07-01',
        end_date: '2024-07-10',
        status: 'Registered',
        certificate_awarded: false,
        score: null
      }
    ],
    leave_records: [
      {
        id: 1,
        type: 'Annual Leave',
        start_date: '2024-05-01',
        end_date: '2024-05-15',
        days: 14,
        status: 'Approved',
        reason: 'Family vacation'
      },
      {
        id: 2,
        type: 'Sick Leave',
        start_date: '2024-03-20',
        end_date: '2024-03-22',
        days: 3,
        status: 'Completed',
        reason: 'Medical treatment'
      }
    ],
    disciplinary_records: [],
    achievements: [
      {
        id: 1,
        title: 'Outstanding Staff of the Year 2023',
        date: '2023-12-15',
        description: 'Recognized for exceptional leadership and child advocacy',
        awarded_by: 'Tabitha Home Board'
      },
      {
        id: 2,
        title: 'Child Protection Excellence Award',
        date: '2022-11-30',
        description: 'Distinguished service in child welfare and protection',
        awarded_by: 'Nigerian Association of Social Workers'
      }
    ],
    background_checks: [
      {
        type: 'Criminal Background Check',
        date_conducted: '2020-01-10',
        status: 'Clear',
        validity: '2025-01-10',
        reference_number: 'CBC-2020-001'
      },
      {
        type: 'Child Protection Clearance',
        date_conducted: '2020-01-12',
        status: 'Clear',
        validity: '2025-01-12',
        reference_number: 'CPC-2020-001'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaUserCheck },
    { id: 'performance', label: 'Performance', icon: FaChartLine },
    { id: 'children', label: 'Assigned Children', icon: FaChild },
    { id: 'cases', label: 'Case History', icon: FaClipboardList },
    { id: 'training', label: 'Training & Development', icon: FaBook },
    { id: 'documents', label: 'Documents', icon: FaFileAlt },
    { id: 'history', label: 'Employment History', icon: FaHistory }
  ];

  // Helper functions
  const calculateAge = (birthDate) => {
    return differenceInYears(new Date(), new Date(birthDate));
  };

  const calculateTenure = (hireDate) => {
    const years = differenceInYears(new Date(), new Date(hireDate));
    const months = Math.floor(differenceInDays(new Date(), new Date(hireDate)) / 30) % 12;
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`;
    } else {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Active': 'success',
      'Probation': 'warning',
      'Suspended': 'error',
      'On Leave': 'info',
      'Terminated': 'muted'
    };
    return statusColors[status] || 'muted';
  };

  const getPerformanceColor = (rating) => {
    const performanceColors = {
      'Excellent': 'success',
      'Very Good': 'primary',
      'Good': 'secondary',
      'Fair': 'warning',
      'Poor': 'error'
    };
    return performanceColors[rating] || 'muted';
  };

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const age = calculateAge(mockStaffData.date_of_birth);
  const tenure = calculateTenure(mockStaffData.hire_date);
  const statusColor = getStatusColor(mockStaffData.employment_status);
  const currentPerformance = mockStaffData.performance_ratings[0];
  const performanceColor = getPerformanceColor(currentPerformance?.rating);

  return (
    <div className="th-staff-profile">
      {/* Header */}
      <div className="th-profile-header">
        <div className="th-header-navigation">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/staff')}
            icon={FaArrowLeft}
          >
            Back to Staff List
          </Button>
        </div>
        
        <div className="th-header-content">
          <div className="th-staff-header-info">
            <div className="th-staff-avatar-large">
              {mockStaffData.photo_url ? (
                <img src={mockStaffData.photo_url} alt={`${mockStaffData.first_name} ${mockStaffData.last_name}`} />
              ) : (
                <div className="th-avatar-placeholder-large">
                  <FaUserCheck />
                </div>
              )}
              <div className={`th-status-indicator-large ${statusColor}`}></div>
            </div>
            
            <div className="th-staff-details">
              <h1 className="th-staff-full-name">
                {mockStaffData.first_name} {mockStaffData.middle_name} {mockStaffData.last_name}
              </h1>
              <p className="th-staff-position">{mockStaffData.position}</p>
              <p className="th-staff-department">{mockStaffData.department} Department</p>
              <p className="th-staff-employee-id">Employee ID: {mockStaffData.employee_id}</p>
              
              <div className="th-staff-status-badges">
                <span className={`th-status-badge ${statusColor}`}>
                  {mockStaffData.employment_status}
                </span>
                {currentPerformance && (
                  <span className={`th-performance-badge ${performanceColor}`}>
                    {currentPerformance.rating} ({currentPerformance.score}%)
                  </span>
                )}
                <span className="th-role-badge">
                  {STAFF_ROLES[mockStaffData.role]?.label}
                </span>
              </div>
            </div>
          </div>
          
          <div className="th-header-actions">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/staff/${id}/edit`)}
              icon={FaEdit}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={FaPrint}
            >
              Print Profile
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={FaDownload}
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="th-quick-stats">
        <div className="th-stat-item">
          <FaCalendarAlt className="th-stat-icon" />
          <div className="th-stat-content">
            <span className="th-stat-value">{tenure}</span>
            <span className="th-stat-label">Tenure</span>
          </div>
        </div>
        <div className="th-stat-item">
          <FaUsers className="th-stat-icon" />
          <div className="th-stat-content">
            <span className="th-stat-value">{mockStaffData.children_assigned.length}</span>
            <span className="th-stat-label">Assigned Children</span>
          </div>
        </div>
        <div className="th-stat-item">
          <FaClipboardList className="th-stat-icon" />
          <div className="th-stat-content">
            <span className="th-stat-value">{mockStaffData.case_history.length}</span>
            <span className="th-stat-label">Cases Handled</span>
          </div>
        </div>
        <div className="th-stat-item">
          <FaBook className="th-stat-icon" />
          <div className="th-stat-content">
            <span className="th-stat-value">{mockStaffData.training_records.filter(t => t.status === 'Completed').length}</span>
            <span className="th-stat-label">Training Completed</span>
          </div>
        </div>
        <div className="th-stat-item">
          <FaMoneyBillAlt className="th-stat-icon" />
          <div className="th-stat-content">
            <span className="th-stat-value">{formatSalary(mockStaffData.salary)}</span>
            <span className="th-stat-label">Monthly Salary</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="th-profile-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`th-tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="th-tab-icon" />
              <span className="th-tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="th-profile-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="th-overview-tab">
            <div className="th-overview-grid">
              {/* Personal Information */}
              <div className="th-info-card">
                <div className="th-card-header">
                  <h3 className="th-card-title">
                    <FaUserCheck className="th-card-icon" />
                    Personal Information
                  </h3>
                </div>
                <div className="th-card-body">
                  <div className="th-info-grid">
                    <div className="th-info-item">
                      <span className="th-info-label">Full Name</span>
                      <span className="th-info-value">
                        {mockStaffData.first_name} {mockStaffData.middle_name} {mockStaffData.last_name}
                      </span>
                    </div>
                    <div className="th-info-item">
                      <span className="th-info-label">Date of Birth</span>
                      <span className="th-info-value">
                        {format(new Date(mockStaffData.date_of_birth), 'MMMM dd, yyyy')} ({age} years)
                      </span>
                    </div>
                    <div className="th-info-item">
                      <span className="th-info-label">Gender</span>
                      <span className="th-info-value">{mockStaffData.gender}</span>
                    </div>
                    <div className="th-info-item">
                      <span className="th-info-label">Marital Status</span>
                      <span className="th-info-value">{mockStaffData.marital_status}</span>
                    </div>
                    <div className="th-info-item">
                      <span className="th-info-label">Religion</span>
                      <span className="th-info-value">{mockStaffData.religion}</span>
                    </div>
                    <div className="th-info-item">
                      <span className="th-info-label">State of Origin</span>
                      <span className="th-info-value">{mockStaffData.state_of_origin}</span>
                    </div>
                    <div className="th-info-item">
                      <span className="th-info-label">NIN</span>
                      <span className="th-info-value">{mockStaffData.nin}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="th-info-card">
                <div className="th-card-header">
                  <h3 className="th-card-title">
                    <FaPhone className="th-card-icon" />
                    Contact Information
                  </h3>
                </div>
                <div className="th-card-body">
                  <div className="th-contact-list">
                    <div className="th-contact-item">
                      <FaPhone className="th-contact-icon" />
                      <div className="th-contact-details">
                        <span className="th-contact-label">Phone</span>
                        <span className="th-contact-value">{mockStaffData.phone}</span>
                      </div>
                    </div>
                    <div className="th-contact-item">
                      <FaEnvelope className="th-contact-icon" />
                      <div className="th-contact-details">
                        <span className="th-contact-label">Email</span>
                        <span className="th-contact-value">{mockStaffData.email}</span>
                      </div>
                    </div>
                    <div className="th-contact-item">
                      <FaMapMarkerAlt className="th-contact-icon" />
                      <div className="th-contact-details">
                        <span className="th-contact-label">Address</span>
                        <span className="th-contact-value">
                          {mockStaffData.address.street}, {mockStaffData.address.city}, {mockStaffData.address.state} {mockStaffData.address.postal_code}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="th-info-card">
                <div className="th-card-header">
                  <h3 className="th-card-title">
                    <FaShieldAlt className="th-card-icon" />
                    Emergency Contact
                  </h3>
                </div>
                <div className="th-card-body">
                  <div className="th-emergency-contact">
                    <div className="th-emergency-item">
                      <span className="th-emergency-label">Name</span>
                      <span className="th-emergency-value">{mockStaffData.emergency_contact.name}</span>
                    </div>
                    <div className="th-emergency-item">
                      <span className="th-emergency-label">Relationship</span>
                      <span className="th-emergency-value">{mockStaffData.emergency_contact.relationship}</span>
                    </div>
                    <div className="th-emergency-item">
                      <span className="th-emergency-label">Phone</span>
                      <span className="th-emergency-value">{mockStaffData.emergency_contact.phone}</span>
                    </div>
                    <div className="th-emergency-item">
                      <span className="th-emergency-label">Address</span>
                      <span className="th-emergency-value">{mockStaffData.emergency_contact.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Qualifications */}
              <div className="th-info-card">
                <div className="th-card-header">
                  <h3 className="th-card-title">
                    <FaGraduationCap className="th-card-icon" />
                    Education & Qualifications
                  </h3>
                </div>
                <div className="th-card-body">
                  <div className="th-education-list">
                    {mockStaffData.education.map(edu => (
                      <div key={edu.id} className="th-education-item">
                        <div className="th-education-header">
                          <h4 className="th-qualification">{edu.qualification}</h4>
                          <span className="th-year">{edu.year_completed}</span>
                        </div>
                        <p className="th-institution">{edu.institution}</p>
                        <p className="th-field">{edu.field_of_study}</p>
                        <span className="th-grade">{edu.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="th-info-card">
                <div className="th-card-header">
                  <h3 className="th-card-title">
                    <FaCertificate className="th-card-icon" />
                    Professional Certifications
                  </h3>
                </div>
                <div className="th-card-body">
                  <div className="th-certifications-list">
                    {mockStaffData.certifications.map(cert => (
                      <div key={cert.id} className="th-certification-item">
                        <div className="th-cert-header">
                          <h4 className="th-cert-name">{cert.name}</h4>
                          <span className={`th-cert-status ${new Date(cert.expiry_date) > new Date() ? 'valid' : 'expired'}`}>
                            {new Date(cert.expiry_date) > new Date() ? 'Valid' : 'Expired'}
                          </span>
                        </div>
                        <p className="th-cert-organization">{cert.issuing_organization}</p>
                        <div className="th-cert-details">
                          <span className="th-cert-number">#{cert.certificate_number}</span>
                          <span className="th-cert-expiry">
                            Expires: {format(new Date(cert.expiry_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="th-info-card">
                <div className="th-card-header">
                  <h3 className="th-card-title">
                    <FaIdCard className="th-card-icon" />
                    Employment Details
                  </h3>
                </div>
                <div className="th-card-body">
                  <div className="th-employment-details">
                    <div className="th-employment-item">
                      <span className="th-employment-label">Employee ID</span>
                      <span className="th-employment-value">{mockStaffData.employee_id}</span>
                    </div>
                    <div className="th-employment-item">
                      <span className="th-employment-label">Hire Date</span>
                      <span className="th-employment-value">
                        {format(new Date(mockStaffData.hire_date), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="th-employment-item">
                      <span className="th-employment-label">Position</span>
                      <span className="th-employment-value">{mockStaffData.position}</span>
                    </div>
                    <div className="th-employment-item">
                      <span className="th-employment-label">Department</span>
                      <span className="th-employment-value">{mockStaffData.department}</span>
                    </div>
                    <div className="th-employment-item">
                      <span className="th-employment-label">Employment Status</span>
                      <span className={`th-employment-value ${statusColor}`}>{mockStaffData.employment_status}</span>
                    </div>
                    <div className="th-employment-item">
                      <span className="th-employment-label">Role</span>
                      <span className="th-employment-value">{STAFF_ROLES[mockStaffData.role]?.label}</span>
                    </div>
                    <div className="th-employment-item">
                      <span className="th-employment-label">Monthly Salary</span>
                      <span className="th-employment-value">{formatSalary(mockStaffData.salary)}</span>
                    </div>
                    <div className="th-employment-item">
                      <span className="th-employment-label">Last Login</span>
                      <span className="th-employment-value">
                        {format(new Date(mockStaffData.last_login), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="th-performance-tab">
            <div className="th-performance-summary">
              <div className="th-current-rating">
                <h3>Current Performance Rating</h3>
                <div className={`th-rating-display ${performanceColor}`}>
                  <span className="th-rating-score">{currentPerformance?.score}%</span>
                  <span className="th-rating-label">{currentPerformance?.rating}</span>
                </div>
                <p className="th-reviewer">Reviewed by: {currentPerformance?.reviewer}</p>
              </div>
            </div>

            <div className="th-performance-history">
              <h4>Performance History</h4>
              <div className="th-performance-timeline">
                {mockStaffData.performance_ratings.map((rating, index) => (
                  <div key={index} className="th-performance-entry">
                    <div className="th-performance-year">{rating.year}</div>
                    <div className="th-performance-details">
                      <div className="th-performance-header">
                        <span className={`th-performance-rating ${getPerformanceColor(rating.rating)}`}>
                          {rating.rating}
                        </span>
                        <span className="th-performance-score">{rating.score}%</span>
                      </div>
                      <p className="th-performance-comments">{rating.comments}</p>
                      <p className="th-performance-reviewer">Reviewer: {rating.reviewer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {mockStaffData.achievements.length > 0 && (
              <div className="th-achievements-section">
                <h4>Achievements & Awards</h4>
                <div className="th-achievements-list">
                  {mockStaffData.achievements.map(achievement => (
                    <div key={achievement.id} className="th-achievement-item">
                      <FaTrophy className="th-achievement-icon" />
                      <div className="th-achievement-details">
                        <h5 className="th-achievement-title">{achievement.title}</h5>
                        <p className="th-achievement-description">{achievement.description}</p>
                        <div className="th-achievement-meta">
                          <span className="th-achievement-date">
                            {format(new Date(achievement.date), 'MMMM yyyy')}
                          </span>
                          <span className="th-achievement-org">{achievement.awarded_by}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Assigned Children Tab */}
        {activeTab === 'children' && (
          <div className="th-children-tab">
            <div className="th-children-header">
              <h4>Currently Assigned Children ({mockStaffData.children_assigned.length})</h4>
              <Button variant="primary" size="sm" icon={FaPlus}>
                Assign Child
              </Button>
            </div>
            
            <div className="th-children-grid">
              {mockStaffData.children_assigned.map(child => (
                <div key={child.id} className="th-child-assignment-card">
                  <div className="th-child-header">
                    <h5 className="th-child-name">{child.name}</h5>
                    <span className={`th-complexity-badge ${child.case_complexity.toLowerCase()}`}>
                      {child.case_complexity} Complexity
                    </span>
                  </div>
                  <div className="th-child-details">
                    <div className="th-child-meta">
                      <span className="th-child-age">Age: {child.age}</span>
                      <span className="th-child-status">{child.status}</span>
                    </div>
                    <p className="th-admission-date">
                      Admitted: {format(new Date(child.admission_date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="th-child-actions">
                    <Button variant="outline" size="sm" icon={FaEye}>
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case History Tab */}
        {activeTab === 'cases' && (
          <div className="th-cases-tab">
            <div className="th-cases-header">
              <h4>Case History & Activities</h4>
              <Button variant="primary" size="sm" icon={FaPlus}>
                Add Case Note
              </Button>
            </div>
            
            <div className="th-cases-timeline">
              {mockStaffData.case_history.map(caseItem => (
                <div key={caseItem.id} className="th-case-entry">
                  <div className="th-case-date">
                    {format(new Date(caseItem.date), 'MMM dd')}
                  </div>
                  <div className="th-case-content">
                    <div className="th-case-header">
                      <h5 className="th-case-action">{caseItem.action}</h5>
                      <span className={`th-priority-badge ${caseItem.priority.toLowerCase()}`}>
                        {caseItem.priority}
                      </span>
                    </div>
                    <p className="th-case-child">Child: {caseItem.child_name}</p>
                    <p className="th-case-category">Category: {caseItem.category}</p>
                    <p className="th-case-outcome">{caseItem.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div className="th-training-tab">
            <div className="th-training-summary">
              <div className="th-training-stats">
                <div className="th-training-stat">
                  <span className="th-stat-number">
                    {mockStaffData.training_records.filter(t => t.status === 'Completed').length}
                  </span>
                  <span className="th-stat-label">Completed</span>
                </div>
                <div className="th-training-stat">
                  <span className="th-stat-number">
                    {mockStaffData.training_records.filter(t => t.status === 'Registered').length}
                  </span>
                  <span className="th-stat-label">Upcoming</span>
                </div>
                <div className="th-training-stat">
                  <span className="th-stat-number">
                    {Math.round(mockStaffData.training_records.filter(t => t.score).reduce((sum, t) => sum + t.score, 0) / mockStaffData.training_records.filter(t => t.score).length) || 0}%
                  </span>
                  <span className="th-stat-label">Average Score</span>
                </div>
              </div>
            </div>

            <div className="th-training-header">
              <h4>Training Records</h4>
              <Button variant="primary" size="sm" icon={FaPlus}>
                Register for Training
              </Button>
            </div>

            <div className="th-training-list">
              {mockStaffData.training_records.map(training => (
                <div key={training.id} className="th-training-item">
                  <div className="th-training-header">
                    <h5 className="th-training-title">{training.course_name}</h5>
                    <span className={`th-training-status ${training.status.toLowerCase()}`}>
                      {training.status}
                    </span>
                  </div>
                  <div className="th-training-details">
                    <p className="th-training-provider">{training.provider}</p>
                    <div className="th-training-dates">
                      <span>
                        {format(new Date(training.start_date), 'MMM dd, yyyy')} - {format(new Date(training.end_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {training.score && (
                      <div className="th-training-score">
                        Score: <strong>{training.score}%</strong>
                      </div>
                    )}
                    {training.certificate_awarded && (
                      <div className="th-training-certificate">
                        <FaCertificate className="th-cert-icon" />
                        Certificate Awarded
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly... */}
      </div>
    </div>
  );
};

export default StaffProfile;