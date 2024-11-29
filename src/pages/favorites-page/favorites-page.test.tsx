import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../../constants/user';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { makeFakeUser } from '../../mocks/users';
import { TState } from '../../types/state.types';
import { FavoritesPage } from './favorites-page';

describe('Component: FavoritesPage', () => {
  let initialState: Partial<TState>;

  beforeEach(() => {
    initialState = {
      offers: {
        cityName: makeFakeCommonOffer().city.name,
        favoriteOffers: [makeFakeCommonOffer()],
        isLoading: false,
        nearbyOffers: [makeFakeCommonOffer()],
        offer: makeFakeOffer(),
        offers: [makeFakeCommonOffer()],
        sortingVariant: makeFakeSortingVariant()
      },
      user: {
        authorizationStatus: AuthStatus.Authorized,
        user: makeFakeUser()
      },
    };
  });

  it('should render correctly with not empty favoriteOffers', () => {
    const expectedText = 'Saved listing';
    const notExpectedText = 'Save properties to narrow down search or plan your future trips.';
    const componentWithHistory = withHistory(<FavoritesPage/>);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render correctly with empty favoriteOffers', () => {
    const expectedText = 'Save properties to narrow down search or plan your future trips.';
    const notExpectedText = 'Saved listing';
    const componentWithHistory = withHistory(<FavoritesPage/>);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, {...initialState, offers: {...initialState.offers!, favoriteOffers: []}});

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
