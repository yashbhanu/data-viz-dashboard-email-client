import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import filterReducer from "./reducer/filterReducer";

const persistConfig = {
  key: "root",
  storage : storageSession,
};

const persistedReducer = persistReducer(persistConfig, filterReducer);
export const store = configureStore({
  reducer: {
    filters: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);