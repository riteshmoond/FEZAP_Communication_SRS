import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import fezapLogo from '../assets/fezap-logo.png';

const Sidebar = ({ open, onClose }) => {
  // Always show content if open, or if on desktop (width > 600)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const showContent = open || !isMobile;
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userEmail');
    navigate('/');
  };
  return (
    <aside className={`sidebar${open ? ' open' : ''}`} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: 24,
          display: showContent ? 'flex' : 'none',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
        }}
      >
        <img src={fezapLogo} alt="FEZAP Logo" style={{ width: 90, margin: '0 auto 24px auto', display: 'block' }} />
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* <h2 className="sidebar-title" style={{ marginBottom: 32, textAlign: 'center' }}>Menu</h2>  */}
          <nav>
            <ul className="sidebar-list" style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 0, margin: 0 }}>
              <li>
                <Link to="/dashboard" className="sidebar-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/projects" className="sidebar-link">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/apikeys" className="sidebar-link">
                  API Keys
                </Link>
              </li>
              <li>
                <Link to="/emaillogs" className="sidebar-link">
                  Email Logs
                </Link>
              </li>
              <li>
                <Link to="/settings" className="sidebar-link">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div style={{ width: '100%' }}>
          <a
            href="#"
            className="sidebar-close-btn"
            style={{ width: '100%' }}
            onClick={handleLogout}
          >
            Logout
          </a>
          {onClose && isMobile && (
            <button className="sidebar-close-btn" onClick={onClose} style={{ width: '100%' }}>
              Close
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default Sidebar;
