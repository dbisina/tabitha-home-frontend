// src/pages/staff/StaffList.jsx
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import SearchInput from '../../components/Common/SearchInput';
import FilterDropdown from '../../components/Common/FilterDropdown';
import LoadingSpinner from '../../components/UI/Loading/LoadingSpinner';
import { formatNigerianPhone, calculateAge } from '../../utils/helpers';
import './StaffList.css';

const StaffList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Mock data - replace with actual API call
  const mockStaffData = {
    data: [
      {
        id: 1,
        staff_id: 'THS-001',
        first_name: 'John',
        last_name: 'Adebayo',
        email: 'john.adebayo@tabithahome.org',
        phone: '+234 803 123 4567',
        position: 'Child Care Coordinator',
        department: 'Child Care',
        employment_type: 'Full-time',
        status: 'Active',
        hire_date: '2022-01-15',
        date_of_birth: '1985-03-20',
        address: 'Victoria Island, Lagos',
        emergency_contact: '+234 807 987 6543',
        qualifications: 'BSc Social Work',
        experience_years: 8,
        photo_url: null,
        salary: 450000,
        last_login: '2024-06-25T09:30:00Z'
      },
      {
        id: 2,
        staff_id: 'THS-002',
        first_name: 'Dr. Sarah',
        last_name: 'Okonkwo',
        email: 'sarah.okonkwo@tabithahome.org',
        phone: '+234 816 555 7890',
        position: 'Medical Officer',
        department: 'Medical',
        employment_type: 'Full-time',
        status: 'Active',
        hire_date: '2021-08-10',
        date_of_birth: '1982-11-15',
        address: 'Ikeja, Lagos',
        emergency_contact: '+234 803 111 2222',
        qualifications: 'MBBS, Pediatrics Certification',
        experience_years: 12,
        photo_url: null,
        salary: 850000,
        last_login: '2024-06-24T16:45:00Z'
      },
      {
        id: 3,
        staff_id: 'THS-003',
        first_name: 'Fatima',
        last_name: 'Ibrahim',
        email: 'fatima.ibrahim@tabithahome.org',
        phone: '+234 709 333 4444',
        position: 'Education Coordinator',
        department: 'Education',
        employment_type: 'Full-time',
        status: 'Active',
        hire_date: '2023-02-01',
        date_of_birth: '1990-07-08',
        address: 'Surulere, Lagos',
        emergency_contact: '+234 805 555 6666',
        qualifications: 'BEd Primary Education',
        experience_years: 5,
        photo_url: null,
        salary: 380000,
        last_login: '2024-06-25T08:15:00Z'
      }
    ]
  };

  const { 
    data: staffData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['staff', searchTerm, departmentFilter, statusFilter],
    queryFn: () => staffService.getStaff({ searchTerm, departmentFilter, statusFilter }),
    staleTime: 5 * 60 * 1000,
  });

  const departmentOptions = [
    'Child Care',
    'Medical',
    'Education',
    'Administration',
    'Security',
    'Maintenance'
  ];

  const statusOptions = [
    'Active',
    'On Leave',
    'Suspended',
    'Terminated'
  ];

  // Filter and search staff
  const filteredStaff = useMemo(() => {
    if (!staffData?.data) return [];

    return staffData.data.filter(staff => {
      const matchesSearch = !searchTerm || 
        `${staff.first_name} ${staff.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = departmentFilter.length === 0 || 
        departmentFilter.includes(staff.department);

      const matchesStatus = statusFilter.length === 0 || 
        statusFilter.includes(staff.status);

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

  if (isLoading) {
    return (
      <div className="th-staff-loading">
        <LoadingSpinner size="lg" message="Loading staff..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="th-staff-error">
        <h2>Error Loading Staff</h2>
        <p>Unable to load staff data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="th-staff-list">
      {/* Header */}
      <div className="th-staff-header">
        <div className="th-header-content">
          <h1 className="th-page-title">Staff Management</h1>
          <p className="th-page-description">
            Manage staff records, roles, and permissions
          </p>
        </div>
        
        <div className="th-header-actions">
          <Button 
            variant="outline" 
            icon={FaDownload}
            size="sm"
          >
            Export
          </Button>
          <Button 
            variant="outline" 
            icon={FaPrint}
            size="sm"
          >
            Print
          </Button>
          <Button 
            variant="primary" 
            icon={FaPlus}
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
          <div className="th-stat-icon active">
            <FaUserCheck />
          </div>
          <div className="th-stat-content">
            <span className="th-stat-value">
              {staffData?.data?.filter(s => s.status === 'Active').length || 0}
            </span>
            <span className="th-stat-label">Active</span>
          </div>
        </div>
        
        <div className="th-stat-card">
          <div className="th-stat-icon medical">
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
          <div className="th-stat-icon education">
            <FaChalkboardTeacher />
          </div>
          <div className="th-stat-content">
            <span className="th-stat-value">
              {staffData?.data?.filter(s => s.department === 'Education').length || 0}
            </span>
            <span className="th-stat-label">Education Staff</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="th-staff-filters">
        <div className="th-filters-row">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search staff by name, ID, position..."
            size="md"
            className="th-staff-search"
          />
          
          <FilterDropdown
            options={departmentOptions}
            value={departmentFilter}
            onChange={setDepartmentFilter}
            placeholder="All Departments"
            multiSelect={true}
            size="md"
          />
          
          <FilterDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Status"
            multiSelect={true}
            size="md"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="th-staff-grid">
        {filteredStaff.map(staff => (
          <div key={staff.id} className="th-staff-card">
            <div className="th-staff-card-header">
              <div className="th-staff-avatar">
                {staff.photo_url ? (
                  <img src={staff.photo_url} alt={`${staff.first_name} ${staff.last_name}`} />
                ) : (
                  <div className="th-avatar-placeholder">
                    {staff.first_name.charAt(0)}{staff.last_name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="th-staff-status">
                {getStatusIcon(staff.status)}
              </div>
            </div>
            
            <div className="th-staff-card-body">
              <h3 className="th-staff-name">
                {staff.first_name} {staff.last_name}
              </h3>
              <p className="th-staff-id">{staff.staff_id}</p>
              
              <div className="th-staff-position">
                <span className="th-department-icon">
                  {getDepartmentIcon(staff.department)}
                </span>
                <span className="th-position-text">{staff.position}</span>
              </div>
              
              <div className="th-staff-department">
                {staff.department}
              </div>
              
              <div className="th-staff-details">
                <div className="th-detail-item">
                  <FaPhone className="th-detail-icon" />
                  <span>{formatNigerianPhone(staff.phone)}</span>
                </div>
                
                <div className="th-detail-item">
                  <FaEnvelope className="th-detail-icon" />
                  <span>{staff.email}</span>
                </div>
                
                <div className="th-detail-item">
                  <FaBirthdayCake className="th-detail-icon" />
                  <span>Age: {calculateAge(staff.date_of_birth)}</span>
                </div>
                
                <div className="th-detail-item">
                  <FaCalendarAlt className="th-detail-icon" />
                  <span>Hired: {format(parseISO(staff.hire_date), 'MMM yyyy')}</span>
                </div>
              </div>
            </div>
            
            <div className="th-staff-card-footer">
              <Button 
                variant="outline" 
                size="sm" 
                icon={FaEye}
              >
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                icon={FaEdit}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="th-staff-empty">
          <div className="th-empty-icon">
            <FaUsers />
          </div>
          <h3 className="th-empty-title">No staff found</h3>
          <p className="th-empty-message">
            {searchTerm || departmentFilter.length > 0 || statusFilter.length > 0
              ? 'Try adjusting your search criteria'
              : 'No staff records available'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffList;