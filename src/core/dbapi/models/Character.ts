import { Planet } from './Planet';
import { Transformation } from './Transformation';

export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
}

export interface CharacterWithTransformations extends Character {
  transformations: Transformation[];
}
export interface CharacterWithTransformationsAndPlanet extends CharacterWithTransformations {
  originPlanet: Planet;
}

export interface CharactersWithPagination {
  items: Character[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
}
