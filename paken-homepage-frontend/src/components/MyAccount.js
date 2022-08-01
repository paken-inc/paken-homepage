import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer.js';
import config from '../config.json';
import axios from 'axios';

export default function MyAccount() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    "id": "",
    "username": "",
    "name": "",
    "email": ""
  });
  const [changeProfileData, setChangeProfileData] = useState({
    "id": "",
    "username": "",
    "name": "",
    "email": ""
  });
  const [changePasswordData, setChangePasswordData] = useState({
    "oldPassword": "",
    "newPassword": "",
    "newPasswordConfirm": ""
  });

  function changeProfileDataUsername(e) {
    setChangeProfileData({
      ...changeProfileData,
      "username": e.target.value
    });
  }

  function changeProfileDataName(e) {
    setChangeProfileData({
      ...changeProfileData,
      "name": e.target.value
    });
  }

  function changeProfileDataEmail(e) {
    setChangeProfileData({
      ...changeProfileData,
      "email": e.target.value
    });
  }

  function changePasswordDataOldPassword(e) {
    setChangePasswordData({
      ...changeProfileData,
      "oldPassword": e.target.value
    });
  }

  function changePasswordDataNewPassword(e) {
    setChangePasswordData({
      ...changePasswordData,
      "newPassword": e.target.value
    });
  }

  function changePasswordDataNewPasswordConfirm(e) {
    setChangePasswordData({
      ...changePasswordData,
      "newPasswordConfirm": e.target.value
    });
  }

  function submitChangeProfile(e) {
    e.preventDefault();
    axios.post(config.BACKEND_URL + '/api/users/change-profile', changeProfileData)
    .then(function(response) {
      console.log(response['data']);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  function submitChangePassword(e) {
    e.preventDefault();
    axios.post(config.BACKEND_URL + '/api/users/change-password', changePasswordData)
    .then(function(response) {
      console.log(response['data']);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  function loadUser() {
    axios.get(config.BACKEND_URL + "/api/users/get-current-user")
    .then(function(response) {
      console.log(response['data']);
      if (response['data']['status'] == "OK") {
        setUser(response['data']['data']);
        setChangeProfileData(response['data']['data']);
      }
      else {
        navigate("/login");
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
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row justify-content-center m-5">
          <div className="col-md-4">
            <div style={{textAlign: "center"}}>
              <h1>My Account</h1>
            </div>
            <form className="bg-grey p-5 mb-5 rounded-corners-lg" onSubmit={submitChangeProfile}>
              <h3>Profile</h3>
              <div className="form-group py-2">
                  <label className="control-label">Username</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="username" value={changeProfileData.username} onChange={changeProfileDataUsername}/>
                  </div>
              </div>

              <div className="form-group py-2">
                  <label className="control-label">Name</label>
                  <div>
                      <input type="text" className="form-control input-lg" name="name" value={changeProfileData.name} onChange={changeProfileDataName}/>
                  </div>
              </div>

              <div className="form-group py-2">
                  <label className="control-label">Email</label>
                  <div>
                      <input type="email" className="form-control input-lg" name="email" value={changeProfileData.email} onChange={changeProfileDataEmail}/>
                  </div>
              </div>

              <div className="form-group">
                  <div style={{textAlign: "right"}}>
                      <button type="submit" className="btn btn-primary">Save</button>
                  </div>
              </div>
            </form>
            
            <form className="bg-grey p-5 mb-5 rounded-corners-lg" onSubmit={submitChangePassword}>
            <h3>Change Password</h3>
              <div className="form-group py-2">
                  <label className="control-label">Old Password</label>
                  <div>
                      <input type="password" className="form-control input-lg" name="password" value={changePasswordData.oldPassword} onChange={changePasswordDataOldPassword} />
                  </div>
              </div>

              <div className="form-group py-2">
                  <label className="control-label">New Password</label>
                  <div>
                      <input type="password" className="form-control input-lg" name="password" value={changePasswordData.newPassword} onChange={changePasswordDataNewPassword} />
                  </div>
              </div>

              <div className="form-group py-2">
                  <label className="control-label">Confirm New Password</label>
                  <div>
                      <input type="password" className="form-control input-lg" name="password" value={changePasswordData.newPasswordConfirm} onChange={changePasswordDataNewPasswordConfirm} />
                  </div>
              </div>

              <div className="form-group">
                  <div style={{textAlign: "right"}}>
                      <button type="submit" className="btn btn-primary">Login</button>
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
