import { render, screen } from '@testing-library/react';
import TransformationCard from './TransformationCard';

// Mock del componente CharacterImage
jest.mock('@/ui/components/atoms/CharacterImage', () => {
  return function MockCharacterImage(props: any) {
    return <div data-testid="character-image" {...props} />;
  };
});

describe('TransformationCard', () => {
  const mockTransformation = {
    id: 't1',
    name: 'Super Saiyan',
    image: 'ssj.jpg',
    ki: '8000',
  };

  it('should render the transformation card correctly', () => {
    render(<TransformationCard transformation={mockTransformation} />);

    expect(screen.getByText('Super Saiyan')).toBeInTheDocument();
    expect(screen.getByText('8000')).toBeInTheDocument();

    const imageComponent = screen.getByTestId('character-image');
    expect(imageComponent).toHaveAttribute('src', 'ssj.jpg');
    expect(imageComponent).toHaveAttribute('alt', 'Super Saiyan');
  });
});
