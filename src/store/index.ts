import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { authSlice } from "./reducers/auth/slice";
import { productsSlice } from "./reducers/products/slice";

const persistConfig = {
    key: "root",
    storage: storage,
}

const reducers = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [productsSlice.name]: productsSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
