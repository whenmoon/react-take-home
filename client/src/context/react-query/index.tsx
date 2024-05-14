import React, { PropsWithChildren, ReactElement } from 'react';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

export const QueryClientProvider = ({ children }: PropsWithChildren): ReactElement => {
  const queryClient = new QueryClient();
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
};
