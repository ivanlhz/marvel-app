import React from 'react';
import { CharacterCard } from '../../atoms/CharacterCard';
import './CharacterGrid.css';

// Definimos la interfaz para un personaje
interface Character {
  id: string;
  name: string;
  imageUrl: string;
  isFavorite?: boolean;
}

interface CharacterGridProps {
  characters: Character[];
  onFavoriteToggle: (id: string) => void;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({ characters, onFavoriteToggle }) => {
  return (
    <div className="character-grid" data-testid="character-grid">
      {characters.map(character => (
        <div key={character.id} className="character-grid-item">
          <CharacterCard
            imageUrl={character.imageUrl}
            name={character.name}
            isFavorite={character.isFavorite}
            onFavoriteToggle={() => onFavoriteToggle(character.id)}
          />
        </div>
      ))}
    </div>
  );
};
