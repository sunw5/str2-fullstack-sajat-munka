const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const createError = require('http-errors');
const logger = require('./utils/logger');
const morgan = require('morgan');
const path = require('path');
const personRouter = require('./routes/person.routes');

const app = express();

const { username, password, host } = config.get('database');
mongoose.connect(`mongodb+srv://${host}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: username,
  pass: password,
  // dbName: 'vaccine',
  }).then((conn) => {
    // require('./seed/seeder'); // One time seed
    logger.info('Connected to database');
  }).catch(error => {
    console.log(error);
    // logger.error(error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('tiny', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Vaccination' });
});
app.use('/person', personRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Page not found', { expose: false }));
});

// error handler
app.use(function (err, req, res, next) {
  logger.error(err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    status: err.status || 500,
    message: err.message,
    error: err.error
  });
});

module.exports = app;
