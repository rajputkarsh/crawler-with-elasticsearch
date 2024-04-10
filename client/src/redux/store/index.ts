import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import clientsReducer from "./clients.slice";

const persistConfig = {
  key: "root",
  version: 2,
  storage: storage,
  whitelist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    clients: clientsReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [
          "meta.arg",
          "payload.timestamp",
          "payload.headers",
        ],
      },
    }),
});

export type AppStore = typeof store.dispatch;
export type AppState = ReturnType<typeof persistedReducer>;

export default store;
