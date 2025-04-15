import React from 'react';
import CharacterImage from '@/ui/components/atoms/CharacterImage';
import CharacterHeader from '@/ui/components/molecules/CharacterHeader/CharacterHeader';
import CharacterDescription from '@/ui/components/atoms/CharacterDescription/CharacterDescription';
import { Character } from '@/core/domain/models/Character';
import './CharacterHero.css';

interface CharacterHeroProps {
  character: Character;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const CharacterHero: React.FC<CharacterHeroProps> = ({
  character,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className="hero-section">
      <div className="container">
        <CharacterImage src={character.image} alt={character.name} className="detail-hero" />
        <div className="character-info">
          <CharacterHeader
            title={character.name}
            isFavorite={isFavorite}
            onFavoriteToggle={onFavoriteToggle}
          />
          <CharacterDescription description={character.description} />
        </div>
      </div>
    </div>
  );
};

export default CharacterHero;
