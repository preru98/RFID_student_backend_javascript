const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/dbDemo');
const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');
const attendanceRouter = require('./routes/attendance');
const tagRouter = require('./routes/tag');
const app = express();

// // view engine setup
// app.use(express.static('views'));                   
// app.set('view engine', 'ejs');   

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/course', courseRouter);
app.use('/student', studentRouter);
app.use('/tag', tagRouter);
app.use('/attendance', attendanceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.statusCode || 500);
  res.json({"statusCode" : err.statusCode,  "message" : err.message});
});

module.exports = app;
