import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

jest.mock('../../atoms/Logo', () => ({
  Logo: ({ onClick }: { onClick?: () => void }) => (
    <div data-testid="logo" onClick={onClick}>
      Marvel Logo
    </div>
  ),
}));

jest.mock('../../atoms/HeartButton', () => ({
  HeartButton: ({
    active,
    count,
    showCount,
    onClick,
  }: {
    active?: boolean;
    count?: number;
    showCount?: boolean;
    onClick?: () => void;
  }) => (
    <button
      data-testid="heart-button"
      data-active={active}
      data-count={count}
      data-show-count={showCount}
      onClick={onClick}
    >
      {showCount && count ? `${count} favorites` : 'Favorites'}
    </button>
  ),
}));

describe('Navbar', () => {
  test('renders logo and heart button', () => {
    render(<Navbar favoriteCount={0} />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('heart-button')).toBeInTheDocument();
  });

  test('passes favoriteCount to HeartButton', () => {
    const favoriteCount = 5;

    render(<Navbar favoriteCount={favoriteCount} />);

    const heartButton = screen.getByTestId('heart-button');
    expect(heartButton).toHaveAttribute('data-count', '5');
    expect(heartButton).toHaveTextContent('5 favorites');
  });

  test('calls onLogoClick when logo is clicked', () => {
    const handleLogoClick = jest.fn();

    render(<Navbar favoriteCount={0} onLogoClick={handleLogoClick} />);

    const logo = screen.getByTestId('logo');
    fireEvent.click(logo);

    expect(handleLogoClick).toHaveBeenCalledTimes(1);
  });

  test('calls onFavoritesClick when heart button is clicked', () => {
    const handleFavoritesClick = jest.fn();

    render(<Navbar favoriteCount={0} onFavoritesClick={handleFavoritesClick} />);

    const heartButton = screen.getByTestId('heart-button');
    fireEvent.click(heartButton);

    expect(handleFavoritesClick).toHaveBeenCalledTimes(1);
  });

  test('renders with active heart button', () => {
    render(<Navbar favoriteCount={3} />);

    const heartButton = screen.getByTestId('heart-button');
    expect(heartButton).toHaveAttribute('data-active', 'true');
    expect(heartButton).toHaveAttribute('data-show-count', 'true');
  });
});
