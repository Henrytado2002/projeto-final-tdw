import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: null,
    email: null,
    name: null,
    movies: [],
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
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;