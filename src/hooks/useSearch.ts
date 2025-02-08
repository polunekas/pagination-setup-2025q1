import { useState, useEffect } from 'react';
import { handleSearch, Pokemon } from '../utils/handleSearch';
import { fetchPokemonsList } from '../utils/api';

function useSearch(initialSearchItem: string) {
  const [searchItem, setSearchItem] = useState(initialSearchItem);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const limitPerPage = 6;

  const searchPokemon = (query: string) => {
    setIsLoading(true);
    setSearchItem(query);

    handleSearch(query, (newState) => {
      setPokemons(newState.pokemons);
      setIsLoading(false);
      setError(newState.error || null);
      setCurrentPage(1);
    });
  };

  // Автоматический поиск при изменении initialSearchItem
  useEffect(() => {
    if (initialSearchItem) {
      searchPokemon(initialSearchItem);
    }
  }, [initialSearchItem]);

  useEffect(() => {
    if (!searchItem) {
      setIsLoading(true);
      fetchPokemonsList(currentPage, limitPerPage)
        .then((pokemonCards) => {
          setPokemons(
            pokemonCards.map((p) => ({
              name: p.name,
              height: 0,
              weight: 0,
              abilities: 'Unknown',
              types: 'Unknown',
            }))
          );
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
  }, [searchItem, currentPage]);

  return {
    searchItem,
    pokemons,
    isLoading,
    error,
    searchPokemon,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}

export default useSearch;
