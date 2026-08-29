import React, { useEffect, useState } from "react";

import "./User.css";

import API, { BASE_URL } from "../../api/axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null); // Track user being edited
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  // Filter States
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    phone: "",
    status: "Active",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const itemsPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/users");

      console.log("USERS RESPONSE:", data);

      setUsers(data.users || []);
    } catch (error) {
      console.error("FETCH USERS ERROR:", error.response?.data || error);

      alert(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Comprehensive Filter Logic (Search + Role + Status)
  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";
    const role = user.role || "";
    const status = user.status || "";

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search);

    const matchesRole =
      selectedRole === "All" ||
      role.toLowerCase() === selectedRole.toLowerCase();

    const matchesStatus =
      selectedStatus === "All" ||
      status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    try {
      const { data } = await API.delete(`/users/${id}`);

      alert(data.message || "User deleted successfully");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("DELETE USER ERROR:", error.response?.data || error);

      alert(error.response?.data?.message || "Failed to delete user");
    }
  };
  const handleOpenAddModal = () => {
    setEditingUserId(null);

    setAvatarFile(null);

    setShowPassword(false);
    setShowConfirmPassword(false);

    setFormData({
      fullName: "",
      email: "",
      role: "",
      phone: "",
      status: "Active",
      password: "",
      confirmPassword: "",
      avatar: null,
    });

    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUserId(user._id);

    setAvatarFile(null);

    setShowPassword(false);
    setShowConfirmPassword(false);

    setFormData({
      fullName: user.name || "",
      email: user.email || "",
      role: user.role || "",
      phone: user.phone || "",
      status: user.status || "Active",
      password: "",
      confirmPassword: "",
      avatar: user.avatar || null,
    });

    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setAvatarFile(file);

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      avatar: previewUrl,
    }));
  };

  const handleResetFilters = () => {
    setSelectedRole("All");
    setSelectedStatus("All");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // ========================================
      // VALIDATION
      // ========================================

      if (!formData.fullName.trim()) {
        alert("Full name is required");
        return;
      }

      if (!formData.email.trim()) {
        alert("Email is required");
        return;
      }

      if (!formData.role) {
        alert("Please select a role");
        return;
      }

      // Password required for new user
      if (editingUserId === null && !formData.password) {
        alert("Password is required");
        return;
      }

      // Check password length
      if (formData.password && formData.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      // Confirm password
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      setSaving(true);

      // ========================================
      // FORMDATA
      // ========================================

      const form = new FormData();

      form.append("fullName", formData.fullName.trim());

      form.append("email", formData.email.trim());

      form.append("role", formData.role);

      form.append("phone", formData.phone.trim());
      form.append("status", formData.status);

      // Only send password if entered
      if (formData.password) {
        form.append("password", formData.password);
      }

      // Actual avatar file
      if (avatarFile) {
        form.append("avatar", avatarFile);
      }

      // ========================================
      // DEBUG
      // ========================================

      console.log("USER FORM DATA");

      for (const [key, value] of form.entries()) {
        console.log(key, value);
      }

      // ========================================
      // CREATE / UPDATE
      // ========================================

      let response;

      if (editingUserId !== null) {
        response = await API.put(`/users/${editingUserId}`, form);
      } else {
        response = await API.post("/users", form);
      }

      const data = response.data;

      console.log(
        editingUserId !== null ? "USER UPDATED:" : "USER CREATED:",
        data,
      );

      alert(
        data.message ||
          (editingUserId !== null
            ? "User updated successfully"
            : "User created successfully"),
      );

      // ========================================
      // RESET
      // ========================================

      setIsModalOpen(false);
      setEditingUserId(null);
      setAvatarFile(null);

      setFormData({
        fullName: "",
        email: "",
        role: "",
        phone: "",
        status: "Active",
        password: "",
        confirmPassword: "",
        avatar: null,
      });

      // Reload MongoDB users
      await fetchUsers();
    } catch (error) {
      console.error(
        editingUserId !== null ? "UPDATE USER ERROR:" : "CREATE USER ERROR:",
        error.response?.data || error,
      );

      alert(
        error.response?.data?.message ||
          (editingUserId !== null
            ? "Failed to update user"
            : "Failed to create user"),
      );
    } finally {
      setSaving(false);
    }
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) {
      return "/no-image.png";
    }

    if (avatar.startsWith("blob:") || avatar.startsWith("data:")) {
      return avatar;
    }

    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }

    return `${BASE_URL}${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
  };

  return (
    <div className="user-management">
      {/* Header Section */}
      <div className="user-management__header">
        <div className="user-management__title-box">
          <h1 className="user-management__title">Users</h1>
          <p className="user-management__subtitle">
            Manage all the users who have access to the system.
          </p>
        </div>
        <button
          className="user-management__add-btn"
          onClick={handleOpenAddModal}
        >
          <span className="user-management__btn-icon">+</span> Add User
        </button>
      </div>

      {/* Main Content Card */}
      <div className="user-management__card">
        {/* Controls Section */}
        <div className="user-management__controls">
          <div className="user-management__search-box">
            <svg
              className="user-management__search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
            >
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
            className={`user-management__filter-btn ${showFilterBar || selectedRole !== "All" || selectedStatus !== "All" ? "user-management__filter-btn--active" : ""}`}
            onClick={() => setShowFilterBar(!showFilterBar)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter {(selectedRole !== "All" || selectedStatus !== "All") && "●"}
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
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setCurrentPage(1);
                }}
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
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {(selectedRole !== "All" ||
              selectedStatus !== "All" ||
              searchTerm !== "") && (
              <button
                className="user-management__reset-btn"
                onClick={handleResetFilters}
              >
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
              {loading ? (
                // ============================
                // LOADING
                // ============================
                <tr>
                  <td colSpan="6" className="user-management__empty">
                    Loading users...
                  </td>
                </tr>
              ) : currentUsers.length > 0 ? (
                // ============================
                // USERS
                // ============================
                currentUsers.map((user) => (
                  <tr key={user._id}>
                    {/* USER */}
                    <td>
                      <div className="user-management__user-info">
                        <img
                          src={getAvatarUrl(user.avatar)}
                          alt={user.name}
                          className="user-management__avatar"
                          onError={(e) => {
                            e.currentTarget.onerror = null;

                            // Optional fallback
                            e.currentTarget.src =
                              "https://ui-avatars.com/api/?name=User";
                          }}
                        />

                        <span className="user-management__user-name">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="user-management__email">{user.email}</td>

                    {/* ROLE */}
                    <td>
                      <span
                        className={`badge badge--role-${(
                          user.role || "viewer"
                        ).toLowerCase()}`}
                      >
                        {user.role || "Viewer"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`badge badge--status-${(
                          user.status || "active"
                        ).toLowerCase()}`}
                      >
                        <span className="badge__dot"></span>

                        {user.status || "Active"}
                      </span>
                    </td>

                    {/* JOINED DATE */}
                    <td className="user-management__date">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "--"}
                    </td>

                    {/* ACTIONS */}
                    <td className="text-right">
                      <div className="user-management__actions">
                        {/* EDIT */}
                        <button
                          type="button"
                          className="action-btn action-btn--edit"
                          onClick={() => handleOpenEditModal(user)}
                          title="Edit"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />

                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          className="action-btn action-btn--delete"
                          onClick={() => handleDeleteUser(user._id)}
                          title="Delete"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />

                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // ============================
                // EMPTY
                // ============================
                <tr>
                  <td colSpan="6" className="user-management__empty">
                    <div className="empty-state">
                      <p>No matching users found</p>

                      <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={handleResetFilters}
                      >
                        Clear Filters
                      </button>
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
            Showing{" "}
            <strong>{filteredUsers.length === 0 ? 0 : startIndex + 1}</strong>{" "}
            to{" "}
            <strong>
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
            </strong>{" "}
            of <strong>{filteredUsers.length}</strong> users
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
                className={`pagination__btn ${currentPage === page ? "pagination__btn--active" : ""}`}
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
              <h2>{editingUserId !== null ? "Edit User" : "Add New User"}</h2>
              <button
                className="modal__close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal__body">
              <div className="modal__layout">
                {/* Upload Section */}
                <div className="modal__upload-section">
                  <div className="modal__avatar-preview">
                    {formData.avatar ? (
                      <img src={getAvatarUrl(formData.avatar)} alt="Preview" />
                    ) : (
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    )}
                  </div>
                  <label htmlFor="file-upload" className="modal__upload-label">
                    Upload Photo
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <span className="modal__upload-hint">JPG, PNG (Max 5MB)</span>
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
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Select role
                      </option>
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={
                          editingUserId !== null
                            ? "Leave blank to keep same"
                            : "Enter password"
                        }
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        👁
                      </button>
                    </div>
                  </div>

                  <div className="form-group form-group--password">
                    <label>Confirm Password</label>
                    <div className="input-with-icon">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        👁
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal__footer">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingUserId !== null
                      ? "Save Changes"
                      : "Add User"}
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
