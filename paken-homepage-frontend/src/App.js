import {useEffect} from 'react';
import config from './config.json';
import axios from 'axios';

import Home from './components/Home';

import './App.css';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');

function App() {

  useEffect(() => {

  }, [])
  
  return (
    <>
      <Home />
    </>
  );
}
export default App;
