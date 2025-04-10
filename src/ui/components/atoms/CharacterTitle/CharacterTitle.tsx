import React from 'react';
import './CharacterTitle.css';

interface CharacterTitleProps {
  title: string;
}

export const CharacterTitle: React.FC<CharacterTitleProps> = ({ title }) => {
  return <h1 className="character-title">{title}</h1>;
};

export default CharacterTitle;
