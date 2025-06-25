// src/utils/helpers.js

/**
 * Format file size in bytes to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  /**
   * Format Nigerian phone number
   * @param {string} phone - Phone number
   * @returns {string} Formatted phone number
   */
  export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Handle Nigerian numbers
    if (digits.startsWith('234')) {
      // International format +234 xxx xxx xxxx
      return `+234 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
    } else if (digits.startsWith('0')) {
      // Local format 0xxx xxx xxxx
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    } else if (digits.length === 10) {
      // Assume missing leading 0
      return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    
    return phone; // Return original if can't format
  };
  
  /**
   * Calculate age from date of birth
   * @param {string} dateOfBirth - Date of birth in ISO format
   * @returns {number} Age in years
   */
  export const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  /**
   * Calculate BMI from height and weight
   * @param {number} heightCm - Height in centimeters
   * @param {number} weightKg - Weight in kilograms
   * @returns {number} BMI value
   */
  export const calculateBMI = (heightCm, weightKg) => {
    if (!heightCm || !weightKg) return null;
    
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    return Math.round(bmi * 10) / 10; // Round to 1 decimal place
  };
  
  /**
   * Get BMI category for children (simplified)
   * @param {number} bmi - BMI value
   * @param {number} age - Age in years
   * @returns {string} BMI category
   */
  export const getBMICategory = (bmi, age) => {
    if (!bmi || age < 2) return 'Unknown';
    
    // Simplified categories (real implementation would use percentile charts)
    if (bmi < 16) return 'Underweight';
    if (bmi < 18.5) return 'Normal weight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  /**
   * Format currency in Nigerian Naira
   * @param {number} amount - Amount in naira
   * @returns {string} Formatted currency
   */
  export const formatNaira = (amount) => {
    if (amount === null || amount === undefined) return '₦0.00';
    
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  /**
   * Generate unique child ID
   * @param {number} year - Year
   * @param {number} sequence - Sequence number
   * @returns {string} Formatted child ID
   */
  export const generateChildId = (year = new Date().getFullYear(), sequence) => {
    const paddedSequence = String(sequence).padStart(3, '0');
    return `TH-${year}-${paddedSequence}`;
  };
  
  /**
   * Generate unique staff ID
   * @param {number} sequence - Sequence number
   * @returns {string} Formatted staff ID
   */
  export const generateStaffId = (sequence) => {
    const year = new Date().getFullYear();
    const paddedSequence = String(sequence).padStart(3, '0');
    return `EMP-${year}-${paddedSequence}`;
  };
  
  /**
   * Validate Nigerian National Identification Number (NIN)
   * @param {string} nin - National Identification Number
   * @returns {boolean} Is valid NIN
   */
  export const validateNIN = (nin) => {
    if (!nin) return false;
    
    // Remove spaces and dashes
    const cleanNIN = nin.replace(/[\s-]/g, '');
    
    // NIN should be 11 digits
    return /^\d{11}$/.test(cleanNIN);
  };
  
  /**
   * Validate email address
   * @param {string} email - Email address
   * @returns {boolean} Is valid email
   */
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Format date for display
   * @param {string|Date} date - Date to format
   * @param {string} format - Format type ('short', 'long', 'medium')
   * @returns {string} Formatted date
   */
  export const formatDisplayDate = (date, format = 'medium') => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const options = {
      short: { month: 'short', day: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };
    
    return dateObj.toLocaleDateString('en-US', options[format] || options.medium);
  };
  
  /**
   * Get initials from full name
   * @param {string} fullName - Full name
   * @returns {string} Initials
   */
  export const getInitials = (fullName) => {
    if (!fullName) return '';
    
    return fullName
      .split(' ')
      .filter(name => name.length > 0)
      .map(name => name[0].toUpperCase())
      .join('')
      .slice(0, 3); // Max 3 initials
  };
  
  /**
   * Debounce function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Deep clone an object
   * @param {any} obj - Object to clone
   * @returns {any} Cloned object
   */
  export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  };
  
  /**
   * Capitalize first letter of each word
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  export const capitalizeWords = (str) => {
    if (!str) return '';
    
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  /**
   * Generate random color for avatars
   * @param {string} seed - Seed for consistent color generation
   * @returns {string} Hex color code
   */
  export const generateAvatarColor = (seed) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    
    if (!seed) return colors[0];
    
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  
  export default {
    formatFileSize,
    formatPhoneNumber,
    calculateAge,
    calculateBMI,
    getBMICategory,
    formatNaira,
    generateChildId,
    generateStaffId,
    validateNIN,
    validateEmail,
    formatDisplayDate,
    getInitials,
    debounce,
    deepClone,
    capitalizeWords,
    generateAvatarColor
  };