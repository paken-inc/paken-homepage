var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/login', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/my-account', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/products', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/sign-up', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/blog', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/about', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/admin', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/admin/login', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/admin/posts', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

router.get('/admin/register', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

module.exports = router;