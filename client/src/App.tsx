import React from 'react';
import { AppContainer } from './components/AppContainer';
import { QueryClientProvider } from './context/react-query';
import { ModalContextProvider } from './context/ModalContext';

export const App = () => (
  <QueryClientProvider>
    <ModalContextProvider>
      <AppContainer />
    </ModalContextProvider>
  </QueryClientProvider>
);
