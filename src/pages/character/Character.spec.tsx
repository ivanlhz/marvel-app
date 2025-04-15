import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CharacterPage from './Character';
import { FavoriteProvider } from '@/ui/context/favoriteContext';
import { useCharacterById } from '@/ui/hooks/queries/useCharacters';
import { useCharacterPageParams } from '@/ui/hooks/character/useCharacterPageParams';
import { useCharacterFavorites } from '@/ui/hooks/character/useCharacterFavorites';

// Mock de los hooks
jest.mock('@/ui/hooks/queries/useCharacters');
jest.mock('@/ui/hooks/character/useCharacterPageParams');
jest.mock('@/ui/hooks/character/useCharacterFavorites');

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockCharacter = {
  id: '1',
  name: 'Goku',
  description: 'Saiyan del Planeta Vegeta',
  image: 'goku.jpg',
  transformations: [
    {
      id: 't1',
      name: 'Super Saiyan',
      image: 'ssj.jpg',
      ki: '8000',
    },
    {
      id: 't2',
      name: 'Super Saiyan 2',
      image: 'ssj2.jpg',
      ki: '16000',
    },
  ],
};

describe('CharacterPage', () => {
  const mockUseCharacterById = useCharacterById as jest.Mock;
  const mockUseCharacterPageParams = useCharacterPageParams as jest.Mock;
  const mockUseCharacterFavorites = useCharacterFavorites as jest.Mock;

  beforeEach(() => {
    mockUseCharacterById.mockReturnValue({
      data: mockCharacter,
      error: null,
    });
    mockUseCharacterPageParams.mockReturnValue({
      characterId: '1',
    });
    mockUseCharacterFavorites.mockReturnValue({
      isFavorite: false,
      handleFavoriteToggle: jest.fn(),
    });
    mockNavigate.mockClear();
  });

  const renderCharacterPage = () => {
    const queryClient = new QueryClient();

    return render(
      <QueryClientProvider client={queryClient}>
        <FavoriteProvider>
          <MemoryRouter initialEntries={['/character?id=1']}>
            <Routes>
              <Route path="/character" element={<CharacterPage />} />
            </Routes>
          </MemoryRouter>
        </FavoriteProvider>
      </QueryClientProvider>
    );
  };

  it('renders character details correctly', () => {
    renderCharacterPage();

    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByText('Saiyan del Planeta Vegeta')).toBeInTheDocument();
  });

  it('renders transformations correctly', () => {
    renderCharacterPage();

    expect(screen.getByText('Transformaciones')).toBeInTheDocument();
    expect(screen.getByText('Super Saiyan')).toBeInTheDocument();
    expect(screen.getByText('Super Saiyan 2')).toBeInTheDocument();
    expect(screen.getByText('8000')).toBeInTheDocument();
    expect(screen.getByText('16000')).toBeInTheDocument();
  });

  it('shows message when there are no transformations', () => {
    mockUseCharacterById.mockReturnValue({
      data: { ...mockCharacter, transformations: [] },
      error: null,
    });

    renderCharacterPage();

    expect(screen.getByText('Actualmente no tiene transformaciones.')).toBeInTheDocument();
  });

  it('returns null when there is no characterId', () => {
    mockUseCharacterPageParams.mockReturnValue({
      characterId: null,
    });

    renderCharacterPage();

    expect(screen.queryByText('Goku')).not.toBeInTheDocument();
  });

  it('returns null when there is no character data', () => {
    mockUseCharacterById.mockReturnValue({
      data: null,
      error: null,
    });

    renderCharacterPage();

    expect(screen.queryByText('Goku')).not.toBeInTheDocument();
  });
});
