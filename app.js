var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var cors = require('cors');
var bcrypt = require('bcrypt');

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


app.use('/', (req, res) => {
  res.render('index');
});

app.post("/api/users/register", (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;
  var email = req.body.email;

  var params = [name, username, password, passwordConfirm, email];

  for (var i in params) {
    if (params[i] == undefined || params[i] == "") {
      res.json({status: "NOK", error: "Parâmetro não está definido."});
    }
  }

  if (password != passwordConfirm) {
    res.json({status: "NOK", error: "Confirmação de password está errada."});
  }

  var password_salt = await bcrypt.genSalt(10);
  var password_hash = await bcrypt.hash(password, password_salt);

  var con = connectDB();

  var sql = "SELECT * FROM users WHERE username = ?;";
  con.query(sql, [username], function(err, result) {
      if (err) {
          console.log(err);
          res.json({status: "NOK", error: "Ocorreu um erro na base de dados."});
      }
      if (result.length > 0) {
        res.json({status: "NOK", error: "Este nome de utilizador já existe."});
      }
      var sql2 = `
        INSERT INTO users
        (name, username, password, email)
        VALUES (?, ?, ?, ?)
      `;
      con.query(sql2, [name, username, password_hash, email], function(err2, result2) {
          if (err2) {
              console.log(err2);
              res.json({status: "NOK", error: "Ocorreu um erro na base de dados."});
          }
          res.json({status: "OK", data: "O utilizador foi registado com sucesso."});
      });
  });
});

app.post("/api/users/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  var params = [username, password];

  for (var i in params) {
    if (params[i] == undefined || params[i] == "") {
      res.json({status: "NOK", error: "Parâmetro não está definido."});
    }
  };

  var con = connectDB();

  var sql = "SELECT * FROM users WHERE username = ? OR email = ?;";
  con.query(sql, [username, username], function(err, result) {
      if (err) {
          console.log(err);
          res.json({status: "NOK", error: "Ocorreu um erro na base de dados."});
      }
      if (result.length > 0) {
        var validPassword = await bcrypt.compare(password, result[0]['password']);
        if (validPassword) {
          res.json({status: "OK", data: "A autenticação foi bem-sucedida."});
        }
        else {
          res.json({status: "NOK", error: "Password errada."})
        }
      }
      else {
        res.json({status: "NOK", error: "Este utilizador/email não existe."});
      }
  });
});

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
