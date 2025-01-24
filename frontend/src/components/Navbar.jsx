import React from 'react';
import { Link } from 'react-router-dom';  // Importamos Link de react-router-dom

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
      <div>
        <h1 style={{ margin: 0 }}>Casa Astri</h1>
      </div>
      <div>
        {/* Link que lleva a la página de Login */}
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', backgroundColor: '#007bff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px' }}>
          Login
        </Link>
        {/* Link que lleva a la página de Register */}
        <Link to="/register" style={{ color: 'white', textDecoration: 'none', backgroundColor: '#28a745', padding: '10px 20px', borderRadius: '5px' }}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;