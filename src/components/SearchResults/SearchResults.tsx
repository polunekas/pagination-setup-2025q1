import { FC } from 'react';
import styles from './SearchResults.module.css';
import Pagination from '../Pagination/Pagination';

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
  onPokemonClick: (id: string) => void;
}

const SearchResults: FC<SearchResultsProps> = ({
  pokemons,
  currentPage,
  setCurrentPage,
  totalPages,
  searchItem,
  onPokemonClick,
}) => {
  return (
    <>
      <div className={styles.resultsContainer}>
        {pokemons.length > 0 ? (
          pokemons.map((result, index) => (
            <div
              key={index}
              className={`${styles.resultItem} ${
                searchItem.toLowerCase() === result.name.toLowerCase()
                  ? styles.highlight
                  : ''
              }`}
              onClick={() => onPokemonClick(result.name)}
            >
              <h3>{result.name[0].toUpperCase() + result.name.slice(1)}</h3>
            </div>
          ))
        ) : (
          <p>No pokemons found</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        isSearchingSpecificPokemon={false}
      />
    </>
  );
};

export default SearchResults;
