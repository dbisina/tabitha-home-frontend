// src/pages/staff/AddStaff.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { 
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaShieldAlt,
  FaFileUpload,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaIdCard,
  FaEnvelope,
  FaHome,
  FaUserTie,
  FaCamera,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';
import { format } from 'date-fns';
import Button from '../../components/UI/Button/Button';
import { 
  NIGERIAN_STATES, 
  STAFF_POSITIONS, 
  STAFF_DEPARTMENTS, 
  STAFF_ROLES,
  NIGERIAN_QUALIFICATIONS,
  NIGERIAN_INSTITUTIONS,
  SALARY_RANGES,
  BACKGROUND_CHECK_TYPES
} from '../../utils/nigerianStaffData';
import './AddStaff.css';

const AddStaff = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [educationEntries, setEducationEntries] = useState([{
    id: 1,
    institution: '',
    qualification: '',
    field_of_study: '',
    year_completed: '',
    grade: ''
  }]);
  const [certificationEntries, setCertificationEntries] = useState([{
    id: 1,
    name: '',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    certificate_number: ''
  }]);

  const { 
    register, 
    handleSubmit, 
    watch, 
    control, 
    setValue, 
    formState: { errors }, 
    trigger,
    getValues 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      employment_status: 'Probation',
      role: 'staff',
      gender: '',
      marital_status: '',
      religion: '',
      state_of_origin: '',
      address: {
        state: '',
        lga: ''
      }
    }
  });

  const watchedPosition = watch('position');
  const watchedState = watch('state_of_origin');
  const watchedAddressState = watch('address.state');

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      icon: FaUser,
      description: 'Basic personal details and identification'
    },
    {
      id: 2,
      title: 'Contact & Address',
      icon: FaMapMarkerAlt,
      description: 'Contact information and address details'
    },
    {
      id: 3,
      title: 'Employment Details',
      icon: FaBriefcase,
      description: 'Position, department, and salary information'
    },
    {
      id: 4,
      title: 'Education & Qualifications',
      icon: FaGraduationCap,
      description: 'Educational background and certifications'
    },
    {
      id: 5,
      title: 'Emergency Contact',
      icon: FaShieldAlt,
      description: 'Emergency contact and reference information'
    },
    {
      id: 6,
      title: 'Review & Submit',
      icon: FaCheck,
      description: 'Review all information before submission'
    }
  ];

  // Helper functions
  const validateStep = async (step) => {
    const fieldsToValidate = getStepFields(step);
    const result = await trigger(fieldsToValidate);
    return result;
  };

  const getStepFields = (step) => {
    switch (step) {
      case 1:
        return ['first_name', 'last_name', 'date_of_birth', 'gender', 'marital_status', 'religion', 'state_of_origin', 'nin'];
      case 2:
        return ['phone', 'email', 'address.street', 'address.city', 'address.state', 'address.lga', 'address.postal_code'];
      case 3:
        return ['position', 'department', 'hire_date', 'employment_status', 'role', 'salary'];
      case 4:
        return []; // Education and certifications are handled separately
      case 5:
        return ['emergency_contact.name', 'emergency_contact.relationship', 'emergency_contact.phone'];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    if (currentStep < 6) {
      const isValid = await validateStep(currentStep);
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addEducationEntry = () => {
    const newEntry = {
      id: Date.now(),
      institution: '',
      qualification: '',
      field_of_study: '',
      year_completed: '',
      grade: ''
    };
    setEducationEntries([...educationEntries, newEntry]);
  };

  const removeEducationEntry = (id) => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.filter(entry => entry.id !== id));
    }
  };

  const addCertificationEntry = () => {
    const newEntry = {
      id: Date.now(),
      name: '',
      issuing_organization: '',
      issue_date: '',
      expiry_date: '',
      certificate_number: ''
    };
    setCertificationEntries([...certificationEntries, newEntry]);
  };

  const removeCertificationEntry = (id) => {
    if (certificationEntries.length > 1) {
      setCertificationEntries(certificationEntries.filter(entry => entry.id !== id));
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Prepare form data with education and certifications
      const formData = {
        ...data,
        education: educationEntries.filter(entry => entry.institution && entry.qualification),
        certifications: certificationEntries.filter(entry => entry.name && entry.issuing_organization),
        profile_photo: profilePhoto
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Staff data to submit:', formData);
      
      // Navigate to staff list with success message
      navigate('/staff', { 
        state: { 
          message: 'Staff member added successfully!',
          type: 'success'
        }
      });
      
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Error adding staff member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get LGAs for selected state
  const getLGAOptions = (state) => {
    // This would typically come from a comprehensive LGA database
    const lgaMap = {
      'Lagos': ['Alimosho', 'Amuwo-Odofin', 'Apapa', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],
      'Oyo': ['Afijio', 'Akinyele', 'Atiba', 'Egbeda', 'Ibadan North', 'Ibadan North-East', 'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North'],
      'Kano': ['Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam']
    };
    return lgaMap[state] || [];
  };

  // Get salary range for position
  const getSalaryRange = (position) => {
    return SALARY_RANGES[position] || { min: 50000, max: 100000 };
  };

  return (
    <div className="th-add-staff">
      <div className="th-add-staff-header">
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
          <h1 className="th-page-title">Add New Staff Member</h1>
          <p className="th-page-subtitle">Complete all steps to register a new staff member</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="th-steps-container">
        <div className="th-steps-progress">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isAccessible = currentStep >= step.id;

            return (
              <div key={step.id} className="th-step-wrapper">
                <div 
                  className={`th-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isAccessible ? 'accessible' : ''}`}
                  onClick={() => isAccessible && setCurrentStep(step.id)}
                >
                  <div className="th-step-icon">
                    {isCompleted ? <FaCheck /> : <StepIcon />}
                  </div>
                  <div className="th-step-content">
                    <h3 className="th-step-title">{step.title}</h3>
                    <p className="th-step-description">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`th-step-connector ${isCompleted ? 'completed' : ''}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="th-add-staff-form">
        <div className="th-form-container">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="th-form-step">
              <div className="th-step-header">
                <h2 className="th-step-title">Personal Information</h2>
                <p className="th-step-description">Enter the staff member's basic personal details</p>
              </div>

              <div className="th-form-content">
                {/* Photo Upload */}
                <div className="th-photo-upload-section">
                  <label className="th-photo-upload-label">Profile Photo</label>
                  <div className="th-photo-upload">
                    <div className="th-photo-preview">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Profile preview" className="th-preview-image" />
                      ) : (
                        <div className="th-photo-placeholder">
                          <FaCamera className="th-camera-icon" />
                          <span>Upload Photo</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="th-photo-input"
                      id="profile-photo"
                    />
                    <label htmlFor="profile-photo" className="th-photo-upload-btn">
                      <FaFileUpload className="th-upload-icon" />
                      Choose Photo
                    </label>
                  </div>
                  <small className="th-photo-help">Recommended: 400x400px, max 5MB (JPG, PNG)</small>
                </div>

                <div className="th-form-grid">
                  <div className="th-form-group">
                    <label className="th-form-label">
                      First Name <span className="th-required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('first_name', { 
                        required: 'First name is required',
                        minLength: { value: 2, message: 'First name must be at least 2 characters' }
                      })}
                      className={`th-form-input ${errors.first_name ? 'error' : ''}`}
                      placeholder="Enter first name"
                    />
                    {errors.first_name && (
                      <span className="th-error-message">{errors.first_name.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Last Name <span className="th-required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('last_name', { 
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                      })}
                      className={`th-form-input ${errors.last_name ? 'error' : ''}`}
                      placeholder="Enter last name"
                    />
                    {errors.last_name && (
                      <span className="th-error-message">{errors.last_name.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">Middle Name</label>
                    <input
                      type="text"
                      {...register('middle_name')}
                      className="th-form-input"
                      placeholder="Enter middle name (optional)"
                    />
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Date of Birth <span className="th-required">*</span>
                    </label>
                    <input
                      type="date"
                      {...register('date_of_birth', { 
                        required: 'Date of birth is required',
                        validate: value => {
                          const age = new Date().getFullYear() - new Date(value).getFullYear();
                          return age >= 18 || 'Staff member must be at least 18 years old';
                        }
                      })}
                      className={`th-form-input ${errors.date_of_birth ? 'error' : ''}`}
                    />
                    {errors.date_of_birth && (
                      <span className="th-error-message">{errors.date_of_birth.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Gender <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('gender', { required: 'Gender is required' })}
                      className={`th-form-select ${errors.gender ? 'error' : ''}`}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && (
                      <span className="th-error-message">{errors.gender.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Marital Status <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('marital_status', { required: 'Marital status is required' })}
                      className={`th-form-select ${errors.marital_status ? 'error' : ''}`}
                    >
                      <option value="">Select marital status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                    {errors.marital_status && (
                      <span className="th-error-message">{errors.marital_status.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Religion <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('religion', { required: 'Religion is required' })}
                      className={`th-form-select ${errors.religion ? 'error' : ''}`}
                    >
                      <option value="">Select religion</option>
                      <option value="Christianity">Christianity</option>
                      <option value="Islam">Islam</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.religion && (
                      <span className="th-error-message">{errors.religion.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      State of Origin <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('state_of_origin', { required: 'State of origin is required' })}
                      className={`th-form-select ${errors.state_of_origin ? 'error' : ''}`}
                    >
                      <option value="">Select state of origin</option>
                      {NIGERIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state_of_origin && (
                      <span className="th-error-message">{errors.state_of_origin.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      National Identification Number (NIN) <span className="th-required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('nin', { 
                        required: 'NIN is required',
                        pattern: {
                          value: /^\d{11}$/,
                          message: 'NIN must be exactly 11 digits'
                        }
                      })}
                      className={`th-form-input ${errors.nin ? 'error' : ''}`}
                      placeholder="Enter 11-digit NIN"
                      maxLength="11"
                    />
                    {errors.nin && (
                      <span className="th-error-message">{errors.nin.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact & Address */}
          {currentStep === 2 && (
            <div className="th-form-step">
              <div className="th-step-header">
                <h2 className="th-step-title">Contact & Address Information</h2>
                <p className="th-step-description">Provide contact details and current address</p>
              </div>

              <div className="th-form-content">
                <div className="th-form-section">
                  <h3 className="th-section-title">Contact Information</h3>
                  <div className="th-form-grid">
                    <div className="th-form-group">
                      <label className="th-form-label">
                        Phone Number <span className="th-required">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^\+234[0-9]{10}$/,
                            message: 'Phone number must be in format +234XXXXXXXXXX'
                          }
                        })}
                        className={`th-form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="+234XXXXXXXXXX"
                      />
                      {errors.phone && (
                        <span className="th-error-message">{errors.phone.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        Email Address <span className="th-required">*</span>
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className={`th-form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <span className="th-error-message">{errors.email.message}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="th-form-section">
                  <h3 className="th-section-title">Current Address</h3>
                  <div className="th-form-grid">
                    <div className="th-form-group th-form-group-full">
                      <label className="th-form-label">
                        Street Address <span className="th-required">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('address.street', { required: 'Street address is required' })}
                        className={`th-form-input ${errors.address?.street ? 'error' : ''}`}
                        placeholder="Enter street address"
                      />
                      {errors.address?.street && (
                        <span className="th-error-message">{errors.address.street.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        City <span className="th-required">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('address.city', { required: 'City is required' })}
                        className={`th-form-input ${errors.address?.city ? 'error' : ''}`}
                        placeholder="Enter city"
                      />
                      {errors.address?.city && (
                        <span className="th-error-message">{errors.address.city.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        State <span className="th-required">*</span>
                      </label>
                      <select
                        {...register('address.state', { required: 'State is required' })}
                        className={`th-form-select ${errors.address?.state ? 'error' : ''}`}
                      >
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.address?.state && (
                        <span className="th-error-message">{errors.address.state.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        Local Government Area <span className="th-required">*</span>
                      </label>
                      <select
                        {...register('address.lga', { required: 'LGA is required' })}
                        className={`th-form-select ${errors.address?.lga ? 'error' : ''}`}
                        disabled={!watchedAddressState}
                      >
                        <option value="">Select LGA</option>
                        {watchedAddressState && getLGAOptions(watchedAddressState).map(lga => (
                          <option key={lga} value={lga}>{lga}</option>
                        ))}
                      </select>
                      {errors.address?.lga && (
                        <span className="th-error-message">{errors.address.lga.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        Postal Code <span className="th-required">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('address.postal_code', { 
                          required: 'Postal code is required',
                          pattern: {
                            value: /^\d{6}$/,
                            message: 'Postal code must be 6 digits'
                          }
                        })}
                        className={`th-form-input ${errors.address?.postal_code ? 'error' : ''}`}
                        placeholder="Enter postal code"
                        maxLength="6"
                      />
                      {errors.address?.postal_code && (
                        <span className="th-error-message">{errors.address.postal_code.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Employment Details */}
          {currentStep === 3 && (
            <div className="th-form-step">
              <div className="th-step-header">
                <h2 className="th-step-title">Employment Details</h2>
                <p className="th-step-description">Set position, department, and compensation details</p>
              </div>

              <div className="th-form-content">
                <div className="th-form-grid">
                  <div className="th-form-group">
                    <label className="th-form-label">
                      Position <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('position', { required: 'Position is required' })}
                      className={`th-form-select ${errors.position ? 'error' : ''}`}
                    >
                      <option value="">Select position</option>
                      {STAFF_POSITIONS.map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                    {errors.position && (
                      <span className="th-error-message">{errors.position.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Department <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('department', { required: 'Department is required' })}
                      className={`th-form-select ${errors.department ? 'error' : ''}`}
                    >
                      <option value="">Select department</option>
                      {STAFF_DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <span className="th-error-message">{errors.department.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Hire Date <span className="th-required">*</span>
                    </label>
                    <input
                      type="date"
                      {...register('hire_date', { 
                        required: 'Hire date is required',
                        validate: value => {
                          const hireDate = new Date(value);
                          const today = new Date();
                          return hireDate <= today || 'Hire date cannot be in the future';
                        }
                      })}
                      className={`th-form-input ${errors.hire_date ? 'error' : ''}`}
                    />
                    {errors.hire_date && (
                      <span className="th-error-message">{errors.hire_date.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Employment Status <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('employment_status', { required: 'Employment status is required' })}
                      className={`th-form-select ${errors.employment_status ? 'error' : ''}`}
                    >
                      <option value="Probation">Probation</option>
                      <option value="Active">Active</option>
                      <option value="Contract">Contract</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                    {errors.employment_status && (
                      <span className="th-error-message">{errors.employment_status.message}</span>
                    )}
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      System Role <span className="th-required">*</span>
                    </label>
                    <select
                      {...register('role', { required: 'System role is required' })}
                      className={`th-form-select ${errors.role ? 'error' : ''}`}
                    >
                      {Object.entries(STAFF_ROLES).map(([key, role]) => (
                        <option key={key} value={key}>{role.label}</option>
                      ))}
                    </select>
                    {errors.role && (
                      <span className="th-error-message">{errors.role.message}</span>
                    )}
                    <small className="th-form-help">
                      This determines what the staff member can access in the system
                    </small>
                  </div>

                  <div className="th-form-group">
                    <label className="th-form-label">
                      Monthly Salary (₦) <span className="th-required">*</span>
                    </label>
                    <input
                      type="number"
                      {...register('salary', { 
                        required: 'Salary is required',
                        min: { value: 30000, message: 'Salary must be at least ₦30,000' },
                        max: { value: 1000000, message: 'Salary cannot exceed ₦1,000,000' }
                      })}
                      className={`th-form-input ${errors.salary ? 'error' : ''}`}
                      placeholder="Enter monthly salary"
                    />
                    {errors.salary && (
                      <span className="th-error-message">{errors.salary.message}</span>
                    )}
                    {watchedPosition && (
                      <small className="th-form-help">
                        Recommended range for {watchedPosition}: ₦{getSalaryRange(watchedPosition).min.toLocaleString()} - ₦{getSalaryRange(watchedPosition).max.toLocaleString()}
                      </small>
                    )}
                  </div>
                </div>

                {/* Account Setup */}
                <div className="th-form-section">
                  <h3 className="th-section-title">System Account Setup</h3>
                  <div className="th-form-grid">
                    <div className="th-form-group">
                      <label className="th-form-label">
                        Username <span className="th-required">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('username', { 
                          required: 'Username is required',
                          minLength: { value: 3, message: 'Username must be at least 3 characters' },
                          pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: 'Username can only contain letters, numbers, and underscores'
                          }
                        })}
                        className={`th-form-input ${errors.username ? 'error' : ''}`}
                        placeholder="Enter username"
                      />
                      {errors.username && (
                        <span className="th-error-message">{errors.username.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        Temporary Password <span className="th-required">*</span>
                      </label>
                      <div className="th-password-input">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          {...register('password', { 
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                              message: 'Password must contain uppercase, lowercase, and number'
                            }
                          })}
                          className={`th-form-input ${errors.password ? 'error' : ''}`}
                          placeholder="Enter temporary password"
                        />
                        <button
                          type="button"
                          className="th-password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <span className="th-error-message">{errors.password.message}</span>
                      )}
                      <small className="th-form-help">
                        Staff member will be required to change this on first login
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Education & Qualifications */}
          {currentStep === 4 && (
            <div className="th-form-step">
              <div className="th-step-header">
                <h2 className="th-step-title">Education & Qualifications</h2>
                <p className="th-step-description">Add educational background and professional certifications</p>
              </div>

              <div className="th-form-content">
                {/* Education Section */}
                <div className="th-form-section">
                  <div className="th-section-header">
                    <h3 className="th-section-title">Educational Background</h3>
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addEducationEntry}
                      icon={FaPlus}
                    >
                      Add Education
                    </Button>
                  </div>

                  {educationEntries.map((entry, index) => (
                    <div key={entry.id} className="th-dynamic-entry">
                      <div className="th-entry-header">
                        <h4 className="th-entry-title">Education {index + 1}</h4>
                        {educationEntries.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeEducationEntry(entry.id)}
                            icon={FaTrash}
                            className="th-remove-btn"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="th-form-grid">
                        <div className="th-form-group">
                          <label className="th-form-label">Institution</label>
                          <select
                            value={entry.institution}
                            onChange={(e) => {
                              const newEntries = [...educationEntries];
                              newEntries[index].institution = e.target.value;
                              setEducationEntries(newEntries);
                            }}
                            className="th-form-select"
                          >
                            <option value="">Select institution</option>
                            {NIGERIAN_INSTITUTIONS.map(institution => (
                              <option key={institution} value={institution}>{institution}</option>
                            ))}
                            <option value="Other">Other (specify in qualification field)</option>
                          </select>
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Qualification</label>
                          <select
                            value={entry.qualification}
                            onChange={(e) => {
                              const newEntries = [...educationEntries];
                              newEntries[index].qualification = e.target.value;
                              setEducationEntries(newEntries);
                            }}
                            className="th-form-select"
                          >
                            <option value="">Select qualification</option>
                            {NIGERIAN_QUALIFICATIONS.map(qualification => (
                              <option key={qualification} value={qualification}>{qualification}</option>
                            ))}
                          </select>
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Field of Study</label>
                          <input
                            type="text"
                            value={entry.field_of_study}
                            onChange={(e) => {
                              const newEntries = [...educationEntries];
                              newEntries[index].field_of_study = e.target.value;
                              setEducationEntries(newEntries);
                            }}
                            className="th-form-input"
                            placeholder="e.g., Social Work, Education, Medicine"
                          />
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Year Completed</label>
                          <input
                            type="number"
                            value={entry.year_completed}
                            onChange={(e) => {
                              const newEntries = [...educationEntries];
                              newEntries[index].year_completed = e.target.value;
                              setEducationEntries(newEntries);
                            }}
                            className="th-form-input"
                            placeholder="e.g., 2020"
                            min="1970"
                            max={new Date().getFullYear()}
                          />
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Grade/Class</label>
                          <input
                            type="text"
                            value={entry.grade}
                            onChange={(e) => {
                              const newEntries = [...educationEntries];
                              newEntries[index].grade = e.target.value;
                              setEducationEntries(newEntries);
                            }}
                            className="th-form-input"
                            placeholder="e.g., First Class, Distinction, Second Class Upper"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certifications Section */}
                <div className="th-form-section">
                  <div className="th-section-header">
                    <h3 className="th-section-title">Professional Certifications</h3>
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addCertificationEntry}
                      icon={FaPlus}
                    >
                      Add Certification
                    </Button>
                  </div>

                  {certificationEntries.map((entry, index) => (
                    <div key={entry.id} className="th-dynamic-entry">
                      <div className="th-entry-header">
                        <h4 className="th-entry-title">Certification {index + 1}</h4>
                        {certificationEntries.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCertificationEntry(entry.id)}
                            icon={FaTrash}
                            className="th-remove-btn"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="th-form-grid">
                        <div className="th-form-group">
                          <label className="th-form-label">Certification Name</label>
                          <input
                            type="text"
                            value={entry.name}
                            onChange={(e) => {
                              const newEntries = [...certificationEntries];
                              newEntries[index].name = e.target.value;
                              setCertificationEntries(newEntries);
                            }}
                            className="th-form-input"
                            placeholder="e.g., Licensed Social Worker"
                          />
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Issuing Organization</label>
                          <input
                            type="text"
                            value={entry.issuing_organization}
                            onChange={(e) => {
                              const newEntries = [...certificationEntries];
                              newEntries[index].issuing_organization = e.target.value;
                              setCertificationEntries(newEntries);
                            }}
                            className="th-form-input"
                            placeholder="e.g., Association of Social Workers of Nigeria"
                          />
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Issue Date</label>
                          <input
                            type="date"
                            value={entry.issue_date}
                            onChange={(e) => {
                              const newEntries = [...certificationEntries];
                              newEntries[index].issue_date = e.target.value;
                              setCertificationEntries(newEntries);
                            }}
                            className="th-form-input"
                          />
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Expiry Date</label>
                          <input
                            type="date"
                            value={entry.expiry_date}
                            onChange={(e) => {
                              const newEntries = [...certificationEntries];
                              newEntries[index].expiry_date = e.target.value;
                              setCertificationEntries(newEntries);
                            }}
                            className="th-form-input"
                          />
                          <small className="th-form-help">Leave blank if certification doesn't expire</small>
                        </div>

                        <div className="th-form-group">
                          <label className="th-form-label">Certificate Number</label>
                          <input
                            type="text"
                            value={entry.certificate_number}
                            onChange={(e) => {
                              const newEntries = [...certificationEntries];
                              newEntries[index].certificate_number = e.target.value;
                              setCertificationEntries(newEntries);
                            }}
                            className="th-form-input"
                            placeholder="Certificate/License number"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Emergency Contact */}
          {currentStep === 5 && (
            <div className="th-form-step">
              <div className="th-step-header">
                <h2 className="th-step-title">Emergency Contact & References</h2>
                <p className="th-step-description">Provide emergency contact and reference information</p>
              </div>

              <div className="th-form-content">
                <div className="th-form-section">
                  <h3 className="th-section-title">Emergency Contact</h3>
                  <div className="th-form-grid">
                    <div className="th-form-group">
                      <label className="th-form-label">
                        Contact Name <span className="th-required">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('emergency_contact.name', { required: 'Emergency contact name is required' })}
                        className={`th-form-input ${errors.emergency_contact?.name ? 'error' : ''}`}
                        placeholder="Enter contact name"
                      />
                      {errors.emergency_contact?.name && (
                        <span className="th-error-message">{errors.emergency_contact.name.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        Relationship <span className="th-required">*</span>
                      </label>
                      <select
                        {...register('emergency_contact.relationship', { required: 'Relationship is required' })}
                        className={`th-form-select ${errors.emergency_contact?.relationship ? 'error' : ''}`}
                      >
                        <option value="">Select relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                        <option value="Relative">Relative</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.emergency_contact?.relationship && (
                        <span className="th-error-message">{errors.emergency_contact.relationship.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">
                        Phone Number <span className="th-required">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register('emergency_contact.phone', { 
                          required: 'Emergency contact phone is required',
                          pattern: {
                            value: /^\+234[0-9]{10}$/,
                            message: 'Phone number must be in format +234XXXXXXXXXX'
                          }
                        })}
                        className={`th-form-input ${errors.emergency_contact?.phone ? 'error' : ''}`}
                        placeholder="+234XXXXXXXXXX"
                      />
                      {errors.emergency_contact?.phone && (
                        <span className="th-error-message">{errors.emergency_contact.phone.message}</span>
                      )}
                    </div>

                    <div className="th-form-group th-form-group-full">
                      <label className="th-form-label">Address</label>
                      <input
                        type="text"
                        {...register('emergency_contact.address')}
                        className="th-form-input"
                        placeholder="Enter emergency contact address"
                      />
                    </div>
                  </div>
                </div>

                <div className="th-form-section">
                  <h3 className="th-section-title">Bank Details</h3>
                  <div className="th-form-grid">
                    <div className="th-form-group">
                      <label className="th-form-label">Bank Name</label>
                      <select
                        {...register('bank_details.bank_name')}
                        className="th-form-select"
                      >
                        <option value="">Select bank</option>
                        <option value="Access Bank">Access Bank</option>
                        <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                        <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
                        <option value="United Bank for Africa">United Bank for Africa</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="Fidelity Bank">Fidelity Bank</option>
                        <option value="Union Bank">Union Bank</option>
                        <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
                        <option value="Sterling Bank">Sterling Bank</option>
                        <option value="Wema Bank">Wema Bank</option>
                      </select>
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">Account Number</label>
                      <input
                        type="text"
                        {...register('bank_details.account_number', {
                          pattern: {
                            value: /^\d{10}$/,
                            message: 'Account number must be 10 digits'
                          }
                        })}
                        className={`th-form-input ${errors.bank_details?.account_number ? 'error' : ''}`}
                        placeholder="Enter 10-digit account number"
                        maxLength="10"
                      />
                      {errors.bank_details?.account_number && (
                        <span className="th-error-message">{errors.bank_details.account_number.message}</span>
                      )}
                    </div>

                    <div className="th-form-group">
                      <label className="th-form-label">Account Name</label>
                      <input
                        type="text"
                        {...register('bank_details.account_name')}
                        className="th-form-input"
                        placeholder="Enter account holder name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {currentStep === 6 && (
            <div className="th-form-step">
              <div className="th-step-header">
                <h2 className="th-step-title">Review & Submit</h2>
                <p className="th-step-description">Please review all information before submitting</p>
              </div>

              <div className="th-form-content">
                <div className="th-review-sections">
                  {/* Personal Information Review */}
                  <div className="th-review-section">
                    <div className="th-review-header">
                      <h3 className="th-review-title">
                        <FaUser className="th-review-icon" />
                        Personal Information
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(1)}
                        icon={FaEdit}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="th-review-content">
                      <div className="th-review-grid">
                        <div className="th-review-item">
                          <span className="th-review-label">Full Name:</span>
                          <span className="th-review-value">
                            {getValues('first_name')} {getValues('middle_name')} {getValues('last_name')}
                          </span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Date of Birth:</span>
                          <span className="th-review-value">
                            {getValues('date_of_birth') && format(new Date(getValues('date_of_birth')), 'MMMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Gender:</span>
                          <span className="th-review-value">{getValues('gender')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Marital Status:</span>
                          <span className="th-review-value">{getValues('marital_status')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">State of Origin:</span>
                          <span className="th-review-value">{getValues('state_of_origin')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">NIN:</span>
                          <span className="th-review-value">{getValues('nin')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Review */}
                  <div className="th-review-section">
                    <div className="th-review-header">
                      <h3 className="th-review-title">
                        <FaPhone className="th-review-icon" />
                        Contact Information
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(2)}
                        icon={FaEdit}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="th-review-content">
                      <div className="th-review-grid">
                        <div className="th-review-item">
                          <span className="th-review-label">Phone:</span>
                          <span className="th-review-value">{getValues('phone')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Email:</span>
                          <span className="th-review-value">{getValues('email')}</span>
                        </div>
                        <div className="th-review-item th-review-item-full">
                          <span className="th-review-label">Address:</span>
                          <span className="th-review-value">
                            {getValues('address.street')}, {getValues('address.city')}, {getValues('address.state')} {getValues('address.postal_code')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Employment Information Review */}
                  <div className="th-review-section">
                    <div className="th-review-header">
                      <h3 className="th-review-title">
                        <FaBriefcase className="th-review-icon" />
                        Employment Information
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(3)}
                        icon={FaEdit}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="th-review-content">
                      <div className="th-review-grid">
                        <div className="th-review-item">
                          <span className="th-review-label">Position:</span>
                          <span className="th-review-value">{getValues('position')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Department:</span>
                          <span className="th-review-value">{getValues('department')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Hire Date:</span>
                          <span className="th-review-value">
                            {getValues('hire_date') && format(new Date(getValues('hire_date')), 'MMMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Employment Status:</span>
                          <span className="th-review-value">{getValues('employment_status')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">System Role:</span>
                          <span className="th-review-value">
                            {STAFF_ROLES[getValues('role')]?.label}
                          </span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Monthly Salary:</span>
                          <span className="th-review-value">
                            ₦{Number(getValues('salary')).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education Summary */}
                  {educationEntries.some(entry => entry.institution && entry.qualification) && (
                    <div className="th-review-section">
                      <div className="th-review-header">
                        <h3 className="th-review-title">
                          <FaGraduationCap className="th-review-icon" />
                          Education ({educationEntries.filter(entry => entry.institution && entry.qualification).length})
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentStep(4)}
                          icon={FaEdit}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="th-review-content">
                        {educationEntries
                          .filter(entry => entry.institution && entry.qualification)
                          .map((entry, index) => (
                            <div key={entry.id} className="th-education-review">
                              <h4 className="th-education-title">{entry.qualification}</h4>
                              <p className="th-education-details">
                                {entry.institution} • {entry.field_of_study} • {entry.year_completed}
                                {entry.grade && ` • ${entry.grade}`}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Emergency Contact Review */}
                  <div className="th-review-section">
                    <div className="th-review-header">
                      <h3 className="th-review-title">
                        <FaShieldAlt className="th-review-icon" />
                        Emergency Contact
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(5)}
                        icon={FaEdit}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="th-review-content">
                      <div className="th-review-grid">
                        <div className="th-review-item">
                          <span className="th-review-label">Contact Name:</span>
                          <span className="th-review-value">{getValues('emergency_contact.name')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Relationship:</span>
                          <span className="th-review-value">{getValues('emergency_contact.relationship')}</span>
                        </div>
                        <div className="th-review-item">
                          <span className="th-review-label">Phone:</span>
                          <span className="th-review-value">{getValues('emergency_contact.phone')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submission Confirmation */}
                <div className="th-submission-notice">
                  <div className="th-notice-content">
                    <FaInfoCircle className="th-notice-icon" />
                    <div className="th-notice-text">
                      <h4>Ready to Submit</h4>
                      <p>
                        By submitting this form, you confirm that all information provided is accurate and complete. 
                        The staff member will be added to the system and can begin using their account immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Navigation */}
        <div className="th-form-navigation">
          <div className="th-nav-left">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                icon={FaArrowLeft}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
          </div>

          <div className="th-nav-center">
            <span className="th-step-indicator">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <div className="th-nav-right">
            {currentStep < 6 ? (
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                icon={FaArrowRight}
                disabled={isSubmitting}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                icon={isSubmitting ? FaSpinner : FaSave}
                disabled={isSubmitting}
                className={isSubmitting ? 'loading' : ''}
              >
                {isSubmitting ? 'Creating Staff Member...' : 'Create Staff Member'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;