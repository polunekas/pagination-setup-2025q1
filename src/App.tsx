import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './pages/MainPage';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="details/:id" element={<PokemonDetails />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
