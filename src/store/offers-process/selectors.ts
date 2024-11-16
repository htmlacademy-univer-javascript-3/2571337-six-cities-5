import { createSelector } from '@reduxjs/toolkit';
import { TState } from '../../types/state.types';
import { sortOffers } from '../../helpers/sort-offers';

export const selectOffers = (state: TState) => ({offers: state.offers.offers});
export const selectOffersPrimitive = (state: TState) => state.offers.offers;

export const selectCityName = (state: TState) => ({cityName: state.offers.cityName});
export const selectSortingVariant = (state: TState) => ({sortingVariant: state.offers.sortingVariant});
export const selectIsLoading = (state: TState) => ({isLoading: state.offers.isLoading});
export const selectNearbyOffers = (state: TState) => ({ nearbyOffers: state.offers.nearbyOffers });
export const selectOffer = (state: TState) => ({ offer: state.offers.offer });

export const selectFavoriteOffers = (state: TState) => ({ favoriteOffers: state.offers.favoriteOffers });

export const selectFilteredByCityOffers = createSelector(
  [selectOffers, selectCityName, selectSortingVariant],
  ({offers}, {cityName}, {sortingVariant}) => ({
    filteredOffers: sortOffers(
      sortingVariant,
      offers.filter(({ city: { name } }) => name === cityName)
    )
  })
);
