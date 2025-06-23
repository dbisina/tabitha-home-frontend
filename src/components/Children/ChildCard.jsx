import React from 'react';
import { 
  FaUser, 
  FaBirthdayCake, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaHeart,
  FaEye,
  FaEdit,
  FaPhone,
  FaCalendarAlt,
  FaMale,
  FaFemale,
  FaStethoscope
} from 'react-icons/fa';
import { formatDistanceToNow, format } from 'date-fns';
import Button from '../UI/Button/Button';
import './ChildCard.css';

const ChildCard = ({ child, onView, onEdit, className = '' }) => {
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Active': 'success',
      'Exited': 'muted',
      'Transferred': 'info',
      'Adopted': 'primary',
      'Inactive': 'warning'
    };
    return statusColors[status] || 'muted';
  };

  const getHealthStatusColor = (status) => {
    const healthColors = {
      'Excellent': 'success',
      'Good': 'primary',
      'Fair': 'warning',
      'Poor': 'error'
    };
    return healthColors[status] || 'muted';
  };

  const age = calculateAge(child.date_of_birth);
  const admissionTime = formatDistanceToNow(new Date(child.admission_date), { addSuffix: true });
  const statusColor = getStatusColor(child.current_status);
  const healthColor = getHealthStatusColor(child.health_status);
  const GenderIcon = child.gender === 'Male' ? FaMale : FaFemale;

  return (
    <div className={`th-child-card ${className}`}>
      <div className="th-card-background">
        <div className="th-card-pattern"></div>
      </div>
      
      <div className="th-card-content">
        {/* Card Header */}
        <div className="th-card-header">
          <div className="th-child-photo">
            {child.photo_url ? (
              <img src={child.photo_url} alt={`${child.first_name} ${child.last_name}`} />
            ) : (
              <div className="th-photo-placeholder">
                <FaUser />
              </div>
            )}
            <div className={`th-status-indicator th-status-${statusColor}`}>
              <span className="th-status-dot"></span>
            </div>
          </div>
          
          <div className="th-child-basic-info">
            <h3 className="th-child-name">
              {child.first_name} {child.middle_name} {child.last_name}
            </h3>
            <div className="th-child-id">ID: {child.child_id}</div>
            <div className="th-child-meta">
              <span className="th-age">
                <FaBirthdayCake className="th-meta-icon" />
                {age} years old
              </span>
              <span className="th-gender">
                <GenderIcon className="th-meta-icon" />
                {child.gender}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="th-card-body">
          <div className="th-info-grid">
            <div className="th-info-item">
              <FaMapMarkerAlt className="th-info-icon" />
              <div className="th-info-content">
                <span className="th-info-label">Origin</span>
                <span className="th-info-value">{child.state_of_origin}</span>
              </div>
            </div>
            
            <div className="th-info-item">
              <FaGraduationCap className="th-info-icon" />
              <div className="th-info-content">
                <span className="th-info-label">Education</span>
                <span className="th-info-value">{child.education_level}</span>
              </div>
            </div>
            
            <div className="th-info-item">
              <FaStethoscope className="th-info-icon" />
              <div className="th-info-content">
                <span className="th-info-label">Health</span>
                <span className={`th-info-value th-health-${healthColor}`}>
                  {child.health_status}
                </span>
              </div>
            </div>
            
            <div className="th-info-item">
              <FaCalendarAlt className="th-info-icon" />
              <div className="th-info-content">
                <span className="th-info-label">Admitted</span>
                <span className="th-info-value">{admissionTime}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="th-additional-info">
            {child.school_name && (
              <div className="th-school-info">
                <span className="th-school-label">School:</span>
                <span className="th-school-name">{child.school_name}</span>
              </div>
            )}
            
            {child.ambition && (
              <div className="th-ambition">
                <span className="th-ambition-label">Dreams to be:</span>
                <span className="th-ambition-value">{child.ambition}</span>
              </div>
            )}
            
            {child.case_worker && (
              <div className="th-case-worker">
                <span className="th-worker-label">Case Worker:</span>
                <span className="th-worker-name">{child.case_worker}</span>
              </div>
            )}
          </div>

          {/* Medical Info */}
          <div className="th-medical-summary">
            <div className="th-medical-item">
              <span className="th-medical-label">Blood Type:</span>
              <span className="th-medical-value">{child.blood_type || 'Unknown'}</span>
            </div>
            <div className="th-medical-item">
              <span className="th-medical-label">Genotype:</span>
              <span className="th-medical-value">{child.genotype || 'Unknown'}</span>
            </div>
            {child.last_checkup && (
              <div className="th-medical-item">
                <span className="th-medical-label">Last Checkup:</span>
                <span className="th-medical-value">
                  {format(new Date(child.last_checkup), 'MMM dd, yyyy')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className="th-card-footer">
          <div className="th-status-badges">
            <span className={`th-status-badge th-badge-${statusColor}`}>
              {child.current_status}
            </span>
            {child.preferred_language && (
              <span className="th-language-badge">
                {child.preferred_language}
              </span>
            )}
          </div>
          
          <div className="th-card-actions">
            <Button
              variant="glass"
              size="sm"
              icon={<FaEye />}
              onClick={() => onView(child)}
              title="View Details"
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<FaEdit />}
              onClick={() => onEdit(child)}
              title="Edit Child"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;