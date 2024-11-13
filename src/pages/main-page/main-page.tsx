import { JSX } from 'react';
import { CityTabs } from './components/city-tabs';
import { CitiesView } from './components/cities-view';

export function MainPage():JSX.Element {

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CityTabs />
      <CitiesView />
    </main>
  );
}
