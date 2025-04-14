import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  test('renders search input with default placeholder', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();

    render(<SearchInput value="" onChange={handleChange} onClearClick={handleClear} />);

    const inputElement = screen.getByPlaceholderText('SEARCH A CHARACTER...');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  test('renders search input with custom placeholder', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();
    const customPlaceholder = 'Buscar personaje...';

    render(
      <SearchInput
        value=""
        onChange={handleChange}
        placeholder={customPlaceholder}
        onClearClick={handleClear}
      />
    );

    const inputElement = screen.getByPlaceholderText(customPlaceholder);

    expect(inputElement).toBeInTheDocument();
  });

  test('displays the provided value', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();
    const inputValue = 'Iron Man';

    render(<SearchInput value={inputValue} onChange={handleChange} onClearClick={handleClear} />);

    const inputElement = screen.getByDisplayValue(inputValue);

    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();

    render(<SearchInput value="" onChange={handleChange} onClearClick={handleClear} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Thor' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders search icon', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();

    render(<SearchInput value="" onChange={handleChange} onClearClick={handleClear} />);

    const searchIconContainer = screen.getByTestId('search-icon');
    const svgElement = searchIconContainer.querySelector('svg');

    expect(searchIconContainer).toBeInTheDocument();
    expect(svgElement).toBeInTheDocument();
  });

  test('renders close icon when value is not empty', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();

    render(<SearchInput value="Thor" onChange={handleChange} onClearClick={handleClear} />);

    const closeIcon = screen.getByTestId('close-icon');
    expect(closeIcon).toBeInTheDocument();
  });

  test('calls onClearClick when close icon is clicked', () => {
    const handleChange = jest.fn();
    const handleClear = jest.fn();

    render(<SearchInput value="Thor" onChange={handleChange} onClearClick={handleClear} />);

    const closeIcon = screen.getByTestId('close-icon');
    fireEvent.click(closeIcon);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
