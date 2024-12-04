import { render, screen } from '@testing-library/react';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { CommonOffer } from '../../types/offer.types';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { OffersList } from '.';
import { TState } from '../../types/state.types';
import { makeFakeUser } from '../../mocks/users';
import { AuthStatus } from '../../constants/user';
import { City } from '../../constants/cities';

const mockOnActiveOfferHandler = vi.fn();

describe('Component: OffersList', () => {
  const offersListProps: {
    onActiveOfferHandler?: (id: CommonOffer['id'] | null) => void;
    className: string;
    block: string;
    offers: CommonOffer[];
    } = {
      block: 'block',
      className: 'className',
      offers: [makeFakeCommonOffer()],
      onActiveOfferHandler: mockOnActiveOfferHandler
    };

  const initialState: Partial<TState> = {
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
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render correctly', () => {
    const offersListContainerTestId = 'offersListContainer';
    const expectedChildElementsCount = offersListProps.offers.length;
    const componentWithHistory = withHistory(<OffersList {...offersListProps}/>);
    const { componentWithStore: prependedComponent } = withStore(componentWithHistory, initialState);

    render(prependedComponent);

    expect(screen.getByTestId(offersListContainerTestId).childElementCount).toBe(expectedChildElementsCount);
  });
});
