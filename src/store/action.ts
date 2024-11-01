import { createAction } from '@reduxjs/toolkit';
import { City } from '../constants/cities';

export const changeCityName = createAction<City>('cityOffers/changeCityName');
export const fillOffers = createAction('cityOffers/fillOffers');
