
type OfferRatingProps = {
    block: string;
    rating: number;
    renderValue?: boolean;
}

export const OfferRating = ({ block, rating, renderValue = false }: OfferRatingProps) => (
  <div data-testid="offerRatingContainer" className={`${block}__rating rating`}>
    <div className={`${block}__stars rating__stars`}>
      <span style={{ width: `${20 * Math.round(rating)}%` }} />
      <span className="visually-hidden">Rating</span>
    </div>
    { renderValue && <span data-testid="renderedValue" className="offer__rating-value rating__value">{rating}</span> }
  </div>
);
