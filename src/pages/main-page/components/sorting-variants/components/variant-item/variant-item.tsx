import { SortingVariant } from '../../../../../../constants/sorting-variants';
import cn from 'classnames';

type VariantItemProps = {
    onChangeSortingVariant: (sortingVariantItem: SortingVariant) => void;
    sortingVariant: SortingVariant;
    sortingVariantItem: SortingVariant;
}

export const VariantItem = ({ onChangeSortingVariant, sortingVariant, sortingVariantItem }: VariantItemProps) => (
  <li
    data-testid="variantItemElement"
    onClick={() => onChangeSortingVariant(sortingVariantItem)}
    className={cn('places__option', { 'places__option--active': sortingVariantItem === sortingVariant })}
    tabIndex={0}
  >
    { sortingVariantItem }
  </li>
);
