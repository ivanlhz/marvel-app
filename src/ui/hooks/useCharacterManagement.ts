import { useState, useEffect } from 'react';
import { Character } from '@/core/dbapi';
import { useCharacters, useFilterCharacters } from '@/ui/hooks/queries/useCharacters';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { useSearchValue } from '../context/searchValueContext';

/**
 * Hook para gestionar los personajes, búsquedas y filtros en la página Home
 * Sigue el principio de responsabilidad única al separar esta lógica del componente
 */
export const useCharacterManagement = (
  currentPage: number,
  showFavoritesCharacters: boolean,
  favoriteCharacters: Character[]
) => {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const { searchValue } = useSearchValue();
  const { favoriteCount } = useFavoriteContext();

  // Consultas para obtener datos
  const { data: charactersQuery } = useCharacters(currentPage, 50);
  const { data: searchQuery } = useFilterCharacters(searchValue);

  // Efecto para cargar personajes cuando cambia la página o el modo
  useEffect(() => {
    if (charactersQuery && !searchValue && !showFavoritesCharacters) {
      setFilteredCharacters(charactersQuery.items);
    }
  }, [charactersQuery, searchValue, showFavoritesCharacters]);

  // Efecto para actualizar resultados de búsqueda
  useEffect(() => {
    console.log('searchQuery', searchQuery)
    if (searchQuery?.length) {
      setFilteredCharacters(searchQuery);
    }
  }, [searchQuery]);

  // Efecto para mostrar favoritos cuando se cambia a ese modo
  useEffect(() => {
    if (showFavoritesCharacters) {
      setFilteredCharacters(favoriteCharacters);
    }
  }, [showFavoritesCharacters, favoriteCharacters]);

  // Calcular el número de resultados según el modo y la búsqueda
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
