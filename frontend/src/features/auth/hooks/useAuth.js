import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction, clearError } from '../state/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const signup = async (userData) => {
    dispatch(loginStart());
    try {
      const data = await authService.signup(userData);
      dispatch(loginSuccess({ user: data.data.user, token: data.token }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Signup failed'));
    }
  };

  const login = async (userData) => {
    dispatch(loginStart());
    try {
      const data = await authService.login(userData);
      dispatch(loginSuccess({ user: data.data.user, token: data.token }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return {
    user,
    token,
    isLoading,
    error,
    signup,
    login,
    logout,
    clearAuthError: () => dispatch(clearError()),
  };
};
