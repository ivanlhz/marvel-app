import React from 'react';

interface CharacterDescriptionProps {
  description: string;
}

export const CharacterDescription: React.FC<CharacterDescriptionProps> = ({ description }) => {
  return <p className="character-description">{description}</p>;
};

export default CharacterDescription;
