import { useAppSelector } from '../../store/hooks';
import { CommonOffer } from '../../types/offer.types';
import { OfferCard } from '../offer-card';
import cn from 'classnames';


type OffersListProps = {
    onActiveOfferHandler?: (id: CommonOffer['id'] | null) => void;
    className: string;
    block: string;
}
export const OffersList = (props: OffersListProps) => {
  const { onActiveOfferHandler, className, block} = props;
  const { cityName, offers } = useAppSelector((state) => state.offers);

  return (
    <div className={cn(className, 'places__list')}>
      { offers.filter(({ city }) => city.name === cityName).map((offer) => (
        <OfferCard
          onActiveOfferHandler={onActiveOfferHandler}
          block={block}
          imageSize='large'
          offer={offer}
          key={offer.id}
        />
      ))}
    </div>
  );
};
