import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CommonStore } from './Store/Common/CommonStore';
import { Provider } from 'react-redux';

const client = new QueryClient();

ReactDOM.render(
  <Provider store={CommonStore}>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);

