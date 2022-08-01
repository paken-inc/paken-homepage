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
import AdminPortal from './components/AdminPortal.js';
import AdminLogin from './components/AdminLogin.js';
import AdminRegister from './components/AdminRegister.js';
import AdminPosts from './components/AdminPosts.js';

import './App.css';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

function App() {

  useEffect(() => {

  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
      </Routes>
    </Router>
  );
}
export default App;
