import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteProvider, useFavoriteContext } from './favoriteContext';
import { Character } from '@/core/dbapi';

const TestComponent = () => {
  const { favoriteCount } = useFavoriteContext();
  return <div>Favorite Count: {favoriteCount}</div>;
};

const mockCharacters: Character[] = [
  {
    id: '3',
    name: 'Captain America',
    ki: '3000',
    maxKi: '6000',
    race: 'Human',
    gender: 'Male',
    description: 'Super soldier',
    image: 'captain-america.jpg',
    affiliation: 'Avengers',
  },
  {
    id: '4',
    name: 'Thor',
    ki: '9000',
    maxKi: '15000',
    race: 'Asgardian',
    gender: 'Male',
    description: 'God of Thunder',
    image: 'thor.jpg',
    affiliation: 'Avengers',
  },
];

const TestComponentWithActions = () => {
  const {
    isFavoritesShowed,
    favoriteCount,
    addFavoriteCharacter,
    favoriteCharacters,
    setAllFavoriteCharacters,
    showFavorites,
    hideFavorites,
  } = useFavoriteContext();
  return (
    <div>
      <p>Favorite Count: {favoriteCount}</p>
      <p>
        Favorite Characters:{' '}
        {favoriteCharacters.length
          ? favoriteCharacters.map(character => character.id).join(',')
          : 'Empty list'}
      </p>
      <p>Show Favorites: {isFavoritesShowed ? 'yes' : 'no'}</p>
      <button onClick={() => addFavoriteCharacter(mockCharacters[0])}>Add</button>
      <button onClick={() => setAllFavoriteCharacters(mockCharacters)}>Add All</button>
      <button onClick={() => showFavorites()}>Show favorites</button>
      <button onClick={() => hideFavorites()}>Hide favorites</button>
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

  it('should handle showing and hidding favorite character filter', () => {
    const ContainerTestComponent = () => {
      return (
        <FavoriteProvider>
          <TestComponentWithActions />
        </FavoriteProvider>
      );
    };
    render(<ContainerTestComponent />);
    expect(screen.getByText('Show Favorites: no')).toBeInTheDocument();
    const showButton = screen.getByText('Show favorites');
    expect(showButton).toBeInTheDocument();
    fireEvent.click(showButton);

    const hideButton = screen.getByText('Hide favorites');
    expect(hideButton).toBeInTheDocument();
    fireEvent.click(hideButton);
    expect(screen.getByText('Show Favorites: no')).toBeInTheDocument();
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
    expect(clikableButton).toBeInTheDocument();
    expect(screen.getByText('Favorite Characters: Empty list')).toBeInTheDocument();
    fireEvent.click(clikableButton);
    expect(screen.getByText('Favorite Characters: 3')).toBeInTheDocument();
    fireEvent.click(clikableButton);
    expect(screen.getByText('Favorite Characters: Empty list')).toBeInTheDocument();
    const clikableAddAllButton = screen.getByText('Add All');
    fireEvent.click(clikableAddAllButton);
    expect(screen.getByText('Favorite Characters: 3,4')).toBeInTheDocument();
  });
});
