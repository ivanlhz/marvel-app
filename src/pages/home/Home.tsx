import { useEffect } from 'react';
import { CharacterGrid } from '@/ui/components/organisms/CharacterGrid';
import './Home.css';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { SearchBar } from '@/ui/components/molecules/SearchBar';
import { usePagination } from '@/ui/hooks/pagination/usePagination';
import { useCharacterManagement } from '@/ui/hooks/useCharacterManagement';
import { useSearchValue } from '@/ui/context/searchValueContext';
import Pagination from '@/ui/components/molecules/Pagination/Pagination';

interface HomePageProps {
  showFavoritesCharacters: boolean;
}

const HomePage = ({ showFavoritesCharacters }: HomePageProps) => {
  const { addFavoriteCharacter, favoriteCharacters, isFavoritesShowed } = useFavoriteContext();
  const { currentPage, goNextPage, goBackPage } = usePagination();

  const { filteredCharacters, charactersQuery, resultCount } = useCharacterManagement(
    currentPage,
    showFavoritesCharacters,
    favoriteCharacters
  );
  const { clearSearchValue } = useSearchValue();

  useEffect(() => {
    if (showFavoritesCharacters) {
      clearSearchValue();
    }
  }, [showFavoritesCharacters]);

  const handleFavoriteToggle = (id: string) => {
    const character = filteredCharacters.find(character => character.id === id);
    if (character) {
      addFavoriteCharacter(character);
    }
  };

  return (
    <div className="home-container">
      <SearchBar resultCount={resultCount} />
      <main className="main-content">
        <CharacterGrid
          characters={filteredCharacters}
          onFavoriteToggle={handleFavoriteToggle}
          favoriteIds={favoriteCharacters.map(({ id }) => id)}
        />
      </main>
      {!isFavoritesShowed && charactersQuery && charactersQuery.meta.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={charactersQuery.meta.totalPages}
          onNextPage={goNextPage}
          onPreviousPage={goBackPage}
        />
      )}
    </div>
  );
};

export default HomePage;
