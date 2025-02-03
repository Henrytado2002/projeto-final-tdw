import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: null,
    email: null,
    name: null,
    pokedleGamesWon: 0,
    memokemonGamesWon: 0,
    pokedleGuesses: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        resetUser() {
            return initialState;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;