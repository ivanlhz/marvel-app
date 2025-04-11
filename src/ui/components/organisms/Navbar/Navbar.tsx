import React from 'react';
import { Logo } from '@/ui/components/atoms/Logo';
import { HeartButton } from '@/ui/components/molecules/HeartButton';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()

  const handleLogoClick = () => {
    onLogoClick && onLogoClick()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Logo onClick={handleLogoClick} />
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
