import React from 'react';
import PropTypes from 'prop-types';
import "../styles/Catalogo.css";

const Filtros = ({ categorias, categoriaSeleccionada, setCategoriaSeleccionada, nombreProducto, setNombreProducto }) => {
  return (
    <div className="catalogo-filtros">
      <select 
        value={categoriaSeleccionada} 
        onChange={(e) => setCategoriaSeleccionada(e.target.value)} 
        className="filtro-select"
      >
        <option value="">Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
        ))}
      </select>

      <input 
        type="text" 
        placeholder="Buscar por nombre..." 
        value={nombreProducto} 
        onChange={(e) => setNombreProducto(e.target.value)} 
        className="filtro-input"
      />
    </div>
  );
};

Filtros.propTypes = {
  categorias: PropTypes.array.isRequired,
  categoriaSeleccionada: PropTypes.string.isRequired,
  setCategoriaSeleccionada: PropTypes.func.isRequired,
  nombreProducto: PropTypes.string.isRequired,
  setNombreProducto: PropTypes.func.isRequired
};

export default Filtros;