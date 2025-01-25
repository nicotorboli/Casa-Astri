import React from 'react';
import Navbar from './Navbar';
import Catalogo from './Catalogo'; // Importamos Catalogo
import Footer from './Footer'; // Si tienes un componente Footer

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar /> {/* Aquí renderizamos el Navbar */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <h2>Catálogo de Productos</h2>
        <Catalogo /> {/* Aquí renderizamos el catálogo */}
      </div>
      <Footer /> {/* Aquí se agrega el footer */}
    </div>
  );
};

export default Home;