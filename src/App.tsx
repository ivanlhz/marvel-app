import './App.css';
import { HomePage } from '@/pages';
import { FavoriteProvider } from './ui/context/favoriteContext';

function App() {
  return (
    <FavoriteProvider>
      <HomePage />
    </FavoriteProvider>
  );
}

export default App;
