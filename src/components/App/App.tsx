import {JSX} from 'react';
import MainPage from '../../pages/MainPage/MainPage';
import { IPlace } from '../..';

interface AppProps {
    places: IPlace[];
}

function App({ places }: AppProps):JSX.Element {
  return (
    <MainPage placesCount={places.length} places={places} />
  );
}

export default App;
