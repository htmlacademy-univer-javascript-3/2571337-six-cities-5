import { CommonOffer } from '../../types/offer.types';
import { OfferCard } from '../offer-card';


type OfferListProps = {
    offers: CommonOffer[];
    onActiveOffer: (id: CommonOffer['id'] | null) => void;
}
export const OfferList = ({ offers, onActiveOffer}: OfferListProps) => (
  <>
    { offers.map((offer) => (
      <OfferCard
        onActiveOffer={onActiveOffer}
        block='cities'
        imageSize='large'
        offer={offer}
        key={offer.id}
      />
    ))}
  </>
);
