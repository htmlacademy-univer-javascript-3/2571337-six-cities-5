import { createAction } from '@reduxjs/toolkit';
import { City } from '../constants/cities';
import { SortingVariant } from '../constants/sorting-variants';


import { CommonOffer } from '../types/offer.types';
import { AuthStatus } from '../constants/user';
import { AppRoute } from '../constants/routes';

export const changeCityName = createAction<City>('offers/changeCityName');
export const fillOffers = createAction<CommonOffer[]>('offers/fillOffers');
export const changeSortingVariant = createAction<SortingVariant>('offers/changeSortingVariant');
export const setIsLoading = createAction<boolean>('offers/setIsLoading');
export const setAuthorizationStatus = createAction<AuthStatus>('user/setAuthorizationStatus');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
