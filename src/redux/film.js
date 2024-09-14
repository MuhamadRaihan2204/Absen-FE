import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    error: null,
  },
  reducers: {
    setFilms: (state, action) => {
      state.films = action.payload;
    },
    addFilm: (state, action) => {
      state.films.push(action.payload);
    },
    filmUpdated: (state, action) => {
      const index = state.films.findIndex(film => film._id === action.payload._id);
      if (index !== -1) {
        state.films[index] = action.payload;
      }
    },
    deleteFilmSuccess: (state, action) => {
      state.films = state.films.filter(film => film._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { setFilms, addFilm, filmUpdated, deleteFilmSuccess, setError, resetError } = filmsSlice.actions;

export const fetchFilms = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/films');
    dispatch(setFilms(response.data.films));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createFilm = (film) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/films', film);
    dispatch(addFilm(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateFilm = (id, data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/films/${id}`, data);
    dispatch(filmUpdated(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteFilm = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/films/${id}`);
    console.log(id);
    dispatch(deleteFilmSuccess(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default filmsSlice.reducer;
