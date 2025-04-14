import { renderHook, act } from '@testing-library/react';
import { useCharacterManagement } from './useCharacterManagement';
import { useCharacters, useFilterCharacters } from '@/ui/hooks/queries/useCharacters';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { useSearchValue } from '@/ui/context/searchValueContext';
import { Character } from '@/core/dbapi';

jest.mock('@/ui/hooks/queries/useCharacters');
jest.mock('@/ui/context/favoriteContext');
jest.mock('@/ui/context/searchValueContext');

describe('useCharacterManagement', () => {
  const mockCharacters: Character[] = [
    {
      id: '1',
      name: 'Goku',
      description: 'Saiyan',
      image: 'goku.jpg',
      ki: '9000',
      maxKi: '10000',
      race: 'Saiyan',
      gender: 'Male',
      affiliation: 'Z Fighters',
    },
    {
      id: '2',
      name: 'Vegeta',
      description: 'Prince Saiyan',
      image: 'vegeta.jpg',
      ki: '8500',
      maxKi: '9500',
      race: 'Saiyan',
      gender: 'Male',
      affiliation: 'Z Fighters',
    },
  ];

  const mockCharactersQuery = {
    items: mockCharacters,
    meta: {
      totalItems: 100,
      totalPages: 5,
      currentPage: 1,
      itemCount: 2,
      itemsPerPage: 50,
    },
    links: {
      first: '/api/characters?page=1',
      previous: null,
      next: '/api/characters?page=2',
      last: '/api/characters?page=5',
    },
  };

  const mockSearchResults: Character[] = [
    {
      id: '1',
      name: 'Goku',
      description: 'Saiyan',
      image: 'goku.jpg',
      ki: '9000',
      maxKi: '10000',
      race: 'Saiyan',
      gender: 'Male',
      affiliation: 'Z Fighters',
    },
  ];

  const mockUseCharacters = useCharacters as jest.Mock;
  const mockUseFilterCharacters = useFilterCharacters as jest.Mock;
  const mockUseFavoriteContext = useFavoriteContext as jest.Mock;
  const mockUseSearchValue = useSearchValue as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCharacters.mockReturnValue({
      data: mockCharactersQuery,
      isLoading: false,
      error: null,
    });

    mockUseFilterCharacters.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    mockUseFavoriteContext.mockReturnValue({
      favoriteCharacters: [],
      favoriteCount: 0,
      addFavoriteCharacter: jest.fn(),
    });

    mockUseSearchValue.mockReturnValue({
      searchValue: '',
      clearSearchValue: jest.fn(),
      handleSearchChange: jest.fn(),
    });
  });

  it('should load characters when page changes', () => {
    const { result } = renderHook(() => useCharacterManagement(1, false, []));

    expect(result.current.filteredCharacters).toEqual(mockCharacters);
    expect(result.current.charactersQuery).toEqual(mockCharactersQuery);
    expect(result.current.resultCount).toBe(100);
  });

  it('should show favorite characters when showFavoritesCharacters is true', () => {
    const favoriteCharacters: Character[] = [
      {
        id: '1',
        name: 'Goku',
        description: 'Saiyan',
        image: 'goku.jpg',
        ki: '9000',
        maxKi: '10000',
        race: 'Saiyan',
        gender: 'Male',
        affiliation: 'Z Fighters',
      },
    ];

    mockUseFavoriteContext.mockReturnValue({
      favoriteCharacters,
      favoriteCount: 1,
      addFavoriteCharacter: jest.fn(),
    });

    const { result } = renderHook(() => useCharacterManagement(1, true, favoriteCharacters));

    expect(result.current.filteredCharacters).toEqual(favoriteCharacters);
    expect(result.current.resultCount).toBe(1);
  });

  it('should update results when there is a search', () => {
    mockUseSearchValue.mockReturnValue({
      searchValue: 'Goku',
      clearSearchValue: jest.fn(),
      handleSearchChange: jest.fn(),
    });

    mockUseFilterCharacters.mockReturnValue({
      data: mockSearchResults,
      isLoading: false,
      error: null,
    });

    const { result, rerender } = renderHook(() => useCharacterManagement(1, false, []));

    act(() => {
      rerender();
    });

    expect(result.current.filteredCharacters).toEqual(mockSearchResults);
    expect(result.current.resultCount).toBe(1);
  });

  it('should handle case when there are no search results', () => {
    mockUseSearchValue.mockReturnValue({
      searchValue: 'NoExiste',
      clearSearchValue: jest.fn(),
      handleSearchChange: jest.fn(),
    });

    mockUseFilterCharacters.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    const { result, rerender } = renderHook(() => useCharacterManagement(1, false, []));

    act(() => {
      rerender();
    });

    expect(result.current.filteredCharacters).toEqual([]);
    expect(result.current.resultCount).toBe(0);
  });

  it('should calculate the correct number of results in normal mode', () => {
    const { result } = renderHook(() => useCharacterManagement(1, false, []));

    expect(result.current.resultCount).toBe(100);
  });

  it('should calculate the correct number of results in favorites mode', () => {
    const favoriteCharacters: Character[] = [
      {
        id: '1',
        name: 'Goku',
        description: 'Saiyan',
        image: 'goku.jpg',
        ki: '9000',
        maxKi: '10000',
        race: 'Saiyan',
        gender: 'Male',
        affiliation: 'Z Fighters',
      },
      {
        id: '2',
        name: 'Vegeta',
        description: 'Prince Saiyan',
        image: 'vegeta.jpg',
        ki: '8500',
        maxKi: '9500',
        race: 'Saiyan',
        gender: 'Male',
        affiliation: 'Z Fighters',
      },
    ];

    mockUseFavoriteContext.mockReturnValue({
      favoriteCharacters,
      favoriteCount: 2,
      addFavoriteCharacter: jest.fn(),
    });

    const { result } = renderHook(() => useCharacterManagement(1, true, favoriteCharacters));

    expect(result.current.resultCount).toBe(2);
  });

  it('should handle case when charactersQuery is null', () => {
    mockUseCharacters.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useCharacterManagement(1, false, []));

    expect(result.current.filteredCharacters).toEqual([]);
    expect(result.current.resultCount).toBe(0);
  });
});
