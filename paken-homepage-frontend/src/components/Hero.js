import React from 'react'

export default function Hero() {
  return (
    <div class="container-fluid p-0">
      <div class="px-4 py-5 text-center bg-grey">
        <h1 class="display-5 fw-bold">Welcome to Paken</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">Web Development, Software, Mobile, Cloud, Data Science</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}