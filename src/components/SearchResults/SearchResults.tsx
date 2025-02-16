import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../store/slices/selectedItemsSlice';
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
  isSearchingSpecificPokemon: boolean;
}

const SearchResults: FC<SearchResultsProps> = ({
  pokemons,
  currentPage,
  setCurrentPage,
  totalPages,
  searchItem,
  onPokemonClick,
  isSearchingSpecificPokemon,
}) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state) => state.selectedItems.selectedItems
  );

  const handleCheckboxChange = (pokemonName: string) => {
    if (selectedItems.includes(pokemonName)) {
      dispatch(removeItem(pokemonName));
    } else {
      dispatch(addItem(pokemonName));
    }
  };

  return (
    <>
      <div className={styles.resultsContainer}>
        {pokemons.length > 0 ? (
          pokemons.map((result, index) => (
            <div key={index} className={styles.resultItem}>
              <input
                type="checkbox"
                checked={selectedItems.includes(result.name)}
                onChange={() => handleCheckboxChange(result.name)}
              />
              <span
                className={`${searchItem.toLowerCase() === result.name.toLowerCase() ? styles.highlight : ''}`}
                onClick={() => onPokemonClick(result.name)}
              >
                {result.name[0].toUpperCase() + result.name.slice(1)}
              </span>
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
        isSearchingSpecificPokemon={isSearchingSpecificPokemon}
      />
    </>
  );
};

export default SearchResults;
