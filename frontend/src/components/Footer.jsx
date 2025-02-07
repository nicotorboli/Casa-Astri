import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Teléfonos:</p>
          <p>0054 11 4652-4752</p>
          <p>0054 11 6088-1539</p>
          <p>Celular:</p>
          <p>11-6003-4283 / 11-6184-8860</p>
        </div>
        <div className="footer-section">
          <h3>Ubicación</h3>
          <div className="map-container">
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889527!2d-58.5250069!3d-34.684995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab8aaf5877b%3A0x66bc07ae3ad5de3b!2sCasa%20Astri%20S.A.!5e0!3m2!1ses!2sar!4vXXXXXXXXXXXX!5m2!1ses!2sar"
  width="100%"
  height="200"
  style={{ border: "0" }}
  allowfullscreen=""
  loading="lazy">
</iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Casa Astri. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 