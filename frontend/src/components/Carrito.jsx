import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Carrito.css';

const Carrito = () => {
  const { user } = useAuth();
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchCarrito = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/catalogo/carrito/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          setCarrito(response.data);
        } catch (error) {
          console.error('Error al obtener el carrito:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCarrito();
    }
  }, [user]);

  if (!user) {
    return <p>Debes iniciar sesión para ver tu carrito.</p>;
  }

  if (loading) {
    return <p>Cargando carrito...</p>;
  }

  return (
    <div className="carrito-container">
      <h2>Tu Carrito</h2>
      {carrito.items.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <ul>
          {carrito.items.map((item) => (
            <li key={item.producto.id}>
              {item.producto.nombre} - {item.cantidad} x ${item.precio_unitario}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carrito;