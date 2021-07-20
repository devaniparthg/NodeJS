var express = require('express');
var router = express.Router();
var User = require('./User.Controller');
const validator = require("./validator");
 
router.post('/', function(req, res, next) {
    res.status(200).send('Hello v1.0 POST API');
});

router.post('/UserLogin',  User.UserLogin);

module.exports = router;