import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';

import store from './store';
import App from './app';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/suku' : undefined}>
      <LocalizeProvider>
        <App />
      </LocalizeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
