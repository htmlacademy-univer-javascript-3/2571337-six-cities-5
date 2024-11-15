import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchFavoriteOffers, fetchOffers } from './store/offers-process/api-actions';
import { checkAuth } from './store/user-process/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffers());
store.dispatch(checkAuth());
store.dispatch(fetchFavoriteOffers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
