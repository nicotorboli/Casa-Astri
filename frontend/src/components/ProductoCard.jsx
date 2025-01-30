import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Catalogo.css';

const ProductoCard = ({ producto }) => {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>Categoría: {producto.categoria.nombre}</p>
      <p>Precio: ${producto.precio}</p>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    categoria: PropTypes.shape({
      nombre: PropTypes.string.isRequired
    }).isRequired,
    precio: PropTypes.number.isRequired
  }).isRequired
};

export default ProductoCard;