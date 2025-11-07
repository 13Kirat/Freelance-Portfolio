import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tipSlice = createSlice({
  name: "tip",
  initialState: {
    loading: false,
    tips: [],
    error: null,
  },
  reducers: {
    getAllTipsRequest(state, action) {
      state.tips = [];
      state.error = null;
      state.loading = true;
    },
    getAllTipsSuccess(state, action) {
      state.tips = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTipsFailed(state, action) {
      state.tips = [];
      state.error = action.payload;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const getAllTips = () => async (dispatch) => {
  dispatch(tipSlice.actions.getAllTipsRequest());
  try {
    const response = await axios.get(
      "https://freelance-portfolio-production-8f14.up.railway.app/api/v1/tip/getall",
      { withCredentials: true }
    );
    dispatch(tipSlice.actions.getAllTipsSuccess(response.data.tips));
    dispatch(tipSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(tipSlice.actions.getAllTipsFailed(error.response.data.message));
  }
};

export const clearAllTipErrors = () => (dispatch) => {
  dispatch(tipSlice.actions.clearAllErrors());
};

export default tipSlice.reducer;
