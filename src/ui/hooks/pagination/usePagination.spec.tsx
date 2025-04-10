import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('should initialize with page 1', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.currentPage).toBe(1);
  });

  it('should go to specific page when goToPage is called', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.goToPage(5);
    });

    expect(result.current.currentPage).toBe(5);
  });

  it('should increment page when goNextPage is called', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.goNextPage();
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.goNextPage();
    });

    expect(result.current.currentPage).toBe(3);
  });

  it('should decrement page when goBackPage is called', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.goToPage(5);
    });

    expect(result.current.currentPage).toBe(5);

    act(() => {
      result.current.goBackPage();
    });

    expect(result.current.currentPage).toBe(4);
  });

  it('should handle multiple pagination operations in sequence', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.goNextPage();
      result.current.goNextPage();
    });

    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.goBackPage();
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.goToPage(10);
    });

    expect(result.current.currentPage).toBe(10);
  });
});
