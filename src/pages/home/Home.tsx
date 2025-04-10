import { useState, useEffect, ChangeEvent } from 'react';
import { CharacterGrid } from '@/ui/components/organisms/CharacterGrid';
import { mockCharacters, Character } from '@/mocks/characters';
import './Home.css';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { SearchBar } from '@/ui/components/molecules/SearchBar';

interface HomePageProps {
  showAllCharacters: boolean;
}

const HomePage = ({ showAllCharacters }: HomePageProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { addFavoriteCharacter, setAllFavoriteCharacters } = useFavoriteContext();

  useEffect(() => {
    setCharacters(mockCharacters);
    setFilteredCharacters(mockCharacters);
    const initialFavorites = mockCharacters.filter(char => char.isFavorite);
    setAllFavoriteCharacters(initialFavorites.map(({ id }) => id));
  }, []);

  useEffect(() => {
    if (!showAllCharacters) {
      const onlyFavorites = characters.filter(char => char.isFavorite);
      setFilteredCharacters(onlyFavorites);
    } else if (searchValue === '') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [showAllCharacters, characters, searchValue]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === '') {
      setFilteredCharacters(
        showAllCharacters ? characters : characters.filter(char => char.isFavorite)
      );
    } else {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  };

  const handleFavoriteToggle = (id: string) => {
    const updatedCharacters = characters.map(character => {
      if (character.id === id) {
        return {
          ...character,
          isFavorite: !character.isFavorite,
        };
      }
      return character;
    });

    setCharacters(updatedCharacters);

    const updatedFiltered = filteredCharacters.map(character => {
      if (character.id === id) {
        return {
          ...character,
          isFavorite: !character.isFavorite,
        };
      }
      return character;
    });

    setFilteredCharacters(updatedFiltered);
    addFavoriteCharacter(id);
  };

  return (
    <div className="home-container">
      <SearchBar
        searchValue={searchValue}
        resultCount={filteredCharacters.length}
        onSearchChange={handleSearchChange}
      />
      <main className="main-content">
        <CharacterGrid characters={filteredCharacters} onFavoriteToggle={handleFavoriteToggle} />
      </main>
    </div>
  );
};

export default HomePage;
