import { render, screen } from '@testing-library/react';
import { OfferRating } from './offer-rating';

describe('Component: OfferRating', () => {
  const offerRatingProps:{
        block: string;
        rating: number;
        renderValue?: boolean;
    } = {
      block: 'block',
      rating: 2,
      renderValue: true
    };

  it('should render correctly with renderValue', () => {
    const renderedValueTestId = 'renderedValue';
    const expectedText = 'Rating';
    const offerRaitingContainerTestId = 'offerRatingContainer';
    const expectedClassName = `${offerRatingProps.block}__rating`;

    render(<OfferRating {...offerRatingProps}/>);

    expect(screen.getByTestId(renderedValueTestId)).toBeInTheDocument();
    expect(screen.getByText(offerRatingProps.rating)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(offerRaitingContainerTestId)).toHaveClass(expectedClassName);
  });

  it('should render correctly with renderValue=false', () => {
    const renderedValueTestId = 'renderedValue';
    const expectedText = 'Rating';
    const offerRaitingContainerTestId = 'offerRatingContainer';
    const expectedClassName = `${offerRatingProps.block}__rating`;

    render(<OfferRating {...offerRatingProps} renderValue={false}/>);

    expect(screen.queryByTestId(renderedValueTestId)).not.toBeInTheDocument();
    expect(screen.queryByText(offerRatingProps.rating)).not.toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(offerRaitingContainerTestId)).toHaveClass(expectedClassName);
  });
});
