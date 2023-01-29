const Koa = require('koa')
const config = require('config');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const cors = require('@koa/cors');
const sequelize = require('./config/db');
// const logger = require("koa-logger")

const router = require("./routes/index.routes")
const PORT = config.get("port") || 3001

const app = new Koa()
// app.use(logger())

app.use(static(__dirname + "/public"))
app.use(bodyParser())
app.use(cors())
app.use(router)



async function start(){
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        console.log("Postgresga ulandi");
        app.listen(PORT,() => { console.log(`Server ${PORT}-PORTDA ISHGA TUSHDI`)
        })
    } catch (error) {
        console.log("Pgga ulana olmadi");
        console.log(error);
    }
}

start()