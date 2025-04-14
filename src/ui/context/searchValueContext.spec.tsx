import { render, screen, fireEvent } from '@testing-library/react';
import { SearchValueProvider, useSearchValue } from './searchValueContext';
import { act } from 'react';

const TestComponent = () => {
  const { searchValue, clearSearchValue, handleSearchChange } = useSearchValue();

  return (
    <div>
      <div data-testid="search-value">{searchValue}</div>
      <input data-testid="search-input" value={searchValue} onChange={handleSearchChange} />
      <button data-testid="clear-button" onClick={clearSearchValue}>
        Clear
      </button>
    </div>
  );
};

describe('SearchValueContext', () => {
  const renderSearchContext = () => {
    return render(
      <SearchValueProvider>
        <TestComponent />
      </SearchValueProvider>
    );
  };

  it('should provide an empty initial search value', () => {
    renderSearchContext();

    const searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('');
  });

  it('should update search value when input changes', () => {
    renderSearchContext();

    const searchInput = screen.getByTestId('search-input');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Goku' } });
    });

    const searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('Goku');
  });

  it('should clear search value when clearSearchValue is called', () => {
    renderSearchContext();

    const searchInput = screen.getByTestId('search-input');
    const clearButton = screen.getByTestId('clear-button');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Vegeta' } });
    });

    let searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('Vegeta');

    act(() => {
      fireEvent.click(clearButton);
    });

    searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('');
  });

  it('should throw an error if used outside of Provider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useSearchValueContext should be used within SearchValueProvider.');

    consoleErrorSpy.mockRestore();
  });

  it('should handle multiple value changes', () => {
    renderSearchContext();

    const searchInput = screen.getByTestId('search-input');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'G' } });
    });

    let searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('G');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Go' } });
    });

    searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('Go');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Gok' } });
    });

    searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('Gok');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Goku' } });
    });

    searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('Goku');
  });

  it('should maintain state between renders', () => {
    const { rerender } = renderSearchContext();

    const searchInput = screen.getByTestId('search-input');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Piccolo' } });
    });

    let searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('Piccolo');

    rerender(
      <SearchValueProvider>
        <TestComponent />
      </SearchValueProvider>
    );

    searchValue = screen.getByTestId('search-value');
    expect(searchValue.textContent).toBe('Piccolo');
  });
});
