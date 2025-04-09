import React from 'react';
import './ResultCounter.css';

interface ResultCounterProps {
  count: number;
}

export const ResultCounter: React.FC<ResultCounterProps> = ({ count }) => {
  return (
    <div className="result-counter">
      <span>{count} RESULTS</span>
    </div>
  );
};
