// components/roles/CitizenHeader.js
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './CitizenDashboard.css';

const CitizenHeader = () => {
  return (
    <header className="citizen-header">
      <div className="logo"> Aid Connect </div>
      <nav className="nav-links">
        <div className="dropdown">
          <button className="dropbtn">Home ▾</button>
          <div className="dropdown-content">
            <HashLink smooth to="/citizen/#welcome">Welcome</HashLink>
            <HashLink smooth to="/citizen/#about">About Us</HashLink>
            <HashLink smooth to="/citizen/#faq">FAQ</HashLink>
            <HashLink smooth to="/citizen/#contact">Contact</HashLink>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Aid Requests ▾</button>
          <div className="dropdown-content">
            <Link to="/citizen/aid">Request Help</Link>
            <Link to="/citizen/history">My Requests</Link>
          </div>
        </div>

        <Link to="/citizen/alerts">Alerts</Link>
        <Link to="/citizen/services">Our Services</Link>
        <Link to="/citizen/volun">Volunteers</Link>
        <Link to="/citizen/profile">Profile</Link>
      </nav>
    </header>
  );
};

export default CitizenHeader;
