import { useQuery } from '@tanstack/react-query';
import dbApiRepository from '@/core/dbapi/infraestructure/DbApiRepositoryImpl';

export const useCharacters = (page: number = 1, limit: number = 50) => {
  return useQuery({
    queryKey: ['characters', page, limit],
    queryFn: async () => {
      const result = await dbApiRepository.getCharacters(page, limit);
      if (result.isError) {
        throw new Error(result.error);
      }
      return result.value;
    },
  });
};

export const useCharacterById = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async () => {
      const result = await dbApiRepository.getCharacterById(id);
      if (result.isError) {
        throw new Error(result.error);
      }
      return result.value;
    },
    enabled: !!id,
  });
};

export const useFilterCharacters = (name: string) => {
  return useQuery({
    queryKey: ['characters', 'filter', name],
    queryFn: async () => {
      const result = await dbApiRepository.filterCharacters(name);
      if (result.isError) {
        throw new Error(result.error);
      }
      return result.value;
    },
    enabled: !!name && name.length > 0,
  });
};
