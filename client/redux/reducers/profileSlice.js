import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk('data/fetchUserData', async () => {
    const response = await axios.get(`/api/user/profile`);
    const data = response.data;
    return data;
});

export const fetchExperience = createAsyncThunk('data/fetchExperience', async () => {
    const response = await axios.get(`/api/experiences`);
    const data = response.data;
    return data;
});

export const fetchEducation = createAsyncThunk('data/fetchEducation', async () => {
    const response = await axios.get(`/api/educations`);
    const data = response.data;
    return data;
});

export const fetchProject = createAsyncThunk('data/fetchProject', async () => {
    const response = await axios.get(`/api/projects`);
    const data = response.data;
    return data;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: [],
        experiences: [],
        educations: [],
        projects: [],
        userStatus: "idle",
        experiencesStatus: "idle",
        educationsStatus: "idle",
        projectsStatus: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.userStatus = "loading";
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userStatus = "successed";
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.userStatus = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchExperience.pending, (state) => {
                state.experiencesStatus = "loading";
            })
            .addCase(fetchExperience.fulfilled, (state, action) => {
                state.experiencesStatus = "successed";
                state.experiences = action.payload;
            })
            .addCase(fetchExperience.rejected, (state, action) => {
                state.experiencesStatus = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchEducation.pending, (state) => {
                state.educationsStatus = "loading";
            })
            .addCase(fetchEducation.fulfilled, (state, action) => {
                state.educationsStatus = "successed";
                state.educations = action.payload;
            })
            .addCase(fetchEducation.rejected, (state, action) => {
                state.educationsStatus = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchProject.pending, (state) => {
                state.projectsStatus = "loading";
            })
            .addCase(fetchProject.fulfilled, (state, action) => {
                state.projectsStatus = "successed";
                state.projects = action.payload;
            })
            .addCase(fetchProject.rejected, (state, action) => {
                state.projectsStatus = "failed";
                state.error = action.error.message;
            });
    }
});

export default profileSlice.reducer;