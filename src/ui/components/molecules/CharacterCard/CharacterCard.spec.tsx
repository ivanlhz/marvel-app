import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/image.jpg',
    name: 'Iron Man',
  };

  test('renders character card with image and name', () => {
    render(<CharacterCard {...defaultProps} />);

    const image = screen.getByAltText('Iron Man');
    const name = screen.getByText('Iron Man');

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders with inactive favorite button by default', () => {
    render(<CharacterCard {...defaultProps} />);

    const favoriteButton = screen.getByRole('button', { name: 'Añadir a favoritos' });

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).not.toHaveClass('active');
  });

  test('renders with active favorite button when isFavorite is true', () => {
    render(<CharacterCard {...defaultProps} isFavorite={true} />);

    const favoriteButton = screen.getByRole('button', { name: 'Quitar de favoritos' });

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveClass('active');
  });

  test('calls onFavoriteToggle when favorite button is clicked', () => {
    const onFavoriteToggle = jest.fn();

    render(
      <CharacterCard {...defaultProps} isFavorite={false} onFavoriteToggle={onFavoriteToggle} />
    );

    const favoriteButton = screen.getByRole('button', { name: 'Añadir a favoritos' });
    fireEvent.click(favoriteButton);

    expect(onFavoriteToggle).toHaveBeenCalledTimes(1);
  });
});
