import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorFallback } from './ErrorFallback';
import { FallbackProps } from 'react-error-boundary';

describe('ErrorFallback', () => {
  const mockError = new Error('Test error message');
  const mockResetErrorBoundary = jest.fn();
  const defaultProps: FallbackProps = {
    error: mockError,
    resetErrorBoundary: mockResetErrorBoundary,
  };

  test('renders error message correctly', () => {
    render(<ErrorFallback {...defaultProps} />);

    expect(screen.getByText('¡Ups! Algo salió mal')).toBeInTheDocument();
    expect(screen.getByText('Ha ocurrido un error en la aplicación:')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Intentar de nuevo')).toBeInTheDocument();
  });

  test('displays unknown error when error message is empty', () => {
    const propsWithEmptyError: FallbackProps = {
      error: new Error(''),
      resetErrorBoundary: mockResetErrorBoundary,
    };

    render(<ErrorFallback {...propsWithEmptyError} />);

    expect(screen.getByText('Error desconocido')).toBeInTheDocument();
  });

  test('calls resetErrorBoundary when retry button is clicked', () => {
    render(<ErrorFallback {...defaultProps} />);

    const retryButton = screen.getByText('Intentar de nuevo');
    fireEvent.click(retryButton);

    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });

  test('has the correct CSS classes for styling', () => {
    render(<ErrorFallback {...defaultProps} />);

    expect(screen.getByText('¡Ups! Algo salió mal').className).toBe('error-fallback__title');
    expect(screen.getByText('Ha ocurrido un error en la aplicación:').className).toBe(
      'error-fallback__message'
    );
    expect(screen.getByText('Test error message').closest('div')).toHaveClass(
      'error-fallback__details'
    );
    expect(screen.getByText('Intentar de nuevo')).toHaveClass('error-fallback__button');
  });
});
