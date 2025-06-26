// src/pages/staff/StaffList.jsx - Fixed to use real API
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaPrint,
  FaUsers,
  FaUserTie,
  FaUserMd,
  FaChalkboardTeacher,
  FaEdit,
  FaEye,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCalendarAlt,
  FaIdCard,
  FaUserCheck,
  FaUserClock,
  FaExclamationTriangle
} from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import Button from '../../components/UI/Button/Button';
import LoadingSpinner from '../../components/UI/Loading/LoadingSpinner';
import { staffService } from '../../services/staff'; // Import the staff service
import './StaffList.css';

const StaffList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Real API call to fetch staff data
  const { 
    data: staffData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['staff', searchTerm, departmentFilter, statusFilter],
    queryFn: () => staffService.getStaff({ 
      search: searchTerm, 
      department: departmentFilter.join(','), 
      status: statusFilter.join(',') 
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const departmentOptions = [
    'Administration',
    'Child Care', 
    'Education',
    'Medical',
    'Kitchen',
    'Security',
    'Maintenance',
    'Social Services'
  ];

  const statusOptions = [
    'Active',
    'On Leave',
    'Suspended', 
    'Terminated'
  ];

  // Filter and search staff - now working with real API data
  const filteredStaff = useMemo(() => {
    if (!staffData?.data) return [];

    return staffData.data.filter(staff => {
      const matchesSearch = !searchTerm || 
        `${staff.first_name} ${staff.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = departmentFilter.length === 0 || 
        departmentFilter.includes(staff.department);

      const matchesStatus = statusFilter.length === 0 || 
        statusFilter.includes(staff.employment_status);

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [staffData?.data, searchTerm, departmentFilter, statusFilter]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <FaUserCheck className="status-icon active" />;
      case 'On Leave': return <FaUserClock className="status-icon leave" />;
      case 'Suspended': 
      case 'Terminated': return <FaExclamationTriangle className="status-icon inactive" />;
      default: return <FaUsers className="status-icon" />;
    }
  };

  const getDepartmentIcon = (department) => {
    switch (department) {
      case 'Medical': return <FaUserMd />;
      case 'Education': return <FaChalkboardTeacher />;
      case 'Administration': return <FaUserTie />;
      default: return <FaUsers />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    try {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return `${age} years`;
    } catch (error) {
      return 'N/A';
    }
  };

  if (isLoading) {
    return (
      <div className="th-staff-loading">
        <LoadingSpinner size="lg" />
        <p>Loading staff members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="th-staff-error">
        <h2>Error Loading Staff</h2>
        <p>Unable to load staff data: {error.message}</p>
        <Button onClick={refetch} variant="primary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="th-staff-list">
      {/* Header */}
      <div className="th-staff-header">
        <div className="th-header-content">
          <h1 className="th-page-title">
            <FaUsers className="th-title-icon" />
            Staff Management
          </h1>
          <p className="th-page-description">
            Manage staff records, roles, and permissions
          </p>
        </div>
        
        <div className="th-header-actions">
          <Button 
            variant="outline" 
            icon={<FaDownload />}
            size="sm"
          >
            Export
          </Button>
          <Button 
            variant="outline" 
            icon={<FaPrint />}
            size="sm"
          >
            Print
          </Button>
          <Button 
            variant="primary" 
            icon={<FaPlus />}
            onClick={() => navigate('/staff/add')}
          >
            Add Staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="th-staff-stats">
        <div className="th-stat-card">
          <div className="th-stat-icon">
            <FaUsers />
          </div>
          <div className="th-stat-content">
            <span className="th-stat-value">{staffData?.data?.length || 0}</span>
            <span className="th-stat-label">Total Staff</span>
          </div>
        </div>
        
        <div className="th-stat-card">
          <div className="th-stat-icon">
            <FaUserCheck />
          </div>
          <div className="th-stat-content">
            <span className="th-stat-value">
              {staffData?.data?.filter(s => s.employment_status === 'Active').length || 0}
            </span>
            <span className="th-stat-label">Active Staff</span>
          </div>
        </div>
        
        <div className="th-stat-card">
          <div className="th-stat-icon">
            <FaUserMd />
          </div>
          <div className="th-stat-content">
            <span className="th-stat-value">
              {staffData?.data?.filter(s => s.department === 'Medical').length || 0}
            </span>
            <span className="th-stat-label">Medical Staff</span>
          </div>
        </div>
        
        <div className="th-stat-card">
          <div className="th-stat-icon">
            <FaChalkboardTeacher />
          </div>
          <div className="th-stat-content">
            <span className="th-stat-value">
              {staffData?.data?.filter(s => s.department === 'Education').length || 0}
            </span>
            <span className="th-stat-label">Teachers</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="th-controls">
        <div className="th-search-section">
          <div className="th-search-wrapper">
            <FaSearch className="th-search-icon" />
            <input
              type="text"
              placeholder="Search staff by name, ID, position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="th-search-input"
            />
          </div>
        </div>

        <div className="th-filter-section">
          <select
            value={departmentFilter.join(',')}
            onChange={(e) => setDepartmentFilter(e.target.value ? [e.target.value] : [])}
            className="th-filter-select"
          >
            <option value="">All Departments</option>
            {departmentOptions.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={statusFilter.join(',')}
            onChange={(e) => setStatusFilter(e.target.value ? [e.target.value] : [])}
            className="th-filter-select"
          >
            <option value="">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff List */}
      {filteredStaff.length === 0 ? (
        <div className="th-empty-state">
          <FaUsers className="th-empty-icon" />
          <h3>No Staff Members Found</h3>
          <p>
            {staffData?.data?.length === 0 
              ? "No staff members have been added yet. Click 'Add Staff' to get started."
              : "No staff members match your current search and filter criteria."
            }
          </p>
          {staffData?.data?.length === 0 && (
            <Button 
              variant="primary" 
              icon={<FaPlus />}
              onClick={() => navigate('/staff/add')}
            >
              Add First Staff Member
            </Button>
          )}
        </div>
      ) : (
        <div className="th-staff-grid">
          {filteredStaff.map(staff => (
            <div key={staff._id} className="th-staff-card">
              <div className="th-card-header">
                <div className="th-staff-avatar">
                  {staff.photo_url ? (
                    <img src={staff.photo_url} alt={`${staff.first_name} ${staff.last_name}`} />
                  ) : (
                    <div className="th-avatar-placeholder">
                      {staff.first_name?.[0]}{staff.last_name?.[0]}
                    </div>
                  )}
                </div>
                <div className="th-staff-status">
                  {getStatusIcon(staff.employment_status)}
                </div>
              </div>

              <div className="th-card-body">
                <h3 className="th-staff-name">
                  {staff.first_name} {staff.last_name}
                </h3>
                <p className="th-staff-position">{staff.position}</p>
                <p className="th-staff-department">
                  {getDepartmentIcon(staff.department)}
                  {staff.department}
                </p>

                <div className="th-staff-details">
                  <div className="th-detail-item">
                    <FaIdCard className="th-detail-icon" />
                    <span>{staff.employee_id || 'No ID'}</span>
                  </div>
                  <div className="th-detail-item">
                    <FaEnvelope className="th-detail-icon" />
                    <span>{staff.email}</span>
                  </div>
                  <div className="th-detail-item">
                    <FaPhone className="th-detail-icon" />
                    <span>{staff.phone}</span>
                  </div>
                  <div className="th-detail-item">
                    <FaCalendarAlt className="th-detail-icon" />
                    <span>Hired: {formatDate(staff.date_hired)}</span>
                  </div>
                </div>
              </div>

              <div className="th-card-actions">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<FaEye />}
                  onClick={() => navigate(`/staff/${staff._id}`)}
                >
                  View
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<FaEdit />}
                  onClick={() => navigate(`/staff/${staff._id}/edit`)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffList;