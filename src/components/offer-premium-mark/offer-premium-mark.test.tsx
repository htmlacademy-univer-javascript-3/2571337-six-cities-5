import { render, screen } from '@testing-library/react';
import { OfferPremiumMark } from './offer-premium-mark';

describe('Component: OfferPremiumMark', () => {
  const offerPremiumMarkProps:{
        isPremium: boolean;
        className: string;
    } = {
      isPremium: true,
      className: 'className'
    };
  it('should render correclty with isPremium=true', () => {
    const expectedText = 'Premium';
    const offerPremiumMarkContainerTestId = 'offerPremiumMarkContainer';

    render(<OfferPremiumMark {...offerPremiumMarkProps}/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(offerPremiumMarkContainerTestId)).toHaveClass(offerPremiumMarkProps.className);
  });

  it('should render correclty with isPremium=false', () => {
    const notExpectedText = 'Premium';

    render(<OfferPremiumMark {...offerPremiumMarkProps} isPremium={false}/>);

    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
