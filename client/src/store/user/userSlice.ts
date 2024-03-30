import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    currentUser: null,
    error: null,
    loading: boolean,
} 

const initialState: userState = {
    currentUser: null,
    error: null,
    loading: false,
}

export const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSucces: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

// Export reducer functions
export const { signInStart, signInSucces, signInFailure } = userSlicer.actions;

// Export the entire reducer
export default userSlicer.reducer;