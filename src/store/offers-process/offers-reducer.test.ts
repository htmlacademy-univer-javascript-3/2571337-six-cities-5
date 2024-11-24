import { City } from '../../constants/cities';
import { SortingVariant } from '../../constants/sorting-variants';
import { makeFakeCommonOffer, makeFakeOffer } from '../../mocks/offers';
import { SetFavoriteOfferStatusParams } from '../../types/offer.types';
import { fetchFavoriteOffers, fetchNearbyOffers, fetchOffer, fetchOffers, setFavoriteOfferStatus } from './api-actions';
import { changeCityName, changeSortingVariant, clearOffer, offersReducer } from './offers-reducer';

describe('Test Offers Slice', () => {
  it('should set cityName with "changeCityName" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: false,
      offer: null
    };

    const expectedCityName = City.Brussels;

    const result = offersReducer(initialState, changeCityName(expectedCityName));

    expect(result.cityName).toEqual(expectedCityName);
  });

  it('should set sortingVariant with "changeSortingVariant" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: false,
      offer: null
    };

    const expectedSortingVariant = SortingVariant.PriceFromHighToLow;

    const result = offersReducer(initialState, changeSortingVariant(expectedSortingVariant));

    expect(result.sortingVariant).toEqual(expectedSortingVariant);
  });

  it('should set offer = null with "clearOffer" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: false,
      offer: makeFakeOffer()
    };

    const result = offersReducer(initialState, clearOffer);

    expect(result.offer).toBeNull();
  });

  it('should set isLoading = true with "fetchOffers.pending" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: false,
      offer: makeFakeOffer()
    };

    const expectedIsLoading = true;

    const result = offersReducer(initialState, fetchOffers.pending);

    expect(result.isLoading).toBe(expectedIsLoading);
  });

  it('should set isLoading = false & offers = payloadOffers with "fetchOffers.fulfilled" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: null
    };

    const payloadOffers = [makeFakeCommonOffer()];

    const expectedState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: payloadOffers,
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: false,
      offer: null
    };

    const result = offersReducer(initialState, fetchOffers.fulfilled(payloadOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading = false with "fetchOffers.rejected" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: null
    };
    const expectedIsLoading = false;

    const result = offersReducer(initialState, fetchOffers.rejected);

    expect(result.isLoading).toBe(expectedIsLoading);
  });

  it('should set offer = offer payload with "fetchOffer.fulfilled" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: null
    };

    const payloadOffer = makeFakeOffer();

    const expectedState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: payloadOffer
    };

    const result = offersReducer(initialState, fetchOffer.fulfilled(payloadOffer, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set nearbyOffers = nearbyOffers payload with "fetchNearbyOffers.fulfilled" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: null
    };

    const payloadNearbyOffers = [makeFakeCommonOffer()];

    const expectedState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: payloadNearbyOffers,
      favoriteOffers: [],
      isLoading: true,
      offer: null
    };

    const result = offersReducer(initialState, fetchNearbyOffers.fulfilled(payloadNearbyOffers, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set favoriteOffers = favoriteOffers payload with "fetchFavoriteOffers.fulfilled" action', () => {
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: null
    };

    const payloadFavoriteOffers = [makeFakeCommonOffer()];

    const expectedState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [],
      nearbyOffers: [],
      favoriteOffers: payloadFavoriteOffers,
      isLoading: true,
      offer: null
    };

    const result = offersReducer(initialState, fetchFavoriteOffers.fulfilled(payloadFavoriteOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should offer not null && set offer.isFavorite and change in offers state isFavorite like payload isFavorite with "setFavoriteOfferStatus.fulfilled" action', () => {
    const fakeOffer = makeFakeOffer();
    const fakeCommonOffer = makeFakeCommonOffer(fakeOffer);
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [fakeCommonOffer],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: fakeOffer
    };

    const payloadOffer = {...fakeOffer, isFavorite: !fakeOffer.isFavorite};

    const expectedState = {
      ...initialState,
      offers: initialState.offers.map((itemOffer) => itemOffer.id === payloadOffer.id ? ({...itemOffer, isFavorite: !itemOffer.isFavorite}) : itemOffer),
      offer: payloadOffer
    };

    const result = offersReducer(initialState, setFavoriteOfferStatus.fulfilled(payloadOffer, '', {} as SetFavoriteOfferStatusParams));

    expect(result).toEqual(expectedState);
  });

  it('should change in offers state isFavorite like payload isFavorite and offer = null with "setFavoriteOfferStatus.fulfilled" action', () => {
    const fakeOffer = makeFakeOffer();
    const fakeCommonOffer = makeFakeCommonOffer(fakeOffer);
    const initialState = {
      cityName: City.Paris,
      sortingVariant: SortingVariant.Popular,
      offers: [fakeCommonOffer],
      nearbyOffers: [],
      favoriteOffers: [],
      isLoading: true,
      offer: null
    };

    const payloadOffer = {...fakeOffer, isFavorite: !fakeOffer.isFavorite};

    const expectedState = {
      ...initialState,
      offers: initialState.offers.map((itemOffer) => itemOffer.id === payloadOffer.id ? ({...itemOffer, isFavorite: !itemOffer.isFavorite}) : itemOffer),
      offer: null
    };

    const result = offersReducer(initialState, setFavoriteOfferStatus.fulfilled(payloadOffer, '', {} as SetFavoriteOfferStatusParams));

    expect(result).toEqual(expectedState);
  });
});
