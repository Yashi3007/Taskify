import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  stats: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    },
    fetchStatsSuccess: (state, action) => {
      state.isLoading = false;
      state.stats = action.payload;
    },
    fetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskSuccess: (state, action) => {
      const index = state.tasks.findIndex(t => t._id === action.payload._id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t._id !== action.payload);
    },
  },
});

export const { 
  fetchStart, 
  fetchTasksSuccess, 
  fetchStatsSuccess,
  fetchFailure, 
  addTask, 
  updateTaskSuccess, 
  removeTask 
} = taskSlice.actions;

export default taskSlice.reducer;
