import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './pages/MainPage';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="details/:id" element={<PokemonDetails />} />
          </Route>
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
