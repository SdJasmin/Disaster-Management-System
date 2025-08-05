import React, { useEffect, useState } from 'react';
import './AidRequest.css';

const AidRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    requestType: '',
    category: '',
    urgency: '',
    description: '',
    location: '',
    status: 'Pending',
  });

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locationString = `${lat},${lon}`;
      console.log("LatLon:", locationString);

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=9fe890266cb04965b54dc9527b0d0527`
        );
        const data = await response.json();
        const address = data.results[0]?.formatted || locationString;

        setFormData((prevData) => ({
          ...prevData,
          location: address,
        }));
      } catch (err) {
        console.error("Error reverse geocoding", err);
        setFormData((prevData) => ({
          ...prevData,
          location: locationString, // fallback to lat/lon
        }));
      }
    },
    (error) => {
      console.error("Error getting location", error);
      setFormData((prevData) => ({
        ...prevData,
        location: "Location access denied",
      }));
    }
  );
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const verifyLogin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  };

  verifyLogin();
}, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/aidrequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Request submitted!');
        setFormData({
          name: '',
          contact: '',
          requestType: '',
          category: '',
          urgency: '',
          description: '',
          location: formData.location,
          status: 'Pending',
        });
      } else {
        const errorData = await res.json();
        console.error('Error:', errorData);
        alert('Error submitting request');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

 return (
  
  <div className="aid-request-page">
    
    <div className="aid-request-container">
      <div className="aid-intro">
        <h2>We’re here to help you</h2>
        <p>If you are facing an emergency or need support, please don't hesitate to reach out. Our team is committed to providing you with timely assistance.</p>
        <p>Your safety and well-being are our priority — let us know how we can support you.</p>
        <img src="data:image/jpeg;base64,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" alt="Helping Hands" className="aid-intro-image" />
      </div>

      <div className="aid-register-info">
        <strong>Note:</strong> You must be logged in to submit an aid request.<br />
        If you haven’t registered yet, please go to the homepage and sign up first.
      </div>
      </div>

      <div className="aid-register-info">
  {!isLoggedIn ? (
    <>
      <strong>Note:</strong> You must be logged in to submit an aid request.<br />
      Please <button onClick={() => window.location.href = "/login/citizen"}>  login here  </button> to continue.
    </>
  ) : (
    <>
      <strong>Success:</strong> You are logged in. Fill out the form below to request aid.
    </>
  )}
</div>
<h1> Aid Request Form</h1>
<form className="aid-request-form" onSubmit={handleSubmit}>
  
  <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required disabled={!isLoggedIn} />
  <input name="contact" type="tel" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required disabled={!isLoggedIn} />
  <input name="requestType" type="text" placeholder="Request Type" value={formData.requestType} onChange={handleChange} required disabled={!isLoggedIn} />
  
  <select name="category" value={formData.category} onChange={handleChange} required disabled={!isLoggedIn}>
    <option value="">Select Category</option>
    <option value="medical">Medical</option>
    <option value="food">Food</option>
    <option value="shelter">Shelter</option>
    <option value="rescue">Rescue</option>
    <option value="other">Other</option>
  </select>

  <select name="urgency" value={formData.urgency} onChange={handleChange} required disabled={!isLoggedIn}>
    <option value="">Urgency Level</option>
    <option value="low">Low</option>
    <option value="moderate">Moderate</option>
    <option value="high">High</option>
    <option value="critical">Critical</option>
  </select>

  <textarea name="description" placeholder="Description of the situation" value={formData.description} onChange={handleChange} required disabled={!isLoggedIn}></textarea>
<input
    type="text"
    name="location"
    value={formData.location}
    readOnly
    className="form-control"
    placeholder="Fetching current location..."
  />


  <button type="submit" disabled={!isLoggedIn}>Submit Request</button>
</form>

    </div>
  );
};

export default AidRequest;
