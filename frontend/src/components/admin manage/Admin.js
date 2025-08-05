import React, { useEffect, useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('alert');
  const [requests, setRequests] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    type: 'Push',
    region: ''
  });

  // Fetch Alerts
  const fetchAlerts = async () => {
    const res = await fetch('http://localhost:5000/api/alerts');
    const data = await res.json();
    setAlerts(data);
  };

  // Fetch Aid Requests
  const fetchAidRequests = async () => {
    const res = await fetch('http://localhost:5000/api/aidrequests');
    const data = await res.json();
    setRequests(data);
  };

const fetchVolunteers = async () => {
  const res = await fetch('http://localhost:5000/api/volunteers');
  const data = await res.json();

  // ✅ Fix: don't filter — show all statuses (pending, approved, etc.)
  setVolunteers(data);
};



 useEffect(() => {
  if (activeTab === 'alert' || activeTab === 'sent') fetchAlerts();
  if (activeTab === 'requests') {
    fetchAidRequests();
    fetchVolunteers(); // ✅ must be here
  }
  if (activeTab === 'volunteers') fetchVolunteers();
}, [activeTab]);


  const handleAlertSubmit = async (e) => {
    e.preventDefault();
    const alertToSend = {
      ...alertData,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch('http://localhost:5000/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertToSend),
    });

    if (res.ok) {
      alert('📨 Alert sent!');
      setAlertData({ title: '', message: '', region: '' });
      fetchAlerts();
    } else {
      alert('Failed to send alert.');
    }
  };

  const handleAcceptRequest = async (id) => {
    const res = await fetch(`http://localhost:5000/api/aidrequests/${id}/accept`, {
      method: 'PATCH',
    });
    const updated = await res.json();
    setRequests((prev) => prev.map((r) => (r._id === id ? updated : r)));
  };

  const updateVolunteerStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/volunteers/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchVolunteers(); // refresh
  };
  const handleAssignVolunteer = async (aidRequestId, volunteerId) => {
  const res = await fetch(`http://localhost:5000/api/aidrequests/${aidRequestId}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ volunteerId }),
  });

  if (res.ok) {
    alert('Aid request assigned!');
    fetchAidRequests();
  } else {
    alert('Failed to assign volunteer');
  }
};


  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveTab('alert')}> Create Alert</li>
          <li onClick={() => setActiveTab('requests')}> View Aid Requests</li>
          <li onClick={() => setActiveTab('sent')}> Sent Alerts</li>
          <li onClick={() => setActiveTab('volunteers')}> Volunteers</li>
        </ul>
      </aside>

      <main className="admin-content">
        {activeTab === 'alert' && (
          <section>
            <h3>Create Emergency Alert</h3>
           <form className="alert-form" onSubmit={handleAlertSubmit}>

              <input type="text" placeholder="Alert Title" required value={alertData.title} onChange={(e) => setAlertData({ ...alertData, title: e.target.value })} />
              <textarea placeholder="Alert Message" required value={alertData.message} onChange={(e) => setAlertData({ ...alertData, message: e.target.value })}></textarea>
              <input type="text" placeholder="Region" required value={alertData.region} onChange={(e) => setAlertData({ ...alertData, region: e.target.value })} />
              <button type="submit">Send Alert</button>
            </form>
          </section>
        )}

        {activeTab === 'requests' && (
          <section>
            <h3>Incoming Aid Requests</h3>
            {requests.map((req) => (
              <div key={req._id} className="request-card">
                <h4>{req.requestType} - <span>{req.status}</span></h4>
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Urgency:</strong> {req.urgency}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <details>
                  <summary>More</summary>
                  <p><strong>Contact:</strong> {req.contact}</p>
                  <p><strong>Description:</strong> {req.description}</p>
                </details>
 {req.status === 'Pending' && (
  <div className="assign-section">
    <select
      value={req.selectedVolunteer || ''}
      onChange={(e) =>
        setRequests((prev) =>
          prev.map((r) =>
            r._id === req._id ? { ...r, selectedVolunteer: e.target.value } : r
          )
        )
      }
    >
      <option value="" disabled>Select Volunteer</option>
      {volunteers.map((vol) => (
        <option key={vol._id} value={vol._id}>
          {vol.name} ({vol.state})
        </option>
      ))}
    </select>

    <button
      className="assign-btn"
      onClick={() => handleAssignVolunteer(req._id, req.selectedVolunteer)}
      disabled={!req.selectedVolunteer}
    >
      🚀 Assign
    </button>
  </div>
)}


              </div>
            ))}
          </section>
        )}

        {activeTab === 'sent' && (
          <section>
            <h3>Sent Alerts</h3>
            {alerts.map((alert) => (
              <div key={alert._id} className="alert-card">
                <h5>{alert.title}</h5>
                <p>{alert.message}</p>
                <p>📍 {alert.region}</p>
                <small>{new Date(alert.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'volunteers' && (
          <section>
            <h3>Volunteer Applications</h3>
            {volunteers.map((vol) => (
              <div key={vol._id} className="volunteer-card">
                <h4>{vol.name} - <span>{vol.status}</span></h4>
                <p><strong>Email:</strong> {vol.email}</p>
                <p><strong>Phone:</strong> {vol.phone}</p>
                <p><strong>Region:</strong> {vol.state}</p>
                <p><strong>Reason:</strong> {vol.reason}</p>
                {vol.status === 'pending' && (
                  <>
                    <button onClick={() => updateVolunteerStatus(vol._id, 'approved')}>✅ Approve</button>
                    <button onClick={() => updateVolunteerStatus(vol._id, 'rejected')}>❌ Reject</button>
                  </>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;
