import api from '../../../app/api';

const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

const authService = {
  signup,
  login,
};

export default authService;
