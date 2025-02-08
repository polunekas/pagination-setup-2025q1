import { fetchPokemonData, fetchPokemonsList } from './api';
import type { PokemonCard } from './api';

export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: string;
  types: string;
}

export interface SearchState {
  searchItem: string;
  pokemons: Pokemon[];
  error: string | null;
  isLoading: boolean;
}

const parsePokemonData = (data: {
  name?: string;
  height?: number;
  weight?: number;
  abilities?: { ability: { name: string } }[];
  types?: { type: { name: string } }[];
}): Pokemon => ({
  name: data.name ?? 'Not Found',
  height: data.height ?? 0,
  weight: data.weight ?? 0,
  abilities:
    data.abilities?.map((a) => a.ability.name).join(', ') ?? 'Not Found',
  types: data.types?.map((t) => t.type.name).join(', ') ?? 'Not Found',
});

export const handleSearch = async (
  searchItem: string,
  updateState: (newState: SearchState) => void
) => {
  if (searchItem.trim() === '') {
    updateState({ searchItem, pokemons: [], error: null, isLoading: false });
    return;
  }

  updateState({ searchItem, pokemons: [], error: null, isLoading: true });

  try {
    let pokemons: Pokemon[] = [];

    if (searchItem) {
      const data = await fetchPokemonData(searchItem);
      pokemons = [parsePokemonData(data)];
    } else {
      const pokemonCards: PokemonCard[] = await fetchPokemonsList();

      const pokemonDetailsPromises = pokemonCards.map(async (pokemon) => {
        try {
          const response = await fetch(pokemon.url);
          if (!response.ok) throw new Error('Failed to fetch');
          return response.json();
        } catch {
          return null;
        }
      });

      const detailedData = (await Promise.all(pokemonDetailsPromises)).filter(
        (data): data is Pokemon => data !== null
      );
      pokemons = detailedData.map(parsePokemonData);
    }

    updateState({ searchItem, pokemons, isLoading: false, error: null });
  } catch (error) {
    console.error(error);
    updateState({
      searchItem,
      pokemons: [],
      isLoading: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
