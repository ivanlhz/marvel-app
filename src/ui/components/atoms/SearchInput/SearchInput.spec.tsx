import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  test('renders search input with default placeholder', () => {
    const handleChange = jest.fn();

    render(<SearchInput value="" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText('SEARCH A CHARACTER...');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  test('renders search input with custom placeholder', () => {
    const handleChange = jest.fn();
    const customPlaceholder = 'Buscar personaje...';

    render(<SearchInput value="" onChange={handleChange} placeholder={customPlaceholder} />);

    const inputElement = screen.getByPlaceholderText(customPlaceholder);

    expect(inputElement).toBeInTheDocument();
  });

  test('displays the provided value', () => {
    const handleChange = jest.fn();
    const inputValue = 'Iron Man';

    render(<SearchInput value={inputValue} onChange={handleChange} />);

    const inputElement = screen.getByDisplayValue(inputValue);

    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();

    render(<SearchInput value="" onChange={handleChange} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Thor' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders search icon', () => {
    const handleChange = jest.fn();

    render(<SearchInput value="" onChange={handleChange} />);

    const searchIconContainer = screen.getByTestId('search-icon');
    const svgElement = searchIconContainer.querySelector('svg');

    expect(searchIconContainer).toBeInTheDocument();
    expect(svgElement).toBeInTheDocument();
  });
});
