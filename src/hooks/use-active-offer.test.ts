import { renderHook, act } from '@testing-library/react';
import { useActiveOffer } from './use-active-offer';
import { makeFakeCommonOffer } from '../mocks/offers';

describe('Hook: useActiveOffer', () => {
  it('should return object with ativeOffer and onActiveOfferHandler - function', () => {
    const { result } = renderHook(() => useActiveOffer());
    const { activeOffer, onActiveOfferHandler } = result.current;

    expect(Object.values(result.current)).toHaveLength(2);
    expect(activeOffer).toBeNull();
    expect(typeof onActiveOfferHandler).toBe('function');
  });

  it('should change active offer when onActiveOfferHandler called with offer id', () => {
    const expectedOffer = makeFakeCommonOffer();

    const { result } = renderHook(() => useActiveOffer());
    const { activeOffer: initialActiveOffer, onActiveOfferHandler } = result.current;
    act(() => onActiveOfferHandler(expectedOffer.id));
    const { activeOffer } = result.current;

    expect(initialActiveOffer).toBeNull();
    expect(activeOffer).toBe(expectedOffer.id);
  });
});
