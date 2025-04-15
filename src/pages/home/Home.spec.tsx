import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './Home';
import { SearchValueProvider } from '@/ui/context/searchValueContext';
import { useCharacterManagement } from '@/ui/hooks/useCharacterManagement';
import { usePagination } from '@/ui/hooks/pagination/usePagination';
import { useFavoriteContext } from '@/ui/context/favoriteContext';

jest.mock('@/ui/hooks/useCharacterManagement');
jest.mock('@/ui/hooks/pagination/usePagination');
jest.mock('@/ui/context/favoriteContext');

// Mock of the CharacterGrid component to test the favorite toggle
const characterGridProps: any[] = [];
jest.mock('@/ui/components/organisms/CharacterGrid', () => ({
  CharacterGrid: (props: any) => {
    characterGridProps.push(props);
    return (
      <div>
        <button data-testid="favorite-toggle-button" onClick={() => props.onFavoriteToggle('1')}>
          Toggle Favorite
        </button>
      </div>
    );
  },
}));

// Mock of pagination texts
jest.mock('@/ui/components/molecules/SearchBar', () => ({
  SearchBar: ({ resultCount }: { resultCount: number }) => <div>{resultCount} results</div>,
}));

const mockCharacters = [
  { id: '1', name: 'Goku', description: 'Saiyan', image: 'goku.jpg' },
  { id: '2', name: 'Vegeta', description: 'Prince Saiyan', image: 'vegeta.jpg' },
];

const mockCharactersQuery = {
  items: mockCharacters,
  meta: {
    totalItems: 100,
    totalPages: 5,
    currentPage: 1,
  },
};

describe('HomePage', () => {
  const mockUseCharacterManagement = useCharacterManagement as jest.Mock;
  const mockUsePagination = usePagination as jest.Mock;
  const mockUseFavoriteContext = useFavoriteContext as jest.Mock;
  const addFavoriteCharacterMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCharacterManagement.mockReturnValue({
      filteredCharacters: mockCharacters,
      charactersQuery: mockCharactersQuery,
      resultCount: 100,
    });
    mockUsePagination.mockReturnValue({
      currentPage: 1,
      goNextPage: jest.fn(),
      goBackPage: jest.fn(),
    });
    mockUseFavoriteContext.mockReturnValue({
      favoriteCharacters: [],
      favoriteCount: 0,
      addFavoriteCharacter: addFavoriteCharacterMock,
    });
  });

  const renderHomePage = (showFavoritesCharacters: boolean = false) => {
    return render(
      <SearchValueProvider>
        <HomePage showFavoritesCharacters={showFavoritesCharacters} />
      </SearchValueProvider>
    );
  };

  it('renders correctly with character list', () => {
    renderHomePage();
    expect(screen.getByText('100 results')).toBeInTheDocument();
  });

  it('shows pagination when there is no active search', () => {
    renderHomePage();
    expect(screen.getByText('Página 1 de 5')).toBeInTheDocument();
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
  });

  it('disables previous button when on first page', () => {
    renderHomePage();
    const previousButton = screen.getByText('Anterior');
    expect(previousButton).toBeDisabled();
  });

  it('disables next button when on last page', () => {
    mockUsePagination.mockReturnValue({
      currentPage: 5,
      goNextPage: jest.fn(),
      goBackPage: jest.fn(),
    });
    renderHomePage();
    const nextButton = screen.getByText('Siguiente');
    expect(nextButton).toBeDisabled();
  });

  it('navigates to next page when clicking Next', () => {
    const goNextPage = jest.fn();
    mockUsePagination.mockReturnValue({
      currentPage: 1,
      goNextPage,
      goBackPage: jest.fn(),
    });
    renderHomePage();
    const nextButton = screen.getByText('Siguiente');
    fireEvent.click(nextButton);
    expect(goNextPage).toHaveBeenCalled();
  });

  it('navigates to previous page when clicking Previous', () => {
    const goBackPage = jest.fn();
    mockUsePagination.mockReturnValue({
      currentPage: 2,
      goNextPage: jest.fn(),
      goBackPage,
    });
    renderHomePage();
    const previousButton = screen.getByText('Anterior');
    fireEvent.click(previousButton);
    expect(goBackPage).toHaveBeenCalled();
  });

  it('does not show pagination when showing favorites', () => {
    mockUseCharacterManagement.mockReturnValue({
      filteredCharacters: mockCharacters,
      charactersQuery: null,
      resultCount: 2,
    });
    renderHomePage(true);
    expect(screen.queryByText('Página 1 de 5')).not.toBeInTheDocument();
  });

  it('calls addFavoriteCharacter when toggling a character', () => {
    renderHomePage();
    const toggleButton = screen.getByTestId('favorite-toggle-button');
    fireEvent.click(toggleButton);
    expect(addFavoriteCharacterMock).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('shows the correct number of results', () => {
    mockUseCharacterManagement.mockReturnValue({
      filteredCharacters: mockCharacters,
      charactersQuery: mockCharactersQuery,
      resultCount: 100,
    });
    renderHomePage();
    expect(screen.getByText('100 results')).toBeInTheDocument();
  });

  it('passes favorite IDs correctly to CharacterGrid', () => {
    const favoriteCharacters = [
      { id: '1', name: 'Goku', description: 'Saiyan', image: 'goku.jpg' },
      { id: '2', name: 'Vegeta', description: 'Prince Saiyan', image: 'vegeta.jpg' },
    ];
    mockUseFavoriteContext.mockReturnValue({
      favoriteCharacters,
      favoriteCount: 2,
      addFavoriteCharacter: addFavoriteCharacterMock,
    });
    renderHomePage();
    // The last render of CharacterGrid should have the correct favorite ids
    const lastProps = characterGridProps[characterGridProps.length - 1];
    expect(lastProps.favoriteIds).toEqual(['1', '2']);
  });
});
