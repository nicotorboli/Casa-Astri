import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Al hacer clic en "Casa Astri" se redirige a Home */}
        <Link to="/" className="brand-link">
          <h1>Casa Astri</h1>
        </Link>
      </div>
      <div className="navbar-links">
        {/* Enlace a Home */}
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="nav-link">
              Mi Perfil
            </Link>
            <span onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
              Logout
            </span>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};


export default Navbar;