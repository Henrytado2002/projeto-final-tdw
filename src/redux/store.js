import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import { pokemonApi } from './pokemonSlice';
import selectedPokemonReducer from './selectedPokemonSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        selectedPokemon: selectedPokemonReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;