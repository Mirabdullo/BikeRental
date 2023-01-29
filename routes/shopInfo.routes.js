const Router = require("@koa/router")
const { getShopInfo, getShopInfoById, addShopInfo, updateShopInfo, deleteShopInfo } = require("../controller/shopInfo.controller")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getShopInfo)
router.get("/:id", getShopInfoById)
router.post("/", Validator("shop"), addShopInfo)
router.put("/:id", Validator("shop"), updateShopInfo)
router.delete("/:id", deleteShopInfo)


module.exports = ()=> router.routes()