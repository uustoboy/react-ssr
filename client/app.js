import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

let root = document.getElementById('root');

ReactDOM.hydrate(<App/>,root)