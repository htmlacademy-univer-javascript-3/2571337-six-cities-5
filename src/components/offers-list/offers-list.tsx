import { CommonOffer } from '../../types/offer.types';
import { OfferCard } from '../offer-card';
import cn from 'classnames';


type OffersListProps = {
    onActiveOfferHandler?: (id: CommonOffer['id'] | null) => void;
    className: string;
    block: string;
    offers: CommonOffer[];
}
export const OffersList = (props: OffersListProps) => {
  const { onActiveOfferHandler, className, block, offers} = props;

  const onMouseEnterCardHandler = ({idOffer}: {idOffer: CommonOffer['id']}) => {
    onActiveOfferHandler?.(idOffer);
  };

  const onMouseLeaveCardHandler = () => {
    onActiveOfferHandler?.(null);
  };

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
