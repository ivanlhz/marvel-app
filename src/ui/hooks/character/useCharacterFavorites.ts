import { useFavoriteContext } from '@/ui/context/favoriteContext';
import { Character } from '@/core/dbapi';

export const useCharacterFavorites = (
  characterId: string | null,
  character: Character | undefined
) => {
  const { favoriteCharacters, addFavoriteCharacter } = useFavoriteContext();

  const isFavorite = characterId
    ? favoriteCharacters.some(favCharacter => String(favCharacter.id) === String(characterId))
    : false;

  const handleFavoriteToggle = () => {
    if (character) {
      addFavoriteCharacter(character);
    }
  };

  return {
    isFavorite,
    handleFavoriteToggle,
  };
};
