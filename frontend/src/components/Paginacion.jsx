import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Catalogo.css';
import Lottie from "lottie-react";
import arrowRightAnimation from "../assets/icons/Arrow-right_custom_icon.json";
import arrowLeftAnimation from "../assets/icons/Arrow-left_custom_icon.json";

const Paginacion = ({ pagina, totalPaginas, setPagina }) => {
  return (
    <div className="catalogo-paginacion">
      <button 
        onClick={() => setPagina(pagina - 1)} 
        disabled={pagina === 1} 
        className="paginacion-btn"
      >
        <Lottie animationData={arrowLeftAnimation} className="arrow-animation" />
      </button>
      <span className="paginacion-pagina">Página {pagina} de {totalPaginas}</span>
      <button 
        onClick={() => setPagina(pagina + 1)} 
        disabled={pagina === totalPaginas} 
        className="paginacion-btn"
      >
        <Lottie animationData={arrowRightAnimation} className="arrow-animation" />
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