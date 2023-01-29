const jwt = require('../services/JwtService');
const config = require('config');

module.exports = async function (ctx,next) {
    try {
        const authorization = ctx.headers.authorization
        if(!authorization) {
            ctx.status = 403
            return ctx.body = {message: "Avtor ro'yxatdan o'tmagan"}
        }
        const token = authorization.split(" ")[1]
        if(!token){
            ctx.status = 403
            return ctx.body = {message: "Avtor ro'yxatdan o'tmagan"}
        }
        [err, decodedData] = await to(jwt.verifyAccess(token,config.get('secret'), {}))
        if(err) {
            ctx.status = 400
            return ctx.body = err.message
        }
        ctx.request.client = decodedData
        console.log(decodedData);
        return next()
    } catch (error) {
        console.log(error);
        ctx.status = 500
        return ctx.body = ({message: "Avtor ro'yxatdan o'tmagan"})
    }
}

async function to(promise) {
    return promise
    .then((ctxponse) => [null, ctxponse])
    .catch((error) => [error])
}