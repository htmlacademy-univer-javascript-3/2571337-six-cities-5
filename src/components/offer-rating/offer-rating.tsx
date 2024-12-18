
type OfferRatingProps = {
    block: string;
    rating: number;
    renderValue?: boolean;
}

const NUM_FOR_CALCULATE_TO_HUNDRED = 20;

export const OfferRating = ({ block, rating, renderValue = false }: OfferRatingProps) => (
  <div data-testid="offerRatingContainer" className={`${block}__rating rating`}>
    <div className={`${block}__stars rating__stars`}>
      <span style={{ width: `${NUM_FOR_CALCULATE_TO_HUNDRED * Math.round(rating)}%` }} />
      <span className="visually-hidden">Rating</span>
    </div>
    { renderValue && <span data-testid="renderedValue" className="offer__rating-value rating__value">{rating}</span> }
  </div>
);
