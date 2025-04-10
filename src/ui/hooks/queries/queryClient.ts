import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 horas
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
