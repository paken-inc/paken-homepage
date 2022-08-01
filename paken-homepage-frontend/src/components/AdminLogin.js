import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from '../config.json';
import AdminNavbar from './AdminNavbar';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

export default function AdminLogin() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
      "username": "",
      "password": "",
    });
  
    function changeLoginDataUsername(e) {
      setLoginData({
        ...loginData,
        "username": e.target.value
      });
    }

    function changeLoginDataPassword(e) {
      setLoginData({
        ...loginData,
        "password": e.target.value
      });
    }
  
    function submitLogin(e) {
      e.preventDefault();
      axios.post(config.BACKEND_URL + '/api/users/login', loginData)
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
              <h1>Login</h1>
              <form onSubmit={submitLogin}>
                <div className="form-group py-2">
                    <label className="control-label">Username</label>
                    <div>
                        <input type="text" className="form-control input-lg" name="username" value={loginData.username} onChange={changeLoginDataUsername}/>
                    </div>
                </div>
  
                <div className="form-group py-2">
                    <label className="control-label">Password</label>
                    <div>
                        <input type="password" className="form-control input-lg" name="password" value={loginData.password} onChange={changeLoginDataPassword} />
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
      </>
    )
}

