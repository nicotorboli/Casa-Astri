import React from 'react';
import Navbar from './Navbar';
import Catalogo from './Catalogo';
import Footer from './Footer';
import '../styles/Home.css'; // Importa el CSS global

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <Catalogo />
      </div>
      <Footer />
    </div>
  );
};

export default Home;