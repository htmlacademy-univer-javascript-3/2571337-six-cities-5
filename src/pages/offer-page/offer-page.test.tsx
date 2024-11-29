import { render, screen } from '@testing-library/react';
import { City } from '../../constants/cities';
import { AuthStatus } from '../../constants/user';
import { makeFakeComment } from '../../mocks/comments';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { makeFakeUser } from '../../mocks/users';
import { TState } from '../../types/state.types';
import { OfferPage } from './offer-page';

describe('Component: OfferPage', () => {
  let initialState:Partial<TState>;

  beforeEach(() => {
    initialState = {
      user: {
        authorizationStatus: AuthStatus.Authorized,
        user: makeFakeUser()
      },
      offers: {
        cityName: City.Paris,
        favoriteOffers: [makeFakeCommonOffer()],
        isLoading: false,
        nearbyOffers: [makeFakeCommonOffer()],
        offer: makeFakeOffer(),
        offers: [makeFakeCommonOffer()],
        sortingVariant: makeFakeSortingVariant()
      },
      comments: {
        comments: [makeFakeComment()],
        errorMessage: null,
        isLoading: false
      }
    };
  });
  it('should render correctly with authorized user', () => {
    const componentWithHistory = withHistory(<OfferPage/>);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);
    const expectedHeaderText = initialState.offers!.offer!.title;
    const expectedOfferPrice = `€${initialState.offers!.offer!.price}`;
    const expectedText = 'Other places in the neighbourhood';
    const expectedFormText = 'Your review';

    render(prepandedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedOfferPrice)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedFormText)).toBeInTheDocument();
  });

  it('should render correctly with unauthorized user', () => {
    const componentWithHistory = withHistory(<OfferPage/>);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, {...initialState, user: {...initialState.user!, authorizationStatus: AuthStatus.Unauthorized}});
    const notExpectedFormText = 'Your review';

    render(prepandedComponent);

    expect(screen.queryByText(notExpectedFormText)).not.toBeInTheDocument();
  });
});
