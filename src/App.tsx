import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { FavoriteProvider } from './ui/context/favoriteContext';

const HomePage = React.lazy(() => import('@/pages/home/Home'));
const CharacterPage = React.lazy(() => import('@/pages/character/Character'));

function App() {
  return (
    <Router>
      <FavoriteProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/character" element={<CharacterPage />} />
          </Routes>
        </Suspense>
      </FavoriteProvider>
    </Router>
  );
}

export default App;
