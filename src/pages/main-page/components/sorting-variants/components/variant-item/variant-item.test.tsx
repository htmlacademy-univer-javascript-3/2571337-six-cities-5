import { render, screen } from '@testing-library/react';
import { SortingVariant } from '../../../../../../constants/sorting-variants';
import { VariantItem } from './variant-item';
import userEvent from '@testing-library/user-event';

const mockOnChangeSortingVariant = vi.fn();

describe('Component: VariantItem', () => {
  const variantItemProps: {
        onChangeSortingVariant: (sortingVariantItem: SortingVariant) => void;
        sortingVariant: SortingVariant;
        sortingVariantItem: SortingVariant;
    } = {
      onChangeSortingVariant: mockOnChangeSortingVariant,
      sortingVariant: SortingVariant.TopRatedFirst,
      sortingVariantItem: SortingVariant.PriceFromLowToHigh
    };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with sortingVariantItem!==sortingVariant', () => {
    const variantItemElementTestId = 'variantItemElement';
    const notExpectedClass = 'places__option--active';

    render(<VariantItem {...variantItemProps}/>);

    expect(screen.getByTestId(variantItemElementTestId)).not.toHaveClass(notExpectedClass);
  });

  it('should render correctly with sortingVariantItem===sortingVariant', () => {
    const variantItemElementTestId = 'variantItemElement';
    const expectedClass = 'places__option--active';

    render(<VariantItem {...variantItemProps} sortingVariant={variantItemProps.sortingVariantItem}/>);

    expect(screen.getByTestId(variantItemElementTestId)).toHaveClass(expectedClass);
  });

  it('should onChangeSortingVariant clicked once and with correct sorting item', async () => {
    const variantItemElementTestId = 'variantItemElement';
    vi.spyOn(variantItemProps, 'onChangeSortingVariant');

    render(<VariantItem {...variantItemProps} />);
    await userEvent.click(screen.getByTestId(variantItemElementTestId));

    expect(mockOnChangeSortingVariant).toBeCalledTimes(1);
    expect(mockOnChangeSortingVariant).toBeCalledWith(variantItemProps.sortingVariantItem);
  });
});
