import { useDispatch, useSelector } from 'react-redux';
import taskService from '../services/taskService';
import { 
  fetchStart, 
  fetchTasksSuccess, 
  fetchStatsSuccess,
  fetchFailure, 
  addTask, 
  updateTaskSuccess, 
  removeTask 
} from '../state/taskSlice';

export const useTasks = () => {
  const dispatch = useDispatch();
  const { tasks, stats, isLoading, error } = useSelector((state) => state.tasks);

  const getTasksByProject = async (projectId) => {
    dispatch(fetchStart());
    try {
      const data = await taskService.getProjectTasks(projectId);
      dispatch(fetchTasksSuccess(data.data.tasks));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to fetch tasks'));
    }
  };

  const createTask = async (taskData) => {
    dispatch(fetchStart());
    try {
      const data = await taskService.createTask(taskData);
      dispatch(addTask(data.data.task));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to create task'));
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const data = await taskService.updateTask(id, taskData);
      dispatch(updateTaskSuccess(data.data.task));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to update task'));
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      dispatch(removeTask(id));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to delete task'));
    }
  };

  const getStats = async () => {
    dispatch(fetchStart());
    try {
      const data = await taskService.getStats();
      dispatch(fetchStatsSuccess(data.data.stats));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to fetch stats'));
    }
  };

  return {
    tasks,
    stats,
    isLoading,
    error,
    getTasksByProject,
    createTask,
    updateTask,
    deleteTask,
    getStats,
  };
};
