import { useState, useEffect, ChangeEvent } from 'react';
import { Character } from '@/core/dbapi';
import { useCharacters, useFilterCharacters } from '@/ui/hooks/queries/useCharacters';
import { useFavoriteContext } from '@/ui/context/favoriteContext';

/**
 * Hook para gestionar los personajes, búsquedas y filtros en la página Home
 * Sigue el principio de responsabilidad única al separar esta lógica del componente
 */
export const useCharacterManagement = (
  currentPage: number,
  showAllCharacters: boolean,
  favoriteCharacters: Character[]
) => {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { favoriteCount } = useFavoriteContext();

  // Consultas para obtener datos
  const { data: charactersQuery } = useCharacters(currentPage, 50);
  const { data: searchQuery } = useFilterCharacters(searchValue);

  // Efecto para cargar personajes cuando cambia la página o el modo
  useEffect(() => {
    if (charactersQuery && !searchValue && showAllCharacters) {
      setFilteredCharacters(charactersQuery.items);
    }
  }, [charactersQuery, searchValue, showAllCharacters]);

  // Efecto para actualizar resultados de búsqueda
  useEffect(() => {
    if (searchValue && searchQuery) {
      setFilteredCharacters(searchQuery);
    }
  }, [searchQuery, searchValue]);

  // Efecto para mostrar favoritos cuando se cambia a ese modo
  useEffect(() => {
    if (!showAllCharacters) {
      setFilteredCharacters(favoriteCharacters);
    }
  }, [showAllCharacters, favoriteCharacters]);

  // Calcular el número de resultados según el modo y la búsqueda
  const getResultCount = (): number => {
    if (!showAllCharacters) {
      return favoriteCount;
    }
    return !searchValue ? charactersQuery?.meta.totalItems || 0 : filteredCharacters.length;
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const clearSearchValue = () => {
    setSearchValue('');
  };

  return {
    filteredCharacters,
    searchValue,
    clearSearchValue,
    handleSearchChange,
    charactersQuery,
    resultCount: getResultCount(),
  };
};
