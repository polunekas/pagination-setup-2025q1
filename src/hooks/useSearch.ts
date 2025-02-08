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
    if (query.trim() === '') {
      setPokemons([]);
      setSearchItem('');
      return;
    }

    setIsLoading(true);
    setSearchItem(query);

    handleSearch(query, (newState) => {
      setPokemons(newState.pokemons);
      setIsLoading(false);
      setError(newState.error || null);
      setCurrentPage(1);
    });
  };

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
          if (!Array.isArray(pokemonCards)) {
            throw new Error('Invalid response: expected an array');
          }

          return Promise.all(
            pokemonCards.map(async (pokemon) => {
              try {
                const response = await fetch(pokemon.url);
                if (!response.ok) throw new Error('Failed to fetch');
                return response.json();
              } catch {
                return null;
              }
            })
          );
        })
        .then((detailedData) => {
          const validPokemons = detailedData
            .filter((data): data is Pokemon => data !== null)
            .map((data) => ({
              name: data.name,
              height: data.height,
              weight: data.weight,
              abilities:
                data.abilities
                  ?.map((a: { ability: { name: string } }) => a.ability.name)
                  .join(', ') ?? 'Unknown',
              types:
                data.types
                  ?.map((t: { type: { name: string } }) => t.type.name)
                  .join(', ') ?? 'Unknown',
            }));

          setPokemons(validPokemons);
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
