import { useLocation } from 'react-router-dom';

export const useCharacterPageParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const characterId = searchParams.get('id');

  return {
    characterId,
  };
};
