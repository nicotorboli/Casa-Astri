import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Catalogo.css';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductoCard = ({ producto, agregarAlCarrito }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      navigate('/login'); // Redirigir al login
      return;
    }

    try {
      await agregarAlCarrito(producto.id);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Error al añadir al carrito');
    }
  };

  return (
    <div className="producto-card">
      {producto.imagen_url ? (
        <img src={producto.imagen_url} alt={producto.nombre} className="producto-imagen" />
      ) : (
        <p>Imagen no disponible</p>
      )}
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio}</p>
      <p>Stock disponible: {producto.stock}</p>
      <button
        onClick={handleAddToCart}
        className="add-to-cart-btn"
        disabled={producto.stock === 0}
      >
        {producto.stock === 0 ? 'Sin stock' : 'Añadir al carrito'}
      </button>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imagen_url: PropTypes.string,
  }).isRequired,
  agregarAlCarrito: PropTypes.func.isRequired,
};

export default ProductoCard;