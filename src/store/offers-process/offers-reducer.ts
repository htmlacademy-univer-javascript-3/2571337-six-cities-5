import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonOffer, Offer } from '../../types/offer.types';
import { City } from '../../constants/cities';
import { SortingVariant } from '../../constants/sorting-variants';
import { fetchNearbyOffers, fetchOffer, fetchOffers } from './api-actions';

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

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    changeCityName: (state, { payload: newCityName }: PayloadAction<City>) => {
      state.cityName = newCityName;
    },
    changeSortingVariant: (state, { payload: newSortingVariant }: PayloadAction<SortingVariant>) => {
      state.sortingVariant = newSortingVariant;
    },
    clearOffer: (state) => {
      state.offer = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, {payload: offers}) => {
        state.offers = offers;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOffer.fulfilled, (state, {payload: offer}) => {
        if (offer) {
          state.offer = offer;
        }
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, {payload: nearbyOffers}) => {
        if (nearbyOffers) {
          state.nearbyOffers = nearbyOffers;
        }
      });
  }
});

export const offersReducer = offersSlice.reducer;
export const { changeCityName, changeSortingVariant, clearOffer } = offersSlice.actions;
