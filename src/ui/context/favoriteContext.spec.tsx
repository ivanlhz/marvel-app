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
  const { favoriteCount, addFavoriteCharacter, favoriteCharacters, setAllFavoriteCharacters } =
    useFavoriteContext();
  return (
    <div>
      <p>Favorite Count: {favoriteCount}</p>
      <p>
        Favorite Characters:{' '}
        {favoriteCharacters.length ? favoriteCharacters.map( character => character.id).join(',') : 'Empty list'}
      </p>
      <button onClick={() => addFavoriteCharacter(mockCharacters[0])}>Add</button>
      <button onClick={() => setAllFavoriteCharacters(mockCharacters)}>Add All</button>
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
    expect(screen.getByText('Favorite Characters: 3')).toBeInTheDocument();
    // If click again the current element in the favoriteCharacter list must be deleted
    fireEvent.click(clikableButton);
    expect(screen.getByText('Favorite Characters: Empty list')).toBeInTheDocument();
    // Add all ids to the list
    const clikableAddAllButton = screen.getByText('Add All');
    fireEvent.click(clikableAddAllButton);
    expect(screen.getByText('Favorite Characters: 3,4')).toBeInTheDocument();
  });
});
