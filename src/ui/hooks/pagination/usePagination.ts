import { useState } from 'react';

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const goBackPage = () => {
    setCurrentPage(current => current - 1);
  };

  const goNextPage = () => {
    setCurrentPage(current => current + 1);
  };

  return { currentPage, goToPage, goBackPage, goNextPage };
};
