type OfferPremiumMarkProps = {
    isPremium: boolean;
    className: string;
}
export const OfferPremiumMark = ({ isPremium, className }: OfferPremiumMarkProps) => !isPremium ? null
  : (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
