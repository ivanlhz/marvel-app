import React from 'react';
import './Logo.css';

interface LogoProps {
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div className="logo" onClick={onClick}>
      <img src="/marvel-logo.svg" alt="Marvel Logo" />
    </div>
  );
};
