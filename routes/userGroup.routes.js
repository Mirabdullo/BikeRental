const Router = require("@koa/router")
const { getUserGroup, getUserGroupById, addUserGroup, updateUserGroup, deleteUserGroup } = require("../controller/userGroup.controller")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getUserGroup)
router.get("/:id", getUserGroupById)
router.post("/", Validator("userGroup"), addUserGroup)
router.put("/:id",Validator("userGroup"),  updateUserGroup)
router.delete("/:id", deleteUserGroup)


module.exports = ()=> router.routes()