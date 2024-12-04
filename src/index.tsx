import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffers } from './store/offers-process/api-actions';
import { checkAuth } from './store/user-process/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HistoryRouter } from './components/history-route/history-route';
import { browserHistory } from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffers());
store.dispatch(checkAuth());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
