require('dotenv').config();
const { check, validationResult } = require('express-validator');
const InvalidParameter = function (errors) {
    var returnStr = "";
    errors.forEach(element => {
        // returnStr = returnStr == "" ? element.param + ": " + element.msg : returnStr + ", " + element.param + ": " + element.msg;
        returnStr = returnStr == "" ? element.msg : returnStr + ", " + element.msg;
    });
    return returnStr;
}

exports.UserLogin = [
    check('UserName', 'username is required').trim().notEmpty(), 
    check('UserPassword', 'password is required').trim().notEmpty(), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var error_string = InvalidParameter(errors.array());
            return res.status(200).send(Common.ResFormat('0', process.env.Toaster, error_string, '', {}));
        }
        next();
    },
]