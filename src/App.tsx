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

  const handleLogoClick = useCallback(() => {
    setShowAllCharacters(true);
  }, []);

  const handleFavoritesClick = useCallback(() => {
    setShowAllCharacters(prevState => !prevState);
  }, []);

  return (
    <Layout
      favoriteCount={isNotFoundPage ? undefined : favoriteCount}
      onLogoClick={handleLogoClick}
      onFavoritesClick={isNotFoundPage ? undefined : handleFavoritesClick}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage showAllCharacters={showAllCharacters} />} />
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
