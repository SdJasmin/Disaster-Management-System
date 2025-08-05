import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './CitizenDashboard.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear any auth info if needed (e.g., localStorage.removeItem('token'))
      navigate("/"); // Navigate to home
    }
  };
  return (
    <div className="sidebar-content">
      <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
      <ul>
        {/* Always link to Welcome page with scroll-to anchors */}
        <li><HashLink smooth to="/citizen/#welcome">Welcome</HashLink></li>
        <li><HashLink smooth to="/citizen/#about">About Us</HashLink></li>
        <li><HashLink smooth to="/citizen/#faq">FAQ</HashLink></li>
        <li><HashLink smooth to="/citizen/#contact">Contact</HashLink></li>

        {/* Route-based navigation */}
        <li><Link to="/citizen/aid">Aid Request</Link></li>
        <li><Link to="/citizen/alerts">Alerts</Link></li>
        <li><Link to="/citizen/history">My Requests</Link></li>
        <li><Link to="/citizen/profile">Profile</Link></li>
        <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
