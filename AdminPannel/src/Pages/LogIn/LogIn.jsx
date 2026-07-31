import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import './LogIn.css';

const LogIn = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Status and Error states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 1. Reference check condition (ID: utkal / Password: 12345)
    if (userId.trim() === 'utkal' && password === '12345') {
      setIsLoading(false);
      alert('Reference login successful!');
      if (onLoginSuccess) onLoginSuccess({ username: 'utkal', isMock: true });
      return;
    }

    // 2. AWS Cognito Authentication fallback
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: userId,
        password: password,
      });

      if (isSignedIn) {
        alert('AWS Authentication successful!');
        if (onLoginSuccess) onLoginSuccess({ username: userId });
      } else if (nextStep && nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        setError('New password required. Please reset via AWS console.');
      } else {
        setError('Additional authentication steps required.');
      }
    } catch (err) {
      console.error('AWS Auth Error:', err);
      // Friendly messaging based on common Cognito exceptions
      if (err.name === 'UserNotFoundException' || err.name === 'NotAuthorizedException') {
        setError('Incorrect User ID or Password.');
      } else if (err.name === 'UserNotConfirmedException') {
        setError('This user account is not confirmed yet.');
      } else {
        setError(err.message || 'An error occurred during AWS authentication.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ul-page-container">
      <div className="ul-login-card">
        {/* Brand Header */}
        <div className="ul-brand-section">
          <div className="ul-logo-icon">🏢</div>
          <h1 className="ul-brand-title">Utkal Property</h1>
          <p className="ul-brand-subtitle">Admin Panel Portal Gateway</p>
        </div>

        {/* Login Form */}
        <form className="ul-form" onSubmit={handleSubmit}>
          <h2 className="ul-form-heading">Welcome Back</h2>
          <p className="ul-form-subheading">Please enter your credentials to access your account</p>

          {/* Error Alert Display block */}
          {error && (
            <div className="ul-error-container">
              <span className="ul-error-icon">⚠️</span>
              <p className="ul-error-text">{error}</p>
            </div>
          )}

          {/* User ID Field */}
          <div className="ul-input-group">
            <label className="ul-label" htmlFor="userId">User ID / Email</label>
            <div className="ul-input-wrapper">
              <span className="ul-input-icon">👤</span>
              <input
                type="text"
                id="userId"
                className="ul-input-field"
                placeholder="Enter your User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="ul-input-group">
            <label className="ul-label" htmlFor="password">Password</label>
            <div className="ul-input-wrapper">
              <span className="ul-input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="ul-input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="ul-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Utilities */}
          <div className="ul-form-utilities">
            <label className="ul-remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="ul-checkbox"
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="ul-forgot-link" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`ul-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Card Footer info */}
        <div className="ul-card-footer">
          <p>Protected by AWS Authentication Security</p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;