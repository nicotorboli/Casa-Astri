import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Lottie from 'lottie-react';
import eliminarUnoAnimation from '../assets/icons/Bin-bounce_custom_icon.json'; // Ruta a tu animación de "Eliminar uno"
import eliminarTodoAnimation from '../assets/icons/Bin-side-open_custom_icon.json'; // Ruta a tu animación de "Eliminar todo"
import '../styles/Carrito.css';

const Carrito = () => {
  const { user } = useAuth();
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCarrito();
    }
  }, [user]);

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

  const handleEliminarUno = async (itemId) => {
    try {
      await axios.post(`http://localhost:8000/api/catalogo/carrito/remove_one/${itemId}/`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      fetchCarrito(); // Recargar el carrito
    } catch (error) {
      console.error('Error al eliminar una unidad del producto:', error);
    }
  };

  const handleEliminarTodo = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/catalogo/carrito/remove/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      fetchCarrito(); // Recargar el carrito
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

  const calcularTotal = () => {
    return carrito.items.reduce((total, item) => total + item.cantidad * item.precio_unitario, 0).toFixed(2);
  };

  return (
    <div className="carrito-container">
      <h2>Tu Carrito</h2>
      {carrito.items.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <>
          {/* Cabecera de la lista */}
          <div className="cabecera-carrito">
            <span className="columna-producto">Producto</span>
            <span className="columna-precio">Precio</span>
            <span className="columna-acciones">Eliminar uno</span>
            <span className="columna-acciones">Eliminar todo</span>
          </div>

          {/* Lista de productos */}
          <ul>
            {carrito.items.map((item) => (
              <li key={item.producto.id}>
                <span className="columna-producto">{item.producto.nombre} (x{item.cantidad})</span>
                <span className="columna-precio">${item.precio_unitario * item.cantidad}</span>
                <span className="columna-acciones">
                  <Lottie
                    animationData={eliminarUnoAnimation}
                    loop={true}
                    onClick={() => handleEliminarUno(item.id)}
                    className="lottie-icon"
                  />
                </span>
                <span className="columna-acciones">
                  <Lottie
                    animationData={eliminarTodoAnimation}
                    loop={true}
                    onClick={() => handleEliminarTodo(item.id)}
                    className="lottie-icon"
                  />
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      {carrito.items.length > 0 && (
        <div className="carrito-footer">
          <button onClick={handlePagar} className="pagar-btn">
            Pagar
          </button>
          <h3>Total: ${calcularTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default Carrito;