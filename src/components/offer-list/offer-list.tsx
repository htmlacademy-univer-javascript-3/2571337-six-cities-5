import { CommonOffer } from '../../types/offer.types';
import { OfferCard } from '../offer-card';


type OfferListProps = {
    offers: CommonOffer[];
    onListOfferHover: (id: CommonOffer['id'] | null) => void;
}
export const OfferList = ({ offers, onListOfferHover}: OfferListProps) => (
  <>
    { offers.map((offer) => (
      <OfferCard
        onListOfferHover={onListOfferHover}
        block='cities'
        imageSize='large'
        offer={offer}
        key={offer.id}
      />
    ))}
  </>
);
