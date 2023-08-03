import { configureStore } from "@reduxjs/toolkit";
import categoryServices from "../services/categoryServices";

export const store = configureStore({
  reducer: {
    [categoryServices.reducerPath]: categoryServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryServices.middleware),
});
