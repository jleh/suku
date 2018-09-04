import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

ReactDOM.render((
  <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/suku' : undefined}>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
