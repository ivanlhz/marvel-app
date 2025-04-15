import { renderHook, act } from '@testing-library/react';
import { useCharacterFavorites } from '../useCharacterFavorites';
import { useFavoriteContext } from '@/ui/context/favoriteContext';

jest.mock('@/ui/context/favoriteContext');

describe('useCharacterFavorites', () => {
  const mockAddFavoriteCharacter = jest.fn();
  const mockCharacter = { id: '123', name: 'Goku' };

  beforeEach(() => {
    (useFavoriteContext as jest.Mock).mockReturnValue({
      favoriteCharacters: [{ id: '123' }, { id: '456' }],
      addFavoriteCharacter: mockAddFavoriteCharacter,
    });
    mockAddFavoriteCharacter.mockClear();
  });

  it('should return isFavorite as true when character is in favorites', () => {
    const { result } = renderHook(() => useCharacterFavorites('123', mockCharacter as any));

    expect(result.current.isFavorite).toBe(true);
  });

  it('should return isFavorite as false when character is not in favorites', () => {
    const { result } = renderHook(() => useCharacterFavorites('789', mockCharacter as any));

    expect(result.current.isFavorite).toBe(false);
  });

  it('should return isFavorite as false when characterId is null', () => {
    const { result } = renderHook(() => useCharacterFavorites(null, mockCharacter as any));

    expect(result.current.isFavorite).toBe(false);
  });

  it('should call addFavoriteCharacter when handleFavoriteToggle is called', () => {
    const { result } = renderHook(() => useCharacterFavorites('123', mockCharacter as any));

    act(() => {
      result.current.handleFavoriteToggle();
    });

    expect(mockAddFavoriteCharacter).toHaveBeenCalledWith(mockCharacter);
  });

  it('should not call addFavoriteCharacter when character is undefined', () => {
    const { result } = renderHook(() => useCharacterFavorites('123', undefined));

    act(() => {
      result.current.handleFavoriteToggle();
    });

    expect(mockAddFavoriteCharacter).not.toHaveBeenCalled();
  });
});
