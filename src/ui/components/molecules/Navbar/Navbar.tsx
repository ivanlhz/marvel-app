import React from 'react';
import { Logo } from '../../atoms/Logo';
import { HeartButton } from '../../atoms/HeartButton';
import './Navbar.css';

interface NavbarProps {
  favoriteCount: number;
  onLogoClick?: () => void;
  onFavoritesClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ favoriteCount, onLogoClick, onFavoritesClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Logo onClick={onLogoClick} />
        <HeartButton
          active={true}
          count={favoriteCount}
          showCount={true}
          onClick={onFavoritesClick}
        />
      </div>
    </nav>
  );
};
