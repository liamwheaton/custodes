var express = require('express');
var router = express.Router();
var userService = require('../services/user-service.js');

router.get('/', function(req, res, next) {

    res.send();

});

module.exports = router;