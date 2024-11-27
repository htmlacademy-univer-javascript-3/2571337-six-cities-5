import { createAction } from '@reduxjs/toolkit';
import { City } from '../constants/cities';
import { SortingVariant } from '../constants/sorting-variants';


import { CommonOffer } from '../types/offer.types';

export const changeCityName = createAction<City>('offers/changeCityName');
export const fillOffers = createAction<CommonOffer[]>('offers/fillOffers');
export const changeSortingVariant = createAction<SortingVariant>('offers/changeSortingVariant');
export const setIsLoading = createAction<boolean>('offers/setIsLoading');
