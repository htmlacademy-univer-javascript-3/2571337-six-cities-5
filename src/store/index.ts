import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './reducer';
import { createApi } from '../services/api';

export const api = createApi();

const reducer = combineReducers({
  offers: offersReducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});
