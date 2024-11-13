import cn from 'classnames';
import { SortingVariant } from '../../../../../../constants/sorting-variants';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { changeSortingVariant } from '../../../../../../store/action';
import { VariantItem } from '../variant-item';

type VariantsListProps = {
    expanded: boolean;
    toggleExpanded: () => void;
}
export const VariantsList = ({ expanded, toggleExpanded }: VariantsListProps) => {
  const dispatch = useAppDispatch();
  const sortingVariant = useAppSelector((state) => state.offers.sortingVariant);

  const onChangeSortingVariant = (newSortingVariant: SortingVariant) => {
    dispatch(changeSortingVariant(newSortingVariant));
    toggleExpanded();
  };

  return (
    <ul
      className={cn('places__options places__options--custom', {'places__options--opened': expanded})}
    >
      {
        Object.values(SortingVariant).map((sortingVariantItem) => (
          <VariantItem key={sortingVariantItem} onChangeSortingVariant={onChangeSortingVariant} sortingVariant={sortingVariant} sortingVariantItem={sortingVariantItem}/>
        ))
      }
    </ul>
  );
};
