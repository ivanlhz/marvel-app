import React, { ChangeEvent } from 'react';
import { Navbar } from '@/ui/components/molecules/Navbar';
import { SearchBar } from '@/ui/components/molecules/SearchBar';

interface HeaderProps {
  favoriteCount: number;
  searchValue: string;
  resultCount: number;
  onLogoClick?: () => void;
  onFavoritesClick?: () => void;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  searchValue,
  resultCount,
  onLogoClick,
  onFavoritesClick,
  onSearchChange,
}) => {
  return (
    <header className="header">
      <Navbar
        favoriteCount={favoriteCount}
        onLogoClick={onLogoClick}
        onFavoritesClick={onFavoritesClick}
      />
      <SearchBar
        searchValue={searchValue}
        resultCount={resultCount}
        onSearchChange={onSearchChange}
      />
    </header>
  );
};
