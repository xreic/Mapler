// Core
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import '../../static/index.css';

// Electron verification message
console.log(
  '👋 This message is being logged by "renderer.js", included via webpack',
);

// Components
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
