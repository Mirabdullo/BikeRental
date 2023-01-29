const Router = require("@koa/router")
const { getPenalty, getPenaltyById, addPenalty, updatePenalty, deletePenalty } = require("../controller/penalty.controller")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getPenalty)
router.get("/:id", getPenaltyById)
router.post("/", Validator("penalty"), addPenalty)
router.put("/:id", Validator("penalty"), updatePenalty)
router.delete("/:id", deletePenalty)


module.exports = ()=> router.routes()