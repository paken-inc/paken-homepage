import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div class="container">
        <footer class="pt-4 my-md-5 pt-md-5 border-top">
            <div class="row">
            <div class="col-12 col-md">
                <small class="d-block mb-3 text-muted">&copy; Paken 2022</small>
            </div>
            <div class="col-6 col-md">
                <h5>Products</h5>
                <ul class="list-unstyled text-small">
                <li><a target="_blank" href="https://pmc.paken.xyz" class="text-muted">PMC</a></li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <h5>About</h5>
                <ul class="list-unstyled text-small">
                <li><Link to="/about" class="text-muted">About</Link></li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <h5>Users</h5>
                <ul class="list-unstyled text-small">
                <li><Link to="/sign-up" class="text-muted">Sign Up</Link></li>
                <li><Link to="/login" class="text-muted">Login</Link></li>
                <li><Link to="/my-account" class="text-muted">My Account</Link></li>
                <li><Link to="/admin" class="text-muted">Admin</Link></li>
                </ul>
            </div>
            </div>
        </footer>
    </div>
  )
}
