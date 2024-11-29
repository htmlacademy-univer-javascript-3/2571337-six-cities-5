import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../../../mocks/offers';
import { Offer } from '../../../../types/offer.types';
import { OfferHost } from './offer-host';

describe('Component: OfferHost', () => {
  const fakeOffer = makeFakeOffer();
  const offerHostProps:{
        host: Offer['host'];
        description: string;
    } = {
      description: fakeOffer.description,
      host: {...fakeOffer.host, isPro: false}
    };
  it('should render correctly with host not pro', () => {
    const expectedHeaderText = 'Meet the host';
    const userAvatarComponentTestId = 'userAvatarComponent';
    const notExpectedClass = 'offer__avatar-wrapper--pro';
    const notExpectedText = 'Pro';
    const expectedDescription = offerHostProps.description;
    const expectedHostName = offerHostProps.host.name;

    render(<OfferHost {...offerHostProps}/>);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescription)).toBeInTheDocument();
    expect(screen.getByText(expectedHostName)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    expect(screen.getByTestId(userAvatarComponentTestId)).not.toHaveClass(notExpectedClass);
  });

  it('should render correctly with host pro', () => {
    const userAvatarComponentTestId = 'userAvatarComponent';
    const expectedClass = 'offer__avatar-wrapper--pro';
    const expectedText = 'Pro';

    render(<OfferHost {...offerHostProps} host={{...offerHostProps.host, isPro: true}}/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(userAvatarComponentTestId)).toHaveClass(expectedClass);
  });
});
