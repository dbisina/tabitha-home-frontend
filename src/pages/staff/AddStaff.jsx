// src/pages/staff/AddStaff.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUserPlus, FaArrowLeft, FaSave } from 'react-icons/fa';
import Button from '../../components/UI/Button/Button';
import { authService } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { NIGERIAN_STATES } from '../../utils/nigerianData';
import './AddStaff.css';

const AddStaff = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male',
    marital_status: 'Single',
    nin: '',
    address: {
      street: '',
      city: '',
      state: 'Lagos',
      lga: '',
      postal_code: ''
    },
    emergency_contact: {
      name: '',
      relationship: '',
      phone: '',
      address: ''
    },
    position: 'Staff',
    department: 'Administration',
    role: 'staff',
    salary: ''
  });

  // Create staff mutation
  const createStaffMutation = useMutation({
    mutationFn: (staffData) => authService.createStaffAccount(staffData),
    onSuccess: (newStaff) => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast.success(
        `${newStaff.first_name} ${newStaff.last_name} has been successfully added!`,
        { duration: 5000, icon: '🎉' }
      );
      navigate('/staff');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to create staff account';
      toast.error(errorMessage);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStaffMutation.mutateAsync({
        ...formData,
        created_by: user?.id
      });
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="th-add-staff th-fade-in">
      {/* Page Header */}
      <div className="th-page-header">
        <div className="th-header-content">
          <div className="th-breadcrumb">
            <button
              className="th-back-btn"
              onClick={() => navigate('/staff')}
            >
              <FaArrowLeft />
              Staff
            </button>
            <span className="th-breadcrumb-separator">/</span>
            <span className="th-breadcrumb-current">Add New Staff</span>
          </div>
          
          <h1 className="th-page-title">
            <FaUserPlus className="th-title-icon" />
            Add New Staff Member
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="th-staff-form-container">
        <form onSubmit={handleSubmit} className="th-staff-form">
          {/* Personal Information */}
          <div className="th-form-section">
            <h3 className="th-section-title">Personal Information</h3>
            <div className="th-form-grid">
              <div className="th-form-group">
                <label className="th-label">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="th-input"
                  required
                />
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="th-input"
                  required
                />
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="th-input"
                  required
                />
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 XXX XXX XXXX"
                  className="th-input"
                  required
                />
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Date of Birth *</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  className="th-input"
                  required
                />
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="th-select"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="th-form-section">
            <h3 className="th-section-title">Employment Details</h3>
            <div className="th-form-grid">
              <div className="th-form-group">
                <label className="th-label">Position *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="th-select"
                  required
                >
                  <option value="Director">Director</option>
                  <option value="Assistant Director">Assistant Director</option>
                  <option value="Social Worker">Social Worker</option>
                  <option value="Child Care Worker">Child Care Worker</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Cook">Cook</option>
                  <option value="Security">Security</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="th-select"
                  required
                >
                  <option value="Administration">Administration</option>
                  <option value="Child Care">Child Care</option>
                  <option value="Education">Education</option>
                  <option value="Health Care">Health Care</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Security">Security</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Social Services">Social Services</option>
                </select>
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="th-select"
                  required
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="read_only">Read Only</option>
                </select>
              </div>
              
              <div className="th-form-group">
                <label className="th-label">Monthly Salary (₦)</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="th-input"
                  placeholder="450000"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="th-form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/staff')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<FaSave />}
              loading={createStaffMutation.isLoading}
              disabled={createStaffMutation.isLoading}
            >
              Create Staff Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;