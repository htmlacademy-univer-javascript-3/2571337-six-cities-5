import { memo, useCallback } from 'react';
import { CommonOffer } from '../../types/offer.types';
import { OfferCard } from '../offer-card';
import cn from 'classnames';


type OffersListProps = {
    onActiveOfferHandler?: (id: CommonOffer['id'] | null) => void;
    className: string;
    block: string;
    offers: CommonOffer[];
}
const OffersList = (props: OffersListProps) => {
  const { onActiveOfferHandler, className, block, offers} = props;

  const onMouseEnterCardHandler = useCallback(({idOffer}: {idOffer: CommonOffer['id']}) => {
    onActiveOfferHandler?.(idOffer);
  },[onActiveOfferHandler]);

  const onMouseLeaveCardHandler = useCallback(() => {
    onActiveOfferHandler?.(null);
  }, [onActiveOfferHandler]);

  return (
    <div className={cn(className, 'places__list')}>
      { offers.map((offer) => (
        <OfferCard
          block={block}
          imageSize='large'
          offer={offer}
          key={offer.id}
          onMouseEnterHandler={onMouseEnterCardHandler}
          onMouseLeaveHandler={onMouseLeaveCardHandler}
        />
      ))}
    </div>
  );
};

export const MemoOffersList = memo(OffersList);
