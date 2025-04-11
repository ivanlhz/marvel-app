import { render, screen, fireEvent } from '@testing-library/react';
import { Layout } from './Layout';

jest.mock('@/ui/components/organisms/Navbar', () => ({
  Navbar: ({
    favoriteCount,
    onLogoClick,
    onFavoritesClick,
  }: {
    favoriteCount: number;
    onLogoClick?: () => void;
    onFavoritesClick?: () => void;
  }) => (
    <div data-testid="navbar">
      <span data-testid="favorite-count">{favoriteCount}</span>
      <button data-testid="logo-button" onClick={onLogoClick}>
        Logo
      </button>
      <button data-testid="favorites-button" onClick={onFavoritesClick}>
        Favorites
      </button>
    </div>
  ),
}));

describe('Layout', () => {
  test('renders navbar and content', () => {
    render(
      <Layout favoriteCount={5} onLogoClick={jest.fn()} onFavoritesClick={jest.fn()}>
        <div data-testid="content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('passes favoriteCount to Navbar', () => {
    const favoriteCount = 10;

    render(
      <Layout favoriteCount={favoriteCount}>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('favorite-count')).toHaveTextContent('10');
  });

  test('calls onLogoClick when logo is clicked', () => {
    const handleLogoClick = jest.fn();

    render(
      <Layout favoriteCount={0} onLogoClick={handleLogoClick}>
        <div>Test Content</div>
      </Layout>
    );

    const logoButton = screen.getByTestId('logo-button');
    fireEvent.click(logoButton);

    expect(handleLogoClick).toHaveBeenCalledTimes(1);
  });

  test('calls onFavoritesClick when favorites button is clicked', () => {
    const handleFavoritesClick = jest.fn();

    render(
      <Layout favoriteCount={0} onFavoritesClick={handleFavoritesClick}>
        <div>Test Content</div>
      </Layout>
    );

    const favoritesButton = screen.getByTestId('favorites-button');
    fireEvent.click(favoritesButton);

    expect(handleFavoritesClick).toHaveBeenCalledTimes(1);
  });

  test('renders without callbacks', () => {
    render(
      <Layout favoriteCount={0}>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
