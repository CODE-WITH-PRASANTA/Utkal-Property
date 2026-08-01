import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';

// Standard & Reliable React Icons (FontAwesome & Feather)
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaBuilding, 
  FaShieldAlt, 
  FaExclamationTriangle,
  FaSpinner 
} from 'react-icons/fa';

import './LogIn.css';

const LogIn = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock bypass login check
    if (userId.trim().toLowerCase() === 'utkal' && password === '12345') {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({ username: 'utkal', role: 'Super Admin', isMock: true });
      }
      return;
    }

    // AWS Cognito Login
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: userId,
        password: password,
      });

      if (isSignedIn) {
        if (onLoginSuccess) {
          onLoginSuccess({ username: userId, role: 'Admin', isMock: false });
        }
      } else if (nextStep && nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        setError('New password required. Please reset password.');
      } else {
        setError('Additional authentication steps required.');
      }
    } catch (err) {
      console.error('AWS Auth Error:', err);
      if (err.name === 'UserNotFoundException' || err.name === 'NotAuthorizedException') {
        setError('Invalid User ID or Password.');
      } else if (err.name === 'UserNotConfirmedException') {
        setError('Account is not confirmed yet.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ul-page-container">
      {/* Background Decorative Blobs */}
      <div className="ul-bg-blob blob-1"></div>
      <div className="ul-bg-blob blob-2"></div>

      <div className="ul-login-card">
        {/* Header Branding */}
        <div className="ul-brand-section">
          <div className="ul-logo-badge">
            <FaBuilding className="ul-logo-icon" />
          </div>
          <h1 className="ul-brand-title">UTKAL PROPERTY</h1>
        </div>

        {/* Login Form Body */}
        <form className="ul-form" onSubmit={handleSubmit}>
          <div className="ul-form-header">
            <h2>Welcome Back</h2>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="ul-error-container">
              <FaExclamationTriangle className="ul-error-icon" />
              <p className="ul-error-text">{error}</p>
            </div>
          )}

          {/* User ID Field */}
          <div className="ul-input-group">
            <label className="ul-label" htmlFor="userId">User ID / Email</label>
            <div className="ul-input-wrapper">
              <FaUser className="ul-input-icon" />
              <input
                type="text"
                id="userId"
                className="ul-input-field"
                placeholder="e.g. utkal"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="ul-input-group">
            <label className="ul-label" htmlFor="password">Password</label>
            <div className="ul-input-wrapper">
              <FaLock className="ul-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="ul-input-field password-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="ul-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Utility Checklist */}
          <div className="ul-form-utilities">
            <label className="ul-remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="ul-checkbox"
                disabled={isLoading}
              />
              <span>Remember session</span>
            </label>
            <a href="#forgot" className="ul-forgot-link" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>
          </div>

          {/* Submit Action Button */}
          <button 
            type="submit" 
            className="ul-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="ul-btn-spinner" />
                <span>Authenticating...</span>
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Security Footer */}
        <div className="ul-card-footer">
          <FaShieldAlt className="ul-footer-icon" />
          <span>Secured with SSL Encrypted Portal Access</span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;