import { createReducer } from '@reduxjs/toolkit';
import { CommonOffer } from '../types/offer.types';
import { changeCityName, changeSortingVariant, fillOffers } from './action';
import { offers } from '../mocks/offers';
import { City } from '../constants/cities';
import { SortingVariant } from '../constants/sorting-variants';

type InitialState = {
    cityName: City;
    offers: CommonOffer[];
    sortingVariant: SortingVariant;
}

const initialState: InitialState = {
  cityName: City.Paris,
  sortingVariant: SortingVariant.Popular,
  offers
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityName, (state, { payload: newCityName }) => {
      state.cityName = newCityName;
    })
    .addCase(fillOffers, (state) => {
      state.offers = offers;
    })
    .addCase(changeSortingVariant, (state, { payload: newSortingVariant }) => {
      state.sortingVariant = newSortingVariant;
    });
});
