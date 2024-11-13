import { memo, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { VariantsList } from './components/variants-list';

const SortingVariants = () => {
  const [expanded, setExpanded] = useState(false);
  const sortingVariant = useAppSelector((state) => state.offers.sortingVariant);

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
      <VariantsList
        expanded={expanded}
        toggleExpanded={toggleExpanded}
      />
    </form>
  );
};

export const MemoSortingVariants = memo(SortingVariants);
