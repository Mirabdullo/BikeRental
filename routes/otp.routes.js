const Router = require("@koa/router")
const { newOTP,verifyOTP,deleteOTP, getOTPByID } = require("../controller/otp.controller")
const Validator = require('../middleware/validator');

const router = new Router()



router.post('/newotp', newOTP)
router.get('/:id', getOTPByID)
router.post('/verify', verifyOTP)
router.delete('/:id', deleteOTP)


module.exports = () => router.routes()