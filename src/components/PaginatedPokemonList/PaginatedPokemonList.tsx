import { FC } from 'react';
import usePaginatedPokemons from '../../hooks/usePaginatedPokemons';
import styles from './PaginatedPokemonList.module.css';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: string;
  types: string;
}

interface SearchResultsProps {
  pokemons: Pokemon[];
}

const PaginatedPokemonList: FC = () => {
  const { currentPage, pokemons, setCurrentPage, isLoading, error } =
    usePaginatedPokemons();

  return (
    <div className={styles.container}>
      {isLoading && <p>Загрузка...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {/* <div className={styles.pokemonGrid}>
        {pokemons.map((pokemon, index) => (
          <div key={index} className={styles.pokemonCard}>
            <h3>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
            <p>URL: {pokemon.url}</p>
          </div>
        ))}
      </div> */}
      <div className={styles.resultsContainer}>
        {pokemons.length > 0 ? (
          pokemons.map((result, index) => (
            <div key={index} className={styles.resultItem}>
              <h3>{result.name[0].toUpperCase() + result.name.slice(1)}</h3>
              {/* <p>Height: {result.height}</p>
              <p>Weight: {result.weight}</p>
              <p>Abilities: {result.abilities}</p>
              <p>Types: {result.types}</p> */}
            </div>
          ))
        ) : (
          <p>No pokemons found</p>
        )}
      </div>

      {/* Кнопки пагинации */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Назад
        </button>
        <span>Страница {currentPage} из 5</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
          disabled={currentPage === 5}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default PaginatedPokemonList;
