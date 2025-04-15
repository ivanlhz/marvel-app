import { render, screen } from '@testing-library/react';
import PaginationInfo from './PaginationInfo';

describe('PaginationInfo', () => {
  it('should render the current page and total pages', () => {
    render(<PaginationInfo currentPage={2} totalPages={5} />);

    expect(screen.getByText('Página 2 de 5')).toBeInTheDocument();
  });

  it('should render correctly when current page is 1', () => {
    render(<PaginationInfo currentPage={1} totalPages={3} />);

    expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
  });

  it('should render correctly when current page equals total pages', () => {
    render(<PaginationInfo currentPage={10} totalPages={10} />);

    expect(screen.getByText('Página 10 de 10')).toBeInTheDocument();
  });
});
