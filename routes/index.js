var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

module.exports = router;
