import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Catalogo.css';

const Catalogo = () => {
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Cargando productos...');

  // Fetch de productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setMessage('Cargando productos...');
        const params = {};
        if (pagina) params.page = pagina;
        if (categoriaSeleccionada) params.categoria = categoriaSeleccionada;
        if (nombreProducto) params.search = nombreProducto; // Cambiado de nombre a search

        const response = await Axios.get(`http://localhost:8000/api/productos/`, {
          params,
        });
        setProductos(response.data.results);
        setTotalPaginas(response.data.total_pages || 1);
        setMessage(response.data.results.length === 0 ? 'No hay productos que coincidan con los filtros.' : '');
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setMessage('Hubo un error al cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [pagina, categoriaSeleccionada, nombreProducto]);

  // Fetch de categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/categorias/');
        setCategorias(response.data || []); // Manejo de datos vacíos
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  // Cambiar página
  const cambiarPagina = (paginaNueva) => {
    if (paginaNueva >= 1 && paginaNueva <= totalPaginas) {
      setPagina(paginaNueva);
    }
  };

  return (
    <div className="catalogo-container">
      {/* Filtros */}
      <div className="catalogo-filtros">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
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

      {/* Productos */}
      <div className="catalogo-productos">
        {loading ? (
          <p>{message}</p>
        ) : productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <h3>{producto.nombre}</h3>
              <p>Categoría: {producto.categoria.nombre}</p>
              <p>Precio: ${producto.precio}</p>
            </div>
          ))
        ) : (
          <p>{message}</p>
        )}
      </div>

      {/* Paginación */}
      <div className="catalogo-paginacion">
        <button
          onClick={() => cambiarPagina(pagina - 1)}
          disabled={pagina === 1}
          className="paginacion-btn"
        >
          Anterior
        </button>
        <span className="paginacion-pagina">Página {pagina} de {totalPaginas}</span>
        <button
          onClick={() => cambiarPagina(pagina + 1)}
          disabled={pagina === totalPaginas}
          className="paginacion-btn"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Catalogo;
