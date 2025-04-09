import {
  Character,
  CharactersWithPagination,
  CharacterWithTransformationsAndPlanet,
} from '@/core/dbapi';

export interface DbApiRepository {
  getCharacters: (page: number, limit: number) => Promise<CharactersWithPagination>;
  getCharacterById: (id: number) => Promise<CharacterWithTransformationsAndPlanet | null>;
  filterCharacters: (name: string) => Promise<Character[]>;
}
