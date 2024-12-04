import { useActiveOffer } from '../../../../hooks/use-active-offer';
import { useAppSelector } from '../../../../store/hooks';
import { Suspense } from '../../../../components/suspense';
import { SortingVariants } from '../sorting-variants';
import { OffersList } from '../../../../components/offers-list';
import { Map } from '../../../../components/map';
import cn from 'classnames';
import { selectCityName, selectFilteredByCityOffers, selectIsLoading } from '../../../../store/offers-process/selectors';
import { StubEmptyCitiesView } from '../stub-empty-cities-view';

export const CitiesView = () => {
  const { activeOffer, onActiveOfferHandler } = useActiveOffer();

  const { filteredOffers } = useAppSelector(selectFilteredByCityOffers);
  const cityName = useAppSelector(selectCityName);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <Suspense isLoading={isLoading}>
      <div className="cities">
        <div data-testid="citiesPlacesContainer" className={cn('cities__places-container','container', { 'cities__places-container--empty': filteredOffers.length === 0 })}>
          {
            filteredOffers.length === 0
              ? <StubEmptyCitiesView />
              :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in { cityName }</b>
                <SortingVariants />
                <OffersList
                  block='cities'
                  className={cn('cities__places-list', 'tabs__content')}
                  onActiveOfferHandler={onActiveOfferHandler}
                  offers={filteredOffers}
                />
              </section>
          }
          <div className="cities__right-section">
            <section className="cities__map map">
              {
                filteredOffers.length > 0 &&
                <Map key={cityName} city={filteredOffers[0].city} offers={filteredOffers} activeOffer={activeOffer}/>
              }
            </section>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
