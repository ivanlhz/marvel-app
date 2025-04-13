import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { ChangeEvent } from 'react';
import { SearchValueProvider } from '@/ui/context/searchValueContext';

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

const setup = (resultCount = 0) => {
  render(<SearchValueProvider><SearchBar  resultCount={resultCount} /></SearchValueProvider>);
}


describe('SearchBar', () => {
  test('renders search input and result counter', () => {

    setup(10)

    const searchInput = screen.getByTestId('search-input');
    const resultCounter = screen.getByTestId('result-counter');

    expect(searchInput).toBeInTheDocument();
    expect(resultCounter).toBeInTheDocument();
    expect(resultCounter).toHaveTextContent('10 resultados');
  });
});
