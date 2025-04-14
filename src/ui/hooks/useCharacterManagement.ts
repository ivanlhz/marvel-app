import { useState, useEffect } from 'react';
import { Character } from '@/core/dbapi';
import { useCharacters, useFilterCharacters } from '@/ui/hooks/queries/useCharacters';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { useSearchValue } from '../context/searchValueContext';

export const useCharacterManagement = (
  currentPage: number,
  showFavoritesCharacters: boolean,
  favoriteCharacters: Character[]
) => {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const { searchValue } = useSearchValue();
  const { favoriteCount } = useFavoriteContext();

  const { data: charactersQuery } = useCharacters(currentPage, 50);
  const { data: searchQuery } = useFilterCharacters(searchValue);

  // Efecto para cargar personajes cuando cambia la página o el modo
  useEffect(() => {
    if (charactersQuery && !searchValue && !showFavoritesCharacters) {
      setFilteredCharacters(charactersQuery.items);
    }
  }, [charactersQuery, searchValue, showFavoritesCharacters]);

  useEffect(() => {
    if (searchQuery?.length) {
      setFilteredCharacters(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (showFavoritesCharacters) {
      setFilteredCharacters(favoriteCharacters);
    }
  }, [showFavoritesCharacters, favoriteCharacters]);

  const getResultCount = (): number => {
    if (showFavoritesCharacters) {
      return favoriteCount;
    }
    return !searchValue ? charactersQuery?.meta.totalItems || 0 : filteredCharacters.length;
  };

  return {
    filteredCharacters,
    charactersQuery,
    resultCount: getResultCount(),
  };
};
