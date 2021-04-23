const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");



const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const corOptions = {
                      origin: true,
                      methods: ["GET", "POST"]
                    }
app.use(cors(corOptions));

app.use(cookieParser());

const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const eventRoutes = require('./routes/event.routes');
const resultRoutes = require('./routes/result.routes');
const ticketRoutes = require('./routes/ticket.routes');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/', dashboardRoutes);
app.use('/event', eventRoutes);
app.use('/result', resultRoutes);
app.use('/ticket', ticketRoutes);

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
