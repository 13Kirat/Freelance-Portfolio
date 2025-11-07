
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postToLinkedIn = createAsyncThunk(
  "linkedIn/postToLinkedIn",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://freelance-portfolio-production-8edc.up.railway.app/api/v1/linkedin/post`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const linkedInSlice = createSlice({
  name: "linkedIn",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postToLinkedIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(postToLinkedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(postToLinkedIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default linkedInSlice.reducer;
