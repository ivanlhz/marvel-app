import React from 'react';
import './CharacterCard.css';

interface CharacterCardProps {
  imageUrl: string;
  name: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  imageUrl,
  name,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  return (
    <div className="character-card">
      <div className="character-image">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="character-info">
        <h3 className="character-name">{name}</h3>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={onFavoriteToggle}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? (
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              xmlns="http://www.w3.org/2000/svg"
              className="heart-icon filled"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3.80348L6 0.161865L0 3.80348V11.607L12 21.8382L24 11.607V3.80348L18 0.161865L12 3.80348Z"
              />
            </svg>
          ) : (
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              xmlns="http://www.w3.org/2000/svg"
              className="heart-icon outline"
            >
              <path d="M4.42871 1.55237L4.94756 0.697502L4.42871 0.382594L3.90986 0.697502L4.42871 1.55237ZM7.42871 3.37318L6.90986 4.22804L7.42871 4.54295L7.94756 4.22804L7.42871 3.37318ZM1.42871 3.37318L0.909862 2.51831L0.428711 2.81034V3.37318H1.42871ZM1.42871 7.27491H0.428711V7.73644L0.779914 8.03587L1.42871 7.27491ZM7.42871 12.3905L6.77991 13.1515L7.42871 13.7046L8.07751 13.1515L7.42871 12.3905ZM13.4287 7.27491L14.0775 8.03587L14.4287 7.73644V7.27491H13.4287ZM13.4287 3.37318H14.4287V2.81034L13.9476 2.51831L13.4287 3.37318ZM10.4287 1.55237L10.9476 0.697502L10.4287 0.382594L9.90986 0.697502L10.4287 1.55237ZM3.90986 2.40723L6.90986 4.22804L7.94756 2.51831L4.94756 0.697502L3.90986 2.40723ZM1.94756 4.22804L4.94756 2.40723L3.90986 0.697502L0.909862 2.51831L1.94756 4.22804ZM2.42871 7.27491V3.37318H0.428711V7.27491H2.42871ZM8.07751 11.6296L2.07751 6.51395L0.779914 8.03587L6.77991 13.1515L8.07751 11.6296ZM8.07751 13.1515L14.0775 8.03587L12.7799 6.51395L6.77991 11.6296L8.07751 13.1515ZM14.4287 7.27491V3.37318H12.4287V7.27491H14.4287ZM13.9476 2.51831L10.9476 0.697502L9.90986 2.40723L12.9099 4.22804L13.9476 2.51831ZM9.90986 0.697502L6.90986 2.51831L7.94756 4.22804L10.9476 2.40723L9.90986 0.697502Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
