import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { FavoriteProvider, useFavoriteContext } from './ui/context/favoriteContext';
import { Layout } from './ui/components/templates/Layout';
import { CharacterPage, HomePage, NotFoundPage } from './routes';
import { SearchValueProvider } from './ui/context/searchValueContext';

function AppContent() {
  const { favoriteCount, showFavorites, hideFavorites, isFavoritesShowed } = useFavoriteContext();
  const location = useLocation();
  const isNotFoundPage = !['/', '/character'].includes(location.pathname);

  return (
    <Layout
      favoriteCount={isNotFoundPage ? undefined : favoriteCount}
      onLogoClick={hideFavorites}
      onFavoritesClick={isNotFoundPage ? undefined : showFavorites}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SearchValueProvider><HomePage showFavoritesCharacters={isFavoritesShowed} /></SearchValueProvider>} />
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
