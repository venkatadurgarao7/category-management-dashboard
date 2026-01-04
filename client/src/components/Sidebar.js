import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '📋', label: 'Orders', path: '/orders', badge: '16' },
    { icon: '📦', label: 'Products', path: '/products' },
    { icon: '🏷️', label: 'Categories', path: '/dashboard', active: true },
    { icon: '👥', label: 'Customers', path: '/customers' },
    { icon: '📊', label: 'Reports', path: '/reports' },
    { icon: '⭐', label: 'Coupons', path: '/coupons' },
    { icon: '✉️', label: 'Inbox', path: '/inbox' }
  ];

  const otherItems = [
    { icon: '❓', label: 'Knowledge Base', path: '/knowledge' },
    { icon: '💡', label: 'Product Updates', path: '/updates' }
  ];

  const settingsItems = [
    { icon: '👤', label: 'Personal Settings', path: '/settings/personal' },
    { icon: '⚙️', label: 'Global Settings', path: '/settings/global' }
  ];

  const handleItemClick = (path) => {
    if (path === '/dashboard') {
      navigate('/dashboard');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🛒</span>
        <span className="logo-text">fastcart</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleItemClick(item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Other Information</div>
        {otherItems.map((item, index) => (
          <div
            key={index}
            className="sidebar-item"
            onClick={() => handleItemClick(item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Settings</div>
        {settingsItems.map((item, index) => (
          <div
            key={index}
            className="sidebar-item"
            onClick={() => handleItemClick(item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


