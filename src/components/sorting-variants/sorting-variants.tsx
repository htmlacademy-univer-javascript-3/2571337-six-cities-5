import { useState } from 'react';
import { SortingVariant } from '../../constants/sorting-variants';
import { changeSortingVariant } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import cn from 'classnames';

export function SortingVariants() {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const sortingVariant = useAppSelector((state) => state.offers.sortingVariant);

  const onChangeSortingVariant = (newSortingVariant: SortingVariant) => dispatch(changeSortingVariant(newSortingVariant));
  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleExpanded}>
        { sortingVariant }
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={cn('places__options places__options--custom', {'places__options--opened': expanded})}
      >
        {
          Object.values(SortingVariant).map((sortingVariantItem) => (
            <li
              key={sortingVariantItem}
              onClick={() => onChangeSortingVariant(sortingVariantItem)}
              className={cn('places__option', { 'places__option--active': sortingVariantItem === sortingVariant })}
              tabIndex={0}
            >
              { sortingVariantItem }
            </li>
          ))
        }
      </ul>
    </form>
  );
}
