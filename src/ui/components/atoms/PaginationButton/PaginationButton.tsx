import React from 'react';
import './PaginationButton.css';

interface PaginationButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ disabled, onClick, children }) => {
  return (
    <button className="pagination-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default PaginationButton;
