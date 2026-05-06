import api from '../../../app/api';

const getAllProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};

const projectService = {
  getAllProjects,
  getProject,
  createProject,
  deleteProject,
};

export default projectService;
