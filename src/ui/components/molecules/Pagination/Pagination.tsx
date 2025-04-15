import React from 'react';
import PaginationButton from '@/ui/components/atoms/PaginationButton/PaginationButton';
import PaginationInfo from '@/ui/components/atoms/PaginationInfo/PaginationInfo';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div className="pagination">
      <PaginationButton disabled={currentPage === 1} onClick={onPreviousPage}>
        Anterior
      </PaginationButton>
      <PaginationInfo currentPage={currentPage} totalPages={totalPages} />
      <PaginationButton disabled={currentPage === totalPages} onClick={onNextPage}>
        Siguiente
      </PaginationButton>
    </div>
  );
};

export default Pagination;
