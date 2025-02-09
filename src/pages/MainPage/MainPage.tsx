import { FC, useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './MainPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';
import useSearch from '../../hooks/useSearch';
import pokemonHeader from '../../assets/pokemon_header.webp';

const MainPage: FC = () => {
  const {
    pokemons,
    isLoading,
    error,
    searchPokemon,
    currentPage,
    setCurrentPage,
    totalPages,
    searchItem,
  } = useSearch(localStorage.getItem('searchItem') || '');

  const navigate = useNavigate();
  const location = useLocation();
  const [throwError, setThrowError] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    setIsDetailsOpen(location.pathname.includes('/details/'));
  }, [location]);

  const handlePokemonClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleCloseDetails = () => {
    navigate('/');
  };

  if (throwError) {
    throw new Error('Test Error');
  }

  const isSearchingSpecificPokemon = pokemons.length === 1 && searchItem !== '';

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <header className={styles.header}>
          <img
            src={pokemonHeader}
            alt="Pokemon"
            className={styles.headerLogo}
          />
        </header>
        <SearchBar fromSearch={searchPokemon} />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.mainContainer}>
            <div className={styles.resultsContainer}>
              <SearchResults
                pokemons={pokemons}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                searchItem={searchItem}
                onPokemonClick={handlePokemonClick}
                isSearchingSpecificPokemon={isSearchingSpecificPokemon}
              />
            </div>
            <div className={styles.rightSection}>
              <Outlet />
              {isDetailsOpen && (
                <button
                  onClick={handleCloseDetails}
                  className={styles.closeButton}
                >
                  Close Details
                </button>
              )}
            </div>
          </div>
        )}
        <button
          className={styles.errorButton}
          onClick={() => setThrowError(true)}
        >
          Throw Error
        </button>
      </div>
    </div>
  );
};

export default MainPage;
