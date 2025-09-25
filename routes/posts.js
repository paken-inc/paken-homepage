var express = require('express');
var router = express.Router();
var {connectDB} = require('../libs/database');

router.get("/api/posts/list", (req, res) => {
  var con = connectDB();
  var sql = "SELECT * FROM posts;";
  con.query(sql, function(err, result) {
      if (err) {
          console.log(err);
          return;
      }
      res.json(result);
  });
});

router.post("/api/posts/insert", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;
  var user_id = req.body.user_id;

  var con = connectDB();
  var sql = "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?);";
  con.query(sql, [user_id, title, content], function(err, result) {
      if (err) {
          console.log(err);
          return;
      }
      res.json({status: "OK", data: "A post has been inserted successfully."});
  });
});

router.post("/api/posts/delete", (req, res) => {
  var id = req.body.id;
  var sql = "DELETE FROM posts WHERE id = ?;";
  con.query(sql, [id], function(err, result) {
      if (err) {
          console.log(err);
          return;
      }
      res.json({status: "OK", data: "A post has been deleted."})
  });
});

module.exports = router;