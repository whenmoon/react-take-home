import './App.css';
import React from 'react';
import { AppContainer } from './components/AppContainer';
import { QueryClientProvider } from './context/react-query';

export const App = () => (
  <QueryClientProvider>
    <AppContainer />
  </QueryClientProvider>
);
