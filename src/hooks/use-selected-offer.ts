import { useState } from 'react';
import { CommonOffer } from '../types/offer.types';

export function useSelectedOffer() {
  const [selectedOffer, setSelectedOffer] = useState<CommonOffer['id'] | null>(null);

  const hoveredOfferHandler = (id: CommonOffer['id'] | null) => {
    setSelectedOffer(id);
  };
  return {
    selectedOffer, hoveredOfferHandler
  };
}
