import React, { useState } from 'react';
import './DashboardProfile.css';

// Import your local avatar image here
import defaultAvatar from '../../assets/author-dashboard-profile2.webp'; // Update filename if needed

const DashboardProfile = () => {
  // State management
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const [selectedFileName, setSelectedFileName] = useState('No files selected');
  
  // Input fields state
  const [fullName, setFullName] = useState('Ralph Edwards');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Bhubaneswar, Odisha');
  const [socialUrl, setSocialUrl] = useState('');

  // Handle avatar image selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      description,
      company,
      job,
      email,
      phone,
      location,
      socialUrl,
    };
    console.log('Form Data Saved:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="DashboardProfile">
      <h1 className="DashboardProfile-main-title">Add properties</h1>

      <form className="DashboardProfile-form" onSubmit={handleSubmit}>
        {/* Avatar Section */}
        <div className="DashboardProfile-card">
          <h2 className="DashboardProfile-section-title">Avatar</h2>
          <div className="DashboardProfile-avatar-wrapper">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="DashboardProfile-avatar-img"
            />
            <div className="DashboardProfile-avatar-controls">
              <label className="DashboardProfile-avatar-label">Upload a new avatar"</label>
              <div className="DashboardProfile-file-input-group">
                <label htmlFor="avatar-upload" className="DashboardProfile-btn-blue">
                  Choose file
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleAvatarChange}
                  hidden
                />
                <span className="DashboardProfile-file-name">{selectedFileName}</span>
              </div>
              <span className="DashboardProfile-subtext">JPEG 100x100</span>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="DashboardProfile-card">
          <h2 className="DashboardProfile-section-title">Infomation</h2>

          {/* Full Name with Suggestions */}
          <div className="DashboardProfile-field-group">
            <label className="DashboardProfile-label">Full name</label>
            <input
              type="text"
              className="DashboardProfile-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              list="name-suggestions"
              autoComplete="on"
            />
            <datalist id="name-suggestions">
              <option value="Ralph Edwards" />
              <option value="Alexander Pierce" />
              <option value="Jane Doe" />
              <option value="John Smith" />
            </datalist>
          </div>

          {/* Clean Description Section (Matches reference page exact style) */}
          <div className="DashboardProfile-field-group">
            <label className="DashboardProfile-label">Description</label>
            <textarea
              className="DashboardProfile-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write description here..."
              rows={5}
            />
          </div>

          {/* Grid Layout for Company, Job, Email, Phone */}
          <div className="DashboardProfile-grid-4">
            {/* Your Company Select */}
            <div className="DashboardProfile-field-group">
              <label className="DashboardProfile-label">Your company</label>
              <select
                className="DashboardProfile-select"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Tech Mahindra">Tech Mahindra</option>
              </select>
            </div>

            {/* Job Select */}
            <div className="DashboardProfile-field-group">
              <label className="DashboardProfile-label">Job</label>
              <select
                className="DashboardProfile-select"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            {/* Email Address with Suggestions */}
            <div className="DashboardProfile-field-group">
              <label className="DashboardProfile-label">Email address</label>
              <input
                type="email"
                className="DashboardProfile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Choose or type email"
                list="email-suggestions"
                autoComplete="on"
              />
              <datalist id="email-suggestions">
                <option value="ralph.edwards@example.com" />
                <option value="ralph.dev@gmail.com" />
                <option value="contact@domain.com" />
                <option value="work@company.org" />
              </datalist>
            </div>

            {/* Your Phone with Suggestions */}
            <div className="DashboardProfile-field-group">
              <label className="DashboardProfile-label">Your phone</label>
              <input
                type="tel"
                className="DashboardProfile-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Choose or type phone"
                list="phone-suggestions"
                autoComplete="on"
              />
              <datalist id="phone-suggestions">
                <option value="+91 98765 43210" />
                <option value="+91 91234 56789" />
                <option value="+1 (555) 019-2834" />
              </datalist>
            </div>
          </div>

          {/* Location Section */}
          <div className="DashboardProfile-field-group DashboardProfile-location-section">
            <label className="DashboardProfile-label">Location</label>
            <input
              type="text"
              className="DashboardProfile-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              list="location-suggestions"
            />
            <datalist id="location-suggestions">
              <option value="Bhubaneswar, Odisha" />
              <option value="Cuttack, Odisha" />
              <option value="Bengaluru, Karnataka" />
              <option value="Mumbai, Maharashtra" />
            </datalist>

            {/* Dynamic Embedded Map */}
            <div className="DashboardProfile-map-container">
              <iframe
                title="Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  location || 'Bhubaneswar'
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Socials Section */}
          <div className="DashboardProfile-field-group">
            <label className="DashboardProfile-label">Socials</label>
            <input
              type="text"
              className="DashboardProfile-input DashboardProfile-input-social"
              value={socialUrl}
              onChange={(e) => setSocialUrl(e.target.value)}
              placeholder="url"
            />
          </div>

          {/* Save Action Button */}
          <div className="DashboardProfile-action-row">
            <button type="submit" className="DashboardProfile-btn-save">
              Save & Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;