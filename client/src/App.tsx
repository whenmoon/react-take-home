import './App.css';
import React from 'react';
import { AppContainer } from './components/AppContainer';
import { QueryClientProvider } from './context/react-query';

export const App = () => (
  //<div className="App">
  //  <header className="App-header">
  <QueryClientProvider>
    <AppContainer />
  </QueryClientProvider>
  //  </header>
  //</div>
);
