import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

// Mock de los componentes
jest.mock('@/ui/components/atoms/PaginationButton/PaginationButton', () => {
  return function MockPaginationButton({ children, disabled, onClick }: any) {
    return (
      <button data-testid="pagination-button" disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  };
});

jest.mock('@/ui/components/atoms/PaginationInfo/PaginationInfo', () => {
  return function MockPaginationInfo({ currentPage, totalPages }: any) {
    return (
      <span data-testid="pagination-info">
        Página {currentPage} de {totalPages}
      </span>
    );
  };
});

describe('Pagination', () => {
  it('should render pagination with buttons and info', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onNextPage={jest.fn()}
        onPreviousPage={jest.fn()}
      />
    );

    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Anterior');
    expect(buttons[1]).toHaveTextContent('Siguiente');

    expect(screen.getByTestId('pagination-info')).toHaveTextContent('Página 2 de 5');
  });

  it('should disable previous button when on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onNextPage={jest.fn()}
        onPreviousPage={jest.fn()}
      />
    );

    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('should disable next button when on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onNextPage={jest.fn()}
        onPreviousPage={jest.fn()}
      />
    );

    const buttons = screen.getAllByTestId('pagination-button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('should call onPreviousPage when previous button is clicked', () => {
    const handlePreviousPage = jest.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onNextPage={jest.fn()}
        onPreviousPage={handlePreviousPage}
      />
    );

    const buttons = screen.getAllByTestId('pagination-button');
    fireEvent.click(buttons[0]);
    expect(handlePreviousPage).toHaveBeenCalledTimes(1);
  });

  it('should call onNextPage when next button is clicked', () => {
    const handleNextPage = jest.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onNextPage={handleNextPage}
        onPreviousPage={jest.fn()}
      />
    );

    const buttons = screen.getAllByTestId('pagination-button');
    fireEvent.click(buttons[1]);
    expect(handleNextPage).toHaveBeenCalledTimes(1);
  });
});
