import React from 'react';
import logoSvg from 'assets/marvel_logo.svg';
import './Logo.css';

interface LogoProps {
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div className="logo" onClick={onClick} data-testid="logo">
      <img src={logoSvg} alt="Marvel Logo" />
    </div>
  );
};
