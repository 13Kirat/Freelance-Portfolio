import { configureStore } from "@reduxjs/toolkit";
import tipReducer from "./slices/tipSlice";

export const store = configureStore({
  reducer: {
    tip: tipReducer,
  },
});
