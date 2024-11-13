import { City } from '../../../../constants/cities';
import { LocationsList } from '../../../../components/locations-list';

export const CityTabs = () => (
  <div className="tabs">
    <section className="locations container">
      <LocationsList cities={Object.values(City)}/>
    </section>
  </div>
);
