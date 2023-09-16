import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoAPi } from "../services/cryptoApi";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    [cryptoAPi.reducerPath]: cryptoAPi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (customMiddleware) =>
    customMiddleware().concat(cryptoAPi.middleware, cryptoNewsApi.middleware),
});
