import React, { useState } from 'react';
import './Setting.css';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for General Settings
  const [formData, setFormData] = useState({
    siteName: 'Utkal Estate',
    siteEmail: 'support@utkalestate.com',
    sitePhone: '+91 98765 43210',
    address: '123, Real Estate Street, Bhubaneswar, Odisha, India',
    currency: 'INR - Indian Rupee (₹)',
    timezone: '(GMT+05:30) India Standard Time',
  });

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@utkalestate.com',
    phone: '+91 98765 43210',
    bio: 'System Administrator at Utkal Estate.',
  });

  // Security Settings State
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
  });

  // Modal Specific State
  const [modalFormData, setModalFormData] = useState({ ...formData });

  // Notification Toggles State
  const [notifications, setNotifications] = useState({
    newEnquiry: true,
    bookingAlerts: true,
    userRegistration: false,
    systemUpdates: true,
    marketingEmails: false,
  });

  const sidebarTabs = ['General', 'Profile', 'Security', 'Notifications'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert(`${activeTab} settings saved successfully!`);
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    setFormData({ ...modalFormData });
    setIsModalOpen(false);
    alert('General settings updated via modal!');
  };

  const openEditModal = () => {
    setModalFormData({ ...formData });
    setIsModalOpen(true);
  };

  // Render content dynamically based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <>
            <div className="setting-card">
              <div className="setting-card__header">
                <h2 className="setting-card__title">General Settings</h2>
              </div>

              <form id="main-settings-form" onSubmit={handleSaveSettings}>
                {/* Site Information Section */}
                <div className="setting-section">
                  <h3 className="setting-section__title">Site Information</h3>
                  <div className="form-grid form-grid--3">
                    <div className="form-group">
                      <label>Site Name</label>
                      <input
                        type="text"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Site Email</label>
                      <input
                        type="email"
                        name="siteEmail"
                        value={formData.siteEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Site Phone</label>
                      <input
                        type="text"
                        name="sitePhone"
                        value={formData.sitePhone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="setting-section">
                  <h3 className="setting-section__title">Address</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Currency & Timezone Section */}
                <div className="setting-section">
                  <div className="form-grid form-grid--2">
                    <div className="form-group">
                      <label>Currency</label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                      >
                        <option value="INR - Indian Rupee (₹)">INR - Indian Rupee (₹)</option>
                        <option value="USD - US Dollar ($)">USD - US Dollar ($)</option>
                        <option value="EUR - Euro (€)">EUR - Euro (€)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timezone</label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                      >
                        <option value="(GMT+05:30) India Standard Time">(GMT+05:30) India Standard Time</option>
                        <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                        <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Lower Widgets Grid */}
            <div className="setting-grid-bottom">
              <div className="setting-card">
                <h2 className="setting-card__title">System Overview</h2>
                <div className="overview-list">
                  <div className="overview-item">
                    <span className="overview-item__label">Total Users</span>
                    <span className="overview-item__value">12</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-item__label">Total Properties</span>
                    <span className="overview-item__value">156</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-item__label">Total Enquiries</span>
                    <span className="overview-item__value">28</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-item__label">Total Bookings</span>
                    <span className="overview-item__value">45</span>
                  </div>
                </div>

                <div className="storage-box">
                  <div className="storage-box__header">
                    <span className="storage-box__title">Storage Usage</span>
                    <span className="storage-box__percent">45%</span>
                  </div>
                  <div className="storage-progress">
                    <div className="storage-progress__fill" style={{ width: '45%' }}></div>
                  </div>
                  <span className="storage-box__subtext">4.5 GB of 10 GB used</span>
                </div>
              </div>

              <div className="setting-card">
                <h2 className="setting-card__title">Notification Preferences</h2>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <span>New Enquiry Alerts</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.newEnquiry}
                        onChange={() => handleToggleChange('newEnquiry')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Booking Alerts</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.bookingAlerts}
                        onChange={() => handleToggleChange('bookingAlerts')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>User Registration Alerts</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.userRegistration}
                        onChange={() => handleToggleChange('userRegistration')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>System Updates</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.systemUpdates}
                        onChange={() => handleToggleChange('systemUpdates')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Marketing Emails</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={() => handleToggleChange('marketingEmails')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'Profile':
        return (
          <div className="setting-card">
            <div className="setting-card__header">
              <h2 className="setting-card__title">Admin Profile Settings</h2>
            </div>
            <form id="main-settings-form" onSubmit={handleSaveSettings}>
              <div className="setting-section">
                <div className="form-grid form-grid--2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    rows="3"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                  />
                </div>
              </div>
            </form>
          </div>
        );

      case 'Security':
        return (
          <div className="setting-card">
            <div className="setting-card__header">
              <h2 className="setting-card__title">Security Settings</h2>
            </div>
            <form id="main-settings-form" onSubmit={handleSaveSettings}>
              <div className="setting-section">
                <h3 className="setting-section__title">Change Password</h3>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="form-grid form-grid--2">
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <div className="setting-section">
                <h3 className="setting-section__title">Two-Factor Authentication</h3>
                <div className="toggle-item">
                  <span>Enable 2FA Verification for Login</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={securityData.twoFactorAuth}
                      onChange={handleSecurityChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        );

      case 'Notifications':
        return (
          <div className="setting-card">
            <div className="setting-card__header">
              <h2 className="setting-card__title">Notification Preferences</h2>
            </div>
            <form id="main-settings-form" onSubmit={handleSaveSettings}>
              <div className="setting-section">
                <div className="toggle-list">
                  <div className="toggle-item">
                    <span>New Enquiry Alerts</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.newEnquiry}
                        onChange={() => handleToggleChange('newEnquiry')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Booking Alerts</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.bookingAlerts}
                        onChange={() => handleToggleChange('bookingAlerts')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>User Registration Alerts</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.userRegistration}
                        onChange={() => handleToggleChange('userRegistration')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>System Updates</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.systemUpdates}
                        onChange={() => handleToggleChange('systemUpdates')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Marketing Emails</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={() => handleToggleChange('marketingEmails')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="setting-container">
      {/* Header */}
      <div className="setting-header">
        <div>
          <h1 className="setting-header__title">Settings</h1>
          <p className="setting-header__subtitle">
            Manage your system preferences and configurations.
          </p>
        </div>
        <div className="setting-header__actions">
          {activeTab === 'General' && (
            <button
              type="button"
              className="setting-btn setting-btn--secondary"
              onClick={openEditModal}
            >
              Quick Edit Modal
            </button>
          )}
          <button
            type="submit"
            form="main-settings-form"
            className="setting-btn setting-btn--primary"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="setting-layout">
        {/* Navigation Sidebar */}
        <aside className="setting-sidebar">
          <nav className="setting-nav">
            {sidebarTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`setting-nav__item ${
                  activeTab === tab ? 'setting-nav__item--active' : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="setting-content">
          {renderTabContent()}
        </main>
      </div>

      {/* Popup Form Modal */}
      {isModalOpen && (
        <div className="setting-modal-backdrop">
          <div className="setting-modal">
            <div className="setting-modal__header">
              <h2 className="setting-modal__title">General Settings</h2>
              <button
                type="button"
                className="setting-modal__close"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleModalSave}>
              <div className="setting-modal__body">
                <div className="form-group">
                  <label>Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={modalFormData.siteName}
                    onChange={handleModalInputChange}
                  />
                </div>

                <div className="form-grid form-grid--2">
                  <div className="form-group">
                    <label>Site Email</label>
                    <input
                      type="email"
                      name="siteEmail"
                      value={modalFormData.siteEmail}
                      onChange={handleModalInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Site Phone</label>
                    <input
                      type="text"
                      name="sitePhone"
                      value={modalFormData.sitePhone}
                      onChange={handleModalInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={modalFormData.address}
                    onChange={handleModalInputChange}
                  />
                </div>

                <div className="form-grid form-grid--2">
                  <div className="form-group">
                    <label>Currency</label>
                    <select
                      name="currency"
                      value={modalFormData.currency}
                      onChange={handleModalInputChange}
                    >
                      <option value="INR - Indian Rupee (₹)">INR - Indian Rupee (₹)</option>
                      <option value="USD - US Dollar ($)">USD - US Dollar ($)</option>
                      <option value="EUR - Euro (€)">EUR - Euro (€)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Timezone</label>
                    <select
                      name="timezone"
                      value={modalFormData.timezone}
                      onChange={handleModalInputChange}
                    >
                      <option value="(GMT+05:30) India Standard Time">(GMT+05:30) India Standard Time</option>
                      <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                      <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="setting-modal__footer">
                <button
                  type="button"
                  className="setting-btn setting-btn--cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="setting-btn setting-btn--primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;