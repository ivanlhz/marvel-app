import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCharacterById } from '@/ui/hooks/queries/useCharacters';
import CharacterTitle from '@/ui/components/atoms/CharacterTitle';
import CharacterImage from '@/ui/components/atoms/CharacterImage';
import { HeartButton } from '@/ui/components/molecules/HeartButton';
import { useFavoriteContext } from '@/ui/context/favoriteContext';
import './Character.css';
import CharacterDescription from '@/ui/components/atoms/CharacterDescription/CharacterDescription';

const CharacterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favoriteCharacters, addFavoriteCharacter } = useFavoriteContext();

  const searchParams = new URLSearchParams(location.search);
  const characterId = searchParams.get('id');

  if (!characterId) {
    return null;
  }

  const { data: character, error } = useCharacterById(characterId);

  useEffect(() => {
    if (!characterId || error) {
      navigate('/');
    }
  }, [characterId, error, navigate]);

  const isFavorite = favoriteCharacters.some(
    favCharacter => String(favCharacter.id) === String(characterId)
  );

  // Manejar el toggle de favoritos
  const handleFavoriteToggle = () => {
    if (character) {
      addFavoriteCharacter(character);
    }
  };

  if (!character) {
    return null;
  }

  return (
    <div className="character-page">
      <div className="hero-section">
        <div className="container">
          <CharacterImage src={character.image} alt={character.name} className="detail-hero" />
          <div className="character-info">
            <div className="character-info__header">
              <CharacterTitle title={character.name} />
              <HeartButton active={isFavorite} onClick={handleFavoriteToggle} />
            </div>
            <CharacterDescription description={character.description} />
          </div>
        </div>
      </div>
      <div className="comics-section">
        <div className="container">
          {character.transformations.length ? (
            <>
              <h2 className="comics-title">Transformaciones</h2>
              <div className="comics-grid">
                {character.transformations.map(transformation => (
                  <div key={transformation.id} className="comic-item">
                    <CharacterImage
                      src={transformation.image}
                      alt={transformation.name}
                      className="comic-image"
                    />
                    <div className="comic-info">
                      <h3 className="comic-title">{transformation.name}</h3>
                      <p className="comic-year">{transformation.ki}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2 className="comics-title">Actualmente no tiene transformaciones.</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
