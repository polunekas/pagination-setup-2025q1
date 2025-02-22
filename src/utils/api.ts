export interface PokemonCard {
  name: string;
  url: string;
}

export const fetchPokemonData = async (searchItem: string) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchItem.toLowerCase()}`
  );
  if (!response.ok) {
    throw new Error('No pokemon found');
  }

  const data = await response.json();
  return data;
};

interface PokemonApiResponse {
  results: PokemonCard[];
}

export const fetchPokemonsList = async (
  page = 1,
  limit = 6
): Promise<PokemonCard[]> => {
  const offset = (page - 1) * limit;
  if (offset >= 60) return [];

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('No pokemon found');
  }

  const data: PokemonApiResponse = await response.json();
  return data.results;
};
