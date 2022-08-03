import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import stackappLogo from '../images/stackapp-logo.png';
import mainwikiLogo from '../images/mainwiki-logo.png';

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
                    <div class="stackapp-logo-lg">
                      <img src={stackappLogo} />
                    </div>
                  </div>
                  <h5 class="card-title">Stackapp</h5>
                  <p class="card-text">Display unanswered questions from Stackexchange</p>
                  <a target="_blank" href="https://stackapp.paken.xyz" class="btn btn-primary">Visit</a>
                </div>
              </div>
            </li>

            <li>
              <div className="card">
                <div class="card-body">
                  <div class="card-img-top pb-3">
                    <div class="stackapp-logo-lg">
                      <img src={mainwikiLogo} />
                    </div>
                  </div>
                  <h5 class="card-title">MainWiki</h5>
                  <p class="card-text">Our main repository of knowledge and information.</p>
                  <a target="_blank" href="https://mainwiki.paken.xyz" class="btn btn-primary">Visit</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      <Footer />
    </>
  )
}
