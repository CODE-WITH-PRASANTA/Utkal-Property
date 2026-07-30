import React, { useState, useRef, useEffect } from 'react';
import { 
  FiUser, 
  FiLock, 
  FiShield, 
  FiSliders, 
  FiCamera, 
  FiUpload, 
  FiTrash2, 
  FiCheckCircle, 
  FiChevronRight, 
  FiLogOut
} from 'react-icons/fi';
import './ProfileSetting.css';

const ProfileSetting = () => {
  // --- Navigation & Modal State ---
  const [activeTab, setActiveTab] = useState('profile');
  const [toastMessage, setToastMessage] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // --- Profile Image State ---
  const [profileImage, setProfileImage] = useState('');

  // --- Personal Information State ---
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    gender: '',
    dob: '',
    language: '',
    country: '',
    address: ''
  });

  // --- Social Links State ---
  const [socialLinks, setSocialLinks] = useState({
    website: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: ''
  });

  // --- Field Auto-Suggestion State ---
  const [activeFieldSuggestion, setActiveFieldSuggestion] = useState(null);
  const suggestionBoxRef = useRef(null);

  // Suggestions Dictionary
  const fieldSuggestions = {
    designation: [
      'Software Engineer',
      'Frontend Developer',
      'Full Stack Developer',
      'UI/UX Designer',
      'Product Manager',
      'System Administrator'
    ],
    language: ['English', 'Odia', 'Hindi', 'Spanish', 'French', 'German'],
    country: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'],
    address: [
      'Bhubaneswar, Odisha, India',
      'Cuttack, Odisha, India',
      'Bengaluru, Karnataka, India',
      'Hyderabad, Telangana, India',
      'Mumbai, Maharashtra, India'
    ]
  };

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
        setActiveFieldSuggestion(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper for Toast Notifications
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Image Handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        showToast("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('');
    showToast("Profile picture removed.");
  };

  // Form Submit Handlers
  const handleSavePersonalInfo = (e) => {
    e.preventDefault();
    showToast("Personal information saved successfully!");
  };

  const handleSaveSocialLinks = (e) => {
    e.preventDefault();
    showToast("Social links updated!");
  };

  // Apply Suggestion
  const handleSelectSuggestion = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
    setActiveFieldSuggestion(null);
  };

  return (
    <div className="profile-settings-wrapper">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="toast-notification">
          <FiCheckCircle /> {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="page-header">
        <h1 className="header-title">Profile Settings</h1>
        <p className="header-subtitle">Manage your personal information and account settings.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="settings-tab-bar">
        <button
          className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FiUser className="tab-icon" /> Profile
        </button>
        <button
          className={`tab-item ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          <FiLock className="tab-icon" /> Change Password
        </button>
        <button
          className={`tab-item ${activeTab === '2fa' ? 'active' : ''}`}
          onClick={() => setActiveTab('2fa')}
        >
          <FiShield className="tab-icon" /> Two Factor Auth
        </button>
        <button
          className={`tab-item ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <FiSliders className="tab-icon" /> Account Preferences
        </button>
      </div>

      {/* ==================== TAB 1: PROFILE VIEW ==================== */}
      {activeTab === 'profile' && (
        <div className="tab-content-container">
          <div className="profile-main-grid">
            
            {/* Left Box: Profile Picture */}
            <div className="card-box profile-picture-card">
              <h2 className="card-heading">Profile Picture</h2>
              <div className="avatar-upload-wrapper">
                <div className="avatar-container">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile Avatar" className="avatar-img" />
                  ) : (
                    <div className="avatar-placeholder">
                      <FiUser />
                    </div>
                  )}
                  <label htmlFor="avatar-file-input" className="avatar-badge-btn" title="Upload Photo">
                    <FiCamera />
                  </label>
                  <input
                    id="avatar-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <span className="file-hint-text">JPG, PNG or GIF. Max size of 2MB</span>
                <label htmlFor="avatar-file-input" className="btn-upload-photo">
                  <FiUpload /> Upload New Photo
                </label>
                {profileImage && (
                  <button className="btn-remove-photo" type="button" onClick={handleRemoveImage}>
                    Remove Photo
                  </button>
                )}
              </div>
            </div>

            {/* Middle Box: Personal Information with Interactive Suggestions */}
            <div className="card-box personal-info-card" ref={suggestionBoxRef}>
              <h2 className="card-heading">Personal Information</h2>
              <form onSubmit={handleSavePersonalInfo} className="form-grid-2col">
                
                {/* Full Name */}
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  />
                </div>

                {/* Email Address */}
                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  />
                </div>

                {/* Phone Number */}
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                </div>

                {/* Designation (with Suggestions) */}
                <div className="input-group relative-field">
                  <label>Designation</label>
                  <input
                    type="text"
                    placeholder="Select or type designation"
                    value={personalInfo.designation}
                    onFocus={() => setActiveFieldSuggestion('designation')}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, designation: e.target.value })}
                  />
                  {activeFieldSuggestion === 'designation' && (
                    <ul className="suggestions-dropdown">
                      <li className="suggestion-header">Suggestions</li>
                      {fieldSuggestions.designation.map((item, idx) => (
                        <li key={idx} onClick={() => handleSelectSuggestion('designation', item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Gender */}
                <div className="input-group">
                  <label>Gender</label>
                  <select
                    value={personalInfo.gender}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="input-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={personalInfo.dob}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                  />
                </div>

                {/* Language (with Suggestions) */}
                <div className="input-group relative-field">
                  <label>Language</label>
                  <input
                    type="text"
                    placeholder="Select or type language"
                    value={personalInfo.language}
                    onFocus={() => setActiveFieldSuggestion('language')}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, language: e.target.value })}
                  />
                  {activeFieldSuggestion === 'language' && (
                    <ul className="suggestions-dropdown">
                      <li className="suggestion-header">Suggestions</li>
                      {fieldSuggestions.language.map((item, idx) => (
                        <li key={idx} onClick={() => handleSelectSuggestion('language', item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Country (with Suggestions) */}
                <div className="input-group relative-field">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Select or type country"
                    value={personalInfo.country}
                    onFocus={() => setActiveFieldSuggestion('country')}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                  />
                  {activeFieldSuggestion === 'country' && (
                    <ul className="suggestions-dropdown">
                      <li className="suggestion-header">Suggestions</li>
                      {fieldSuggestions.country.map((item, idx) => (
                        <li key={idx} onClick={() => handleSelectSuggestion('country', item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Address (with Suggestions) */}
                <div className="input-group full-width relative-field">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Street address, City, State, Zip Code"
                    value={personalInfo.address}
                    onFocus={() => setActiveFieldSuggestion('address')}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  />
                  {activeFieldSuggestion === 'address' && (
                    <ul className="suggestions-dropdown">
                      <li className="suggestion-header">Suggestions</li>
                      {fieldSuggestions.address.map((item, idx) => (
                        <li key={idx} onClick={() => handleSelectSuggestion('address', item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Form Action */}
                <div className="form-action-row full-width">
                  <button type="submit" className="btn-save-changes">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column Stack */}
            <div className="right-cards-column">
              
              {/* Profile Completion Donut Ring */}
              <div className="card-box completion-card">
                <h2 className="card-heading">Profile Completion</h2>
                <div className="completion-content-row">
                  <div className="donut-chart-container">
                    <svg viewBox="0 0 36 36" className="donut-chart">
                      <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle-fill"
                        strokeDasharray="85, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="donut-text">
                      <span className="donut-percent">85%</span>
                      <span className="donut-label">Completed</span>
                    </div>
                  </div>

                  <div className="completion-checklist">
                    <div className="check-item">
                      <span className="dot dot-green"></span>
                      <span className="check-label">Basic Information</span>
                      <span className="check-val val-green">5/5</span>
                    </div>
                    <div className="check-item">
                      <span className="dot dot-teal"></span>
                      <span className="check-label">Contact Details</span>
                      <span className="check-val val-teal">3/3</span>
                    </div>
                    <div className="check-item">
                      <span className="dot dot-emerald"></span>
                      <span className="check-label">Security Settings</span>
                      <span className="check-val val-emerald">2/2</span>
                    </div>
                    <div className="check-item">
                      <span className="dot dot-amber"></span>
                      <span className="check-label">Preferences</span>
                      <span className="check-val val-amber">2/3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="card-box account-info-card">
                <h2 className="card-heading">Account Information</h2>
                <div className="account-details-list">
                  <div className="acc-item">
                    <span className="acc-label">User ID</span>
                    <span className="acc-val bold-text">ADM001</span>
                  </div>
                  <div className="acc-item">
                    <span className="acc-label">Role</span>
                    <span className="acc-val">Administrator</span>
                  </div>
                  <div className="acc-item">
                    <span className="acc-label">Member Since</span>
                    <span className="acc-val">January 2025</span>
                  </div>
                  <div className="acc-item">
                    <span className="acc-label">Status</span>
                    <span className="status-badge-active">Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Grid Row */}
          <div className="bottom-grid-row">
            
            {/* Contact & Social Links */}
            <div className="card-box social-links-card">
              <h2 className="card-heading">Contact & Social Links</h2>
              <form onSubmit={handleSaveSocialLinks} className="form-grid-3col">
                <div className="input-group">
                  <label>Website</label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={socialLinks.website}
                    onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Facebook</label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/username"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Twitter</label>
                  <input
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Instagram</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/username"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>YouTube</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@channel"
                    value={socialLinks.youtube}
                    onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  />
                </div>

                <div className="form-action-row full-width-3col">
                  <button type="submit" className="btn-save-changes">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Actions Panel */}
            <div className="card-box quick-actions-card">
              <h2 className="card-heading">Quick Actions</h2>
              <div className="quick-actions-list">
                
                <button className="quick-act-btn" onClick={() => setActiveTab('profile')}>
                  <div className="act-left">
                    <FiUser className="act-icon" />
                    <span>View My Profile</span>
                  </div>
                  <FiChevronRight className="act-arrow" />
                </button>

                <button className="quick-act-btn" onClick={() => setActiveTab('password')}>
                  <div className="act-left">
                    <FiLock className="act-icon" />
                    <span>Change Password</span>
                  </div>
                  <FiChevronRight className="act-arrow" />
                </button>

                <button className="quick-act-btn" onClick={() => setActiveTab('2fa')}>
                  <div className="act-left">
                    <FiShield className="act-icon" />
                    <span>Two Factor Authentication</span>
                  </div>
                  <FiChevronRight className="act-arrow" />
                </button>

                <button className="quick-act-btn" onClick={() => setActiveTab('preferences')}>
                  <div className="act-left">
                    <FiSliders className="act-icon" />
                    <span>Account Preferences</span>
                  </div>
                  <FiChevronRight className="act-arrow" />
                </button>

                <button className="quick-act-btn btn-logout" onClick={() => setShowLogoutModal(true)}>
                  <div className="act-left">
                    <FiLogOut className="act-icon danger" />
                    <span className="danger-text">Logout</span>
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TAB 2: CHANGE PASSWORD VIEW ==================== */}
      {activeTab === 'password' && (
        <div className="tab-content-container">
          <div className="card-box single-panel-card">
            <h2 className="card-heading">Change Password</h2>
            <form onSubmit={(e) => { e.preventDefault(); showToast("Password updated!"); }} className="password-form">
              <div className="input-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" required />
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" required />
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" required />
              </div>
              <div className="form-action-row">
                <button type="submit" className="btn-save-changes">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: TWO FACTOR AUTH VIEW ==================== */}
      {activeTab === '2fa' && (
        <div className="tab-content-container">
          <div className="card-box single-panel-card">
            <h2 className="card-heading">Two-Factor Authentication (2FA)</h2>
            <p className="card-desc-text">Secure your account with an extra security step.</p>
            <button className="btn-save-changes" onClick={() => showToast("2FA flow started!")}>
              Enable 2FA
            </button>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: PREFERENCES VIEW ==================== */}
      {activeTab === 'preferences' && (
        <div className="tab-content-container">
          <div className="card-box single-panel-card">
            <h2 className="card-heading">Account Preferences</h2>
            <div className="pref-row">
              <div>
                <h4>Email Notifications</h4>
                <p>Receive updates regarding account activity.</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-action-row">
              <button className="btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => {
                  setShowLogoutModal(false);
                  showToast("Logged out successfully!");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileSetting;