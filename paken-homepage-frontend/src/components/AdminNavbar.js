import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.js';
import config from '../config.json';
import axios from 'axios';

export default function Navbar() {
  const [user, setUser] = useState({
    "id": "",
    "username": "",
    "name": "",
    "email": "",
    "isAdmin": ""
  });

  function loadUser() {
    axios.get(config.BACKEND_URL + "/api/users/get-current-user")
    .then(function(response) {
      console.log(response['data']);
      if (response['data']['status'] == "OK") {
        setUser(response['data']['data']);
      }
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
        <h1>Paken Admin Portal</h1>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/admin/posts" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Posts</NavLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            {user.id == "" &&
              <li class="nav-item mx-2">
                <Link to="/admin/login" end class="btn btn-outline-primary">Login</Link>
              </li>
            }
            {user.id == "" &&
              <li class="nav-item mx-2">
                <Link to="/admin/register" end class="btn btn-outline-primary">Create Admin Account</Link>
              </li>
            }
            {user.id != "" &&
                <li class="nav-item mx-2">
                  <Link to="/my-account" class="btn btn-outline-primary">My Account</Link>
                </li>
            }
            {user.id != "" &&
                <li class="nav-item mx-2">
                  <Link to="/api/users/logout" class="btn btn-outline-primary">Logout</Link>
                </li>
            }
            <li class="nav-item mx-2">
              <Link to="/" class="btn btn-outline-primary">Front Page</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
