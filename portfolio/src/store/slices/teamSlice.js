import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    loading: false,
    team: [],
    error: null,
  },
  reducers: {
    getAllTeamMembersRequest(state, action) {
      state.loading = true;
      state.team = [];
      state.error = null;
    },
    getAllTeamMembersSuccess(state, action) {
      state.loading = false;
      state.team = action.payload;
      state.error = null;
    },
    getAllTeamMembersFailed(state, action) {
      state.loading = false;
      state.team = [];
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const getAllTeamMembers = () => async (dispatch) => {
  dispatch(teamSlice.actions.getAllTeamMembersRequest());
  try {
    const { data } = await axios.get(
      "https://freelance-portfolio-production-8f14.up.railway.app/api/v1/team/getall",
      { withCredentials: true }
    );
    dispatch(teamSlice.actions.getAllTeamMembersSuccess(data.teamMembers));
  } catch (error) {
    dispatch(
      teamSlice.actions.getAllTeamMembersFailed(error.response.data.message)
    );
  }
};

export const clearAllErrors = () => (dispatch) => {
  dispatch(teamSlice.actions.clearAllErrors());
};

export default teamSlice.reducer;
