import { SortingVariant } from '../../../../../../constants/sorting-variants';
import cn from 'classnames';

type VariantItemProps = {
    onChangeSortingVariant: (sortingVariantItem: SortingVariant) => void;
    sortingVariant: SortingVariant;
    sortingVariantItem: SortingVariant;
}

export const VariantItem = ({ onChangeSortingVariant, sortingVariant, sortingVariantItem }: VariantItemProps) => {
  const handleSortingVariantItemClick = () => onChangeSortingVariant(sortingVariantItem);
  return (
    <li
      data-testid="variantItemElement"
      onClick={handleSortingVariantItemClick}
      className={cn('places__option', { 'places__option--active': sortingVariantItem === sortingVariant })}
      tabIndex={0}
    >
      { sortingVariantItem }
    </li>
  );
};
