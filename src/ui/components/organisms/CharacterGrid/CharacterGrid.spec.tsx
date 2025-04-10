import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterGrid } from './CharacterGrid';
import { Character } from '@/mocks/characters';

jest.mock('../../atoms/CharacterCard', () => ({
  CharacterCard: ({
    imageUrl,
    name,
    isFavorite,
    onFavoriteToggle,
  }: {
    imageUrl: string;
    name: string;
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
  }) => (
    <div data-testid={`character-card-${name}`}>
      <img src={imageUrl} alt={name} />
      <span>{name}</span>
      <button data-testid={`favorite-button-${name}`} onClick={onFavoriteToggle}>
        {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      </button>
    </div>
  ),
}));

describe('CharacterGrid', () => {
  const mockCharacters: Character[] = [
    {
      id: '1',
      name: 'Iron Man',
      imageUrl: 'https://example.com/ironman.jpg',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Thor',
      imageUrl: 'https://example.com/thor.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Hulk',
      imageUrl: 'https://example.com/hulk.jpg',
      isFavorite: false,
    },
  ];

  test('renders all character cards', () => {
    const handleFavoriteToggle = jest.fn();

    render(<CharacterGrid characters={mockCharacters} onFavoriteToggle={handleFavoriteToggle} />);

    expect(screen.getByTestId('character-card-Iron Man')).toBeInTheDocument();
    expect(screen.getByTestId('character-card-Thor')).toBeInTheDocument();
    expect(screen.getByTestId('character-card-Hulk')).toBeInTheDocument();
  });

  test('renders empty grid when no characters are provided', () => {
    const handleFavoriteToggle = jest.fn();

    render(<CharacterGrid characters={[]} onFavoriteToggle={handleFavoriteToggle} />);

    const gridElement = screen.getByTestId('character-grid');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement.children.length).toBe(0);
  });

  test('calls onFavoriteToggle with correct character id when favorite button is clicked', () => {
    const handleFavoriteToggle = jest.fn();

    render(<CharacterGrid characters={mockCharacters} onFavoriteToggle={handleFavoriteToggle} />);

    const thorFavoriteButton = screen.getByTestId('favorite-button-Thor');
    fireEvent.click(thorFavoriteButton);

    expect(handleFavoriteToggle).toHaveBeenCalledTimes(1);
    expect(handleFavoriteToggle).toHaveBeenCalledWith('2');
  });
});
