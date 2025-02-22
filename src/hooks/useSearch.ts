import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { handleSearch } from '../utils/handleSearch';
import { fetchPokemonsList } from '../utils/api';
import { Pokemon } from '../types/types';

function useSearch(initialSearchItem: string) {
  const [searchItem, setSearchItem] = useState(initialSearchItem);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = 10;

  const limitPerPage = 6;

  const setCurrentPage = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  const searchPokemon = (query: string) => {
    if (query.trim() === '') {
      setIsLoading(true);
      setSearchItem('');
      setCurrentPage(1);

      fetchPokemonsList(1, limitPerPage)
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
            .filter(
              (
                data
              ): data is {
                name: string;
                height: number;
                weight: number;
                abilities: { ability: { name: string } }[];
                types: { type: { name: string } }[];
              } => data !== null
            )
            .map((data) => ({
              name: data.name,
              height: data.height,
              weight: data.weight,
              abilities:
                data.abilities?.map((a) => a.ability.name).join(', ') ??
                'Unknown',
              types:
                data.types?.map((t) => t.type.name).join(', ') ?? 'Unknown',
            }));

          setPokemons(validPokemons);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });

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
            .filter(
              (
                data
              ): data is {
                name: string;
                height: number;
                weight: number;
                abilities: { ability: { name: string } }[];
                types: { type: { name: string } }[];
              } => data !== null
            )
            .map((data) => ({
              name: data.name,
              height: data.height,
              weight: data.weight,
              abilities:
                data.abilities?.map((a) => a.ability.name).join(', ') ??
                'Unknown',
              types:
                data.types?.map((t) => t.type.name).join(', ') ?? 'Unknown',
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
