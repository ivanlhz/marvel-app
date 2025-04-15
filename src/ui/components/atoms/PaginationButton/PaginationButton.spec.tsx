import { render, screen, fireEvent } from '@testing-library/react';
import PaginationButton from './PaginationButton';

describe('PaginationButton', () => {
  it('should render the button with children', () => {
    render(
      <PaginationButton disabled={false} onClick={jest.fn()}>
        Test Button
      </PaginationButton>
    );

    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <PaginationButton disabled={true} onClick={jest.fn()}>
        Test Button
      </PaginationButton>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(
      <PaginationButton disabled={false} onClick={jest.fn()}>
        Test Button
      </PaginationButton>
    );

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <PaginationButton disabled={false} onClick={handleClick}>
        Test Button
      </PaginationButton>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled and clicked', () => {
    const handleClick = jest.fn();
    render(
      <PaginationButton disabled={true} onClick={handleClick}>
        Test Button
      </PaginationButton>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
