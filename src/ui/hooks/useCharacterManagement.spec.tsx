import { renderHook, act } from '@testing-library/react';
import { useCharacterManagement } from './useCharacterManagement';
import { useCharacters, useFilterCharacters } from '@/ui/hooks/queries/useCharacters';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { Character } from '@/core/dbapi';

jest.mock('@/ui/hooks/queries/useCharacters', () => ({
  useCharacters: jest.fn(),
  useFilterCharacters: jest.fn(),
}));

jest.mock('@/ui/context/favoriteContext', () => ({
  useFavoriteContext: jest.fn(),
}));

describe('useCharacterManagement', () => {
  const mockCharactersData = {
    items: [
      {
        id: '1',
        name: 'Spider-Man',
        ki: '5000',
        maxKi: '10000',
        race: 'Human',
        gender: 'Male',
        description: 'Friendly neighborhood Spider-Man',
        image: 'spider-man.jpg',
        affiliation: 'Avengers',
      },
      {
        id: '2',
        name: 'Iron Man',
        ki: '1000',
        maxKi: '5000',
        race: 'Human',
        gender: 'Male',
        description: 'Genius billionaire',
        image: 'iron-man.jpg',
        affiliation: 'Avengers',
      },
    ],
    meta: {
      totalItems: 2,
      itemCount: 2,
      itemsPerPage: 50,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: 'first-link',
      previous: null,
      next: null,
      last: 'last-link',
    },
  };

  const mockFavoriteCharacters: Character[] = [
    {
      id: '3',
      name: 'Captain America',
      ki: '3000',
      maxKi: '6000',
      race: 'Human',
      gender: 'Male',
      description: 'Super soldier',
      image: 'captain-america.jpg',
      affiliation: 'Avengers',
    },
    {
      id: '4',
      name: 'Thor',
      ki: '9000',
      maxKi: '15000',
      race: 'Asgardian',
      gender: 'Male',
      description: 'God of Thunder',
      image: 'thor.jpg',
      affiliation: 'Avengers',
    },
  ];

  const mockSearchResults: Character[] = [
    {
      id: '5',
      name: 'Black Widow',
      ki: '1500',
      maxKi: '3000',
      race: 'Human',
      gender: 'Female',
      description: 'Master spy',
      image: 'black-widow.jpg',
      affiliation: 'Avengers',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useCharacters as jest.Mock).mockReturnValue({
      data: mockCharactersData,
      isLoading: false,
      error: null,
    });
    (useFilterCharacters as jest.Mock).mockReturnValue({
      data: mockSearchResults,
      isLoading: false,
      error: null,
    });
    (useFavoriteContext as jest.Mock).mockReturnValue({
      favoriteCount: 2,
      favoriteCharacters: mockFavoriteCharacters,
      addFavoriteCharacter: jest.fn(),
      setAllFavoriteCharacters: jest.fn(),
    });
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useCharacterManagement(1, true, mockFavoriteCharacters));

    expect(result.current.filteredCharacters).toEqual(mockCharactersData.items);
    expect(result.current.searchValue).toBe('');
    expect(result.current.resultCount).toBe(mockCharactersData.meta.totalItems);
  });

  it('should update filtered characters when showing favorites', () => {
    const { result } = renderHook(() => useCharacterManagement(1, false, mockFavoriteCharacters));

    expect(result.current.filteredCharacters).toEqual(mockFavoriteCharacters);
    expect(result.current.resultCount).toBe(2);
  });

  it('should handle search input changes', () => {
    const { result } = renderHook(() => useCharacterManagement(1, true, mockFavoriteCharacters));

    act(() => {
      result.current.handleSearchChange({ target: { value: 'Black' } } as any);
    });

    expect(result.current.searchValue).toBe('Black');
  });

  it('should update filtered characters when search results are available', () => {
    const { result, rerender } = renderHook(() =>
      useCharacterManagement(1, true, mockFavoriteCharacters)
    );

    act(() => {
      result.current.handleSearchChange({ target: { value: 'Black' } } as any);
    });

    rerender();

    expect(result.current.filteredCharacters).toEqual(mockSearchResults);
    expect(result.current.resultCount).toBe(1);
  });

  it('should clear search value', () => {
    const { result } = renderHook(() => useCharacterManagement(1, true, mockFavoriteCharacters));

    act(() => {
      result.current.handleSearchChange({ target: { value: 'Black' } } as any);
    });

    expect(result.current.searchValue).toBe('Black');

    act(() => {
      result.current.clearSearchValue();
    });

    expect(result.current.searchValue).toBe('');
    expect(result.current.filteredCharacters).toEqual(mockCharactersData.items);
  });

  it('should return correct result count for different modes', () => {
    (useCharacters as jest.Mock).mockReturnValue({
      data: {
        ...mockCharactersData,
        meta: { ...mockCharactersData.meta, totalItems: 100 },
      },
      isLoading: false,
      error: null,
    });

    const { result: allCharactersResult } = renderHook(() =>
      useCharacterManagement(1, true, mockFavoriteCharacters)
    );

    expect(allCharactersResult.current.resultCount).toBe(100);

    const { result: favoritesResult } = renderHook(() =>
      useCharacterManagement(1, false, mockFavoriteCharacters)
    );

    expect(favoritesResult.current.resultCount).toBe(2);
  });
});
