/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import initStore, { IRootState } from 'src/config/store';
import AutoMockedProvider from './auto-mocked-provider';
import { IMocks } from '@graphql-tools/mock';
// import ApiProvider from 'src/providers/api-provider';

type IRenderWihAllOptions = Omit<RenderOptions, 'queries'> & {
  initialState?: IRootState;
  store?: Store;
  route?: string;
  history?: any;
  mockResolvers?: IMocks;
};

export const renderWithAllProviders = (ui: React.ReactElement, customOptions: IRenderWihAllOptions = {}) => {
  const {
    initialState,
    store = initStore(initialState),
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    mockResolvers,
    ...renderOptions
  } = customOptions;

  const AllTheProviders: React.FC = ({ children }) => (
    <Provider store={store}>
      <AutoMockedProvider mockResolvers={mockResolvers}>
        <Router history={history}>{children}</Router>
      </AutoMockedProvider>
    </Provider>
  );

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

type IRenderWithApiOptions = Omit<RenderOptions, 'queries'> & {
  mockResolvers?: IMocks;
};

export const renderWithApiProvider = (ui: React.ReactElement, customOptions: IRenderWithApiOptions = {}) => {
  const { mockResolvers, ...renderOptions } = customOptions;
  const AllTheProviders: React.FC = ({ children }) => <AutoMockedProvider mockResolvers={mockResolvers}>{children}</AutoMockedProvider>;
  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};
