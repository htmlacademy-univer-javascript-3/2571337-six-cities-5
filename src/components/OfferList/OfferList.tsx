import { useState } from 'react';
import { CommonOffer } from '../../types/offers';
import { OfferCard } from '../OfferCard';


type OfferListProps = {
    offers: CommonOffer[];
}
export const OfferList = ({ offers }: OfferListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState<CommonOffer['id'] | null>(null);

  const onMouseEnterHandler = (id: CommonOffer['id'] | null) => {
    setActiveOffer(id);
  };

  return (
    <>
      { offers.map((offer) => <OfferCard onMouseEnterHandler={onMouseEnterHandler} offer={offer} key={offer.id}/>)}
    </>
  );
};
