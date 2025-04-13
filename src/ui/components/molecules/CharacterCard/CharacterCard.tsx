import React from 'react';
import './CharacterCard.css';
import { Heart } from '../../atoms/Heart/Heart';

interface CharacterCardProps {
  imageUrl: string;
  name: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onImageClick?: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  imageUrl,
  name,
  isFavorite = false,
  onFavoriteToggle,
  onImageClick,
}) => {
  return (
    <div className="character-card">
      <div className="character-image" onClick={onImageClick} style={{ cursor: 'pointer' }}>
        <img src={imageUrl} alt={name} />
      </div>
      <div className="character-info">
        <h3 className="character-name">{name}</h3>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={onFavoriteToggle}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart isActive={isFavorite} />
        </button>
      </div>
    </div>
  );
};
