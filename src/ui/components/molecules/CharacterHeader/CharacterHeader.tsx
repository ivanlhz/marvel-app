import React from 'react';
import CharacterTitle from '@/ui/components/atoms/CharacterTitle';
import { HeartButton } from '@/ui/components/molecules/HeartButton';
import './CharacterHeader.css';

interface CharacterHeaderProps {
  title: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({
  title,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className="character-header">
      <CharacterTitle title={title} />
      <HeartButton active={isFavorite} onClick={onFavoriteToggle} />
    </div>
  );
};

export default CharacterHeader;
