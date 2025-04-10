import { FallbackProps } from 'react-error-boundary';
import './ErrorFallback.css';

/**
 * Componente que se muestra cuando ocurre un error en la aplicación
 * @param error - El error que ocurrió
 * @param resetErrorBoundary - Función para reiniciar el error boundary
 */
export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="error-fallback">
      <div className="error-fallback__content">
        <h2 className="error-fallback__title">¡Ups! Algo salió mal</h2>
        <p className="error-fallback__message">Ha ocurrido un error en la aplicación:</p>
        <div className="error-fallback__details">
          <p>{error.message || 'Error desconocido'}</p>
        </div>
        <button className="error-fallback__button" onClick={resetErrorBoundary}>
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
