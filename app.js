var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var {config} = require('./config.json');
var secretConfig = require('./secret-config.json')
const session = require('express-session');

var indexRouter = require("./routes/index");
var viewsRouter = require("./routes/views");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

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

app.use("/", usersRouter);
app.use("/", postsRouter);
app.use("/", indexRouter);
app.use("/", viewsRouter);

app.use(express.static('frontend/dist'))

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
