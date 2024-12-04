import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../constants/routes';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
