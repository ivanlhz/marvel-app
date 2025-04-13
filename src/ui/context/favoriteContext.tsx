import { Character } from '@/core/dbapi';
import { createContext, useContext, useState } from 'react';

export interface FavoriteContextProps {
  favoriteCount: number;
  favoriteCharacters: Character[];
  addFavoriteCharacter: (character: Character) => void;
  setAllFavoriteCharacters: (character: Character[]) => void;
  hideFavorites: () => void;
  showFavorites: () => void;
  isFavoritesShowed: boolean;
}

export const FavoriteContext = createContext<FavoriteContextProps | null>(null);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [showFavoritesCharacters, setShowFavoritesCharacters] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const favoriteCount = favoriteCharacters.length;

  const addFavoriteCharacter = (character: Character) => {
    if (favoriteCharacters.find(char => char.id === character.id)) {
      setFavoriteCharacters(prev => prev.filter(char => char.id !== character.id));
    } else {
      setFavoriteCharacters(prev => [...prev, character]);
    }
  };

  const setAllFavoriteCharacters = (characters: Character[]) => {
    setFavoriteCharacters(characters);
  };

  const showFavorites = () => {
    setShowFavoritesCharacters(true);
  };
  const hideFavorites = () => {
    setShowFavoritesCharacters(false);
  };

  return (
    <FavoriteContext
      value={{
        favoriteCount,
        favoriteCharacters,
        addFavoriteCharacter,
        setAllFavoriteCharacters,
        hideFavorites,
        showFavorites,
        isFavoritesShowed: showFavoritesCharacters,
      }}
    >
      {children}
    </FavoriteContext>
  );
};

export const useFavoriteContext = () => {
  const context = useContext<FavoriteContextProps | null>(FavoriteContext);
  if (!context) {
    throw new Error('useFavoriteContext should be used within a FavoriteProvider');
  }
  return context;
};
