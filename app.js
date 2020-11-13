var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// Database connection
const databaseUrl = "mongodb://localhost:27017/restDev";
const databaseOptions = {
  useNewUrlParser: true
};

mongoose.connect(databaseUrl, databaseOptions);
mongoose.connection.on("open", function(){
  console.log("MongoDb connection opened")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishesRouter = require("./routes/dishes.routes");
const tablesRouter = require("./routes/tables.routes");

var app = express();

app.use(cors({
  origin: function (origin, callback) {
    callback(null, true)
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishesRouter);
app.use('/tables', tablesRouter);

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
