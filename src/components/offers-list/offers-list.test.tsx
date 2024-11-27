import { makeFakeCommonOffer } from '../../mocks/offers';
import { CommonOffer } from '../../types/offer.types';

const mockOnActiveOfferHandler = vi.fn();

describe('Component: OffersList', () => {
  const offersListProps: {
    onActiveOfferHandler?: (id: CommonOffer['id'] | null) => void;
    className: string;
    block: string;
    offers: CommonOffer[];
    } = {
      block: 'block',
      className: 'className',
      offers: [makeFakeCommonOffer()],
      onActiveOfferHandler: mockOnActiveOfferHandler
    };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render correctly', () => {

  });
});
