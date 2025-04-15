import { renderHook } from '@testing-library/react';
import { useCharacterNavigation } from '../useCharacterNavigation';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useCharacterNavigation', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  it('should navigate to home when characterId is null', () => {
    renderHook(() => useCharacterNavigation(null, null));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should navigate to home when there is an error', () => {
    renderHook(() => useCharacterNavigation('123', new Error('Test error')));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should not navigate when characterId is present and no error', () => {
    renderHook(() => useCharacterNavigation('123', null));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
