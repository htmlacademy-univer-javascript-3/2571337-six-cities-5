import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../../../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../../../../../mocks/offers';
import { TState } from '../../../../../../types/state.types';
import { VariantsList } from './variants-list';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../../../../mocks/mocks';
import { changeSortingVariant } from '../../../../../../store/offers-process/offers-reducer';

const mockToggleExpanded = vi.fn();

describe('Component: VariantsList', () => {
  let initialState:Partial<TState>;
  const fakeCommonOffer = makeFakeCommonOffer();
  const variantsListProps: {
        expanded: boolean;
        toggleExpanded: () => void;
    } = {
      expanded: false,
      toggleExpanded: mockToggleExpanded
    };

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
    };
    vi.clearAllMocks();
  });

  it('should render correctly with expanded=false', () => {
    const placesOptionsContainerTestId = 'placesOptionsContainer';
    const notExpectedClass = 'places__options--opened';
    const componentWithHistory = withHistory(<VariantsList {...variantsListProps} />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByTestId(placesOptionsContainerTestId)).not.toHaveClass(notExpectedClass);
  });

  it('should render correctly with expanded=true', () => {
    const placesOptionsContainerTestId = 'placesOptionsContainer';
    const expectedClass = 'places__options--opened';
    const componentWithHistory = withHistory(<VariantsList {...variantsListProps} expanded />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByTestId(placesOptionsContainerTestId)).toHaveClass(expectedClass);
  });

  it('should dispatch changeSortingVariant and called toggleExpanded after clicked on sorting variant item', async () => {
    const variantItemElementTestId = 'variantItemElement';
    const componentWithHistory = withHistory(<VariantsList {...variantsListProps} expanded />);
    const { componentWithStore: prepandedComponent, mockStore } = withStore(componentWithHistory, initialState);
    vi.spyOn(variantsListProps, 'toggleExpanded');

    render(prepandedComponent);
    await userEvent.click(screen.getAllByTestId(variantItemElementTestId)[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([changeSortingVariant.type]);
    expect(mockToggleExpanded).toBeCalledTimes(1);
  });
});
