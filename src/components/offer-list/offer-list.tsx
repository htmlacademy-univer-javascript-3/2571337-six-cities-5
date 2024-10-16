import { useState } from 'react';
import { CommonOffer } from '../../types/offer';
import { OfferCard } from '../offer-card';


type OfferListProps = {
    offers: CommonOffer[];
}
export const OfferList = ({ offers }: OfferListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredOffer, setHoveredOffer] = useState<CommonOffer['id'] | null>(null);

  const hoveredOfferHandler = (id: CommonOffer['id'] | null) => {
    setHoveredOffer(id);
  };

  return (
    <>
      { offers.map((offer) => (
        <OfferCard
          hoveredOffer={hoveredOfferHandler}
          block='cities'
          imageSize='large'
          offer={offer}
          key={offer.id}
        />
      ))}
    </>
  );
};
