const Router = require("@koa/router")
const { getManagement, getManagementById, addManagement, updateManagement, deleteManagement } = require("../controller/management.controller")
const Validator = require("../middleware/validator")
const router = new Router()

router.get("/", getManagement)
router.get("/:id", getManagementById)
router.post("/", Validator("management"), addManagement)
router.put("/:id", Validator("management"), updateManagement)
router.delete("/:id", deleteManagement)


module.exports = ()=> router.routes()