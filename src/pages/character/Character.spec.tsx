import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CharacterPage from './Character';
import { FavoriteProvider } from '@/ui/context/favoriteContext';
import { useCharacterById } from '@/ui/hooks/queries/useCharacters';

// Mock de los hooks
jest.mock('@/ui/hooks/queries/useCharacters');

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: '?id=1',
  }),
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

  beforeEach(() => {
    mockUseCharacterById.mockReturnValue({
      data: mockCharacter,
      error: null,
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

  it('handles favorite toggle correctly', () => {
    const { container } = renderCharacterPage();

    const heartButton = container.querySelector('.heart-button');
    fireEvent.click(heartButton!);

    expect(mockUseCharacterById).toHaveBeenCalledWith('1');
  });

  it('returns null when there is no characterId', () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValueOnce(null);

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

  it('navigates to home when there is an error', () => {
    mockUseCharacterById.mockReturnValue({
      data: null,
      error: new Error('Error loading character'),
    });

    renderCharacterPage();

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
