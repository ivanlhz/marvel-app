import { useCharacterById } from '@/ui/hooks/queries/useCharacters';
import { useCharacterPageParams } from '@/ui/hooks/character/useCharacterPageParams';
import { useCharacterNavigation } from '@/ui/hooks/character/useCharacterNavigation';
import { useCharacterFavorites } from '@/ui/hooks/character/useCharacterFavorites';
import CharacterHero from '@/ui/components/organisms/CharacterHero/CharacterHero';
import TransformationsList from '@/ui/components/organisms/TransformationsList/TransformationsList';
import './Character.css';

const CharacterPage = () => {
  const { characterId } = useCharacterPageParams();
  const { data: character, error } = useCharacterById(characterId || '');
  useCharacterNavigation(characterId, error);
  const { isFavorite, handleFavoriteToggle } = useCharacterFavorites(characterId, character);

  if (!characterId || !character) {
    return null;
  }

  return (
    <div className="character-page">
      <CharacterHero
        character={character}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />
      <div className="comics-section">
        <div className="container">
          <TransformationsList transformations={character.transformations} />
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
