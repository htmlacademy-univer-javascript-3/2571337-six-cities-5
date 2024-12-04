import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../../../mocks/offers';
import { OfferGoods } from './offer-goods';

describe('Component OfferGoods', () => {
  const offerGoodsProps: {
        goods: string[];
    } = {
      goods: makeFakeOffer().goods
    };
  it('should render correctly', () => {
    const expectedGoodsLength = offerGoodsProps.goods.length;
    const offerGoodsContainerTestId = 'offerGoodsContainer';

    render(<OfferGoods {...offerGoodsProps}/>);

    expect(screen.getByTestId(offerGoodsContainerTestId).childNodes.length).toBe(expectedGoodsLength);
  });
});
