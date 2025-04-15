import { render, screen } from '@testing-library/react';
import TransformationTitle from './TransformationTitle';

describe('TransformationTitle', () => {
  it('should render the title correctly', () => {
    render(<TransformationTitle title="Título de Prueba" />);

    expect(screen.getByText('Título de Prueba')).toBeInTheDocument();
  });
});
