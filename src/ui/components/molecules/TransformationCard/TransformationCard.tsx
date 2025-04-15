import React from 'react';
import CharacterImage from '@/ui/components/atoms/CharacterImage';
import { Transformation } from '@/core/dbapi';
import './TransformationCard.css';

interface TransformationCardProps {
  transformation: Transformation;
}

const TransformationCard: React.FC<TransformationCardProps> = ({ transformation }) => {
  return (
    <div className="transformation-card">
      <CharacterImage
        src={transformation.image}
        alt={transformation.name}
        className="transformation-card__image"
      />
      <div className="transformation-info">
        <h3 className="transformation-name">{transformation.name}</h3>
        <p className="transformation-ki">{transformation.ki}</p>
      </div>
    </div>
  );
};

export default TransformationCard;
