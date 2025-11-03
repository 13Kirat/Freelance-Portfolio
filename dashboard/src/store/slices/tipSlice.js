import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tipSlice = createSlice({
  name: "tip",
  initialState: {
    loading: false,
    tips: [],
    error: null,
    message: null,
    singleTip: {},
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
      state.tips = state.tips;
      state.error = action.payload;
      state.loading = false;
    },
    addNewTipRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewTipSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewTipFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteTipRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTipSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteTipFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateTipRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateTipSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateTipFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetTipSlice(state, action) {
      state.error = null;
      state.tips = state.tips;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.tips;
    },
  },
});

export const getAllTips = () => async (dispatch) => {
  dispatch(tipSlice.actions.getAllTipsRequest());
  try {
    const response = await axios.get(
      "https://freelance-portfolio-production-8edc.up.railway.app/api/v1/tip/getall",
      { withCredentials: true }
    );
    dispatch(tipSlice.actions.getAllTipsSuccess(response.data.tips));
    dispatch(tipSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(tipSlice.actions.getAllTipsFailed(error.response.data.message));
  }
};

export const addNewTip = (data) => async (dispatch) => {
  dispatch(tipSlice.actions.addNewTipRequest());
  try {
    const response = await axios.post(
      "https://freelance-portfolio-production-8edc.up.railway.app/api/v1/tip/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(tipSlice.actions.addNewTipSuccess(response.data.message));
    dispatch(tipSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(tipSlice.actions.addNewTipFailed(error.response.data.message));
  }
};
export const deleteTip = (id) => async (dispatch) => {
  dispatch(tipSlice.actions.deleteTipRequest());
  try {
    const response = await axios.delete(
      `https://freelance-portfolio-production-8edc.up.railway.app/api/v1/tip/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(tipSlice.actions.deleteTipSuccess(response.data.message));
    dispatch(tipSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(tipSlice.actions.deleteTipFailed(error.response.data.message));
  }
};
export const updateTip = (id, newData) => async (dispatch) => {
  dispatch(tipSlice.actions.updateTipRequest());
  try {
    const response = await axios.put(
      `https://freelance-portfolio-production-8edc.up.railway.app/api/v1/tip/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(tipSlice.actions.updateTipSuccess(response.data.message));
    dispatch(tipSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error);
    dispatch(tipSlice.actions.updateTipFailed(error.response.data.message));
  }
};

export const resetTipSlice = () => (dispatch) => {
  dispatch(tipSlice.actions.resetTipSlice());
};

export const clearAllTipErrors = () => (dispatch) => {
  dispatch(tipSlice.actions.clearAllErrors());
};

export default tipSlice.reducer;
