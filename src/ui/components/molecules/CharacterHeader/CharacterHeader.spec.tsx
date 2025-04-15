import { render, screen, fireEvent } from '@testing-library/react';
import CharacterHeader from './CharacterHeader';

// Mock de los componentes
jest.mock('@/ui/components/atoms/CharacterTitle', () => {
  return function MockCharacterTitle(props: any) {
    return <h1 data-testid="character-title">{props.title}</h1>;
  };
});

jest.mock('@/ui/components/molecules/HeartButton', () => ({
  HeartButton: function MockHeartButton(props: any) {
    return (
      <button data-testid="heart-button" data-active={props.active} onClick={props.onClick}>
        Favorito
      </button>
    );
  },
}));

describe('CharacterHeader', () => {
  it('should render the character title and heart button', () => {
    const handleFavoriteToggle = jest.fn();

    render(
      <CharacterHeader title="Goku" isFavorite={true} onFavoriteToggle={handleFavoriteToggle} />
    );
    expect(screen.getByTestId('character-title')).toHaveTextContent('Goku');
    const heartButton = screen.getByTestId('heart-button');
    expect(heartButton).toHaveAttribute('data-active', 'true');
  });

  it('should call onFavoriteToggle when heart button is clicked', () => {
    const handleFavoriteToggle = jest.fn();

    render(
      <CharacterHeader title="Goku" isFavorite={false} onFavoriteToggle={handleFavoriteToggle} />
    );
    fireEvent.click(screen.getByTestId('heart-button'));
    expect(handleFavoriteToggle).toHaveBeenCalledTimes(1);
  });
});
