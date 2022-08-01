var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var cors = require('cors');
var bcrypt = require('bcrypt');
var {config} = require('./config.json');
var secretConfig = require('./secret-config.json')
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({secret: secretConfig.SESSION_KEY, name: secretConfig.SESSION_NAME, resave: true, saveUninitialized:false}));

function connectDB() {
  var con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'paken',
  });
  con.connect(function(err) {
      if (err) {
          console.log("MySQL is not connected.");
          throw err;
      }
      console.log("Connected to MySQL!");
  });
  return con;
}

app.post("/api/users/register", (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;
  var email = req.body.email;

  var params = [name, username, password, passwordConfirm, email];

  for (var i in params) {
    if (params[i] == undefined || params[i] == "") {
      res.json({status: "NOK", error: "Parameter is undefined."});
    }
  }

  if (password != passwordConfirm) {
    res.json({status: "NOK", error: "Password confirmation is wrong."});
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, password_hash) {
      var con = connectDB();

      var sql = "SELECT * FROM users WHERE username = ?;";
      con.query(sql, [username], function(err, result) {
          if (err) {
              console.log(err);
              res.json({status: "NOK", error: "There was an error on the database query."});
          }
          if (result.length > 0) {
            res.json({status: "NOK", error: "This username already exists."});
          }
          var sql2 = `
            INSERT INTO users
            (name, username, password, email)
            VALUES (?, ?, ?, ?)
          `;
          con.query(sql2, [name, username, password_hash, email], function(err2, result2) {
              if (err2) {
                  console.log(err2);
                  res.json({status: "NOK", error: "There was an error on the database query."});
              }
              res.json({status: "OK", data: "This user has been registered successfully."});
          });
      });
    });
  });
});

app.post("/api/users/create-admin-account", (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;
  var email = req.body.email;
  var secretToken = req.body.secretToken;

  var params = [name, username, password, passwordConfirm, email, secretToken];

  for (var i in params) {
    if (params[i] == undefined || params[i] == "") {
      res.json({status: "NOK", error: "Parameter is undefined."});
    }
  }

  if (password != passwordConfirm) {
    res.json({status: "NOK", error: "Password confirmation is wrong."});
  }

  if (secretToken != secretConfig.PAKEN_TOKEN) {
    res.json({status: "NOK", error: "Secret token is wrong."})
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, password_hash) {
      var con = connectDB();

      var sql = "SELECT * FROM users WHERE username = ?;";
      con.query(sql, [username], function(err, result) {
          if (err) {
              console.log(err);
              res.json({status: "NOK", error: "There was an error on the database query."});
          }
          if (result.length > 0) {
            res.json({status: "NOK", error: "This username already exists."});
          }
          var sql2 = `
            INSERT INTO users
            (name, username, password, email, is_admin)
            VALUES (?, ?, ?, ?, ?)
          `;
          con.query(sql2, [name, username, password_hash, email, 1], function(err2, result2) {
              if (err2) {
                  console.log(err2);
                  res.json({status: "NOK", error: "There was an error on the database query."});
              }
              res.json({status: "OK", data: "This user has been registered successfully."});
          });
      });
    });
  });
  

  
});

app.post("/api/users/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  var params = [username, password];

  for (var i in params) {
    if (params[i] == undefined || params[i] == "") {
      res.json({status: "NOK", error: "Parameter is undefined."});
    }
  };

  var con = connectDB();

  var sql = "SELECT * FROM users WHERE username = ? OR email = ?;";
  con.query(sql, [username, username], function(err, result) {
      if (err) {
          console.log(err);
          res.json({status: "NOK", error: "There was an error on the database query."});
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0]['password'], function(err, validPassword) {
          if (validPassword) {
            req.session.loggedIn = true;
            req.session.userId = result[0]['id'];
            req.session.isAdmin = result[0]['is_admin'];
            req.session.save();
            console.log(req.session);
            res.json({status: "OK", data: "Login has been successful."});
          }
          else {
            res.json({status: "NOK", error: "Wrong password."})
          }
        });
      }
      else {
        res.json({status: "NOK", error: "This username or email doesn't exist."});
      }
  });
});

app.get("/api/users/logout", (req, res) => {
  req.session.loggedIn = false;
  req.session.userId = null;
  res.redirect("/");
});

app.post("/api/users/change-profile", (req, res) => {
  var id = req.body.id;
  var username = req.body.username;
  var name = req.body.name;
  var email = req.body.email;

  var con = connectDB();

  var sql = "UPDATE users SET username = ?, name = ?, email = ? WHERE id = ?";
  con.query(sql, [username, name, email, id], function(err, result) {
    res.json({status: "OK", data: "This user's profile has been updated."});
  });
});

app.post("/api/users/change-password", (req, res) => {
  var id = req.body.id;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  var newPasswordConfirm = req.body.newPasswordConfirm;

  var con = connectDB();

  if (newPassword != newPasswordConfirm) {
    res.json({status: "NOK", error: "Password confirmation is wrong."})
  }

  var sql = "SELECT * FROM users WHERE id = ?;";
  con.query(sql, [id], function(err, result) {
      if (err) {
          console.log(err);
          res.json({status: "NOK", error: "There was an error on the database query."});
      }
      if (result.length > 0) {
        bcrypt.compare(oldPassword, result[0]['password'], function(err, validPassword) {
          if (validPassword) {
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(newPassword, salt, function(err, password_hash) {
                var sql2 = `
                  UPDATE users
                  SET password = ?
                  WHERE id = ?
                `;
                con.query(sql2, [password_hash, id], function(err2, result2) {
                  res.json({status: "OK", data: "Password has been changed."});
                });
              });
            });
          }
          else {
            res.json({status: "NOK", error: "Wrong password."})
          }
        });
      }
      else {
        res.json({status: "NOK", error: "This user ID doesn't exist."});
      }
  });
});

app.get("/api/users/get-current-user", (req, res) => {
  console.log(req.session);
  console.log(req.session.loggedIn);
  console.log(req.session.userId);
  if (req.session.loggedIn) {
    var id = req.session.userId;

    var con = connectDB();

    var sql = "SELECT id, username, name, email FROM users WHERE id = ?;";
    con.query(sql, [id], function(err, result) {
      if (result.length > 0) {
        res.json({status: "OK", data: result[0]});
      }
      else {
        res.json({status: "NOK", error: "This user ID doesn't exist."})
      }
    });
  }
  else {
    res.json({status: "NOK", error: "Nobody is logged in."})
  }
});

app.get("/api/posts/list", (req, res) => {
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

app.post("/api/posts/insert", (req, res) => {
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

app.post("/api/posts/delete", (req, res) => {
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

app.get('/', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/login', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/my-account', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/products', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/sign-up', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/blog', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/about', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/admin', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/admin/login', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/admin/posts', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.get('/admin/register', (req,res) => {
  console.log(req.session.loggedIn);
  res.sendFile(path.resolve(__dirname) + '/paken-homepage-frontend/build/index.html');
});

app.use(express.static('paken-homepage-frontend/build'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
