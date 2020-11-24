// Core
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import './app.global.css';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const App = require('./components/App').default;
  ReactDOM.render(<App />, document.getElementById('root'));
});
