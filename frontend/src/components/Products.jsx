import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import pmcLogo from '../images/pmc-logo.png';

export default function Products() {
  return (
    <>
      <Navbar />
        <div className="container py-5">
          <h3>Products</h3>
          <ul className="products">
            <li>
              <div className="card">
                <div class="card-body">
                  <div class="card-img-top pb-3">
                    <div class="logo-lg">
                      <img src={pmcLogo} />
                    </div>
                  </div>
                  <h5 class="card-title">PMC</h5>
                  <p class="card-text">Productivity Management Center</p>
                  <br/>
                  <a target="_blank" href="https://pmc.paken.xyz" class="btn btn-primary">Visit</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      <Footer />
    </>
  )
}
