import React, { useContext } from 'react';
import { Link } from 'react-router-dom';  // Importamos Link de react-router-dom
import { useAuth } from '../contexts/AuthContext'; // Importamos el contexto de autenticación

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtenemos el estado del usuario y la función logout desde el contexto
  
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
      <div>
        <h1 style={{ margin: 0 }}>Casa Astri</h1>
      </div>
      <div>
        {!user ? (
          // Si no hay usuario autenticado, mostramos los enlaces de Login y Register
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', backgroundColor: '#007bff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', backgroundColor: '#28a745', padding: '10px 20px', borderRadius: '5px' }}>
              Register
            </Link>
          </>
        ) : (
          // Si hay un usuario autenticado, mostramos un enlace de Logout
          <button 
            onClick={logout} 
            style={{ color: 'white', backgroundColor: '#dc3545', padding: '10px 20px', borderRadius: '5px' }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;