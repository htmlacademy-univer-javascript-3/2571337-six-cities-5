import { memo, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { VariantsList } from './components/variants-list';
import { selectSortingVariant } from '../../../../store/offers-process/selectors';

const SortingVariants = () => {
  const [expanded, setExpanded] = useState(false);
  const sortingVariant = useAppSelector(selectSortingVariant);

  const onToggleExpanded = () => setExpanded((prev) => !prev);

  const handleSortingVariantClick = () => onToggleExpanded();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span data-testid="sortingVariantType" className="places__sorting-type" tabIndex={0} onClick={handleSortingVariantClick}>
        { sortingVariant }
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <VariantsList
        expanded={expanded}
        toggleExpanded={onToggleExpanded}
      />
    </form>
  );
};

export const MemoSortingVariants = memo(SortingVariants);
