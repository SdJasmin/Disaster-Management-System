import React, { useEffect, useState } from 'react';
import './MyRequests.css';
import { Link } from 'react-router-dom';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      try {
        const res = await fetch('http://localhost:5000/api/aidrequests/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          setRequests([]);
        }
      } catch (error) {
        console.error('Failed to fetch requests', error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/aidrequests/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
        alert('Request cancelled');
      } else {
        alert('Failed to cancel request');
      }
    } catch (error) {
      console.error('Cancel failed:', error);
      alert('Server error');
    }
  };

  return (
    
    <div className="my-requests-container">
      <h1 className='center-text'>My Aid Requests </h1>

      {loading ? (
        <p>Loading...</p>
      ) : !isLoggedIn ? (

        <p className="center-text"> Please login to see your requests. <br></br> <Link className='request-link' onClick={() => window.location.href = "/login/citizen"}>Login here</Link></p>
      
      ) : requests.length === 0 ? (
        <div className="no-requests">
          <p>You haven't requested anything yet.</p>
          <Link to="/citizen/aid" className="request-link">➡ Go to Request Help Page</Link>
        </div>
      ) : (
        
        requests.map((req, index) => (
          
          <div key={index} className="request-card">
            
            <h3>{req.requestType}</h3>
            <p>
  <strong>Status:</strong>{' '}
  <span className={`status-text ${req.status.toLowerCase()}`}>{req.status}</span>
</p>

            <details>
              <summary>View Details</summary>
              <p><strong>Category:</strong> {req.category}</p>
              <p><strong>Urgency:</strong> {req.urgency}</p>
              <p><strong>Description:</strong> {req.description}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Submitted By:</strong> {req.name} ({req.contact})</p>
            </details>
            <button className="cancel-btn" onClick={() => handleCancel(req._id)}>Cancel Request</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequests;
