const Router = require("@koa/router")
const { getClient, getClientById, addClient, updateClient, deleteClient } = require("../controller/client.controller")
const Validator = require("../middleware/validator")

const router = new Router()

router.get("/", getClient)
router.get("/:id", getClientById)
router.post("/", Validator("client"), addClient)
router.put("/:id", Validator("client"), updateClient)
router.delete("/:id", deleteClient)


module.exports = ()=> router.routes()