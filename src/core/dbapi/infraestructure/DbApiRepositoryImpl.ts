import {
  Character,
  CharactersWithPagination,
  CharacterWithTransformationsAndPlanet,
  DbApiRepository,
} from '@/core/dbapi';
import { fetchData } from '@/core/common/fetchData';
import { Result } from '@/core/common/result';

const BASE_URL = 'https://dragonball-api.com/api';

export const createDbApiRepository = (): DbApiRepository => {
  const getCharacters = async (
    page: number,
    limit: number
  ): Promise<Result<CharactersWithPagination>> => {
    const url = `${BASE_URL}/characters?page=${page}&limit=${limit}`;
    return fetchData<CharactersWithPagination>(url);
  };

  const getCharacterById = async (
    id: string
  ): Promise<Result<CharacterWithTransformationsAndPlanet>> => {
    const url = `${BASE_URL}/characters/${id}`;
    return fetchData<CharacterWithTransformationsAndPlanet>(url);
  };

  const filterCharacters = async (name: string): Promise<Result<Character[]>> => {
    const url = `${BASE_URL}/characters?name=${encodeURIComponent(name)}`;
    return fetchData<Character[]>(url);
  };

  return {
    getCharacters,
    getCharacterById,
    filterCharacters,
  };
};

export default createDbApiRepository();
