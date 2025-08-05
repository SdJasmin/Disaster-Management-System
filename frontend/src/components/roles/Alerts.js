import React, { useEffect, useState } from 'react';
import './Alerts.css'; // optional CSS for better styling

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/alerts');
        const data = await res.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="alerts-container">
      <h2> Emergency Alerts</h2>
      {alerts.length === 0 ? (
        <p>No active alerts.</p>
      ) : (
        alerts.map((alert, index) => (
          <div key={index} className="alert-card">
            <h4>{alert.title}</h4>
            <p>{alert.message}</p>
            <p><strong>Region:</strong> {alert.region}</p>
            <p className="timestamp"> {new Date(alert.timestamp).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Alerts;
