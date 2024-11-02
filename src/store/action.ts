import { createAction } from '@reduxjs/toolkit';
import { City } from '../constants/cities';
import { SortingVariant } from '../constants/sorting-variants';

export const changeCityName = createAction<City>('cityOffers/changeCityName');
export const fillOffers = createAction('cityOffers/fillOffers');
export const changeSortingVariant = createAction<SortingVariant>('cityOffers/changeSortingVariant');
