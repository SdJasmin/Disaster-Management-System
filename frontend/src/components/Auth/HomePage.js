// src/components/public/HomePage.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Aid Connect </h1>
        <p className="tagline">Disaster Relief at Your Fingertips</p>
        <div className="hero-buttons">
          <button onClick={() => window.location.href = '/request-aid'}>🚨 Request Aid</button>
          <button onClick={() => window.location.href = '/alerts'}>📢 View Live Alerts</button>
          <button onClick={() => window.location.href = '/register'}>🤝 Become a Volunteer</button>
        </div>
      </header>

      <section className="about">
        <h2>About Us</h2>
        <p>
          Aid Connect is a real-time disaster management platform that connects
          citizens in need with available volunteers and enables administrators to coordinate help
          during emergencies efficiently.
        </p>
        <img
          src="/images/about-disaster.png"
          alt="Rescue volunteers"
          className="about-img"
        />
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="card">📍 Location-Based Alerts</div>
          <div className="card">🆘 One-Click Aid Request</div>
          <div className="card">🤝 Volunteer Management</div>
          <div className="card">📊 Admin Dashboard</div>
          <div className="card">📡 Low Bandwidth Compatible</div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>📌 Citizens raise a request</li>
          <li>🧑‍🤝‍🧑 Volunteers are notified</li>
          <li>🛠 Admins coordinate response</li>
        </ol>
      </section>

      <section className="latest-alerts">
        <h2>Live Alerts</h2>
        <ul>
          <li><span className="critical">[Critical]</span> Cyclone Warning - Chennai</li>
          <li><span className="moderate">[Moderate]</span> Heatwave - Hyderabad</li>
        </ul>
      </section>

      <footer className="footer">
        <p>© 2025 Aid Connect | Built with 💙 for Humanity</p>
      </footer>
    </div>
  );
};

export default HomePage;
