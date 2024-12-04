import { render, screen } from '@testing-library/react';
import { City } from '../../../../constants/cities';
import { AuthStatus } from '../../../../constants/user';
import { withHistory, withStore } from '../../../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../../../mocks/offers';
import { makeFakeUser } from '../../../../mocks/users';
import { CommonOffer } from '../../../../types/offer.types';
import { TState } from '../../../../types/state.types';
import { FavoriteCard } from './favorite-card';

describe('Component: FavoriteCard', () => {
  let initialState: Partial<TState>;
  const favoriteCardProps: {
        cityName: string;
        offersInCity: CommonOffer[];
    } = {
      cityName: City.Amsterdam,
      offersInCity: [makeFakeCommonOffer()]
    };

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

  it('should render correctly', () => {
    const expectedSityName = favoriteCardProps.cityName;
    const favoriteCardContainerTestId = 'favoriteCardContainer';
    const expectedChildNodes = favoriteCardProps.offersInCity.length;
    const componentWithHistory = withHistory(<FavoriteCard {...favoriteCardProps}/>);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedSityName)).toBeInTheDocument();
    expect(screen.getByTestId(favoriteCardContainerTestId).childNodes.length).toBe(expectedChildNodes);
  });
});
