import React, { useEffect, useState } from 'react';
import './Volunteer.css';
import axios from 'axios';

const Volunteer = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/volunteer/assigned', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data.requests || []);
      } catch (err) {
        console.error('Failed to fetch assigned work:', err);
      }
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:5000/api/volunteer/update-status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, deliveryStatus: status } : req
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const nextStatus = (current) => {
    switch (current) {
      case 'Assigned':
        return 'In Progress';
      case 'In Progress':
        return 'Completed';
      default:
        return null;
    }
  };

  return (
    <div className="volunteer-dashboard">
      <h2>Assigned Aid Requests</h2>
      {requests.length === 0 ? (
        <p>No aid requests assigned yet.</p>
      ) : (
        <ul>
          {requests.map((req) => {
            const next = nextStatus(req.deliveryStatus);
            return (
              <li key={req._id} className="aid-request-card">
                <p><strong>Request Type:</strong> {req.requestType}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Urgency:</strong> {req.urgency}</p>
                <p><strong>Status:</strong> {req.deliveryStatus}</p>
                {next && (
                  <button onClick={() => updateStatus(req._id, next)}>
                    Mark as {next}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Volunteer;
