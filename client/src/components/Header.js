import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onAddCategory }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-logo-icon">🛒</span>
        <span className="header-logo-text">fastcart</span>
        <div className="header-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      <div className="header-right">
        <button className="add-category-btn" onClick={onAddCategory}>
          + Add Category
        </button>

        <div className="header-icons">
          <span className="header-icon">📄</span>
          <span className="header-icon notification-icon">
            🔔
            <span className="notification-badge">4</span>
          </span>
        </div>

        <div className="header-user" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="user-avatar">{getInitials(user?.name)}</div>
          <span className="user-name">{user?.name || 'User'}</span>
          <span className="dropdown-arrow">▼</span>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


