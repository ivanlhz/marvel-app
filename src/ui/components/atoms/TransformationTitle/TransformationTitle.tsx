import React from 'react';
import './TransformationTitle.css';

interface TransformationTitleProps {
  title: string;
}

const TransformationTitle: React.FC<TransformationTitleProps> = ({ title }) => {
  return <h2 className="transformation-title">{title}</h2>;
};

export default TransformationTitle;
