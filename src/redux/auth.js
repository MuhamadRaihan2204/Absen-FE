import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout, resetError } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/signin', { email, password });
    localStorage.setItem('token', response.data.token);
    dispatch(loginSuccess({ token: response.data.token }));
  } catch (error) {
    dispatch(loginFailure({ error: error.response?.data.error || 'Login failed' }));
  }
};

export default authSlice.reducer;
