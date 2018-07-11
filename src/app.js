require('babel-polyfill');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require('request');
var db = require('./db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'jade');

var index = require('./routes/index');
var trends = require('./routes/trends');
var artistSubmit = require('./routes/artist-submit');

// Add headers
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', index);
app.use('/api/trends', trends);
app.use('/api/artist-submit', artistSubmit);

// For serving react bundle
app.use(express.static(path.join(__dirname, '../client/build')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.code == 'LIMIT_UNEXPECTED_FILE') {
        // render the error page
        res.status(err.status || 401)
        res.json({error: 'Not a registered fieldname'})
    } else {
        // render the error page
        res.status(err.status || 500)
        res.json(err)
    }
});

module.exports = app;
