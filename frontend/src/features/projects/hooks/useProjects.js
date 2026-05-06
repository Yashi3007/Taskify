import { useDispatch, useSelector } from 'react-redux';
import projectService from '../services/projectService';
import { 
  fetchStart, 
  fetchProjectsSuccess, 
  fetchProjectSuccess, 
  fetchFailure, 
  addProject, 
  removeProject 
} from '../state/projectSlice';

export const useProjects = () => {
  const dispatch = useDispatch();
  const { projects, currentProject, isLoading, error } = useSelector((state) => state.projects);

  const getProjects = async () => {
    dispatch(fetchStart());
    try {
      const data = await projectService.getAllProjects();
      dispatch(fetchProjectsSuccess(data.data.projects));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to fetch projects'));
    }
  };

  const getProject = async (id) => {
    dispatch(fetchStart());
    try {
      const data = await projectService.getProject(id);
      dispatch(fetchProjectSuccess(data.data.project));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to fetch project'));
    }
  };

  const createProject = async (projectData) => {
    dispatch(fetchStart());
    try {
      const data = await projectService.createProject(projectData);
      dispatch(addProject(data.data.project));
      return data.data.project;
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to create project'));
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectService.deleteProject(id);
      dispatch(removeProject(id));
    } catch (err) {
      dispatch(fetchFailure(err.response?.data?.message || 'Failed to delete project'));
    }
  };

  return {
    projects,
    currentProject,
    isLoading,
    error,
    getProjects,
    getProject,
    createProject,
    deleteProject,
  };
};
