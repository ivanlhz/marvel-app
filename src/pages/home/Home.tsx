import { useState, useEffect, ChangeEvent } from 'react';
import { CharacterGrid } from '@/ui/components/organisms/CharacterGrid';
import './Home.css';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { SearchBar } from '@/ui/components/molecules/SearchBar';
import { useCharacters, useFilterCharacters } from '@/ui/hooks/queries/useCharacters';
import { Character } from '@/core/dbapi';

interface HomePageProps {
  showAllCharacters: boolean;
  handleShowAllCharacters: () => void;
}

const HomePage = ({ showAllCharacters, handleShowAllCharacters }: HomePageProps) => {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { addFavoriteCharacter, favoriteCharacters, favoriteCount } = useFavoriteContext();

  const { data: charactersQuery } = useCharacters(currentPage, 50);
  const { data: searchQuery } = useFilterCharacters(searchValue);

  const getResultCount = () => {
    if (!showAllCharacters) {
      return favoriteCount;
    }
    return !searchValue ? charactersQuery?.meta.totalItems : filteredCharacters.length;
  };

  console.log(showAllCharacters);
  useEffect(() => {
    if (charactersQuery && !searchValue.length && showAllCharacters) {
      setFilteredCharacters(charactersQuery.items);
    }
  }, [charactersQuery, searchValue, showAllCharacters]);

  useEffect(() => {
    if (searchValue.length && searchQuery) {
      setFilteredCharacters(searchQuery);
    }
  }, [searchQuery, searchValue]);

  useEffect(() => {
    if (!showAllCharacters) {
      setFilteredCharacters(favoriteCharacters);
    }
    setSearchValue('');
  }, [showAllCharacters, favoriteCharacters]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleFavoriteToggle = (id: string) => {
    filteredCharacters.forEach(character => {
      if (character.id === id) {
        addFavoriteCharacter(character);
      }
      return character;
    });
  };

  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const clearSearchValue = () => {
    setSearchValue('');
    handleShowAllCharacters();
  };

  return (
    <div className="home-container">
      <SearchBar
        searchValue={searchValue}
        resultCount={getResultCount() || 0}
        onSearchChange={handleSearchChange}
        onClearClick={clearSearchValue}
      />
      <main className="main-content">
        <CharacterGrid
          characters={filteredCharacters}
          onFavoriteToggle={handleFavoriteToggle}
          favoriteIds={favoriteCharacters.map(({ id }) => id)}
        />
      </main>
      {!searchValue && charactersQuery && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {charactersQuery.meta.totalPages}
          </span>
          <button
            disabled={currentPage === charactersQuery.meta.totalPages}
            onClick={() => handlePagination(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
