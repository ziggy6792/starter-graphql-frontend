/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, useHistory } from 'react-router-dom';
import Theme from 'src/ui/theme';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Grid } from '@material-ui/core';
import ApiProvider from './providers/api-provider';

import ErrorBox from './modules/errors/error-box';
import GenericErrorMessage from './modules/errors/error-message/generic-error-message';
import HomeSceen from './screens/home-sceeen';

// Solution from https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
const calcVh = () => {
  (document.querySelector(':root') as any).style.setProperty('--vh', `${window.innerHeight / 100}px`);
};

calcVh();
window.addEventListener('resize', () => {
  calcVh();
});
// if (envConfig.title) {
//   document.title = envConfig.title;
// }

const App: React.FC = () => (
  <div className='App' style={{ height: 'calc(100 * var(--vh))', width: '100%' }}>
    <HomeSceen />
  </div>
);

interface IErrorFallbackProps {
  error: Error;
}

// Catches errors in rendering
const ErrorFallback: React.FC<IErrorFallbackProps> = ({ error }) => (
  <>
    <div>${error?.message}</div>
    <br />
    <div>${JSON.stringify(error.stack)}</div>
  </>
);

const WithProvider: React.FC = () => (
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <ApiProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </ApiProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default WithProvider;
