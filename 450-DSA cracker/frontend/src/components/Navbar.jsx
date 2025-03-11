import React from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userData'); 
    navigate('/login'); 
  };

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  return (
    <nav 
      className="navbar" 
      style={{
        background: "rgba(255, 255, 255, 0.2)", 
        backdropFilter: "blur(10px)", 
        WebkitBackdropFilter: "blur(10px)", 
        borderRadius: "10px",
        padding: "10px 20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand">Welcome, {userData ? userData.username : 'Guest'}</a>
        {userData && (
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
