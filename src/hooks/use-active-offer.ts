import { useCallback, useState } from 'react';
import { CommonOffer } from '../types/offer.types';

export function useActiveOffer() {
  const [activeOffer, setActiveOffer] = useState<CommonOffer['id'] | null>(null);

  const onActiveOfferHandler = useCallback((id: CommonOffer['id'] | null) => {
    setActiveOffer(id);
  }, []);

  return {
    activeOffer, onActiveOfferHandler
  };
}
