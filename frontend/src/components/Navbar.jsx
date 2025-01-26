import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css'; // Importa el CSS específico para el Navbar

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Casa Astri</h1>
      </div>
      <div className="navbar-links">
        {!user ? (
          <>
            <Link to="/login" className="btn login-btn">
              Login
            </Link>
            <Link to="/register" className="btn register-btn">
              Register
            </Link>
          </>
        ) : (
          <button onClick={logout} className="btn logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;