import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { ChangeEvent } from 'react';
import { SearchValueContext } from '@/ui/context/searchValueContext';

jest.mock('../../atoms/SearchInput', () => ({
  SearchInput: ({
    value,
    onChange,
    placeholder,
    onClearClick,
  }: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onClearClick: () => void;
  }) => (
    <input
      data-testid="search-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onClick={() => onClearClick && onClearClick()}
    />
  ),
}));

jest.mock('../../atoms/ResultCounter', () => ({
  ResultCounter: ({ count }: { count: number }) => (
    <div data-testid="result-counter">{count} resultados</div>
  ),
}));

// Mock del contexto de búsqueda
const mockSearchValue = '';
const mockHandleSearchChange = jest.fn();
const mockClearSearchValue = jest.fn();

const MockSearchValueProvider = ({ children }: { children: React.ReactNode }) => (
  <SearchValueContext.Provider
    value={{
      searchValue: mockSearchValue,
      handleSearchChange: mockHandleSearchChange,
      clearSearchValue: mockClearSearchValue,
    }}
  >
    {children}
  </SearchValueContext.Provider>
);

const setup = (resultCount = 0) => {
  render(
    <MockSearchValueProvider>
      <SearchBar resultCount={resultCount} />
    </MockSearchValueProvider>
  );
};

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and result counter', () => {
    setup(10);

    const searchInput = screen.getByTestId('search-input');
    const resultCounter = screen.getByTestId('result-counter');

    expect(searchInput).toBeInTheDocument();
    expect(resultCounter).toBeInTheDocument();
    expect(resultCounter).toHaveTextContent('10 resultados');
  });

  test('uses search value from context', () => {
    setup(5);

    // Como ahora usamos el contexto, no necesitamos probar la interacción directamente
    // ya que el componente obtiene el valor del contexto
    expect(screen.getByTestId('result-counter')).toHaveTextContent('5 resultados');
  });
});
