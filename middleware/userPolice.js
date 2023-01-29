const jwt = require("../services/JwtService")
const config = require("config")

module.exports = async function(ctx,next) {
    try {
        const authorization = ctx.headers.authorization
        if(!authorization) {
            ctx.status = 403
            return ctx.body = {message: "User ro'yxatdan o'tmagan1"}
        }
        const token = authorization.split(" ")[1]
        if(!token){
            ctx.status = 403
            return ctx.body = {message: "User token kiritilmagan2"}
        }
        const decodedData = await jwt.verifyAccess(token,config.get("access_key"))
        console.log(decodedData.status);
        if(decodedData.status == false){
            return ctx.body = {message: "User ro'yxatdan o'tmagan3"}
        }
        
        ctx.request.user = decodedData
        console.log(decodedData);
        return next()
    } catch (error) {
        console.log(error);
        return ctx.error(403,{message: "User ro'yxatdan o'tmagan4"})
    }
}