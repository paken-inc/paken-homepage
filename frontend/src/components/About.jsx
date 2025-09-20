import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3>About</h3>
        <p>Paken is a technology company started in 2022.</p>
      </div>
      <Footer />
    </>
  )
}
