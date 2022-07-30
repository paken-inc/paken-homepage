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
import SignUp from './components/SignUp';
import Login from './components/Login';
import MyAccount from './components/MyAccount';

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
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
    </Router>
  );
}
export default App;
