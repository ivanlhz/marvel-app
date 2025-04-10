import React from 'react';
import { Logo } from '@/ui/components/atoms/Logo';
import { HeartButton } from '@/ui/components/atoms/HeartButton';
import './Navbar.css';

interface NavbarProps {
  favoriteCount?: number;
  onLogoClick?: () => void;
  onFavoritesClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoriteCount = 0,
  onLogoClick,
  onFavoritesClick,
}) => {
  const showHeartButton = onFavoritesClick !== undefined;
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Logo onClick={onLogoClick} />
        {showHeartButton && (
          <HeartButton
            active={true}
            count={favoriteCount}
            showCount={true}
            onClick={onFavoritesClick}
          />
        )}
      </div>
    </nav>
  );
};
