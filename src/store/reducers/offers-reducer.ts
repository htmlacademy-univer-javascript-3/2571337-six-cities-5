import { createReducer } from '@reduxjs/toolkit';
import { CommonOffer, Offer } from '../../types/offer.types';
import { changeCityName, changeSortingVariant, fillNearbyOffers, setOffer, fillOffers, setIsLoading } from '../action';
import { City } from '../../constants/cities';
import { SortingVariant } from '../../constants/sorting-variants';

type InitialState = {
    cityName: City;
    offers: CommonOffer[];
    nearbyOffers: CommonOffer[];
    offer: Offer | null;
    sortingVariant: SortingVariant;
    isLoading: boolean;
}

const initialState: InitialState = {
  cityName: City.Paris,
  sortingVariant: SortingVariant.Popular,
  offers: [],
  nearbyOffers: [],
  isLoading: false,
  offer: null
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityName, (state, { payload: newCityName }) => {
      state.cityName = newCityName;
    })
    .addCase(fillOffers, (state, { payload: offers }) => {
      state.offers = offers;
    })
    .addCase(changeSortingVariant, (state, { payload: newSortingVariant }) => {
      state.sortingVariant = newSortingVariant;
    })
    .addCase(setIsLoading, (state, { payload: isLoading }) => {
      state.isLoading = isLoading;
    })
    .addCase(setOffer, (state, { payload: offer }) => {
      state.offer = offer;
    })
    .addCase(fillNearbyOffers, (state, { payload: nearbyOffers }) => {
      state.nearbyOffers = nearbyOffers;
    });
});
