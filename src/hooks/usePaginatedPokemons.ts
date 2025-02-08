import { useState, useEffect } from 'react';
import { fetchPokemonsList, PokemonCard } from '../utils/api';

function usePaginatedPokemons() {
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPokemonsList(currentPage, 6);
        setPokemons(data);
      } catch (err) {
        setError('Ошибка при загрузке покемонов');
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, [currentPage]);

  return { pokemons, currentPage, setCurrentPage, isLoading, error };
}

export default usePaginatedPokemons;
