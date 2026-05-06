import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
    },
    fetchProjectSuccess: (state, action) => {
      state.isLoading = false;
      state.currentProject = action.payload;
    },
    fetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p._id === action.payload._id);
      if (index !== -1) state.projects[index] = action.payload;
      if (state.currentProject?._id === action.payload._id) state.currentProject = action.payload;
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(p => p._id !== action.payload);
    },
  },
});

export const { 
  fetchStart, 
  fetchProjectsSuccess, 
  fetchProjectSuccess, 
  fetchFailure, 
  addProject, 
  updateProject, 
  removeProject 
} = projectSlice.actions;

export default projectSlice.reducer;
