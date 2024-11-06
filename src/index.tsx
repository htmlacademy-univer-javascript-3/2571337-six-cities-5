import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { offers } from './mocks/offers';
import { city } from './mocks/cities';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App city={city} offers={offers}/>
  </React.StrictMode>
);
