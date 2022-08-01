import React from 'react';
import AdminNavbar from './AdminNavbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config.json';
import axios from 'axios';

export default function AdminPortal() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    "id": "",
    "username": "",
    "name": "",
    "email": ""
  });
  function loadUser() {
    axios.get(config.BACKEND_URL + "/api/users/get-current-user")
    .then(function(response) {
      console.log(response['data']);
      if (response['data']['status'] == "OK") {
        setUser(response['data']['data']);
      }
      else {
        navigate("/admin/login");
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
      <AdminNavbar />
      <div className="container">
        <h3>Welcome to the Admin Portal, {user.name}</h3>
      </div>
    </>
  )
}
