import { FC, useState } from 'react';
import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Loader from './components/Loader/Loader';
import pokemonHeader from './assets/pokemon_header.webp';
import useSearch from './hooks/useSearch';

const App: FC = () => {
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

  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Test Error');
  }

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
          <div className={styles.resultsContainer}>
            <SearchResults
              pokemons={pokemons}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              searchItem={searchItem}
            />
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

export default App;
