import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import registerReducer from './register';
import filmsReducer from './film';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    films: filmsReducer,
  },
});

export default store;
