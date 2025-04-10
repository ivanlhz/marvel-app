import { render, screen, fireEvent } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  test('renders logo with image', () => {
    render(<Logo />);

    const logoElement = screen.getByRole('img', { name: 'Marvel Logo' });

    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', '/marvel-logo.svg');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Logo onClick={handleClick} />);

    const logoContainer = screen.getByTestId('logo');
    fireEvent.click(logoContainer);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not throw error when onClick is not provided', () => {
    render(<Logo />);

    const logoContainer = screen.getByTestId('logo');

    expect(() => {
      fireEvent.click(logoContainer);
    }).not.toThrow();
  });
});
