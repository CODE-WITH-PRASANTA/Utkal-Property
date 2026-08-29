import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiBell, 
  FiMenu, 
  FiChevronDown, 
  FiSun,
  FiUser,
  FiSettings,
  FiLogOut,
  FiCheck
} from 'react-icons/fi';
import './Topbar.css';

const sampleNotifications = [
  { id: 1, title: 'New Property Lead', time: '5m ago', unread: true },
  { id: 2, title: 'Booking Confirmed #1024', time: '1h ago', unread: true },
  { id: 3, title: 'System Maintenance at 12 AM', time: '3h ago', unread: false },
];

const Topbar = ({ onLogout, user, toggleSidebar, isSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false);
  };

  // Complete & Clean Logout Procedure
  const handleLogoutClick = async () => {
    try {
      setShowProfileMenu(false);

      // 1. Clear session storage backup immediately
      localStorage.removeItem('utkal_user_session');

      // 2. Call parent handleLogout handler (AWS Amplify signOut / state update)
      if (typeof onLogout === 'function') {
        await onLogout();
      }
    } catch (err) {
      console.error('Logout error during execution:', err);
    } finally {
      // 3. Force route change directly to login page
      navigate('/login', { replace: true });
    }
  };

  const hasUnread = notifications.some((n) => n.unread);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="topbar-header"
    >
      {/* Left: Sidebar Toggle Button and Search */}
      <div className="topbar-left">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className={`topbar-toggle-btn ${!isSidebarOpen ? 'rotated' : ''}`}
        >
          <FiMenu />
        </motion.button>

        <motion.div 
          whileFocus={{ scale: 1.02 }}
          className="topbar-search-box"
        >
          <FiSearch size={18} className="topbar-search-icon" />
          <input
            type="text"
            placeholder="Search properties..."
            className="topbar-search-input"
          />
        </motion.div>
      </div>

      {/* Right: Theme, Notification & User Avatar */}
      <div className="topbar-right">
        {/* Theme Toggle */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="topbar-icon-btn"
        >
          <FiSun size={18} color="var(--color-text)" />
        </motion.div>

        {/* Notification Bell & Popup */}
        <div className="topbar-dropdown-wrapper" ref={notificationRef}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`topbar-icon-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfileMenu(false);
            }}
          >
            <FiBell size={18} color="var(--color-text)" />
            {hasUnread && <span className="notification-badge" />}
          </motion.div>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="topbar-popover notification-card"
              >
                <div className="notification-header">
                  <div>
                    <h4>Notifications</h4>
                    <p>{notifications.filter((n) => n.unread).length} unread messages</p>
                  </div>
                  {hasUnread && (
                    <button className="mark-read-btn" onClick={markAllRead}>
                      <FiCheck size={14} /> Mark all read
                    </button>
                  )}
                </div>

                <div className="notification-list">
                  {notifications.map((item) => (
                    <div 
                      key={item.id} 
                      className={`notification-item ${item.unread ? 'unread' : ''}`}
                    >
                      <div className="notification-dot" />
                      <div className="notification-content">
                        <p className="notification-title">{item.title}</p>
                        <span className="notification-time">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="notification-footer">
                  <button onClick={() => setShowNotifications(false)}>View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="topbar-dropdown-wrapper" ref={profileRef}>
          <div 
            className="topbar-profile"
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowNotifications(false);
            }}
          >
            <motion.img
              whileHover={{ rotate: 8, scale: 1.05 }}
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
              alt="Avatar"
              className="topbar-avatar"
            />
            <div className="topbar-profile-info">
              <h5>{user?.username || 'Admin User'}</h5>
              <p>{user?.isMock ? 'Developer' : 'Admin'}</p>
            </div>
            <motion.div
              animate={{ rotate: showProfileMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown size={16} color="var(--color-text-secondary)" />
            </motion.div>
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="topbar-popover profile-dropdown-menu"
              >
                <div className="profile-dropdown-header">
                  <h6>{user?.username || 'Admin User'}</h6>
                  <span>{user?.isMock ? 'utkal@internal.local' : 'admin@utkal.com'}</span>
                </div>

                <div className="profile-menu-items">
                  {/* Profile Link */}
                  <button 
                    className="menu-item"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <FiUser size={16} />
                    <span>Profile</span>
                  </button>

                  {/* Settings Link */}
                  <button 
                    className="menu-item"
                    onClick={() => handleNavigation('/settings')}
                  >
                    <FiSettings size={16} />
                    <span>Settings</span>
                  </button>

                  <div className="menu-divider" />

                  {/* Logout Action */}
                  <button 
                    className="menu-item logout"
                    onClick={handleLogoutClick}
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;