import {useEffect} from 'react';
import config from './config.json';
import axios from 'axios';

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
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Paken</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Blog</a>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto">
              <li>
                <a class="btn btn-outline-primary" href="#">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">

        <footer class="pt-4 my-md-5 pt-md-5 border-top">
          <div class="row">
            <div class="col-12 col-md">
              <img class="mb-2" src="https://via.placeholder.com/400x300" alt="" width="24" height="24" />
              <small class="d-block mb-3 text-muted">&copy; 2022</small>
            </div>
            <div class="col-6 col-md">
              <h5>Products</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Item1</a></li>
                <li><a class="text-muted" href="#">Item2</a></li>
                <li><a class="text-muted" href="#">Item3</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>About</h5>
              <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Item1</a></li>
                <li><a class="text-muted" href="#">Item2</a></li>
                <li><a class="text-muted" href="#">Item3</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>Blog</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Item1</a></li>
                <li><a class="text-muted" href="#">Item2</a></li>
                <li><a class="text-muted" href="#">Item3</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
export default App;
