import { FC } from 'react';
import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Loader from './components/Loader/Loader';
import pokemonHeader from './assets/pokemon_header.webp';
import useSearch from './hooks/useSearch';

const App: FC = () => {
  const { setSearchItem, pokemons, isLoading, error, searchPokemon } =
    useSearch(localStorage.getItem('searchItem') || '');

  const triggerError = () => {
    setSearchItem('');
  };

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
            <SearchResults pokemons={pokemons} />
          </div>
        )}
        <button className={styles.errorButton} onClick={triggerError}>
          Throw Error
        </button>
      </div>
    </div>
  );
};

export default App;
