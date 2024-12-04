
type OfferGoodsProps = {
    goods: string[];
}
export const OfferGoods = ({goods}: OfferGoodsProps) => (
  <div className="offer__inside">
    <h2 className="offer__inside-title">What&apos;s inside</h2>
    <ul data-testid="offerGoodsContainer" className="offer__inside-list">
      {
        goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)
      }
    </ul>
  </div>
);
