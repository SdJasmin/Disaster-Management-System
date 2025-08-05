import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Volunteer login (hardcoded)
    if (role === 'volunteer') {
      if (form.email === 'volunteer@gmail.com' && form.password === 'volunteer') {
        alert('✅ Login successful as Volunteer');
        return navigate('/volunteer');
      } else {
        return alert('❌ You are not a volunteer');
      }
    }

    // Admin login (hardcoded)
    if (role === 'admin') {
      if (form.email === 'admin@gmail.com' && form.password === 'admin') {
        alert('✅ Login successful as Admin');
        return navigate('/admin');
      } else {
        return alert('❌ You are not an admin');
      }
    }

    // Citizen login (with backend)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('✅ Login successful');
      navigate('/citizen');
    } catch (err) {
      alert(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login as {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      <div className="link" style={{ marginTop: '10px' }}>
        {role === 'citizen' && (
          <p>
            Not registered? <Link to="/register">Register here</Link>
          </p>
        )}
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
