const Router = require("@koa/router")
const { getPayment, getPaymentById, addPayment, updatePayment, deletePayment } = require("../controller/payment.controller")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getPayment)
router.get("/:id", getPaymentById)
router.post("/", Validator("payment"), addPayment)
router.put("/:id", Validator("payment"), updatePayment)
router.delete("/:id", deletePayment)


module.exports = ()=> router.routes()