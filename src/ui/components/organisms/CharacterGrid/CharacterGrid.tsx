import React from 'react';
import { CharacterCard } from '../../molecules/CharacterCard';
import './CharacterGrid.css';
import { Character } from '@/core/dbapi';
import { useNavigate } from 'react-router-dom';

interface CharacterGridProps {
  characters: Character[];
  onFavoriteToggle: (id: string) => void;
  favoriteIds?: string[];
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  onFavoriteToggle,
  favoriteIds,
}) => {
  const navigate = useNavigate();

  const handleCharacterClick = (characterId: string) => {
    navigate(`/character?id=${characterId}`);
  };

  return (
    <div className="character-grid" data-testid="character-grid">
      {characters.map(character => (
        <div key={character.id} className="character-grid-item">
          <CharacterCard
            imageUrl={character.image}
            name={character.name}
            isFavorite={favoriteIds?.includes(character.id)}
            onFavoriteToggle={() => onFavoriteToggle(character.id)}
            onImageClick={() => handleCharacterClick(character.id)}
          />
        </div>
      ))}
    </div>
  );
};
