import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Infer type: {}
export type AppDispatch = typeof store.dispatch
