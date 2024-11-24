import { TState } from '../types/state.types';
import { makeFakeComment } from './comments';
import { datatype } from 'faker';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from './offers';
import { makeFakeUser } from './users';
import { AuthStatus } from '../constants/user';
import { makeFakeCity } from './cities';

const initialStore: TState = {
  comments: {
    comments: [makeFakeComment()],
    errorMessage: null,
    isLoading: datatype.boolean()
  },
  offers: {
    cityName: makeFakeCity().name,
    favoriteOffers: [makeFakeCommonOffer()],
    isLoading: datatype.boolean(),
    nearbyOffers: [makeFakeCommonOffer()],
    offer: makeFakeOffer(),
    offers: [makeFakeCommonOffer()],
    sortingVariant: makeFakeSortingVariant()
  },
  user: {
    user: makeFakeUser(),
    authorizationStatus: AuthStatus.Unauthorized
  }
};

export function makeFakeStore(initialState?: Partial<TState>): TState {
  return {
    ...initialStore,
    ...(initialState ?? {})
  };
}
