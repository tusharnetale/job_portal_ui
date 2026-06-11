import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://job-portal-server-663d.onrender.com";

export const getJobs = createAsyncThunk(
  "jobs/getJobs",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("https://job-portal-server-663d.onrender.com/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.jobs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

export const getMyJobs = createAsyncThunk(
  "jobs/getMyJobs",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://job-portal-server-663d.onrender.com/my-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.jobs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://job-portal-server-663d.onrender.com/create`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.job;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",

  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL JOBS
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY JOBS
      .addCase(getMyJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE JOB
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;