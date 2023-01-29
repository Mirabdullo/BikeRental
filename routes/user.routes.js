const Router = require("@koa/router")
const { getUser, getUserById, addUser, updateUser, deleteUser, loginUser, logoutUser } = require("../controller/user.controller")
const userPolice = require("../middleware/userPolice")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/:id", getUserById)
router.post("/",userPolice, Validator("user"), addUser)
router.put("/:id",userPolice, Validator("user"), updateUser)
router.delete("/:id", deleteUser)


module.exports = ()=> router.routes()