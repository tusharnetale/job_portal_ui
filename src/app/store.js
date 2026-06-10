import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/authSlice";
import jobReducer from "../redux/jobSlice";
import applicationReducer from "../redux/applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    applications: applicationReducer,
  },
});