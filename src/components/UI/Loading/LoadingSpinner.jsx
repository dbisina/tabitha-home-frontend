import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'base', 
  color = 'primary', 
  className = '',
  text = null 
}) => {
  const sizeClass = `th-spinner-${size}`;
  const colorClass = `th-spinner-${color}`;
  
  const classes = [
    'th-loading-spinner',
    sizeClass,
    colorClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="th-spinner-container">
      <div className={classes}>
        <div className="th-spinner-ring"></div>
        <div className="th-spinner-ring"></div>
        <div className="th-spinner-ring"></div>
        <div className="th-spinner-ring"></div>
      </div>
      {text && <p className="th-spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;