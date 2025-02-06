import { useState, useEffect } from 'react';
import { handleSearch, Pokemon } from '../utils/handleSearch';

function useSearch(initialSearchItem: string) {
  const [searchItem, setSearchItem] = useState(initialSearchItem);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = (query: string) => {
    setIsLoading(true);
    handleSearch(query, (newState) => {
      setPokemons(newState.pokemons);
      setIsLoading(false);
      setError(newState.error || null);
    });
  };

  useEffect(() => {
    searchPokemon(searchItem);
  }, [searchItem]);

  return {
    searchItem,
    setSearchItem,
    pokemons,
    isLoading,
    error,
    searchPokemon,
  };
}

export default useSearch;
