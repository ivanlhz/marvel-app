import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Página no encontrada</h2>
      <p className="not-found-text">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link to="/" className="not-found-link">
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFoundPage;
