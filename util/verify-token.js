const jwt = require('jsonwebtoken');
const appError = require('./error-service').appError;

sendUnauthorizedError = () => {
    let appErr = new appError("unauthorized", 401);
    return appErr;
}

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        return next(sendUnauthorizedError());
    } 

    let token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return next(sendUnauthorizedError());
    } 
    
    let payload = jwt.verify(token, "secret");
    if(!payload) {
        return next(sendUnauthorizedError());
    }
    
    next();
}