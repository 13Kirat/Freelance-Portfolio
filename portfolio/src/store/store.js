import { configureStore } from "@reduxjs/toolkit";
import tipReducer from "./slices/tipSlice";
import teamReducer from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    tip: tipReducer,
    team: teamReducer,
  },
});
