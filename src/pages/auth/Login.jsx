import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/UI/Button/Button';
import './Auth.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      // Error handling is done in the context
    }
  };

  return (
    <div className="th-auth-form th-fade-in">
      <div className="th-auth-header">
        <h2 className="th-auth-form-title">Welcome Back</h2>
        <p className="th-auth-form-subtitle">
          Sign in to continue managing Tabitha Home
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="th-auth-form-content">
        {error && (
          <div className="th-alert th-alert-error th-slide-up">
            <span>{error}</span>
          </div>
        )}

        <div className="th-form-group">
          <label className="th-label">Email Address</label>
          <div className="th-input-group">
            <FaUser className="th-input-icon" />
            <input
              type="email"
              className={`th-input th-input-with-icon ${errors.email ? 'th-input-error' : ''}`}
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
          </div>
          {errors.email && (
            <span className="th-error-text">{errors.email.message}</span>
          )}
        </div>

        <div className="th-form-group">
          <label className="th-label">Password</label>
          <div className="th-input-group">
            <FaLock className="th-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              className={`th-input th-input-with-icon ${errors.password ? 'th-input-error' : ''}`}
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            <button
              type="button"
              className="th-input-action"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span className="th-error-text">{errors.password.message}</span>
          )}
        </div>

        <div className="th-form-options">
          <label className="th-checkbox-container">
            <input type="checkbox" className="th-checkbox" />
            <span className="th-checkbox-label">Remember me</span>
          </label>
          <Link to="/auth/forgot-password" className="th-link">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!isValid}
          icon={<FaArrowRight />}
          iconPosition="right"
        >
          Sign In
        </Button>

        <div className="th-auth-divider">
          <span>or</span>
        </div>

        <div className="th-auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/auth/register" className="th-link th-link-primary">
              Create Account
            </Link>
          </p>
        </div>
      </form>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        fullWidth
        style={{ marginTop: '1rem' }}
        loading={isLoading}
        onClick={async () => {
          try {
            await login({ email: 'demo@tabitha.com', password: 'demopassword' });
            navigate(from, { replace: true });
          } catch (error) {
            // Error handling is done in the context
          }
        }}
      >
        Sign in as Demo User
      </Button>
    </div>
  );
};

export default Login;