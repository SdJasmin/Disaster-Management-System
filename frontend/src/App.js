import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RoleSelection from './components/Auth/RoleSelection';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Header from './components/Header';
import Admin from './components/admin manage/Admin';
import Volunteer from './components/roles/Volunteer';
import Citizen from './components/roles/Citizen';

import './components/Auth/AuthForm.css';

const AppLayout = ({ children }) => {
  const location = useLocation();

  const isAuthPage =
    ["/login", "/register", "/forgot-password"].some((path) =>
      location.pathname.startsWith(path)
    ) || location.pathname.startsWith("/reset-password");

  const showHeader =
    isAuthPage ||
    location.pathname === "/admin" ||
    location.pathname === "/volunteer";

  return (
    <div className={isAuthPage ? 'auth-layout' : ''}>
      {showHeader && <Header />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Now default route shows Citizen dashboard */}
          <Route path="/" element={<Citizen />} />
          
          {/* Auth & Role Pages */}
          <Route path="/role" element={<RoleSelection />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Role Pages */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/citizen/*" element={<Citizen />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
