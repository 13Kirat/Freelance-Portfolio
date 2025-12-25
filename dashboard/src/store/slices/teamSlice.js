import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    loading: false,
    team: [],
    error: null,
    message: null,
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
    addTeamMemberRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addTeamMemberSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addTeamMemberFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteTeamMemberRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTeamMemberSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteTeamMemberFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updateTeamMemberRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateTeamMemberSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateTeamMemberFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
    },
    resetTeamSlice(state, action) {
      state.error = null;
      state.team = state.team;
      state.message = null;
      state.loading = false;
    },
  },
});

export const getAllTeamMembers = () => async (dispatch) => {
  dispatch(teamSlice.actions.getAllTeamMembersRequest());
  try {
    const { data } = await axios.get(
      "https://freelance-portfolio-production-6486.up.railway.app/api/v1/team/getall",
      { withCredentials: true }
    );
    dispatch(teamSlice.actions.getAllTeamMembersSuccess(data.teamMembers));
  } catch (error) {
    dispatch(
      teamSlice.actions.getAllTeamMembersFailed(error.response.data.message)
    );
  }
};

export const addTeamMember = (formData) => async (dispatch) => {
  dispatch(teamSlice.actions.addTeamMemberRequest());
  try {
    const { data } = await axios.post(
      "https://freelance-portfolio-production-6486.up.railway.app/api/v1/team/add",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(teamSlice.actions.addTeamMemberSuccess(data.message));
  } catch (error) {
    dispatch(
      teamSlice.actions.addTeamMemberFailed(error.response.data.message)
    );
  }
};

export const deleteTeamMember = (id) => async (dispatch) => {
  dispatch(teamSlice.actions.deleteTeamMemberRequest());
  try {
    const { data } = await axios.delete(
      `https://freelance-portfolio-production-6486.up.railway.app/api/v1/team/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(teamSlice.actions.deleteTeamMemberSuccess(data.message));
  } catch (error) {
    dispatch(
      teamSlice.actions.deleteTeamMemberFailed(error.response.data.message)
    );
  }
};

export const updateTeamMember = (id, formData) => async (dispatch) => {
  dispatch(teamSlice.actions.updateTeamMemberRequest());
  try {
    const { data } = await axios.put(
      `https://freelance-portfolio-production-6486.up.railway.app/api/v1/team/update/${id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(teamSlice.actions.updateTeamMemberSuccess(data.message));
  } catch (error) {
    dispatch(
      teamSlice.actions.updateTeamMemberFailed(error.response.data.message)
    );
  }
};

export const clearAllErrors = () => (dispatch) => {
  dispatch(teamSlice.actions.clearAllErrors());
};

export const resetTeamSlice = () => (dispatch) => {
  dispatch(teamSlice.actions.resetTeamSlice());
};

export default teamSlice.reducer;
