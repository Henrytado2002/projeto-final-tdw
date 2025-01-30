import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getGen1PokemonList: builder.query({
            query: () => `pokemon?limit=151`, // Fetch only Generation 1 Pokémon
        }),
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`, // Fetch detailed information about a specific Pokémon
        }),
        getPokemonSpeciesInfoByName: builder.query({
            query: (name) => `pokemon-species/${name}`, // Fetch detailed information about a specific Pokémon species (more info on the same pokemon, essentially)
        }),
    }),
});

export const { useGetGen1PokemonListQuery, useGetPokemonByNameQuery, useGetPokemonSpeciesInfoByNameQuery } = pokemonApi;