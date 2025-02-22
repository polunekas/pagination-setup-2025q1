import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonsList: builder.query<Pokemon[], { page: number; limit: number }>({
      query: ({ page, limit }) =>
        `pokemon?offset=${(page - 1) * limit}&limit=${limit}`,
      transformResponse: (response: {
        results: { name: string; url: string }[];
      }) => {
        return Promise.all(
          response.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            return detailsResponse.json();
          })
        );
      },
    }),
    getPokemonDetails: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsListQuery, useGetPokemonDetailsQuery } =
  pokemonApi;
