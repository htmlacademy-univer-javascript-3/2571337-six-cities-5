import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { offers } from './mocks/offers';
import { city } from './mocks/cities';
import { comments } from './mocks/comments';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App comments={comments} city={city} offers={offers}/>
    </Provider>
  </React.StrictMode>
);
