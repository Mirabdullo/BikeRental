const Router = require("@koa/router")
const { getbikeInfo, getbikeInfoById, addbikeInfo, updatebikeInfo, deletebikeInfo } = require("../controller/bike.controller")
const userPolice = require("../middleware/userPolice")
const Validator = require("../middleware/validator")
const router = new Router()

router.get("/", getbikeInfo)
router.get("/:id",userPolice, getbikeInfoById)
router.post("/",userPolice, Validator("bike"), addbikeInfo)
router.put("/:id",userPolice, Validator("bike"), updatebikeInfo)
router.delete("/:id",userPolice, deletebikeInfo)


module.exports = ()=> router.routes()