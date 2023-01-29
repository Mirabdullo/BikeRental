const Validators = require("../Validation/index")

module.exports = function(validator) {
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exists`)

    return async function( ctx, next) {
        try {
            const validated = await Validators[validator].validateAsync(ctx.request.body)
            ctx.request.body = validated
            return next()
        } catch (err) {
            if(err.isJoi) {
                return ctx.error(400, {
                    message: err.message,
                    friendlyMsg: "Validation error"
                })
            }
            return ctx.error(500, {
                friendlyMsg: "Internal error",
            })
            // next()
        }
    }
}