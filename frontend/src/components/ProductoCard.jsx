import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Catalogo.css';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ProductoCard = ({ producto }) => {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/catalogo/carrito/add/',
        { producto_id: producto.id, cantidad: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Producto añadido al carrito');
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Error al añadir al carrito');
    }
  };

  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>Categoría: {producto.categoria.nombre}</p>
      <p>Precio: ${producto.precio}</p>
      {user && (
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Añadir al carrito
        </button>
      )}
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    categoria: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
    }).isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductoCard;