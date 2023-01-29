const Router = require("@koa/router")
const { getRental, getRentalById, addRental, updateRental, deleteRental } = require("../controller/rental.controller")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getRental)
router.get("/:id", getRentalById)
router.post("/", Validator("rental"), addRental)
router.put("/:id", Validator("rental"), updateRental)
router.delete("/:id", deleteRental)


module.exports = ()=> router.routes()