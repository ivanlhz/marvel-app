import { Result } from '@/core/common/result';
import {
  Character,
  CharactersWithPagination,
  CharacterWithTransformationsAndPlanet,
} from '@/core/dbapi';

export interface DbApiRepository {
  getCharacters: (page: number, limit: number) => Promise<Result<CharactersWithPagination>>;
  getCharacterById: (id: number) => Promise<Result<CharacterWithTransformationsAndPlanet>>;
  filterCharacters: (name: string) => Promise<Result<Character[]>>;
}
