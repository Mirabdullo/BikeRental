const Router = require("@koa/router")
const { getCategory, getCategoryById, addCategory, updateCategory, deleteCategory } = require("../controller/category.controller")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getCategory)
router.get("/:id", getCategoryById)
router.post("/", Validator("category"), addCategory)
router.put("/:id", Validator("category"), updateCategory)
router.delete("/:id", deleteCategory)


module.exports = ()=> router.routes()