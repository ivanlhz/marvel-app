import { createContext, useContext, useState } from 'react';

export interface FavoriteContextProps {
  favoriteCount: number;
  favoriteCharacters: string[];
  setFavoriteCharacter: (id: string) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps | null>(null);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<string[]>([]);
  const favoriteCount = favoriteCharacters.length;

  const setFavoriteCharacter = (id: string) => {
    if (favoriteCharacters.includes(id)) {
      setFavoriteCharacters(prev => prev.filter(charId => charId !== id));
    } else {
      setFavoriteCharacters(prev => [...prev, id]);
    }
  };

  return (
    <FavoriteContext value={{ favoriteCount, favoriteCharacters, setFavoriteCharacter }}>
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
