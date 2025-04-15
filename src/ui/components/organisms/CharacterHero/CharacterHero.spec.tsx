import { render, screen } from '@testing-library/react';
import CharacterHero from './CharacterHero';

// Mock de los componentes
jest.mock('@/ui/components/atoms/CharacterImage', () => {
  return function MockCharacterImage(props: any) {
    return <div data-testid="character-image" {...props} />;
  };
});

jest.mock('@/ui/components/molecules/CharacterHeader/CharacterHeader', () => {
  return function MockCharacterHeader(props: any) {
    return (
      <div data-testid="character-header" data-title={props.title} data-favorite={props.isFavorite}>
        {props.title}
      </div>
    );
  };
});

jest.mock('@/ui/components/atoms/CharacterDescription/CharacterDescription', () => {
  return function MockCharacterDescription(props: any) {
    return <div data-testid="character-description">{props.description}</div>;
  };
});

describe('CharacterHero', () => {
  const mockCharacter = {
    id: '1',
    name: 'Goku',
    description: 'Saiyan del Planeta Vegeta',
    image: 'goku.jpg',
    transformations: [],
  };

  it('should render the character hero section correctly', () => {
    const handleFavoriteToggle = jest.fn();

    render(
      <CharacterHero
        character={mockCharacter}
        isFavorite={true}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );

    const image = screen.getByTestId('character-image');
    expect(image).toHaveAttribute('src', 'goku.jpg');
    expect(image).toHaveAttribute('alt', 'Goku');

    const header = screen.getByTestId('character-header');
    expect(header).toHaveAttribute('data-title', 'Goku');
    expect(header).toHaveAttribute('data-favorite', 'true');

    const description = screen.getByTestId('character-description');
    expect(description).toHaveTextContent('Saiyan del Planeta Vegeta');
  });
});
