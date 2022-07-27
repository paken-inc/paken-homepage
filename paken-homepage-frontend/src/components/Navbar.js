import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.png';

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <div class="logo">
            <img src={logo} />
          </div>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Products</NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>About</NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Blog</NavLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item mx-2">
              <Link to="/login" class="btn btn-outline-primary">Login</Link>
            </li>
            <li class="nav-item mx-2">
              <Link to="/sign-up" class="btn btn-outline-primary">Sign up</Link>
            </li>
            <li class="nav-item mx-2">
              <Link to="/my-account" class="btn btn-outline-primary">My Account</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
