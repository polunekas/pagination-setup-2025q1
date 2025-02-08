import { FC } from 'react';
import styles from './SearchResults.module.css';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: string;
  types: string;
}

interface SearchResultsProps {
  pokemons: Pokemon[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  searchItem: string;
}

const SearchResults: FC<SearchResultsProps> = ({
  pokemons,
  currentPage,
  setCurrentPage,
  totalPages,
  searchItem,
}) => {
  return (
    <div className={styles.resultsContainer}>
      {pokemons.length > 0 ? (
        pokemons.map((result, index) => (
          <div
            key={index}
            className={`${styles.resultItem} ${searchItem.toLowerCase() === result.name.toLowerCase() ? styles.highlight : ''}`}
          >
            <h3>{result.name[0].toUpperCase() + result.name.slice(1)}</h3>
            <p>Height: {result.height}</p>
            <p>Weight: {result.weight}</p>
            <p>Abilities: {result.abilities}</p>
            <p>Types: {result.types}</p>
          </div>
        ))
      ) : (
        <p>No pokemons found</p>
      )}

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.pageButton}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
