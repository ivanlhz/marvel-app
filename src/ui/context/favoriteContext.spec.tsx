import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteProvider, useFavoriteContext } from './favoriteContext';

const TestComponent = () => {
  const { favoriteCount } = useFavoriteContext();
  return <div>Favorite Count: {favoriteCount}</div>;
};

const TestComponentWithActions = () => {
  const { favoriteCount, setFavoriteCharacter, favoriteCharacters } = useFavoriteContext();
  return (
    <div>
      <p>Favorite Count: {favoriteCount}</p>
      <p>Favorite Characters: {favoriteCharacters.length ? favoriteCharacters[0] : 'Empty list'}</p>
      <button onClick={() => setFavoriteCharacter('1aaa')}>Add</button>
    </div>
  );
};

describe('FavoriteContext', () => {
  it('should return an error', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useFavoriteContext should be used within a FavoriteProvider'
    );
  });

  it('should show the initial values', () => {
    const ContainerTestComponent = () => {
      return (
        <FavoriteProvider>
          <TestComponent />
        </FavoriteProvider>
      );
    };

    render(<ContainerTestComponent />);
    expect(screen.getByText('Favorite Count: 0')).toBeInTheDocument();
  });

  it('should handle the favorite characters', () => {
    const ContainerTestComponent = () => {
      return (
        <FavoriteProvider>
          <TestComponentWithActions />
        </FavoriteProvider>
      );
    };
    render(<ContainerTestComponent />);
    const clikableButton = screen.getByText('Add');
    // In the first iteration the favoriteCharacter list must be empty
    expect(clikableButton).toBeInTheDocument();
    expect(screen.getByText('Favorite Characters: Empty list')).toBeInTheDocument();
    // After click the favoriteCharacter list first element must be the id "1aaa"
    fireEvent.click(clikableButton);
    expect(screen.getByText('Favorite Characters: 1aaa')).toBeInTheDocument();
    // If click again the current element in the favoriteCharacter list must be deleted
    fireEvent.click(clikableButton);
    expect(screen.getByText('Favorite Characters: Empty list')).toBeInTheDocument();
  });
});
