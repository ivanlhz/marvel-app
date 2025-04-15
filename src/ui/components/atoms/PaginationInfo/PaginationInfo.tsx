import React from 'react';
import './PaginationInfo.css';

interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({ currentPage, totalPages }) => {
  return (
    <span className="pagination-info">
      Página {currentPage} de {totalPages}
    </span>
  );
};

export default PaginationInfo;
