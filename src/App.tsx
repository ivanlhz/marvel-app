import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, useState, useCallback } from 'react';
import { FavoriteProvider, useFavoriteContext } from './ui/context/favoriteContext';
import { Layout } from './ui/components/templates/Layout';

const HomePage = React.lazy(() => import('@/pages/home/Home'));
const CharacterPage = React.lazy(() => import('@/pages/character/Character'));

function AppContent() {
  const { favoriteCount } = useFavoriteContext();
  const [showAllCharacters, setShowAllCharacters] = useState(true);

  const handleLogoClick = useCallback(() => {
    setShowAllCharacters(true);
  }, []);

  const handleFavoritesClick = useCallback(() => {
    setShowAllCharacters(prevState => !prevState);
  }, []);

  return (
    <Layout
      favoriteCount={favoriteCount}
      onLogoClick={handleLogoClick}
      onFavoritesClick={handleFavoritesClick}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage showAllCharacters={showAllCharacters} />} />
          <Route path="/character" element={<CharacterPage />} />
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
