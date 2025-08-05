import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="role-selection-container">
      <h2>Select Your Role</h2>
      <div className="role-buttons">
        <button onClick={() => handleSelect('citizen')}>Citizen</button>
        <button onClick={() => handleSelect('volunteer')}>Volunteer</button>
        <button onClick={() => handleSelect('admin')}>Admin</button>
      </div>
    </div>
  );
};

export default RoleSelection;
