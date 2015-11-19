// Dependencies

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var requireDir = require('require-dir');
var users = require('./routes/user-route.js');

// Load config

var config = require('./config');

// Connect to database

mongoose.connect(config.mongoUri);

// Express

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Development settings

if (app.get('env') === 'development') {
    
    app.use(express.static(path.join(__dirname, '../client')));

    app.use('/users', users);
    //working
    // app.use('/users', function(req, res){

    //     user1 = {
    //         username: 'user1',
    //         password: 'user1'
    //     };

    //     user2 = {
    //         username: 'user2',
    //         password: 'user2'
    //     };

    //     var users = [user1, user2];
    //     res.json(users);

    // });

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });  

}

/**
 * Production Settings
 
if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
*/

module.exports = app;
