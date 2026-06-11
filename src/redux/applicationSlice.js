import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://job-portal-server-663d.onrender.com";

export const applyJob = createAsyncThunk(
    "applications/applyJob",
    async (jobId, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `https://job-portal-server-663d.onrender.com/applications/${jobId}/apply`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getMyApplications = createAsyncThunk(
    "applications/getMyApplications",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `https://job-portal-server-663d.onrender.com/applications/my`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getApplicants = createAsyncThunk(
    "applications/getApplicants",
    async (jobId, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `https://job-portal-server-663d.onrender.com/applications/${jobId}/applications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateApplicationStatus =
    createAsyncThunk(
        "applications/updateStatus",
        async (
            { applicationId, status },
            thunkAPI
        ) => {
            try {
                const token =
                    localStorage.getItem("token");

                const response =
                    await axios.put(
                        `https://job-portal-server-663d.onrender.com/applications/${applicationId}/status`,
                        { status },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                return response.data.application;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response.data
                );
            }
        }
    );

const applicationSlice = createSlice({
    name: "applications",

    initialState: {
        applications: [],
        applicants: [],
        loading: false,
        error: null,
        success: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(applyJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyJob.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
            })
            .addCase(applyJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMyApplications.fulfilled, (state, action) => {
                state.applications = action.payload;
            })
            .addCase(getApplicants.fulfilled, (state, action) => {
                state.applicants = action.payload;
            })
            .addCase(
                updateApplicationStatus.fulfilled,
                (state, action) => {
                    const index =
                        state.applicants.findIndex(
                            (a) =>
                                a._id ===
                                action.payload._id
                        );

                    if (index !== -1) {
                        state.applicants[index].status =
                            action.payload.status;
                    }
                });
    },
});

export default applicationSlice.reducer;