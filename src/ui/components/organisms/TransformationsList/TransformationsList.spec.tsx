import { render, screen } from '@testing-library/react';
import TransformationsList from './TransformationsList';

// Mock de los componentes
jest.mock('@/ui/components/atoms/TransformationTitle/TransformationTitle', () => {
  return function MockTransformationTitle(props: any) {
    return <h2 data-testid="transformation-title">{props.title}</h2>;
  };
});

jest.mock('@/ui/components/atoms/NoTransformationsMessage/NoTransformationsMessage', () => {
  return function MockNoTransformationsMessage() {
    return <h2 data-testid="no-transformations-message">Actualmente no tiene transformaciones.</h2>;
  };
});

jest.mock('@/ui/components/molecules/TransformationCard/TransformationCard', () => {
  return function MockTransformationCard(props: any) {
    return (
      <div data-testid="transformation-card" data-id={props.transformation.id}>
        {props.transformation.name}
      </div>
    );
  };
});

describe('TransformationsList', () => {
  it('should render transformation cards when transformations exist', () => {
    const mockTransformations = [
      { id: 't1', name: 'Super Saiyan', image: 'ssj.jpg', ki: '8000' },
      { id: 't2', name: 'Super Saiyan 2', image: 'ssj2.jpg', ki: '16000' },
    ];

    render(<TransformationsList transformations={mockTransformations} />);

    expect(screen.getByTestId('transformation-title')).toHaveTextContent('Transformaciones');

    const cards = screen.getAllByTestId('transformation-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveAttribute('data-id', 't1');
    expect(cards[0]).toHaveTextContent('Super Saiyan');
    expect(cards[1]).toHaveAttribute('data-id', 't2');
    expect(cards[1]).toHaveTextContent('Super Saiyan 2');
  });

  it('should render no transformations message when transformations array is empty', () => {
    render(<TransformationsList transformations={[]} />);

    expect(screen.getByTestId('no-transformations-message')).toBeInTheDocument();
    expect(screen.getByText('Actualmente no tiene transformaciones.')).toBeInTheDocument();

    expect(screen.queryByTestId('transformation-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('transformation-card')).not.toBeInTheDocument();
  });
});
