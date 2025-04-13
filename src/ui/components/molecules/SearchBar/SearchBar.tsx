import React from 'react';
import { SearchInput } from '@/ui/components/atoms/SearchInput';
import { ResultCounter } from '@/ui/components/atoms/ResultCounter';
import { useSearchValue } from '@/ui/context/searchValueContext';
import './SearchBar.css';

interface SearchBarProps {
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ resultCount }) => {
  const { searchValue, handleSearchChange, clearSearchValue } = useSearchValue();

  return (
    <div className="search-bar">
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        onClearClick={clearSearchValue}
      />
      <ResultCounter count={resultCount} />
    </div>
  );
};
