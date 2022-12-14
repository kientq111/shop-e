var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { errorHandle } = require('./middlewares/error.Middleware');
var connectDB = require('./config/db')
const usersRouter = require('./routes/users');
const accountRouter = require('./routes/accounts');
const productRouter = require('./routes/products');
var cors = require('cors')
//Initial Server


require('dotenv').config()
connectDB()
var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', usersRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/products', productRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandle);
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err.message);
// });

module.exports = app;
