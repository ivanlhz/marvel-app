import { render, screen, fireEvent } from '@testing-library/react';
import { HeartButton } from './HeartButton';

describe('HeartButton', () => {
  test('renders heart button in inactive state by default', () => {
    render(<HeartButton />);

    const button = screen.getByRole('button', { name: 'Añadir a favoritos' });

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('active');
  });

  test('renders heart button in active state when active prop is true', () => {
    render(<HeartButton active={true} />);

    const button = screen.getByRole('button', { name: 'Quitar de favoritos' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('active');
  });

  test('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();

    render(<HeartButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not display count when showCount is false', () => {
    render(<HeartButton count={5} />);

    const countElement = screen.queryByText('5');

    expect(countElement).not.toBeInTheDocument();
  });

  test('displays count when showCount is true and count is greater than 0', () => {
    render(<HeartButton count={5} showCount={true} />);

    const countElement = screen.getByText('5');

    expect(countElement).toBeInTheDocument();
  });
});
