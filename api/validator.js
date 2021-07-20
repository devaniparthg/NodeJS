require('dotenv').config();
const { check, validationResult } = require('express-validator');
var Common = require("../libraries/User.Common");

const InvalidParameter = function (errors) {
    var returnStr = "";
    errors.forEach(element => {
        // returnStr = returnStr == "" ? element.param + ": " + element.msg : returnStr + ", " + element.param + ": " + element.msg;
        returnStr = returnStr == "" ? element.msg : returnStr + ", " + element.msg;
    });
    return returnStr;
}

exports.decryptedRequest = [
    check('fshdjfdh', 'encrypth parameter is required').trim().notEmpty(), 
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send(Common.ResFormat('0', process.env.Toaster, 'Encryption is required.', '', {}));
        }else{
            req.body = Common.DecryptObject(req.body.fshdjfdh);
            console.log(req.body);
            return next();
        }
    },
]

exports.ApiAuthentication = [
    check('Token', 'token is required').trim().notEmpty(), 
    check('UserId', 'userid is required').trim().notEmpty(), 
    check('AppVersion', 'app version is required').trim().notEmpty(), 
    check('DeviceId', 'deviceid is required').trim().notEmpty(), 
    check('DeviceToken', 'device token is required').trim().notEmpty(), 
    check('Source', 'source is required').trim().notEmpty(), 
    check('ServiceName', 'Service Name is required').trim().notEmpty(), 
    async (req, res, next) => {
        // req.body.IpAddress = req.ip.split(':').pop();
        let IpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        req.body.IpAddress = IpAddress;
        
        req.body.BaseUrl = req.protocol+'://'+req.headers.host+req.baseUrl+'/';
        // req.body.ServiceName = req.url.replace('/', '');
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send(Common.ResFormat('0', process.env.Toaster, 'Require parameter missing.', '', {}));
        }

        const TokenData = await Common.TokenVerification(req.body);
        console.log("----------");
        console.log(TokenData);
        if (TokenData.status=='1') {
            return next('');
        }
        return res.status(200).send(Common.ResFormat('2', process.env.PopupAlert, 'Authentication Fail.3', '', {}));
    },
]