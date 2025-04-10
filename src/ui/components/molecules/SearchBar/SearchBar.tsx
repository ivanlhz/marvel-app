import React, { ChangeEvent } from 'react';
import { SearchInput } from '@/ui/components/atoms/SearchInput';
import { ResultCounter } from '@/ui/components/atoms/ResultCounter';
import './SearchBar.css';

interface SearchBarProps {
  searchValue: string;
  resultCount: number;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  resultCount,
  onSearchChange,
}) => {
  return (
    <div className="search-bar">
      <SearchInput value={searchValue} onChange={onSearchChange} />
      <ResultCounter count={resultCount} />
    </div>
  );
};
