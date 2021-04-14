var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
// var indexRouter           =   require('./routes/index');
// var usersRouter           =   require('./routes/users');
// var manageUserRouter      =   require('./routes/user');
// var manageEventsRouter    =   require('./routes/events');
// var manageEventRouter     =   require('./routes/event');
// var manageLotteryRouter   =   require('./routes/lottery');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser());

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/event.routes')(app);
require('./routes/ticket.routes')(app);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
