import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedPokemon: null,
    realPokemon: null,
};

const selectedPokemonSlice = createSlice({
    name: 'selectedPokemon',
    initialState,
    reducers: {
        setSelectedPokemon(state, action) {
            state.selectedPokemon = action.payload;
        },
        setRealPokemon(state, action) {
            state.realPokemon = action.payload;
        }
    },


});

export const { setSelectedPokemon, setRealPokemon } = selectedPokemonSlice.actions;
export default selectedPokemonSlice.reducer;