import { useEffect } from 'react';
import { CharacterGrid } from '@/ui/components/organisms/CharacterGrid';
import './Home.css';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { SearchBar } from '@/ui/components/molecules/SearchBar';
import { usePagination } from '@/ui/hooks/pagination/usePagination';
import { useCharacterManagement } from '@/ui/hooks/useCharacterManagement';

interface HomePageProps {
  showAllCharacters: boolean;
  handleShowAllCharacters: () => void;
}

const HomePage = ({ showAllCharacters, handleShowAllCharacters }: HomePageProps) => {
  const { addFavoriteCharacter, favoriteCharacters } = useFavoriteContext();
  const { currentPage, goNextPage, goBackPage } = usePagination();

  const {
    filteredCharacters,
    searchValue,
    clearSearchValue,
    handleSearchChange,
    charactersQuery,
    resultCount,
  } = useCharacterManagement(currentPage, showAllCharacters, favoriteCharacters);

  useEffect(() => {
    if (!showAllCharacters) {
      clearSearchValue();
    }
  }, [showAllCharacters, clearSearchValue]);

  const handleFavoriteToggle = (id: string) => {
    const character = filteredCharacters.find(character => character.id === id);
    if (character) {
      addFavoriteCharacter(character);
    }
  };

  const handleClearSearch = () => {
    clearSearchValue();
    handleShowAllCharacters();
  };

  return (
    <div className="home-container">
      <SearchBar
        searchValue={searchValue}
        resultCount={resultCount}
        onSearchChange={handleSearchChange}
        onClearClick={handleClearSearch}
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
          <button disabled={currentPage === 1} onClick={goBackPage}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {charactersQuery.meta.totalPages}
          </span>
          <button disabled={currentPage === charactersQuery.meta.totalPages} onClick={goNextPage}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
