import { render, screen } from '@testing-library/react';
import { TState } from '../../types/state.types';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { MainPage } from './main-page';
import { AuthStatus } from '../../constants/user';
import { makeFakeUser } from '../../mocks/users';

describe('Component: MainPage', () => {
  let initialState:Partial<TState>;
  const fakeCommonOffer = makeFakeCommonOffer();

  beforeEach(() => {
    initialState = {
      offers: {
        cityName: fakeCommonOffer.city.name,
        favoriteOffers: [makeFakeCommonOffer()],
        isLoading: false,
        nearbyOffers: [makeFakeCommonOffer()],
        offer: makeFakeOffer(),
        offers: [fakeCommonOffer],
        sortingVariant: makeFakeSortingVariant()
      },
      user: {
        authorizationStatus: AuthStatus.Authorized,
        user: makeFakeUser()
      },
    };
  });

  it('should render correctly', () => {
    const expectedText = 'Cities';
    const componentWithHistory = withHistory(<MainPage />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
