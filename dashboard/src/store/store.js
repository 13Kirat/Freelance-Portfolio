import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";
import timelineReducer from "./slices/timelineSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import messageReducer from "./slices/messageSlice";
import tipReducer from "./slices/tipSlice.js";
import linkedInReducer from "./slices/linkedinSlice.js";
import teamReducer from "./slices/teamSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    skill: skillReducer,
    project: projectReducer,
    timeline: timelineReducer,
    softwareApplications: softwareApplicationReducer,
    messages: messageReducer,
    tip: tipReducer,
    linkedIn: linkedInReducer,
    team: teamReducer,
  },
});
