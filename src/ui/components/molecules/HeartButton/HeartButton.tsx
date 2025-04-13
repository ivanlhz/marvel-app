import React from 'react';
import './HeartButton.css';
import { Heart } from '../../atoms/Heart/Heart';

interface HeartButtonProps {
  active?: boolean;
  count?: number;
  onClick?: () => void;
  showCount?: boolean;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  active = false,
  count = 0,
  onClick,
  showCount = false,
}) => {
  return (
    <button
      className={`heart-button ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-label={active ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      <Heart isActive={active} />
      {showCount && <span className="heart-count">{count}</span>}
    </button>
  );
};
