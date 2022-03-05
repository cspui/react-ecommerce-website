import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ReduxStore } from './Store/ReduxStore';
import { Provider } from 'react-redux';

const client = new QueryClient();

ReactDOM.render(
  <Provider store={ReduxStore}>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);

