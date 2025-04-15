import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { FavoriteProvider, useFavoriteContext } from './ui/context/favoriteContext';
import { Layout } from './ui/components/templates/Layout';
import { CharacterPage, HomePage, NotFoundPage } from './routes';
import { SearchValueProvider } from './ui/context/searchValueContext';

function AppContent() {
  const { favoriteCount, showFavorites, hideFavorites, isFavoritesShowed } = useFavoriteContext();
  const location = useLocation();
  const isCharacterPage = location.pathname === '/' || location.pathname.startsWith('/character');

  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    showFavorites();
    navigate('/');
  };

  return (
    <Layout
      favoriteCount={isCharacterPage ? favoriteCount : undefined}
      onLogoClick={hideFavorites}
      onFavoritesClick={isCharacterPage ? handleFavoritesClick : undefined}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <SearchValueProvider>
                <HomePage showFavoritesCharacters={isFavoritesShowed} />
              </SearchValueProvider>
            }
          />
          <Route path="/character" element={<CharacterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <FavoriteProvider>
        <AppContent />
      </FavoriteProvider>
    </Router>
  );
}

export default App;
