import React, { useState } from 'react';
import axios from 'axios';

const EditProfileForm = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    gender: user.gender,
    state: user.state,
    phone: user.phone
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate(res.data); // update profile view
      onClose(); // close form
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="edit-form-overlay">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h3>Edit Profile</h3>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" />
        <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
        <input name="state" value={formData.state} onChange={handleChange} placeholder="State" />
        <button type="submit">Save</button>
        <button onClick={onClose} type="button">Cancel</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
