import React, { ChangeEvent } from 'react';
import { SearchInput } from '@/ui/components/atoms/SearchInput';
import { ResultCounter } from '@/ui/components/atoms/ResultCounter';
import './SearchBar.css';

interface SearchBarProps {
  searchValue: string;
  resultCount: number;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearClick: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  resultCount,
  onSearchChange,
  onClearClick,
}) => {
  return (
    <div className="search-bar">
      <SearchInput value={searchValue} onChange={onSearchChange} onClearClick={onClearClick} />
      <ResultCounter count={resultCount} />
    </div>
  );
};
