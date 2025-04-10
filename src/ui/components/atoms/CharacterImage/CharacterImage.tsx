import React from 'react';
import './CharacterImage.css';

interface CharacterImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CharacterImage: React.FC<CharacterImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`character-image ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default CharacterImage;
