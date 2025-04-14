import { ChangeEvent, createContext, useContext, useState } from 'react';

export interface SearchValueContextProps {
  searchValue: string;
  clearSearchValue: () => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchValueContext = createContext<SearchValueContextProps | null>(null);

export const SearchValueProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const clearSearchValue = () => {
    setSearchValue('');
  };

  return (
    <SearchValueContext.Provider value={{ searchValue, clearSearchValue, handleSearchChange }}>
      {children}
    </SearchValueContext.Provider>
  );
};

export const useSearchValue = () => {
  const context = useContext(SearchValueContext);

  if (!context) {
    throw new Error('useSearchValueContext should be used within SearchValueProvider.');
  }

  return context;
};
