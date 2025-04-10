import { useState, useEffect, ChangeEvent } from 'react';
import { Header } from '@/ui/components/organisms/Header';
import { CharacterGrid } from '@/ui/components/organisms/CharacterGrid';
import { mockCharacters, Character } from '@/mocks/characters';
import './Home.css';

export const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setCharacters(mockCharacters);
    setFilteredCharacters(mockCharacters);
    const initialFavorites = mockCharacters.filter(char => char.isFavorite).length;
    setFavoriteCount(initialFavorites);
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === '') {
      setFilteredCharacters(characters);
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

    const newFavoriteCount = updatedCharacters.filter(char => char.isFavorite).length;
    setFavoriteCount(newFavoriteCount);
  };

  const handleLogoClick = () => {
    setSearchValue('');
    setFilteredCharacters(characters);
  };

  const handleFavoritesClick = () => {
    if (searchValue === '' && filteredCharacters.length === characters.length) {
      const onlyFavorites = characters.filter(char => char.isFavorite);
      setFilteredCharacters(onlyFavorites);
    } else {
      setSearchValue('');
      setFilteredCharacters(characters);
    }
  };

  return (
    <div className="home-container">
      <Header
        favoriteCount={favoriteCount}
        searchValue={searchValue}
        resultCount={filteredCharacters.length}
        onLogoClick={handleLogoClick}
        onFavoritesClick={handleFavoritesClick}
        onSearchChange={handleSearchChange}
      />
      <main className="main-content">
        <CharacterGrid characters={filteredCharacters} onFavoriteToggle={handleFavoriteToggle} />
      </main>
    </div>
  );
};
