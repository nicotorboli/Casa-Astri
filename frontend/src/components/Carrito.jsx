import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Lottie from 'lottie-react';
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

  // Obtener el carrito del backend
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

  // Aumentar la cantidad de un producto en el carrito
  const aumentarCantidad = async (itemId, productoId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/catalogo/carrito/add/`,  // URL completa
        { producto_id: productoId, cantidad: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        fetchCarrito(); // Recargar el carrito
      }
    } catch (error) {
      console.error('Error al aumentar la cantidad:', error);
      alert(error.response?.data?.message || 'Error al aumentar la cantidad');
    }
  };
  

  // Disminuir la cantidad de un producto en el carrito
  const disminuirCantidad = async (itemId, productoId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/catalogo/carrito/remove_one/${itemId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCarrito(); // Recargar el carrito
      }
    } catch (error) {
      console.error('Error al disminuir la cantidad:', error);
      alert(error.response?.data?.message || 'Error al disminuir la cantidad');
    }
  };

  // Eliminar un producto del carrito
  const eliminarProducto = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/catalogo/carrito/remove/${itemId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCarrito(); // Recargar el carrito
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  // Calcular el total del carrito
  const calcularTotalCarrito = () => {
    if (!carrito || !carrito.items) return 0;
    return carrito.items.reduce((total, item) => total + item.cantidad * item.precio_unitario, 0).toFixed(2);
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
        <>
          {/* Cabecera de la tabla */}
          <div className="cabecera-carrito">
            <span className="columna-producto">Producto</span>
            <span className="columna-precio">Precio</span>
            <span className="columna-cantidad">Cantidad</span>
            <span className="columna-total">Total</span>
            <span className="columna-acciones">Eliminar</span>
          </div>

          {/* Lista de productos */}
          <ul>
            {carrito.items.map((item) => (
              <li key={item.id} className="fila-producto">
                {/* Columna Producto */}
                <div className="columna-producto">
                  {item.producto.imagen_url && (
                    <img src={item.producto.imagen_url} alt={item.producto.nombre} className="producto-imagen" />
                  )}
                  <span>{item.producto.nombre}</span>
                </div>

                {/* Columna Precio */}
                <div className="columna-precio">${item.precio_unitario}</div>

                {/* Columna Cantidad */}
                <div className="columna-cantidad">
                  <button
                    onClick={() => disminuirCantidad(item.id, item.producto.id)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() => aumentarCantidad(item.id, item.producto.id)}
                    disabled={item.cantidad >= item.producto.stock}
                  >
                    +
                  </button>
                </div>

                {/* Columna Total */}
                <div className="columna-total">${(item.cantidad * item.precio_unitario).toFixed(2)}</div>

                {/* Columna Eliminar */}
                <div className="columna-acciones">
                  <Lottie
                    animationData={eliminarTodoAnimation}
                    loop={true}
                    onClick={() => eliminarProducto(item.id)}
                    className="lottie-icon"
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Total del carrito */}
          <div className="carrito-footer">
            <button onClick={() => alert('Pago procesado')} className="pagar-btn">
              Pagar
            </button>
            <h3>Total: ${calcularTotalCarrito()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;