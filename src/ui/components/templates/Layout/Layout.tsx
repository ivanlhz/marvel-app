import React from 'react';
import { Navbar } from '@/ui/components/molecules/Navbar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  favoriteCount: number;
  onLogoClick?: () => void;
  onFavoritesClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  favoriteCount,
  onLogoClick,
  onFavoritesClick,
}) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <Navbar
          favoriteCount={favoriteCount}
          onLogoClick={onLogoClick}
          onFavoritesClick={onFavoritesClick}
        />
      </header>
      <main className="layout-content">{children}</main>
    </div>
  );
};
