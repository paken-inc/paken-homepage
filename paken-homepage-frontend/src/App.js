import {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import config from './config.json';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}
export default App;
