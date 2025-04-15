import { renderHook } from '@testing-library/react';
import { useCharacterPageParams } from '../useCharacterPageParams';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('useCharacterPageParams', () => {
  const mockUseLocation = useLocation as jest.Mock;

  it('should return characterId from URL search params', () => {
    mockUseLocation.mockReturnValue({
      search: '?id=123',
    });

    const { result } = renderHook(() => useCharacterPageParams());

    expect(result.current.characterId).toBe('123');
  });

  it('should return null when no id in URL search params', () => {
    mockUseLocation.mockReturnValue({
      search: '',
    });

    const { result } = renderHook(() => useCharacterPageParams());

    expect(result.current.characterId).toBeNull();
  });
});
