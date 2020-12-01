// Core
import React from 'react';
import ReactDOM from 'react-dom';

// SCSS
import './app.global.scss';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const App = require('./components/App').default;
  ReactDOM.render(<App />, document.getElementById('root'));
});
