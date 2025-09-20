import {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import config from './config.json';
import axios from 'axios';

import Home from './components/Home';
import Products from './components/Products';
import Blog from './components/Blog';
import About from './components/About';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import AdminPortal from './components/AdminPortal';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminPosts from './components/AdminPosts';

import './App.css';

function App() {

  useEffect(() => {

  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
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
