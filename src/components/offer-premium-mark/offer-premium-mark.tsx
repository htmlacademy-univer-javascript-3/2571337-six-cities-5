type OfferPremiumMarkProps = {
    isPremium: boolean;
    className: string;
}
export const OfferPremiumMark = ({ isPremium, className }: OfferPremiumMarkProps) => !isPremium ? null
  : (
    <div data-testid="offerPremiumMarkContainer" className={className}>
      <span>Premium</span>
    </div>
  );
