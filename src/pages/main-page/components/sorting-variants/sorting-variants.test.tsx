import { render, screen } from '@testing-library/react';
import { SortingVariants } from '.';
import { withHistory, withStore } from '../../../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer } from '../../../../mocks/offers';
import { TState } from '../../../../types/state.types';
import userEvent from '@testing-library/user-event';
import { SortingVariant } from '../../../../constants/sorting-variants';

describe('Component: SortingVariants', () => {
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
        sortingVariant: SortingVariant.PriceFromLowToHigh
      },
    };
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const expectedText = 'Sort by';
    const sortingVariantTypeTestId = 'sortingVariantType';
    const expectedSortingVariant = initialState.offers!.sortingVariant;
    const componentWithHistory = withHistory(<SortingVariants />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(sortingVariantTypeTestId).innerHTML).toContain(expectedSortingVariant);
  });

  it('should render correctly before click on new sorting variant item', () => {
    const expectedText = 'Sort by';
    const placesOptionsContainerTestId = 'placesOptionsContainer';
    const notExpectedClass = 'places__options--opened';
    const sortingVariantTypeTestId = 'sortingVariantType';
    const expectedSortingVariant = initialState.offers!.sortingVariant;
    const componentWithHistory = withHistory(<SortingVariants />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(sortingVariantTypeTestId).innerHTML).toContain(expectedSortingVariant);
    expect(screen.getByTestId(placesOptionsContainerTestId)).not.toHaveClass(notExpectedClass);
  });

  it('should change expanded state after click on sortingVariantType', async () => {
    const sortingVariantTypeTestId = 'sortingVariantType';
    const placesOptionsContainerTestId = 'placesOptionsContainer';
    const expectedClass = 'places__options--opened';
    const componentWithHistory = withHistory(<SortingVariants />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);
    await userEvent.click(screen.getByTestId(sortingVariantTypeTestId));

    expect(screen.getByTestId(placesOptionsContainerTestId)).toHaveClass(expectedClass);
  });
});
