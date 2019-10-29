import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';
import { version } from '../package.json'

console.log(`👋⚛️⚛️⚛️⚛️     Welcome to PublicBeef - React-based FrontEnd - v${version}     ⚛️️⚛️⚛️⚛️👋`)

ReactDOM.render(
  (<Router >
    <App />
  </Router>),
  document.getElementById('root'));