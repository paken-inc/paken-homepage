import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from '../config.json';
import AdminNavbar from './AdminNavbar';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    "username": "",
    "name": "",
    "email": "",
    "password": "",
    "passwordConfirm": "",
    "secretToken": ""
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

  function changeNewUserSecretToken(e) {
    setNewUser({
      ...newUser,
      "secretToken": e.target.value
    });
  }

  function submitNewUser(e) {
    e.preventDefault();
    axios.post(config.BACKEND_URL + '/api/users/create-admin-account', newUser)
    .then(function (response) {
      console.log(response['data']);
      navigate("/admin");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid">
        <div className="row justify-content-center m-5">
          <div className="col-md-4 bg-grey p-5 rounded-corners-lg">
            <h1>Create Admin Account</h1>
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

              <div className="form-group py-2">
                  <label className="control-label">Secret Token</label>
                  <div>
                      <input type="password" className="form-control input-lg" name="passwordConfirm" value={newUser.secretToken} onChange={changeNewUserSecretToken} />
                  </div>
              </div>


              <div className="form-group">
                  <div style={{textAlign: "right"}}>
                      <button type="submit" className="btn btn-primary">Create Admin Account</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
