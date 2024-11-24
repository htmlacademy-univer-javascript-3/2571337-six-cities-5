import { createMemoryHistory, MemoryHistory } from 'history';
import { JSX } from 'react';
import { HistoryRouter } from '../components/history-route/history-route';
import { TState } from '../types/state.types';
import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../services/api';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return <HistoryRouter history={memoryHistory}>{component}</HistoryRouter>;
}

type ComponentWithStore = {
  componentWithStore: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<TState> = {}
): ComponentWithStore {
  const api = createApi();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    componentWithStore: <Provider store={mockStore}>{component}</Provider>,
    mockAxiosAdapter,
    mockStore
  });
}
