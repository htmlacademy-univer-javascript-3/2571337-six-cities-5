import { createSelector } from '@reduxjs/toolkit';
import { TState } from '../../types/state.types';
import { sortOffers } from '../../helpers/sort-offers';

export const selectOffers = (state: Pick<TState, 'offers'>) => (state.offers.offers);

export const selectCityName = (state: Pick<TState, 'offers'>) => (state.offers.cityName);
export const selectSortingVariant = (state: Pick<TState, 'offers'>) => (state.offers.sortingVariant);
export const selectIsLoading = (state: Pick<TState, 'offers'>) => (state.offers.isLoading);
export const selectNearbyOffers = (state: Pick<TState, 'offers'>) => (state.offers.nearbyOffers);
export const selectOffer = (state: Pick<TState, 'offers'>) => (state.offers.offer);

export const selectFavoriteOffers = (state: Pick<TState, 'offers'>) => (state.offers.favoriteOffers);

export const selectFilteredByCityOffers = createSelector(
  [selectOffers, selectCityName, selectSortingVariant],
  (offers, cityName, sortingVariant) => ({
    filteredOffers: sortOffers(
      sortingVariant,
      offers.filter(({ city: { name } }) => name === cityName)
    )
  })
);
