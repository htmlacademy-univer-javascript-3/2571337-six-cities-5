import { CommonOffer } from '../../types/offer.types';
import { OfferCard } from '../offer-card';
import cn from 'classnames';


type OffersListProps = {
    offers: CommonOffer[];
    onListOfferHover?: (id: CommonOffer['id'] | null) => void;
    className: string;
    block: string;
}
export const OffersList = (props: OffersListProps) => {
  const { offers, onListOfferHover, className, block} = props;

  return (
    <div className={cn(className, 'places__list')}>
      { offers && offers.map((offer) => (
        <OfferCard
          onListOfferHover={onListOfferHover}
          block={block}
          imageSize='large'
          offer={offer}
          key={offer.id}
        />
      ))}
    </div>
  );
};
