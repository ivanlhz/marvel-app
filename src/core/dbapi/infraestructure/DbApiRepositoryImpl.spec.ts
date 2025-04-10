import { createDbApiRepository } from './DbApiRepositoryImpl';
import {
  Character,
  CharactersWithPagination,
  CharacterWithTransformationsAndPlanet,
} from '@/core/dbapi';
import { Result } from '@/core/common/result';

jest.mock('@/core/common/fetchData', () => ({
  fetchData: jest.fn(),
}));

import { fetchData } from '@/core/common/fetchData';

const BASE_URL = 'https://dragonball-api.com/api';

describe('DbApiRepository', () => {
  const repository = createDbApiRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCharacters', () => {
    test('should return characters with pagination', async () => {
      const mockResponse: Result<CharactersWithPagination> = {
        isError: false,
        isSuccess: true,
        value: {
          items: [
            {
              id: '1',
              name: 'Goku',
              ki: '50000',
              maxKi: '100000',
              race: 'Saiyan',
              gender: 'Male',
              description: 'Protagonista de Dragon Ball',
              image: 'goku.jpg',
              affiliation: 'Z Warriors',
            },
          ],
          meta: {
            totalItems: 100,
            itemCount: 1,
            itemsPerPage: 10,
            totalPages: 10,
            currentPage: 1,
          },
          links: {
            first: `${BASE_URL}/characters?page=1&limit=10`,
            previous: null,
            next: `${BASE_URL}/characters?page=2&limit=10`,
            last: `${BASE_URL}/characters?page=10&limit=10`,
          },
        },
      };

      (fetchData as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await repository.getCharacters(1, 10);
      expect(result).toEqual(mockResponse);
      expect(result.value?.items.length).toBe(1);
      expect(result.value?.items[0].name).toBe('Goku');
      expect(fetchData).toHaveBeenCalledWith(`${BASE_URL}/characters?page=1&limit=10`);
    });

    test('should handle errors when getting characters', async () => {
      const error = new Error('Error de API');
      (fetchData as jest.Mock).mockRejectedValueOnce(error);

      await expect(repository.getCharacters(1, 10)).rejects.toEqual(error);
      expect(fetchData).toHaveBeenCalledWith(`${BASE_URL}/characters?page=1&limit=10`);
    });
  });

  describe('getCharacterById', () => {
    test('should return a character with transformations and planet', async () => {
      const mockResponse: Result<CharacterWithTransformationsAndPlanet> = {
        isError: false,
        isSuccess: true,
        value: {
          id: '1',
          name: 'Goku',
          ki: '50000',
          maxKi: '100000',
          race: 'Saiyan',
          gender: 'Male',
          description: 'Protagonista de Dragon Ball',
          image: 'goku.jpg',
          affiliation: 'Z Warriors',
          transformations: [
            {
              id: '1',
              name: 'Super Saiyan',
              image: 'ssj.jpg',
              ki: '150000',
            },
          ],
          originPlanet: {
            id: '1',
            name: 'Planeta Vegeta',
            isDestroyed: true,
            description: 'Planeta de origen de los Saiyans',
            image: 'vegeta-planet.jpg',
          },
        },
      };

      (fetchData as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await repository.getCharacterById(1);
      expect(result).toEqual(mockResponse);
      expect(result.value?.name).toBe('Goku');
      expect(result.value?.transformations.length).toBe(1);
      expect(result.value?.originPlanet.name).toBe('Planeta Vegeta');
      expect(fetchData).toHaveBeenCalledWith(`${BASE_URL}/characters/1`);
    });

    test('should return an error', async () => {
      const error = new Error('Error 404');
      (fetchData as jest.Mock).mockRejectedValueOnce(error);
      await expect(repository.getCharacterById(999)).rejects.toEqual(error);
      expect(fetchData).toHaveBeenCalledWith(`${BASE_URL}/characters/999`);
    });
  });

  describe('filterCharacters', () => {
    test('should filter characters by name', async () => {
      const mockResponse: Result<Character[]> = {
        isError: false,
        isSuccess: true,
        value: [
          {
            id: '1',
            name: 'Goku',
            ki: '50000',
            maxKi: '100000',
            race: 'Saiyan',
            gender: 'Male',
            description: 'Protagonista de Dragon Ball',
            image: 'goku.jpg',
            affiliation: 'Z Warriors',
          },
        ],
      };

      (fetchData as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await repository.filterCharacters('Goku');
      expect(result).toEqual(mockResponse);
      if (result.value) {
        expect(result.value.length).toBe(1);
        expect(result.value[0].name).toBe('Goku');
      }
      expect(fetchData).toHaveBeenCalledWith(`${BASE_URL}/characters?name=Goku`);
    });

    test('should return an error', async () => {
      const error = new Error('Error de API');
      (fetchData as jest.Mock).mockRejectedValueOnce(error);

      await expect(repository.filterCharacters('HOLA')).rejects.toEqual(error);
      expect(fetchData).toHaveBeenCalledWith(`${BASE_URL}/characters?name=HOLA`);
    });
  });
});
