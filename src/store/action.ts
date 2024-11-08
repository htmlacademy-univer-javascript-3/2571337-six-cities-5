import { createAction } from '@reduxjs/toolkit';
import { City } from '../constants/cities';
import { SortingVariant } from '../constants/sorting-variants';


import { CommonOffer, Offer } from '../types/offer.types';
import { AuthStatus } from '../constants/user';
import { AppRoute } from '../constants/routes';
import { TComment } from '../types/comment.types';

export const changeCityName = createAction<City>('offers/changeCityName');
export const fillOffers = createAction<CommonOffer[]>('offers/fillOffers');
export const fillOffer = createAction<Offer>('offers/fillOffer');
export const changeSortingVariant = createAction<SortingVariant>('offers/changeSortingVariant');
export const setIsLoading = createAction<boolean>('offers/setIsLoading');
export const fillNearbyOffers = createAction<CommonOffer[]>('offers/fillNearbyOffers');

export const fillComments = createAction<TComment[]>('comments/fillComments');
export const addNewComment = createAction<TComment>('comments/addNewComment');


export const setAuthorizationStatus = createAction<AuthStatus>('user/setAuthorizationStatus');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setError = createAction<string | null>('app/setError');
