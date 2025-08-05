import React, { useState } from 'react';
import './Helpingvolun.css';
import volunteerImg from './images/volunteer.png'; // Make sure image exists

const HelpingVolun = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    state: '',
    availability: '',
    reason: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      availability: formData.availability.split(',').map(item => item.trim()),
    };

    try {
      const res = await fetch('http://localhost:5000/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('✅ You have successfully registered as a volunteer! A confirmation email has been sent.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          age: '',
          gender: '',
          state: '',
          availability: '',
          reason: '',
        });
      } else {
        setMessage('❌ Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('⚠️ Server error. Try again later.');
    }
  };

  return (
    <div className="volunteer-wrapper">
      <h2>🤝 Join as a Volunteer</h2>
      <div className="volunteer-info">
        <img src={volunteerImg} alt="Be a Volunteer" />
        <div>
          <p>
            Volunteers play a vital role in emergency responses. You can help in delivering aid, supporting requests,
            and spreading alerts in your local region.
          </p>
          <p>Interested to join? Fill the form below to register.</p>
        </div>
      </div>

      <form className="volunteer-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" required value={formData.age} onChange={handleChange} />
        <select name="gender" required value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="state" placeholder="State / Region" required value={formData.state} onChange={handleChange} />
        <input
          type="text"
          name="availability"
          placeholder="Availability (e.g. Weekends, Weekdays)"
          required
          value={formData.availability}
          onChange={handleChange}
        />
        <textarea
          name="reason"
          placeholder="Why do you want to volunteer?"
          required
          value={formData.reason}
          onChange={handleChange}
        ></textarea>
        <button type="submit"> Register as Volunteer</button>
      </form>

      {message && <p className="volunteer-msg">{message}</p>}
    </div>
  );
};

export default HelpingVolun;
