import React from 'react';
import './CharacterDescription.css';

interface CharacterDescriptionProps {
  description: string;
}

export const CharacterDescription: React.FC<CharacterDescriptionProps> = ({ description }) => {
  return <p className="character-description">{description}</p>;
};

export default CharacterDescription;
