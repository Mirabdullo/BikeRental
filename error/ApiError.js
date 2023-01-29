
class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(ctx,errorMessage){
        return ctx.error(400,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static unauthorized(ctx,errorMessage,friendlyMsg){
        return ctx.error(401,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static forbidden(ctx,errorMessage,friendlyMsg){
        return ctx.error(403,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static notFound(ctx,errorMessage,friendlyMsg){
        return ctx.error(404,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static internal(ctx,errorMessage,friendlyMsg){
        console.log(errorMessage.message);
        return ctx.error(500,{
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
}

module.exports = ApiError