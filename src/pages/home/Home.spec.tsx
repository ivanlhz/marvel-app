import { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FavoriteProvider } from '@/ui/context/favoriteContext';
import HomePage from './Home';
import { Character, mockCharacters } from '@/mocks/characters';
import { ChangeEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchValueProvider } from '@/ui/context/searchValueContext';

// Mock del hook useCharacterManagement
jest.mock('@/ui/hooks/useCharacterManagement', () => ({
  useCharacterManagement: (currentPage: number, showAllCharacters: boolean) => {
    const [searchVal, setSearchVal] = useState('');

    const getFilteredCharacters = () => {
      // Primero filtramos por favoritos si es necesario
      let characters = showAllCharacters
        ? mockCharacters
        : mockCharacters.filter(char => char.isFavorite);

      // Aplicamos filtro de búsqueda si hay un valor
      if (searchVal && showAllCharacters) {
        characters = characters.filter(char =>
          char.name.toLowerCase().includes(searchVal.toLowerCase())
        );
      }

      return characters;
    };

    const filteredCharacters = getFilteredCharacters();
    const favoritesCount = mockCharacters.filter(char => char.isFavorite).length;

    return {
      filteredCharacters,
      searchValue: searchVal,
      clearSearchValue: () => setSearchVal(''),
      handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => setSearchVal(e.target.value),
      charactersQuery: {
        items: mockCharacters,
        meta: {
          totalItems: mockCharacters.length,
          totalPages: 1,
          currentPage,
        },
      },
      resultCount: !showAllCharacters ? favoritesCount : filteredCharacters.length,
    };
  },
}));

// Mock de los hooks de paginación
jest.mock('@/ui/hooks/pagination/usePagination', () => ({
  usePagination: () => ({
    currentPage: 1,
    goNextPage: jest.fn(),
    goBackPage: jest.fn(),
  }),
}));

// Mock del componente CharacterGrid
jest.mock('@/ui/components/organisms/CharacterGrid', () => ({
  CharacterGrid: ({
    characters,
    onFavoriteToggle,
  }: {
    characters: Character[];
    onFavoriteToggle: (id: string) => void;
  }) => {
    // Usamos un estado local para simular el cambio de estado de favorito
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});

    const handleFavoriteToggle = (id: string) => {
      setFavorites(prev => ({
        ...prev,
        [id]: !prev[id],
      }));
      onFavoriteToggle(id);
    };

    return (
      <div data-testid="character-grid">
        {characters.map((character: Character) => {
          const isFavorite =
            favorites[character.id] !== undefined ? favorites[character.id] : character.isFavorite;

          return (
            <div key={character.id} data-testid={`character-${character.id}`}>
              <span>{character.name}</span>
              <button
                data-testid={`favorite-button-${character.id}`}
                onClick={() => handleFavoriteToggle(character.id)}
              >
                {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              </button>
            </div>
          );
        })}
      </div>
    );
  },
}));

jest.mock('@/ui/components/molecules/SearchBar', () => ({
  SearchBar: ({
    searchValue,
    resultCount,
    onSearchChange,
    onClearClick,
  }: {
    searchValue: string;
    resultCount: number;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClearClick?: () => void;
  }) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Buscar personajes"
      />
      <span data-testid="result-count">{resultCount} resultados</span>
      {onClearClick && (
        <button data-testid="clear-button" onClick={onClearClick}>
          Limpiar
        </button>
      )}
    </div>
  ),
}));

// Crear una instancia de QueryClient para los tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderHomePage = (props = { showFavoritesCharacters: false, handleShowAllCharacters: () => {} }) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <SearchValueProvider>
      <FavoriteProvider>
        <HomePage {...props} />
      </FavoriteProvider>
      </SearchValueProvider>
    </QueryClientProvider>
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
    renderHomePage({ showFavoritesCharacters: true, handleShowAllCharacters: () => {} });

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
