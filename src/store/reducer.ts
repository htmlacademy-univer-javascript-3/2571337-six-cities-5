import { createReducer } from '@reduxjs/toolkit';
import { CommonOffer } from '../types/offer.types';
import { changeCityName, fillOffers } from './action';
import { offers } from '../mocks/offers';
import { City } from '../constants/cities';

type InitialState = {
    cityName: City;
    offers: CommonOffer[];
}

const initialState: InitialState = {
  cityName: City.Paris,
  offers
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityName, (state, { payload }) => {
      state.cityName = payload;
    })
    .addCase(fillOffers, (state) => {
      state.offers = offers;
    });
});
