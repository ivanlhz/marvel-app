import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FavoriteProvider } from '@/ui/context/favoriteContext';
import HomePage from './Home';
import { Character, mockCharacters } from '@/mocks/characters';
import { ChangeEvent } from 'react';

jest.mock('@/ui/components/organisms/CharacterGrid', () => ({
  CharacterGrid: ({
    characters,
    onFavoriteToggle,
  }: {
    characters: Character[];
    onFavoriteToggle: (id: string) => void;
  }) => (
    <div data-testid="character-grid">
      {characters.map((character: Character) => (
        <div key={character.id} data-testid={`character-${character.id}`}>
          <span>{character.name}</span>
          <button
            data-testid={`favorite-button-${character.id}`}
            onClick={() => onFavoriteToggle(character.id)}
          >
            {character.isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          </button>
        </div>
      ))}
    </div>
  ),
}));

jest.mock('@/ui/components/molecules/SearchBar', () => ({
  SearchBar: ({
    searchValue,
    resultCount,
    onSearchChange,
  }: {
    searchValue: string;
    resultCount: number;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Buscar personajes"
      />
      <span data-testid="result-count">{resultCount} resultados</span>
    </div>
  ),
}));

const renderHomePage = (props = { showAllCharacters: true }) => {
  return render(
    <FavoriteProvider>
      <HomePage {...props} />
    </FavoriteProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with all characters', () => {
    renderHomePage();

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('character-grid')).toBeInTheDocument();

    expect(screen.getByTestId('result-count').textContent).toBe(
      `${mockCharacters.length} resultados`
    );
  });

  test('shows only favorite characters when showAllCharacters is false', () => {
    renderHomePage({ showAllCharacters: false });

    const favoritesCount = mockCharacters.filter(char => char.isFavorite).length;

    expect(screen.getByTestId('result-count').textContent).toBe(`${favoritesCount} resultados`);
  });

  test('filters characters correctly when searching', () => {
    renderHomePage();

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Iron' } });

    const ironManCharacters = mockCharacters.filter(char =>
      char.name.toLowerCase().includes('iron')
    ).length;

    expect(screen.getByTestId('result-count').textContent).toBe(`${ironManCharacters} resultados`);
  });

  test('toggles favorite status of a character when clicking the button', async () => {
    renderHomePage();

    const characterId = '2';
    const favoriteButton = screen.getByTestId(`favorite-button-${characterId}`);

    expect(favoriteButton.textContent).toBe('Añadir a favoritos');

    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(screen.getByTestId(`favorite-button-${characterId}`).textContent).toBe(
        'Quitar de favoritos'
      );
    });
  });

  test('clears search when search field is empty', () => {
    renderHomePage();

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Thor' } });

    const thorCharacters = mockCharacters.filter(char =>
      char.name.toLowerCase().includes('thor')
    ).length;

    expect(screen.getByTestId('result-count').textContent).toBe(`${thorCharacters} resultados`);

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(screen.getByTestId('result-count').textContent).toBe(
      `${mockCharacters.length} resultados`
    );
  });

  test('shows correct message when there are no search results', () => {
    renderHomePage();

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'PersonajeInexistente' } });

    expect(screen.getByTestId('result-count').textContent).toBe('0 resultados');
  });
});
