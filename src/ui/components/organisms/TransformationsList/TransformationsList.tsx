import React from 'react';
import TransformationTitle from '@/ui/components/atoms/TransformationTitle/TransformationTitle';
import NoTransformationsMessage from '@/ui/components/atoms/NoTransformationsMessage/NoTransformationsMessage';
import TransformationCard from '@/ui/components/molecules/TransformationCard/TransformationCard';
import { Transformation } from '@/core/domain/models/Character';
import './TransformationsList.css';

interface TransformationsListProps {
  transformations: Transformation[];
}

const TransformationsList: React.FC<TransformationsListProps> = ({ transformations }) => {
  if (!transformations.length) {
    return <NoTransformationsMessage />;
  }

  return (
    <>
      <TransformationTitle title="Transformaciones" />
      <div className="transformations-grid">
        {transformations.map(transformation => (
          <TransformationCard key={transformation.id} transformation={transformation} />
        ))}
      </div>
    </>
  );
};

export default TransformationsList;
