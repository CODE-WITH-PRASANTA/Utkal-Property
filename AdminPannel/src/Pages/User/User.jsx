import React, { useState } from 'react';
import './User.css';

const initialUsers = [
  { id: 1, name: 'Alex Morgan', email: 'alex.morgan@gmail.com', role: 'Admin', status: 'Active', joined: '22 Mar 2023', avatar: 'https://i.pravatar.cc/150?img=11', phone: '' },
  { id: 2, name: 'Jason Smith', email: 'jason.smith@gmail.com', role: 'Manager', status: 'Active', joined: '18 Mar 2023', avatar: 'https://i.pravatar.cc/150?img=12', phone: '' },
  { id: 3, name: 'Priya Sharma', email: 'priya.sharma@gmail.com', role: 'Agent', status: 'Active', joined: '15 Mar 2023', avatar: 'https://i.pravatar.cc/150?img=5', phone: '' },
  { id: 4, name: 'Rahul Verma', email: 'rahul.verma@gmail.com', role: 'Agent', status: 'Inactive', joined: '10 Mar 2023', avatar: 'https://i.pravatar.cc/150?img=13', phone: '' },
  { id: 5, name: 'Sneha Patil', email: 'sneha.patil@gmail.com', role: 'Viewer', status: 'Active', joined: '05 Mar 2023', avatar: 'https://i.pravatar.cc/150?img=9', phone: '' },
  { id: 6, name: 'Michael Brown', email: 'michael.b@gmail.com', role: 'Viewer', status: 'Active', joined: '01 Mar 2023', avatar: 'https://i.pravatar.cc/150?img=14', phone: '' },
  { id: 7, name: 'Sarah Connor', email: 'sarah.c@gmail.com', role: 'Manager', status: 'Inactive', joined: '25 Feb 2023', avatar: 'https://i.pravatar.cc/150?img=20', phone: '' },
  { id: 8, name: 'David Miller', email: 'david.m@gmail.com', role: 'Agent', status: 'Active', joined: '20 Feb 2023', avatar: 'https://i.pravatar.cc/150?img=15', phone: '' },
  { id: 9, name: 'Emily Davis', email: 'emily.d@gmail.com', role: 'Viewer', status: 'Active', joined: '15 Feb 2023', avatar: 'https://i.pravatar.cc/150?img=24', phone: '' },
  { id: 10, name: 'James Wilson', email: 'james.w@gmail.com', role: 'Admin', status: 'Active', joined: '10 Feb 2023', avatar: 'https://i.pravatar.cc/150?img=60', phone: '' },
  { id: 11, name: 'Anita Rao', email: 'anita.rao@gmail.com', role: 'Agent', status: 'Inactive', joined: '05 Feb 2023', avatar: 'https://i.pravatar.cc/150?img=32', phone: '' },
  { id: 12, name: 'Chris Evans', email: 'chris.e@gmail.com', role: 'Viewer', status: 'Active', joined: '01 Feb 2023', avatar: 'https://i.pravatar.cc/150?img=68', phone: '' },
];

const User = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null); // Track user being edited
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Filter States
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  });

  const itemsPerPage = 5;

  // Comprehensive Filter Logic (Search + Role + Status)
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || user.role.toLowerCase() === selectedRole.toLowerCase();
    const matchesStatus = selectedStatus === 'All' || user.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleOpenAddModal = () => {
    setEditingUserId(null);
    setFormData({ fullName: '', email: '', role: '', phone: '', password: '', confirmPassword: '', avatar: null });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUserId(user.id);
    setFormData({
      fullName: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      password: '',
      confirmPassword: '',
      avatar: user.avatar,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleResetFilters = () => {
    setSelectedRole('All');
    setSelectedStatus('All');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.role) {
      alert('Please fill in required fields');
      return;
    }

    if (editingUserId !== null) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUserId 
          ? {
              ...user,
              name: formData.fullName,
              email: formData.email,
              role: formData.role,
              phone: formData.phone,
              avatar: formData.avatar || user.avatar
            }
          : user
      ));
    } else {
      // Create new user
      const newUser = {
        id: Date.now(),
        name: formData.fullName,
        email: formData.email,
        role: formData.role,
        status: 'Active',
        phone: formData.phone,
        joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        avatar: formData.avatar || 'https://i.pravatar.cc/150?img=33'
      };
      setUsers([newUser, ...users]);
    }

    setIsModalOpen(false);
    setEditingUserId(null);
    setFormData({ fullName: '', email: '', role: '', phone: '', password: '', confirmPassword: '', avatar: null });
  };

  return (
    <div className="user-management">
      {/* Header Section */}
      <div className="user-management__header">
        <div className="user-management__title-box">
          <h1 className="user-management__title">Users</h1>
          <p className="user-management__subtitle">Manage all the users who have access to the system.</p>
        </div>
        <button className="user-management__add-btn" onClick={handleOpenAddModal}>
          <span className="user-management__btn-icon">+</span> Add User
        </button>
      </div>

      {/* Main Content Card */}
      <div className="user-management__card">
        {/* Controls Section */}
        <div className="user-management__controls">
          <div className="user-management__search-box">
            <svg className="user-management__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="user-management__search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <button 
            className={`user-management__filter-btn ${showFilterBar || selectedRole !== 'All' || selectedStatus !== 'All' ? 'user-management__filter-btn--active' : ''}`}
            onClick={() => setShowFilterBar(!showFilterBar)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter {(selectedRole !== 'All' || selectedStatus !== 'All') && '●'}
          </button>
        </div>

        {/* Expandable Filter Panel */}
        {showFilterBar && (
          <div className="user-management__filter-panel">
            <div className="filter-group">
              <label className="filter-label">Role</label>
              <select 
                className="filter-select"
                value={selectedRole}
                onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Agent">Agent</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select 
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {(selectedRole !== 'All' || selectedStatus !== 'All' || searchTerm !== '') && (
              <button className="user-management__reset-btn" onClick={handleResetFilters}>
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Premium Full-Width Table */}
        <div className="user-management__table-wrapper">
          <table className="user-management__table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-management__user-info">
                        <img src={user.avatar} alt={user.name} className="user-management__avatar" />
                        <span className="user-management__user-name">{user.name}</span>
                      </div>
                    </td>
                    <td className="user-management__email">{user.email}</td>
                    <td>
                      <span className={`badge badge--role-${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge--status-${user.status.toLowerCase()}`}>
                        <span className="badge__dot"></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="user-management__date">{user.joined}</td>
                    <td className="text-right">
                      <div className="user-management__actions">
                        <button className="action-btn action-btn--edit" onClick={() => handleOpenEditModal(user)} title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button className="action-btn action-btn--delete" onClick={() => handleDeleteUser(user.id)} title="Delete">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="user-management__empty">
                    <div className="empty-state">
                      <p>No matching users found</p>
                      <button className="btn btn--secondary" onClick={handleResetFilters}>Clear Filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="user-management__pagination-container">
          <span className="user-management__pagination-info">
            Showing <strong>{filteredUsers.length === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</strong> of <strong>{filteredUsers.length}</strong> users
          </span>
          <div className="user-management__pagination">
            <button
              className="pagination__btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &#8249;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination__btn ${currentPage === page ? 'pagination__btn--active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination__btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit User Popup Form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal__header">
              <h2>{editingUserId !== null ? 'Edit User' : 'Add New User'}</h2>
              <button className="modal__close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="modal__body">
              <div className="modal__layout">
                {/* Upload Section */}
                <div className="modal__upload-section">
                  <div className="modal__avatar-preview">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Preview" />
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    )}
                  </div>
                  <label htmlFor="file-upload" className="modal__upload-label">
                    Upload Photo
                  </label>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  <span className="modal__upload-hint">JPG, PNG (Max 2MB)</span>
                </div>

                {/* Form Inputs Grid */}
                <div className="modal__form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleInputChange} required>
                      <option value="" disabled>Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Agent">Agent</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group form-group--password">
                    <label>Password</label>
                    <div className="input-with-icon">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder={editingUserId !== null ? "Leave blank to keep same" : "Enter password"}
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                        👁
                      </button>
                    </div>
                  </div>

                  <div className="form-group form-group--password">
                    <label>Confirm Password</label>
                    <div className="input-with-icon">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        👁
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal__footer">
                <button type="button" className="btn btn--secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  {editingUserId !== null ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;