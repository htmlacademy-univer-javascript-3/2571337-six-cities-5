import { Offer } from '../../../../types/offer.types';
import cn from 'classnames';

type OfferHostProps = {
    host: Offer['host'];
    description: string;
}
export const OfferHost = ({ host, description }: OfferHostProps) => (
  <div className="offer__host">
    <h2 className="offer__host-title">Meet the host</h2>
    <div className="offer__host-user user">
      <div
        data-testid="userAvatarComponent"
        className={cn('offer__avatar-wrapper user__avatar-wrapper', {['offer__avatar-wrapper--pro']: host.isPro})}
      >
        <img
          className="offer__avatar user__avatar"
          src={host.avatarUrl}
          width={74}
          height={74}
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{host.name}</span>
      {
        host.isPro && <span className="offer__user-status">Pro</span>
      }
    </div>
    <div className="offer__description">
      <p className="offer__text">
        { description }
      </p>
    </div>
  </div>
);
