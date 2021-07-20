var express = require('express');
var router = express.Router();
const validator = require("./validator");
 
router.use('/v1.0', require('./v1.0'));
router.use('/v1.1',validator.decryptedRequest,validator.ApiAuthentication, require(`./v1.1`));

module.exports = router;