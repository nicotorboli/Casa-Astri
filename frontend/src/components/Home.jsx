import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from './Navbar';

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    fetchProductos();
  }, []);

  return (
    <div>
      <Navbar /> {/* Aquí renderizamos Navbar */}
      <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <h2>Catálogo de Productos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {productos.map((producto) => (
            <div key={producto.id} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <h3>{producto.nombre}</h3>
              <p>Categoría: {producto.categoria}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;