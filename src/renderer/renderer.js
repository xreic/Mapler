import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import '../../public/index.css';

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack',
);

ReactDOM.render(<App />, document.getElementById('root'));
