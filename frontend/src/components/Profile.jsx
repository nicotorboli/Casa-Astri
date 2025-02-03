import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar'; // Asegúrate de que el componente Navbar esté correctamente implementado
import Carrito from './Carrito'; 
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/users/profile/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  if (!user) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>Mi Perfil</h2>

        {/* Información del Usuario */}
        <div className="user-info">
          <h3>Información Personal</h3>
          <p><strong>Nombre de usuario:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Nombre:</strong> {userData.first_name} {userData.last_name}</p>
        </div>

        {/* Carrito de Compras */}
        <div className="user-carrito">
          <h3>Mi Carrito</h3>
          <Carrito />
        </div>

        {/* Historial de Compras (futura implementación) */}
        <div className="user-historial">
          <h3>Historial de Compras</h3>
          <p>Próximamente...</p>
        </div>
      </div>
    </>
  );
};

export default Profile;