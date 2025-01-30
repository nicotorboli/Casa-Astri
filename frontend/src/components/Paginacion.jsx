import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Catalogo.css';

const Paginacion = ({ pagina, totalPaginas, setPagina }) => {
  return (
    <div className="catalogo-paginacion">
      <button 
        onClick={() => setPagina(pagina - 1)} 
        disabled={pagina === 1} 
        className="paginacion-btn"
      >
        Anterior
      </button>
      <span className="paginacion-pagina">Página {pagina} de {totalPaginas}</span>
      <button 
        onClick={() => setPagina(pagina + 1)} 
        disabled={pagina === totalPaginas} 
        className="paginacion-btn"
      >
        Siguiente
      </button>
    </div>
  );
};

Paginacion.propTypes = {
  pagina: PropTypes.number.isRequired,
  totalPaginas: PropTypes.number.isRequired,
  setPagina: PropTypes.func.isRequired
};

export default Paginacion;