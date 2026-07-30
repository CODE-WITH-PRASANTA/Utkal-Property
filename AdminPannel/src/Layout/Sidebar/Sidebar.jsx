import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuChevronDown, 
  LuHeadphones, 
  LuLogOut 
} from 'react-icons/lu';
import { PiBuildings } from 'react-icons/pi';
import { HiOutlineHome } from 'react-icons/hi2';
import { 
  FiUsers, 
  FiSettings, 
  FiFileText, 
  FiHelpCircle, 
  FiPlus, 
  FiMapPin, 
  FiGrid 
} from 'react-icons/fi';
import './Sidebar.css';

// Import your custom logo image asset here (adjust the path as needed)
import logoImg from '../../assets/Utkal Property Outro (2).png'; 

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LuLayoutDashboard },
  {
    title: 'Properties',
    path: '/properties',
    icon: PiBuildings,
    subItems: [
      { title: 'Add Property', path: '/properties/all', icon: FiPlus },
      { title: 'Categories', path: '/properties/categories', icon: FiGrid },
      { title: 'Locations', path: '/properties/locations', icon: FiMapPin },
    ],
  },
  { title: 'Bookings', path: '/bookings', icon: HiOutlineHome },
  { title: 'Users', path: '/users', icon: FiUsers },
  { title: 'Leads', path: '/leads', icon: FiFileText },
  { title: 'Enquiry', path: '/enquiry', icon: FiHelpCircle },
  { title: 'Reports', path: '/reports', icon: FiFileText },
  { title: 'Settings', path: '/settings', icon: FiSettings },
];

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (title) => {
    if (isCollapsed) return;
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          width: isCollapsed ? 90 : 280 
        }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className={`sidebar-container ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        <div>
          {/* Logo Header */}
          <div className="sidebar-logo-container">
            {isCollapsed ? (
              <div className="sidebar-logo-icon">R</div>
            ) : (
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={logoImg} 
                alt="Utkal Estate Logo" 
                className="sidebar-logo-img" 
              />
            )}
          </div>

          {/* Navigation Items */}
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasSub = !!item.subItems;
              const isSubOpen = openSubmenu === item.title;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <div key={item.title}>
                  <motion.div
                    whileHover={{ x: isCollapsed ? 0 : 6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <NavLink
                      to={hasSub ? '#' : item.path}
                      onClick={(e) => {
                        if (hasSub) {
                          e.preventDefault();
                          toggleSubmenu(item.title);
                        }
                        if (window.innerWidth < 768) setIsMobileOpen(false);
                      }}
                      className={({ isActive: isCurrent }) => 
                        `sidebar-link ${isActive || isCurrent ? 'active' : ''} ${isCollapsed ? 'center' : 'between'}`
                      }
                    >
                      <div className="sidebar-link-content">
                        <motion.div whileHover={{ rotate: 5 }}>
                          <Icon size={20} color={isActive ? '#fff' : 'var(--color-gold)'} />
                        </motion.div>
                        {!isCollapsed && (
                          <span className="sidebar-link-text">
                            {item.title}
                          </span>
                        )}
                      </div>

                      {!isCollapsed && hasSub && (
                        <motion.div animate={{ rotate: isSubOpen ? 180 : 0 }}>
                          <LuChevronDown size={16} />
                        </motion.div>
                      )}
                    </NavLink>
                  </motion.div>

                  {/* Submenu Accordion */}
                  <AnimatePresence>
                    {!isCollapsed && hasSub && isSubOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sidebar-submenu"
                      >
                        {item.subItems.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <NavLink
                              key={sub.title}
                              to={sub.path}
                              className={({ isActive: isSubActive }) => 
                                `sidebar-sublink ${isSubActive ? 'active' : ''}`
                              }
                            >
                              <SubIcon size={14} />
                              <span>{sub.title}</span>
                            </NavLink>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support & Profile Cards */}
        <div className="sidebar-bottom">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="support-card"
            >
              <div className="support-card-icon">
                <LuHeadphones size={18} />
              </div>
              <h4>Need Help?</h4>
              <p>Check our docs or contact support</p>
              <button className="support-card-btn">
                Support
              </button>
            </motion.div>
          )}

          <div className={`profile-card ${isCollapsed ? 'center' : 'between'}`}>
            <div className="profile-card-user">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                alt="Profile"
              />
              {!isCollapsed && (
                <div>
                  <h5>Alex Morgan</h5>
                  <p>Super Admin</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <LuLogOut size={16} className="logout-icon" />
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;