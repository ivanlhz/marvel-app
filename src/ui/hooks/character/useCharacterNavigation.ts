import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCharacterNavigation = (characterId: string | null, error: unknown) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!characterId || error) {
      navigate('/');
    }
  }, [characterId, error, navigate]);
};
