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

  const handleEliminarProducto = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/catalogo/carrito/remove/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      // Recargar el carrito después de eliminar el producto
      const response = await axios.get('http://localhost:8000/api/catalogo/carrito/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handlePagar = async () => {
    try {
      await axios.post('http://localhost:8000/api/catalogo/carrito/pagar/', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      alert('Pago procesado exitosamente');
      setCarrito({ ...carrito, items: [] }); // Vaciar el carrito después del pago
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Error al procesar el pago');
    }
  };

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
              <button onClick={() => handleEliminarProducto(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {carrito.items.length > 0 && (
        <button onClick={handlePagar} className="pagar-btn">
          Pagar
        </button>
      )}
    </div>
  );
};

export default Carrito;