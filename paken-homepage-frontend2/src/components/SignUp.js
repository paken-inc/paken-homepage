import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from '../config.json';
import Footer from './Footer';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
const bootstrap = require('bootstrap');

export default function SignUp() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    "username": "",
    "name": "",
    "email": "",
    "password": "",
    "passwordConfirm": ""
  });

  function changeNewUserUsername(e) {
    setNewUser({
      ...newUser,
      "username": e.target.value
    });
  }

  function changeNewUserName(e) {
    setNewUser({
      ...newUser,
      "name": e.target.value
    });
  }

  function changeNewUserEmail(e) {
    setNewUser({
      ...newUser,
      "email": e.target.value
    });
  }

  function changeNewUserPassword(e) {
    setNewUser({
      ...newUser,
      "password": e.target.value
    });
  }

  function changeNewUserPasswordConfirm(e) {
    setNewUser({
      ...newUser,
      "passwordConfirm": e.target.value
    });
  }

  function submitNewUser(e) {
    e.preventDefault();
    axios.post(config.BACKEND_URL + '/api/users/register', newUser)
    .then(function (response) {
      console.log(response['data']);
      navigate("/login");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center m-5">
          <div className="col-md-4 bg-grey p-5 rounded-corners-lg">
            <h1>Sign Up</h1>
            <form onSubmit={submitNewUser}>
              <div className="form-group py-2">
                  <label className="control-label">Username</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="username" value={newUser.username} onChange={changeNewUserUsername}/>
                  </div>
              </div>
              <div className="form-group py-2">
                  <label className="control-label">Name</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="name" value={newUser.name} onChange={changeNewUserName} />
                  </div>
              </div>
              <div className="form-group py-2">
                  <label className="control-label">Email</label>
                  <div>
                      <input type="email" className="form-control input-lg" name="email" value={newUser.email} onChange={changeNewUserEmail} />
                  </div>
              </div>

              <div className="form-group py-2">
                  <label className="control-label">Password</label>
                  <div>
                      <input type="password" className="form-control input-lg" name="password" value={newUser.password} onChange={changeNewUserPassword} />
                  </div>
              </div>

              <div className="form-group py-2">
                  <label className="control-label">Confirm Password</label>
                  <div>
                      <input type="password" className="form-control input-lg" name="passwordConfirm" value={newUser.passwordConfirm} onChange={changeNewUserPasswordConfirm} />
                  </div>
              </div>


              <div className="form-group">
                  <div style={{textAlign: "right"}}>
                      <button type="submit" className="btn btn-primary">Sign Up</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
