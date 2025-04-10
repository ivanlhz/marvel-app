import { queryClient } from './queryClient';

describe('queryClient', () => {
  it('should be properly configured with default options', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries).toBeDefined();
    expect(defaultOptions.queries?.staleTime).toBe(24 * 60 * 60 * 1000);
    expect(defaultOptions.queries?.retry).toBe(1);
    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
  });

  it('should have correct stale time of 24 hours', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    expect(defaultOptions.queries?.staleTime).toBe(oneDayInMs);
  });

  it('should have retry limit set to 1', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.retry).toBe(1);
  });

  it('should have refetchOnWindowFocus disabled', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
  });

  it('should be an instance of QueryClient', () => {
    expect(queryClient).toHaveProperty('getQueryCache');
    expect(queryClient).toHaveProperty('getMutationCache');
    expect(queryClient).toHaveProperty('getDefaultOptions');
    expect(queryClient).toHaveProperty('setDefaultOptions');
  });
});
