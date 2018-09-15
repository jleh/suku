import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';

import App from './app';

ReactDOM.render((
  <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/suku' : undefined}>
    <LocalizeProvider>
      <App />
    </LocalizeProvider>
  </BrowserRouter>
), document.getElementById('root'));
