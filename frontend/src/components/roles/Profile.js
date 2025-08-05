import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { FaEdit } from 'react-icons/fa';
import EditProfileForm from './EditProfileForm';
import profilepic from './profileicon.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedOut(true);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setIsLoggedOut(true);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedOut(true);
  };

  return (
    <div className="profile-page">
      {isLoggedOut ? (
        <div className="right-panel">
          <div className="logged-out-message">
            <h2>You’re Logged Out</h2>
            <p>Please log in again to view your profile. We’ll keep your seat warm! 😊</p>
            <button className="login-btn" onClick={() => window.location.href = '/login/citizen'}>Go to Login</button>
          </div>
        </div>
      ) : !user ? (
        <div className="right-panel"><p>Loading...</p></div>
      ) : (
        <div className="right-panel">
          {isEditing && (
            <EditProfileForm
              user={user}
              onClose={() => setIsEditing(false)}
              onUpdate={handleProfileUpdate}
            />
          )}
          <div className="profile-wrapper">
            <div className="profile-photo-container">
              <img src={profilepic} alt="Profile" className="profile-photo" />
              <button className="edit-icon" onClick={handleEditClick}>
                <FaEdit />
              </button>
            </div>
            <div className="profile-details">
              <h2>{user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>State:</strong> {user.state}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
