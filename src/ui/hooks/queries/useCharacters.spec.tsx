import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacters, useCharacterById, useFilterCharacters } from './useCharacters';
import dbApiRepository from '@/core/dbapi/infraestructure/DbApiRepositoryImpl';
import React from 'react';
import {
  Character,
  CharactersWithPagination,
  CharacterWithTransformationsAndPlanet,
} from '@/core/dbapi';

jest.mock('@/core/dbapi/infraestructure/DbApiRepositoryImpl', () => ({
  getCharacters: jest.fn(),
  getCharacterById: jest.fn(),
  filterCharacters: jest.fn(),
}));

const createWrapper = () => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'QueryClientProviderWrapper';

  return Wrapper;
};

describe('useCharacters', () => {
  const mockCharactersData: CharactersWithPagination = {
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

  const mockCharacterData: CharacterWithTransformationsAndPlanet = {
    id: '1',
    name: 'Spider-Man',
    ki: '5000',
    maxKi: '10000',
    race: 'Human',
    gender: 'Male',
    description: 'Friendly neighborhood Spider-Man',
    image: 'spider-man.jpg',
    affiliation: 'Avengers',
    transformations: [],
    originPlanet: {
      id: '1',
      name: 'Earth',
      description: 'Home planet',
      image: 'earth.jpg',
      isDestroyed: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch characters successfully', async () => {
    (dbApiRepository.getCharacters as jest.Mock).mockResolvedValue({
      isError: false,
      value: mockCharactersData,
    });

    const { result } = renderHook(() => useCharacters(1, 50), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(dbApiRepository.getCharacters).toHaveBeenCalledWith(1, 50);
    expect(result.current.data).toEqual(mockCharactersData);
  });

  it('should handle error when fetching characters', async () => {
    (dbApiRepository.getCharacters as jest.Mock).mockResolvedValue({
      isError: true,
      error: 'Failed to fetch characters',
    });

    const { result } = renderHook(() => useCharacters(1, 50), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should fetch character by id successfully', async () => {
    (dbApiRepository.getCharacterById as jest.Mock).mockResolvedValue({
      isError: false,
      value: mockCharacterData,
    });

    // Pasamos 1 como ID numérico aunque en el modelo es string
    const { result } = renderHook(() => useCharacterById(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(dbApiRepository.getCharacterById).toHaveBeenCalledWith(1);
    expect(result.current.data).toEqual(mockCharacterData);
  });

  it('should not fetch character when id is not provided', async () => {
    const { result } = renderHook(() => useCharacterById(0), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(dbApiRepository.getCharacterById).not.toHaveBeenCalled();
  });

  it('should filter characters by name successfully', async () => {
    const filteredCharacters: Character[] = [mockCharactersData.items[0]];

    (dbApiRepository.filterCharacters as jest.Mock).mockResolvedValue({
      isError: false,
      value: filteredCharacters,
    });

    const { result } = renderHook(() => useFilterCharacters('Spider'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(dbApiRepository.filterCharacters).toHaveBeenCalledWith('Spider');
    expect(result.current.data).toEqual(filteredCharacters);
  });

  it('should not filter characters when name is empty', async () => {
    const { result } = renderHook(() => useFilterCharacters(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(dbApiRepository.filterCharacters).not.toHaveBeenCalled();
  });

  it('should handle error when filtering characters', async () => {
    (dbApiRepository.filterCharacters as jest.Mock).mockResolvedValue({
      isError: true,
      error: 'Failed to filter characters',
    });

    const { result } = renderHook(() => useFilterCharacters('Spider'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });
});
