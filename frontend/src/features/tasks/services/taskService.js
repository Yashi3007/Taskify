import api from '../../../app/api';

const getProjectTasks = async (projectId) => {
  const response = await api.get(`/tasks/project/${projectId}`);
  return response.data;
};

const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

const updateTask = async (id, taskData) => {
  const response = await api.patch(`/tasks/${id}`, taskData);
  return response.data;
};

const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

const getStats = async () => {
  const response = await api.get('/tasks/stats');
  return response.data;
};

const taskService = {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
  getStats,
};

export default taskService;
