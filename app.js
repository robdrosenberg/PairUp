var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv').config();

var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

require('./passport');
var config = require('./config');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
// var loginRouter = require('./routes/login');
// var registerRouter = require('./routes/register');

mongoose.connect(config.dbConnstring);
global.User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.sessionKey,
  reseave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  if (req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
});

app.use(expressValidator());

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
// app.use('/login', loginRouter);
// app.use('/register', registerRouter);

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
