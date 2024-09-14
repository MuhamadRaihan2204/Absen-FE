import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    error: null,
    successMessage: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.successMessage = action.payload.message;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload.error;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
});

export const { registerSuccess, registerFailure, resetError, resetSuccessMessage } = registerSlice.actions;

export const register = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
    dispatch(registerSuccess({ message: 'Registration successful' }));
  } catch (error) {
    dispatch(registerFailure({ error: error.response?.data.error || 'Registration failed' }));
  }
};

export default registerSlice.reducer;
