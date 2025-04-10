import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, useState, useCallback } from 'react';
import { FavoriteProvider, useFavoriteContext } from './ui/context/favoriteContext';
import { Layout } from './ui/components/templates/Layout';
import { CharacterPage, HomePage, NotFoundPage } from './routes';

function AppContent() {
  const { favoriteCount } = useFavoriteContext();
  const [showAllCharacters, setShowAllCharacters] = useState(true);
  const location = useLocation();
  const isNotFoundPage = !['/', '/character'].includes(location.pathname);

  const handleShowAllCharacters = useCallback(() => {
    setShowAllCharacters(true);
  }, []);

  const handleHideAllCharacters = useCallback(() => {
    setShowAllCharacters(false);
  }, []);

  return (
    <Layout
      favoriteCount={isNotFoundPage ? undefined : favoriteCount}
      onLogoClick={handleShowAllCharacters}
      onFavoritesClick={isNotFoundPage ? undefined : handleHideAllCharacters}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                showAllCharacters={showAllCharacters}
                handleShowAllCharacters={handleShowAllCharacters}
              />
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
