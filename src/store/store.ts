import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/es/storage'
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/auth.slice'

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile"], // Only persist specific reducers (optional)
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer
});

// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Avoid warnings with redux-persist
      }),
})

// Persistor
export const persistor = persistStore(store);

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof store.getState>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch