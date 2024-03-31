import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    user: userSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Infer type: {}
export type AppDispatch = typeof store.dispatch