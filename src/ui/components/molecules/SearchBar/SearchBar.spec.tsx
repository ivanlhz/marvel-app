import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { ChangeEvent } from 'react';

jest.mock('../../atoms/SearchInput', () => ({
  SearchInput: ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }) => (
    <input
      data-testid="search-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  ),
}));

jest.mock('../../atoms/ResultCounter', () => ({
  ResultCounter: ({ count }: { count: number }) => (
    <div data-testid="result-counter">{count} resultados</div>
  ),
}));

describe('SearchBar', () => {
  test('renders search input and result counter', () => {
    const handleSearchChange = jest.fn();

    render(<SearchBar searchValue="" resultCount={10} onSearchChange={handleSearchChange} />);

    const searchInput = screen.getByTestId('search-input');
    const resultCounter = screen.getByTestId('result-counter');

    expect(searchInput).toBeInTheDocument();
    expect(resultCounter).toBeInTheDocument();
    expect(resultCounter).toHaveTextContent('10 resultados');
  });

  test('passes searchValue to SearchInput component', () => {
    const handleSearchChange = jest.fn();
    const searchValue = 'Spider-Man';

    render(
      <SearchBar searchValue={searchValue} resultCount={5} onSearchChange={handleSearchChange} />
    );

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toHaveValue(searchValue);
  });

  test('passes resultCount to ResultCounter component', () => {
    const handleSearchChange = jest.fn();
    const resultCount = 42;

    render(
      <SearchBar searchValue="" resultCount={resultCount} onSearchChange={handleSearchChange} />
    );

    const resultCounter = screen.getByTestId('result-counter');

    expect(resultCounter).toHaveTextContent(`${resultCount} resultados`);
  });

  test('calls onSearchChange when input value changes', () => {
    const handleSearchChange = jest.fn();

    render(<SearchBar searchValue="" resultCount={0} onSearchChange={handleSearchChange} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Thor' } });

    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });
});
