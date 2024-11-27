import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './reducers/offers-reducer';
import { createApi } from '../services/api';
import { usersReducer } from './reducers/user-reducer';
import { redirect } from './middlewares/redirect';

export const api = createApi();

const reducer = combineReducers({
  offers: offersReducer,
  user: usersReducer
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }).concat(redirect)
});
